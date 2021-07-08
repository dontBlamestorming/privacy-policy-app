from django import forms
from .models import Studio


class StudioCreationForm(forms.ModelForm):
    name = forms.CharField()
    ceo_name = forms.CharField()
    phone = forms.CharField()
    address = forms.CharField()

    class Meta:
        model = Studio
        fields = ("name", "ceo_name", "phone", "address")

    def save(self, commit=True):
        user = super().save(commit=False)

        if commit:
            user.save()

        return user


class StudioChangeForm(forms.ModelForm):
    class Meta:
        model = Studio
        fields = ("name", "ceo_name", "phone", "address")
