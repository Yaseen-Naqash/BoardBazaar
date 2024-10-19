from django.contrib import admin
from .models import Boardgame, Category, City, Deal, DealImage, PhoneVerification, Report, User, FeedBack
# Register your models here.

admin.site.register(Boardgame)
admin.site.register(Category)
admin.site.register(City)
admin.site.register(Deal)
admin.site.register(DealImage)
admin.site.register(PhoneVerification)
admin.site.register(Report)
admin.site.register(User)
admin.site.register(FeedBack)