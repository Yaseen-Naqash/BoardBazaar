from django.shortcuts import render, redirect
from .models import PhoneVerification, User, Deal, Boardgame, City, Category, DealImage
from django.utils import timezone
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
import re
from django.contrib import messages


# Create your views here.
def error_page(request):
    return render(request, 'error.html')

def landing_page(request):

    return render(request, 'index.html')

def login_page(request):
    if request.method == 'POST':
        username_or_phone = request.POST.get('username-or-phone')
        password = request.POST.get('password')
        print(username_or_phone)
        print(password)


        try:
            if username_or_phone.startswith('09') and len(username_or_phone) == 11:
                user = User.objects.get(phone=username_or_phone, password=password)
            else:
                user = User.objects.get(username=username_or_phone, password=password)
            
            login(request, user)
            messages.success(request, 'شما با موفقیت وارد شدید')
            return redirect('landing_page_url')  # Redirect to the desired page after login
            
        except User.DoesNotExist:
            messages.error(request, 'اطلاعات شما نامعتبر است!')


    return render(request, 'login.html')

def register_page(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        username = request.POST.get('username')
        password = request.POST.get('password')
        confirmPassword = request.POST.get('confirm-password')
        phone = request.POST.get('phone')
        confirmationCode = request.POST.get('confirmationCode')

        
        # 1. Validate name (Persian characters, max 50 characters)
        if not re.match(r'^[\u0600-\u06FF\s]+$', name) or len(name) > 62:
            return redirect('error_url')

        # 2. Validate username (alphanumeric and underscores, 3-20 characters)
        if not re.match(r'^[\w]+$', username) or len(username) < 3 or len(username) > 31:
            return redirect('error_url')

        # 3. Validate password (6-12 characters, letters, and numbers)
        if not re.match(r'^[a-zA-Z0-9]{6,12}$', password):
            return redirect('error_url')

        # 4. Validate confirm password (should match password)
        if password != confirmPassword:
            return redirect('error_url')

        # 5. Validate phone (11 digits, starts with 09 for Iranian numbers)
        if not re.match(r'^09\d{9}$', phone):
            return redirect('error_url')

        # 6. Validate confirmation code (4 digits)
        if not re.match(r'^\d{4}$', confirmationCode):
            return redirect('error_url')

        # 1. Check if password and confirmPassword match
        if password != confirmPassword:
            messages.error(request, 'رمز عبور های وارد شده یکسان نیست')


        # 2. Verify the confirmation code
        if verify_code(phone, confirmationCode):
            user = User.objects.create(
                username=username,
                name=name,  # Ensure your model has a 'name' field or use 'first_name'
                phone=phone,  # Ensure your model has a 'phone' field
                password=password,  # Hash the password before saving
            )
            messages.success(request, ' اکانت شما ساخته شد.')

            return redirect('login_url')
        else:
            messages.error(request, 'کد تایید ارسال شده به تلفن شما معتبر نیست')





    return render(request, 'register.html')

def logout_command(request):
    logout(request)
    return redirect('login_url')

def generate_verification_code(phone_number):
    verification = PhoneVerification(phone_number=phone_number)
    verification.generate_code()
    verification.save()
    return verification.verification_code

def verify_code(phone_number, code):


    
    verification = PhoneVerification.objects.filter(phone_number=phone_number).order_by('-created_at').first()

    if verification is None:
        return False
    if verification.is_expired():
        return False
    
    if verification.verification_code == code:
        return True
    else:
        return False
   
def send_code(request):


    if request.method == 'POST':
        data = json.loads(request.body)
        phone_number = data.get('phone_number')
        
        if not re.match(r'^09\d{9}$', phone_number):
            return JsonResponse({'success': False, 'error': 'Invalid phone number'})
 
        
        # Your logic for sending the verification code goes here
        code = generate_verification_code(phone_number)
        # For example, you could use Twilio or another SMS service to send the code
        print(code)
        if phone_number:
            # Assuming the logic is successful
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid phone number'})

    return JsonResponse({'success': False, 'error': 'Invalid request'})


def create_deal(request):
    if request.method == "POST":
        # Create Deal instance
        title = request.POST.get('deal-titr')
        description = request.POST.get('deal-description')
        city_name = request.POST.get('deal-city')
        manufacturing = request.POST.get('deal-manufacturing')
        deal_type = request.POST.get('deal-type')
        price_method = request.POST.get('deal-price-method')
        total_price = request.POST.get('deal-price-set')
        

        if deal_type == '':
            deal_type = 0

        if manufacturing == 'foreign':
            manufacturing = 1
        else :
            manufacturing = 0

        if price_method == 'agreement':
            price_method = 0
        else :
            price_method = 1
        
        if price_method == 0:
            total_price == 0

        city = City.objects.get(name=city_name)
        # Save Deal object
        deal = Deal.objects.create(
            title=title,
            description=description,
            location=city,
            manufacturing=manufacturing,
            totalPrice=total_price,
        )

        # Handle board games
        boardgame_count = int(request.POST.get('boardgameCount', 0))
        for i in range(1, boardgame_count + 1):
            name = request.POST.get(f'game_name{i}')
            price = request.POST.get(f'game_price{i}')
            status = request.POST.get(f'game-status{i}')
            category_ids = request.POST.getlist(f'game_category{i}')
            print (status)
            if status == 'instock':
                status = 0
            elif status == 'outstock':
                status = 1
            else:
                status = 2
            # Create Boardgame instance
            boardgame = Boardgame.objects.create(
                deal=deal,
                name=name,
                price=price,
                status=status,
            )
            # Add selected categories
            categories = Category.objects.filter(name__in=category_ids)
            boardgame.categories.set(categories)

        # Handle uploaded images
        for uploaded_file in request.FILES.getlist('deal-pictures'):
            DealImage.objects.create(deal=deal, deal_image=uploaded_file)

        






    cities = City.objects.all()
    categories = Category.objects.all()
    categories_data = Category.objects.all().values('name')
    categories_json = json.dumps(list(categories_data))  # Convert queryset to list of dicts
    city_pattern = '|'.join(city.name for city in cities)
    context = {'city_pattern' : city_pattern, 'cities' : cities, 'categories_json' : categories_json, 'categories' : categories}
    return render(request, 'create.html', context)

