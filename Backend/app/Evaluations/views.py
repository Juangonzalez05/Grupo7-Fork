from django.shortcuts import render
from .models import Evaluation
from rest_framework import viewsets, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import EvaluationSerializer
from rest_framework import serializers
from ..permissions import IsTeacher

class EvaluationViewSet(viewsets.ModelViewSet):

    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['course__name', 'date']
    search_fields = ['name', 'course__name']
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'teacher':
            return Evaluation.objects.filter(course__teacher__user=user)
        return Evaluation.objects.all()
    
    def perform_create(self, serializer):
        user = self.request.user
        if user.role == 'teacher':
            course = serializer.validated_data['course']
            if course.teacher.user != user:
                raise serializers.ValidationError("No tienes permiso para crear evaluaciones en este curso.")
        serializer.save()
    
