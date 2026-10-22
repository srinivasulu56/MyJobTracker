from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Applications
from .serializers import ApplicationsSerializer,RegistrationSerializer
from rest_framework.filters import  SearchFilter
from django_filters.rest_framework import DjangoFilterBackend



class RegistrationView(generics.CreateAPIView):
    serializer_class= RegistrationSerializer
    permission_classes = [AllowAny]


class UserApplicationsList(generics.ListCreateAPIView):
    serializer_class=ApplicationsSerializer
    permission_classes  = [IsAuthenticated]

    filter_backends = [SearchFilter,DjangoFilterBackend]
    search_fields = ['job_title','company','status']
    filterset_fields = ["status",'job_type']

    def get_queryset(self):
        return Applications.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    



class UserApplicationsDelete(generics.DestroyAPIView):
    serializer_class  = ApplicationsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Applications.objects.filter(user=self.request.user)


class UserApplicationsUpdate(generics.UpdateAPIView):
    serializer_class = ApplicationsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Applications.objects.filter(user=self.request.user)
