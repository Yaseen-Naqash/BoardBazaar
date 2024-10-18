from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    name = models.CharField(max_length=63, null=True, blank=True)
    bio = models.TextField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=13,null=True, blank=True)
    city = models.ForeignKey('City', null=True, blank=True, related_name='users', on_delete=models.SET_NULL)
    profile_image = models.ImageField(upload_to='images/profile_images/', null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2,default=3.00, null=True, blank=True)
    sells = models.IntegerField(default=0, null=True, blank=True)
    purchases = models.IntegerField(default=0, null=True, blank=True)
    
    def __str__(self) -> str:
        return self.name
    
class FeedBack(models.Model):
    feedback_giver = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='given_feedbacks', null=True, blank=True)
    feedback_taker = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='teken_feedbacks', null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2,default=3.00, null=True, blank=True)
    sold_to = models.BooleanField(default = False)
    bought_from = models.BooleanField(default = False)

    def __str__(self) -> str:
        return f'نظر {self.feedback_giver.name} برای {self.feedback_taker.name}'

class Report(models.Model):
    report_giver = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='given_reports', null=True, blank=True)
    report_taker = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='teken_reports', null=True, blank=True)
    title = models.CharField(max_length=63, null=True, blank=True)
    description = models.TextField(max_length=2047, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'ریپورت {self.report_giver.name} برای {self.report_taker.name}'




class Deal(models.Model):
    MADE_IN = [
        ('0','ایرانی'),
        ('1','خارجی'),
    ]
    isdead = models.BooleanField(default = False)
    title = models.CharField(max_length=127, null=True, blank=True)
    description = models.TextField(max_length=2047, null=True, blank=True)
    owner = models.ForeignKey('User', on_delete=models.CASCADE, related_name='deals', null=True, blank=True)
    totalPrice = models.IntegerField(default=0, null=True, blank=True)
    location = models.ForeignKey('City', related_name='deals', null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    manufacturing = models.CharField(default=0, max_length=1, choices=MADE_IN, blank=True, null=True)
    
    #comments = models.TextField(max_length=500,null=True,blank=True)

    class Meta:
        ordering = ['isdead','-updated','-created']

    
    def __str__(self) -> str:
        return self.title
    



class Boardgame(models.Model):
    STATUS = [
        ('0','برای فروش'),
        ('1','فروخته شد'),
        ('2','نامشخص'),
    ]
    deal = models.ForeignKey(Deal, on_delete=models.CASCADE, null=True, blank=True, related_name='boardgames')
    status = models.CharField(default=0, max_length=1, choices=STATUS, blank=True, null=True)
    name = models.CharField(max_length=127, null=True, blank=True)
    price = models.IntegerField(default=0, null=True, blank=True)
    categories = models.ManyToManyField('Category', related_name='boardgames', blank=True, null=True)
    
    def __str__(self) -> str:
        return self.name
    

class Category(models.Model):
    name = models.CharField(max_length=63, null=True, blank=True)

    def __str__(self) -> str:
        return self.name
    
class City(models.Model):
    name = models.CharField(max_length=63, null=True, blank=True)

    def __str__(self) -> str:
        return self.name
    

class DealImage(models.Model):
    deal_image = models.ImageField(upload_to='images/Deal_images/')
    deal = models.ForeignKey(Deal, on_delete=models.CASCADE, related_name='images', null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.deal.title}'