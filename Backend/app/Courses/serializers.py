from rest_framework import serializers

from .models import Course
from ..Teachers.models import Teacher
from ..Teachers.serializers import TeacherSerializer
from ..Students.serializers import StudentSerializer
from ..Students.models import Student



class CourseSerializer(serializers.ModelSerializer):
    teacher_id = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all(), source='teacher', allow_null=True, required=False)
    teacher_name = serializers.SerializerMethodField()  
    students = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), many=True, required=False)  

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'teacher_id', 'teacher_name', 'schedule', 'start_date', 'end_date', 'students']  # Incluye la lista de estudiantes

    def get_teacher_name(self, obj):
        if obj.teacher:
            return f"{obj.teacher.user.first_name} {obj.teacher.user.last_name}"  
        return None

    def create(self, validated_data):
        students = validated_data.pop('students', [])  
        course = Course.objects.create(**validated_data)
        course.students.set(students)  
        return course

    def update(self, instance, validated_data):
        students = validated_data.pop('students', None)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.teacher = validated_data.get('teacher', instance.teacher)
        instance.schedule = validated_data.get('schedule', instance.schedule)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)

        if students is not None:
            instance.students.set(students)  

        instance.save()
        return instance