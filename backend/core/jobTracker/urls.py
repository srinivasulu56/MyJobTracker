from django.urls import path 
from .views import UserApplicationsList, UserApplicationsDelete, UserApplicationsUpdate
urlpatterns = [
    path('', UserApplicationsList.as_view(), name='user_applications_list'),
    path('<int:pk>/',UserApplicationsDelete.as_view(), name='user_applications_delete'),
    path('<int:pk>/update/', UserApplicationsUpdate.as_view(), name='user_applications_update'),
]