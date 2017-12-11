from django.contrib import admin
from cms.extensions import PageExtensionAdmin
from .models import Category, CategoryExtension, ybyj, YbyjExtension

class CategoryAdmin(admin.ModelAdmin):
    pass

class CategoryExtensionAdmin(PageExtensionAdmin):
    pass

admin.site.register(Category, CategoryAdmin)
admin.site.register(CategoryExtension, CategoryExtensionAdmin)

class YbyjAdmin(admin.ModelAdmin):
    pass

class YbyjExtensionAdmin(PageExtensionAdmin):
    pass

admin.site.register(ybyj, YbyjAdmin)
admin.site.register(YbyjExtension, YbyjExtensionAdmin)
