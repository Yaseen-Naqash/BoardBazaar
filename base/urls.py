from django.urls import path
from . import views



urlpatterns = [
    path('', views.landing_page, name='landing_page_url'),
    path('login/', views.login_page, name='login_url'),
    path('register/', views.register_page, name='register_url'),
    path('send-code/', views.send_code, name='send_code'),
    path('error/', views.error_page, name='error_url'),




]