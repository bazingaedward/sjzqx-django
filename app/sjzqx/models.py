from django.db import models
from ckeditor.fields import RichTextField
from cms.extensions import PageExtension
from cms.extensions.extension_pool import extension_pool

class Category(models.Model):
    category = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = '分类'

    def __str__(self):
        return self.category

class CategoryExtension(PageExtension):
    category = models.ForeignKey(Category)

extension_pool.register(CategoryExtension)

# 预报预警
class ybyj(models.Model):
    title = models.CharField(max_length=200)
    content = RichTextField()

    class Meta:
        verbose_name_plural = '预报预警'

    def __str__(self):
        return self.title

class YbyjExtension(PageExtension):
    ybyj = models.ForeignKey(ybyj)

extension_pool.register(YbyjExtension)
