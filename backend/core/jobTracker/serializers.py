from rest_framework import serializers
from .models import Applications
from django.contrib.auth.models import User 
class ApplicationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applications
        fields  = ['id', 'job_title', 'company','location','job_type','salary','status']


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    class Meta:
        model = User 
        fields =["username","email","password"]

    def create(self,validated_data):
        return User.objects.create_user(**validated_data)