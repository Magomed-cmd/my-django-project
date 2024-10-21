from rest_framework import serializers
from .models import SoilData
class SoilDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoilData
        fields = '__all__'

    def validate(self, data):
        if data['sender1_ph'] > 18 or data['sender1_ph'] < 0:
            raise serializers.ValidationError("pH value for sender1 must be between 0 and 18.")
        if data['sender2_ph'] > 18 or data['sender2_ph'] < 0:
            raise serializers.ValidationError("pH value for sender2 must be between 0 and 18.")
        return data
