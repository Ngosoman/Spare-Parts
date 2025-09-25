# from django.utils import timezone
# from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth.models import User
from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name



    
class Order(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    status = models.CharField(
        max_length=20,
        choices=[("pending", "Pending"), ("paid", "Paid"), ("shipped", "Shipped")],
        default="pending"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.buyer.username}"



#Mpesa Transaction Model
class MpesaRequest(models.Model):
    phone_number = models.CharField(max_length=15)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    account_reference = models.CharField(max_length=50)
    transaction = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

class MpesaResonse(models.Model):
    request = models.ForeignKey(MpesaRequest, on_delete=models.CASCADE)
    merchant_request_id = models.CharField(max_length=255)
    checkout_request_id = models.CharField(max_length=10)
    response_description = models.CharField(max_length=255)
    response_code = models.CharField(max_length=10)
    customer_message = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)