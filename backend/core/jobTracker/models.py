from django.db import models
from django.conf import settings 

class Applications(models.Model):
    JOB_TYPE_CHOICES = [
        ('full_time','Full-time'),
        ('part_time','Part-time'),
        ('internship','Intership'),
        ('contract','Contract'),
    ]

    STATUS_CHOICES = [  
        ("applied","Applied"),
        ("interview","Interview"),
        ("rejected","Rejected"),
        ("offer","Offer"),
        ("accepted","Accepted"),
    ]

    user  = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name= "applications",
        null=True,
        blank=True,
    )

    job_title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100,null=True,blank=True)
    job_type = models.CharField(max_length=20,choices=JOB_TYPE_CHOICES,null=True,blank=True)
    salary = models.CharField(max_length=50,null=True,blank=True)
    status = models.CharField(max_length=20,choices=STATUS_CHOICES,null=True,blank=True)


    def __str__(self):
        return self.company

    
