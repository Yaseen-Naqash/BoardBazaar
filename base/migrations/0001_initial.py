# Generated by Django 5.1.2 on 2024-10-18 17:17

import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=63, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=63, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('name', models.CharField(blank=True, max_length=63, null=True)),
                ('bio', models.TextField(blank=True, max_length=255, null=True)),
                ('phone', models.CharField(blank=True, max_length=13, null=True)),
                ('profile_image', models.ImageField(blank=True, null=True, upload_to='images/profile_images/')),
                ('rating', models.DecimalField(blank=True, decimal_places=2, default=3.0, max_digits=3, null=True)),
                ('sells', models.IntegerField(blank=True, default=0, null=True)),
                ('purchases', models.IntegerField(blank=True, default=0, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
                ('city', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='users', to='base.city')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Deal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isdead', models.BooleanField(default=False)),
                ('title', models.CharField(blank=True, max_length=127, null=True)),
                ('description', models.TextField(blank=True, max_length=2047, null=True)),
                ('totalPrice', models.IntegerField(blank=True, default=0, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('manufacturing', models.CharField(blank=True, choices=[('0', 'ایرانی'), ('1', 'خارجی')], default=0, max_length=1, null=True)),
                ('location', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='deals', to='base.city')),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='deals', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['isdead', '-updated_at', '-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Boardgame',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(blank=True, choices=[('0', 'برای فروش'), ('1', 'فروخته شد'), ('2', 'نامشخص')], default=0, max_length=1, null=True)),
                ('name', models.CharField(blank=True, max_length=127, null=True)),
                ('price', models.IntegerField(blank=True, default=0, null=True)),
                ('categories', models.ManyToManyField(blank=True, related_name='boardgames', to='base.category')),
                ('deal', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='boardgames', to='base.deal')),
            ],
        ),
        migrations.CreateModel(
            name='DealImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deal_image', models.ImageField(upload_to='images/Deal_images/')),
                ('deal', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='base.deal')),
            ],
        ),
        migrations.CreateModel(
            name='FeedBack',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.DecimalField(blank=True, decimal_places=2, default=3.0, max_digits=3, null=True)),
                ('sold_to', models.BooleanField(default=False)),
                ('bought_from', models.BooleanField(default=False)),
                ('feedback_giver', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='given_feedbacks', to=settings.AUTH_USER_MODEL)),
                ('feedback_taker', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='teken_feedbacks', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=63, null=True)),
                ('description', models.TextField(blank=True, max_length=2047, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('report_giver', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='given_reports', to=settings.AUTH_USER_MODEL)),
                ('report_taker', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='teken_reports', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
