from django.shortcuts import render
from .models import Teacher
from .serializers import TeacherSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Teacher, User
from .serializers import TeacherSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        user = User.objects.get(id=data.get('user_id')) 
        data['user'] = user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

