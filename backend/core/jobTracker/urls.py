from django.urls import path 
from .views import UserApplicationsList, UserApplicationsDelete, UserApplicationsUpdate , RegistrationView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
urlpatterns = [
    path('', UserApplicationsList.as_view(), name='user_applications_list'),
    path('<int:pk>/',UserApplicationsDelete.as_view(), name='user_applications_delete'),
    path('<int:pk>/update/', UserApplicationsUpdate.as_view(), name='user_applications_update'),

    path("register/",RegistrationView.as_view(),name='register'),
    path("token/",TokenObtainPairView.as_view(),name="token_obtain_pair"),
    path("token/refresh/",TokenRefreshView.as_view(),name="token_refresh"),
]