import json
import os
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.http import require_GET


def read_json(filename):
    path = os.path.join(settings.DATA_DIR, filename)
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


@require_GET
def profile(request):
    return JsonResponse(read_json('profile.json'))


@require_GET
def skills(request):
    return JsonResponse(read_json('skills.json'))


@require_GET
def projects(request):
    return JsonResponse({'projects': read_json('projects.json')})


@require_GET
def certificates(request):
    return JsonResponse({'certificates': read_json('certificates.json')})


@require_GET
def education(request):
    return JsonResponse({'education': read_json('education.json')})
