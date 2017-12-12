import requests, bs4, os, json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from sjzqx.models import ybyj

def wx_list(request):
    parameters = request.GET
    qs = ybyj.objects.all()
    data = []
    for item in qs:
        data.append(
            {
            'title': item.title,
            'content': item.content
            }
        )
    return JsonResponse({'status': 'OK', 'data': data})
