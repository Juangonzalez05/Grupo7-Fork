
from rest_framework import serializers
from .models import Student
from ..Users.models import User  

class StudentSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    full_name = serializers.SerializerMethodField()
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)

    class Meta:
        model = Student
        fields = ('id', 'user_id', 'first_name', 'last_name', 'full_name', 'birth_date', 'gender', 'address', 'phone_number', 'grade', 'enrollment_date')

    def get_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    
    def create(self, validated_data):
        user_id = validated_data.pop('user_id').id
        student = Student.objects.create(user_id=user_id, **validated_data)
        return student

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
        instance.grade = validated_data.get('grade', instance.grade)
        instance.enrollment_date = validated_data.get('enrollment_date', instance.enrollment_date)
        
        instance.save()
        return instance



