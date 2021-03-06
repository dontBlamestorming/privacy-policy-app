# Generated by Django 3.2 on 2021-07-08 09:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PrivacyPolicyForm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=16, verbose_name='Name')),
                ('email', models.EmailField(max_length=128, verbose_name='Email address')),
                ('birthday', models.CharField(max_length=16, verbose_name='Birthday')),
                ('gender', models.CharField(choices=[('male', 'Male'), ('female', 'Female')], max_length=8, verbose_name='Gender')),
                ('phone', models.CharField(max_length=16, verbose_name='Phone number')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created')),
                ('sign', models.FileField(upload_to='files/', verbose_name='Sign image')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='form', to=settings.AUTH_USER_MODEL)),
                ('studio', models.ForeignKey(db_column='studio_id', on_delete=django.db.models.deletion.CASCADE, to='account.studio')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(blank=True, upload_to='psd/', verbose_name='PSD image')),
                ('form', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.privacypolicyform')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='file', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
