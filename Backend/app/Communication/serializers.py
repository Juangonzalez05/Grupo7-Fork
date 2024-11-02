from rest_framework import serializers
from .models import Message
from app.Users.models import User  # Ajusta el import al nombre correcto

class MessageSerializer(serializers.ModelSerializer):
    # Define `sender` como de solo lectura
    sender = serializers.ReadOnlyField(source='sender.id')
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    sender_full_name = serializers.SerializerMethodField()
    receiver_full_name = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'sender', 'sender_full_name', 'receiver', 'receiver_full_name', 'subject', 'body', 'created_at', 'read']
        read_only_fields = ['created_at', 'read', 'sender']

    def get_sender_full_name(self, obj):
        return f"{obj.sender.first_name} {obj.sender.last_name}"

    def get_receiver_full_name(self, obj):
        return f"{obj.receiver.first_name} {obj.receiver.last_name}"
