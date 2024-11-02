from django.shortcuts import render
from .models import Course
from .serializers import CourseSerializer
from rest_framework import viewsets
from ..permissions import IsTeacher
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import Course
from ..Teachers.models import Teacher
from ..Students.models import Student


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    @action(detail=True, methods=['post'])
    def enroll_student(self, request, pk=None):
        course = self.get_object()
        student_id = request.data.get('student_id')

        try:
            student = Student.objects.get(id=student_id)
            course.students.add(student)  
            return Response({'status': 'Estudiante matriculado exitosamente'})
        except Student.DoesNotExist:
            return Response({'error': 'Estudiante no encontrado'}, status=status.HTTP_404_NOT_FOUND)

