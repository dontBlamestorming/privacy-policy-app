from rest_framework import permissions


class IsStudioManager(permissions.BasePermission):
    message = "You don't have a permission to reading this page"

    # def has_object_permission(self, request, view, obj):
    #     """
    #         Object-level permission to only allow owners of an object to edit it.
    #         Assumes the model instance has an `owner` attribute.
    #     """
    #
    #     # Read permissions are allowed to any request,
    #     # so we'll always allow GET, HEAD or OPTIONS requests.
    #     if request.method in permissions.SAFE_METHODS:
    #         return True
    #
    #     # Write permissions are only allowed to the owner of the snippet.
    #     return obj.owner == request.user

    def has_permission(self, request, view):
        is_superuser = request.user.is_superuser
        is_manager = request.user.is_studio_manager

        return is_superuser or is_manager
