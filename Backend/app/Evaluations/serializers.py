from rest_framework import serializers
from .models import Evaluation
from ..Courses.serializers import CourseSerializer



class EvaluationSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)

    class Meta:
        model = Evaluation
        fields = '__all__'