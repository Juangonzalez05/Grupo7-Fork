from rest_framework.routers import DefaultRouter
from django.urls import path
from ..Users.views import *
from ..Courses.views import *
from ..Grades.views import *
from ..Students.views import *
from ..Teachers.views import *
from ..Evaluations.views import *
from ..Communication.views import *

router = DefaultRouter()

router.register(r'user', UserViewSet, basename='User')
router.register(r'course', CourseViewSet, basename='Course')
router.register(r'grade', GradeViewSet, basename='Grade')
router.register(r'student', StudentViewSet, basename='Student')
router.register(r'teacher', TeacherViewSet, basename='Teacher')
router.register(r'evaluation', EvaluationViewSet, basename='Evaluation')
router.register(r'register', UserCreateView, basename='Register')
router.register(r'communication', MessageViewSet, basename='Communication')

urlpatterns = router.urls + [
    path('grades/reporte-estudiantes/<int:course_id>/', GradeViewSet.as_view({'get': 'generar_reporte_pdf'}), name='reporte_estudiantes_pdf'),
    path('grades/reporte-estudiantes-json/<int:course_id>/', GradeViewSet.as_view({'get': 'generar_reporte_json'}), name='reporte_estudiantes_json'),
]

    






