from django.shortcuts import render
from rest_framework import filters

# Create your views here.
from rest_framework import viewsets, filters
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    



# from rest_framework import viewsets, status
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from .models import Order
# from .serializers import OrderSerializer
# from products.models import Product
# from mpesa.utils import initiate_stk_push  # will create helper

# class OrderViewSet(viewsets.ModelViewSet):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         product = serializer.validated_data['product']
#         quantity = serializer.validated_data['quantity']
#         total = product.price * quantity
#         serializer.save(buyer=self.request.user, total_price=total)

#     @action(detail=True, methods=['POST'])
#     def checkout(self, request, pk=None):
#         order = self.get_object()
#         if order.status != 'PENDING':
#             return Response({'detail': 'Order already processed.'}, status=status.HTTP_400_BAD_REQUEST)
        
#         # initiate STK Push
#         phone = request.data.get('phone')
#         if not phone:
#             return Response({'detail': 'Phone number required'}, status=status.HTTP_400_BAD_REQUEST)

#         response = initiate_stk_push(order.id, phone, order.total_price)
#         return Response(response)




#Mpesa Views

from rest_framework import status
from rest_framework import viewsets 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import MpesaRequest, MpesaResonse
from .serializers import MpesaRequestSerializer, MpesaResponseSerializer
from django.conf import settings
import base64
import requests
from datetime import datetime

@api_view(['POST'])
@permission_classes([AllowAny])
def stk_push(request):
    print("Received STK push request:", request.data)  # <-- This will show in your backend terminal
    serializer = MpesaRequestSerializer(data=request.data)
    if serializer.is_valid():

        mpesa_request = serializer.save()
        response_data = initiate_stk_push( mpesa_request)
        print("Mpesa API response:", response_data)
        mpesa_response = MpesaResonse.objects.create(
            request=mpesa_request,
            merchant_request_id=response_data.get('MerchantRequestID', ''),
            checkout_request_id=response_data.get('CheckoutRequestID', ''),
            response_description=response_data.get('ResponseDescription', ''),
            response_code=response_data.get('ResponseCode', ''),
            customer_message=response_data.get('CustomerMessage', ''),
        )
        response_serializer = MpesaResponseSerializer(mpesa_response)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Serializer errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def initiate_stk_push(mpesa_request):
    access_token = get_access_token()
    api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest" #sandbox URL
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    print("Access Token:", access_token)  # Debugging line
    payload = {
        "BusinessShortCode": settings.MPESA_SHORTCODE,
        "Password": generate_password(),
        "Timestamp": datetime.now().strftime('%Y%m%d%H%M%S'),
        "TransactionType": "CustomerPayBillOnline",
        "Amount": float(mpesa_request.amount),  # Convert Decimal to float
        "PartyA": mpesa_request.phone_number,
        "PartyB": settings.MPESA_SHORTCODE,
        "PhoneNumber": mpesa_request.phone_number,
        "CallBackURL": "https://mydomain.com/path",  # Update with your actual callback URL
        "AccountReference": mpesa_request.account_reference,
        "TransactionDesc": mpesa_request.transaction_desc
    }
    response = requests.post(api_url, json=payload, headers=headers)
    return response.json()
def get_access_token():
    consumer_key = settings.MPESA_CONSUMER_KEY
    consumer_secret = settings.MPESA_CONSUMER_SECRET
    api_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(api_url, auth=(consumer_key, consumer_secret))
    access_token = response.json().get('access_token')
    return access_token
def generate_password():
    shortcode = settings.MPESA_SHORTCODE
    passkey = settings.MPESA_PASSKEY
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    data_to_encode = shortcode + passkey + timestamp
    encoded_string = base64.b64encode(data_to_encode.encode())
    return encoded_string.decode('utf-8')