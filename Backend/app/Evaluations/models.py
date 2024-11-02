from django.db import models
from app.Courses.models import Course

# Create your models here.
class Evaluation(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='evaluations')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    date = models.DateField()

    def str(self):
        return f"{self.name} - {self.course.name}"