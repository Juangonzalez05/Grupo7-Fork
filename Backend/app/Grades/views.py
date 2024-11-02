
# Backend/app/Grades/views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Grade
from app.Courses.models import Course
from app.Students.models import Student
from .serializers import GradeSerializer, CreateGradeSerializer
from django.shortcuts import get_object_or_404
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import HttpResponse
from django.shortcuts import get_object_or_404

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'assign_grade']:
            return CreateGradeSerializer
        return GradeSerializer

    @action(detail=False, methods=['get'], url_path='course/(?P<course_id>[^/.]+)/students')
    def students_by_course(self, request, course_id=None):
       
        course = get_object_or_404(Course, pk=course_id)
        students = course.students.all()
        
        student_data = []
        for student in students:
            grades = Grade.objects.filter(student=student, course=course)
            
            
            grade_list = [grade.grade for grade in grades]
            grade_ids_list = [grade.id for grade in grades]  
            
            
            student_data.append({
                'id': student.id,
                'first_name': student.user.first_name,
                'last_name': student.user.last_name,
                'grades': grade_list,  
                'grades_ids': grade_ids_list  
            })
            
        return Response(student_data, status=200)

    @action(detail=False, methods=['post'], url_path='assign-grade')
    def assign_grade(self, request):
       
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, *args, **kwargs):
       
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        
        instance = self.get_object()
        instance.delete()
        return Response({"message": f"Nota con ID {instance.id} eliminada exitosamente."}, status=204)


    @action(detail=False, methods=['get'], url_path='reporte-estudiantes/(?P<course_id>[^/.]+)')
    def generar_reporte_pdf(self, request, course_id=None):
      
        course = get_object_or_404(Course, id=course_id)
        estudiantes_con_notas = Grade.objects.filter(course=course).select_related('student__user')
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'inline; filename="reporte_{course.name}.pdf"'
        pdf = canvas.Canvas(response, pagesize=letter)
        pdf.setTitle(f'Reporte de Estudiantes - {course.name}')
        pdf.setFont("Helvetica-Bold", 16)
        pdf.drawString(100, 750, f"Reporte de Estudiantes - {course.name}")
        y_position = 700

        for grade in estudiantes_con_notas:
            student = grade.student
            calificacion = grade.grade 
            pdf.setFont("Helvetica", 12)
            pdf.drawString(100, y_position, f"Estudiante: {student.user.first_name} {student.user.last_name} - Nota: {calificacion}")

            y_position -= 30  

          
            if y_position < 100:
                pdf.showPage()  
                y_position = 750  

        # Finalizar el PDF
        pdf.showPage()
        pdf.save()

        return response
    



    @action(detail=False, methods=['get'], url_path='reporte-estudiantes-json/(?P<course_id>[^/.]+)')
    def generar_reporte_json(self, request, course_id=None):
        
        course = get_object_or_404(Course, id=course_id)
        students = course.students.all().select_related('user')

        student_data = []
        for student in students:
            grades = Grade.objects.filter(student=student, course=course)
            grade_list = [grade.grade for grade in grades]
            grade_ids_list = [grade.id for grade in grades]  
            
            student_data.append({
                'id': student.id,
                'first_name': student.user.first_name,
                'last_name': student.user.last_name,
                'grades': grade_list,  
                'grades_ids': grade_ids_list  
            })
        
        return Response(student_data, status=200)


