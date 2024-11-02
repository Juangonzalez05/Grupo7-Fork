from rest_framework import serializers

from .models import Teacher
from ..Users.models import User 
from ..Users.serializers import UserSerializer


class TeacherSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    full_name = serializers.SerializerMethodField()
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)

    class Meta:
        model = Teacher
        fields = ('id', 'user_id', 'first_name', 'last_name', 'full_name', 'birth_date', 'gender', 'address', 'phone_number', 'department', 'hire_date')

    def get_full_name(self, obj):
        # Retornamos el nombre completo del usuario asociado
        return f"{obj.user.first_name} {obj.user.last_name}"
    
    def create(self, validated_data):
        user_id = validated_data.pop('user_id').id  
        teacher = Teacher.objects.create(user_id=user_id, **validated_data)
        return teacher

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user = instance.user
            user.first_name = user_data.get('first_name', user.first_name)
            user.last_name = user_data.get('last_name', user.last_name)
            user.save()

        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.address = validated_data.get('address', instance.address)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.department = validated_data.get('department', instance.department)
        instance.hire_date = validated_data.get('hire_date', instance.hire_date)
        
        instance.save()
        return instance

