from rest_framework import serializers
from .models import Applications

class ApplicationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applications
        fields  = ['id', 'job_title', 'company','location','job_type','salary','status']


    