from django.db import models
from ckeditor.fields import RichTextField

# 预报预警
class ybyj(models.Model):
    title = models.CharField(max_length=200)
    content = RichTextField()
