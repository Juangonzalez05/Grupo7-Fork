from rest_framework import permissions

class IsTeacher(permissions.BasePermission):
    """
    Permiso para permitir solo a los profesores.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'teacher'