from django.db import models
from app.Teachers.models import Teacher
from app.Students.models import Student  

class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, blank=True)
    students = models.ManyToManyField(Student, related_name='courses')  # Relación ManyToMany con estudiantes
    schedule = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.name



