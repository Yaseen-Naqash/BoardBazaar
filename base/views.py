from django.shortcuts import render, redirect
from .models import PhoneVerification, User
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
        phone = request.POST.get('phone')
        password = request.POST.get('password')

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