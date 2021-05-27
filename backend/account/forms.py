from django import forms
from .models import User, Studio
from django.contrib.auth.forms import ReadOnlyPasswordHashField


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email', 'name', 'studio')

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")

        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])

        if commit:
            user.save()

        return user


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ('email', 'name', 'password', 'is_active')

    def clean_password(self):
        return self.initial["password"]


class StudioCreationForm(forms.ModelForm):
    name = forms.CharField()
    ceo_name = forms.CharField()
    phone = forms.CharField()
    address = forms.CharField()

    class Meta:
        model = Studio
        fields = ('name', 'ceo_name', 'phone', 'address')

    def save(self, commit=True):
        user = super().save(commit=False)

        if commit:
            user.save()

        return user


class StudioChangeForm(forms.ModelForm):

    class Meta:
        model = Studio
        fields = ('name', 'ceo_name', 'phone', 'address')


class LoginForm(forms.ModelForm):
    password = forms.CharField(label='Password', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email', 'password')