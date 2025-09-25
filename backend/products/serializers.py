from rest_framework import serializers
from .models import Product
from rest_framework import serializers
from .models import Order

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['buyer', 'total_price', 'status']

#Mpesa Serializers
from .models import MpesaRequest, MpesaResonse

class MpesaRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MpesaRequest
        fields = '__all__'
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['amount'] = str(instance.amount)
        return ret

class MpesaResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = MpesaResonse
        fields = '__all__'
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret