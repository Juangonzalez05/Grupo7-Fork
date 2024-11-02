from rest_framework import serializers
from ..Grades.models import Grade
from ..Students.models import Student
from ..Courses.models import Course

class GradeSerializer(serializers.ModelSerializer):
    
    student = serializers.StringRelatedField(read_only=True)
    course = serializers.StringRelatedField(read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), source='student', write_only=True)
    course_id = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), source='course', write_only=True)
    grades_ids = serializers.SerializerMethodField()

    class Meta:
        model = Grade
        fields = ['id', 'student', 'course', 'grade', 'evaluation_date', 'student_id', 'course_id', 'grades_ids']

    def get_grades_ids(self, obj):
        student = obj.student
        course = obj.course
        grades = Grade.objects.filter(student=student, course=course)
        return [grade.id for grade in grades]

class CreateGradeSerializer(serializers.ModelSerializer):
    student_id = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), source='student', write_only=True, required=False)
    course_id = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), source='course', write_only=True, required=False)

    class Meta:
        model = Grade
        fields = ['student_id', 'course_id', 'grade', 'evaluation_date']

    def create(self, validated_data):
       
        return Grade.objects.create(**validated_data)

    def update(self, instance, validated_data):
       
        instance.grade = validated_data.get('grade', instance.grade)
        instance.evaluation_date = validated_data.get('evaluation_date', instance.evaluation_date)
        instance.save()
        return instance
