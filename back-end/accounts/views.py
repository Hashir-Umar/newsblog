from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from django.utils import timezone
from accounts.models import User
from news.models import Author, Article, Status
from accounts.serializers import UserSerializer


def AdminLogin(request):
    email = request.POST.get("email")
    password = request.POST.get("password")
    response = getUserWithRole(email, password, 1)
    return HttpResponse(response, content_type='application/json')


def BlogLogin(request):
    email = request.POST.get("email")
    password = request.POST.get("password")
    response = getUserWithRole(email, password, 2)
    return HttpResponse(response, content_type='application/json')


def GuestLogin(request):
    email = request.POST.get("email")
    password = request.POST.get("password")
    dump = getUserWithRole(email, password, 3)
    return HttpResponse(dump, content_type='application/json')


def BlogRegister(request):
    print(request)
    email = request.POST.get("email")
    print("[INFO]", email)
    password = request.POST.get("password")
    print("[INFO]", password)
    first_name = request.POST.get("first_name")
    print("[INFO]", first_name)
    last_name = request.POST.get("last_name")
    print("[INFO]", last_name)
    dump = createUserWithRole(email, password, first_name, last_name, 2)
    return HttpResponse(dump, content_type='application/json')


def GuestRegister(request):
    dump = createUserWithRole(3)
    return HttpResponse(dump, content_type='application/json')


def createUserWithRole(_email, _password, _first_name, _last_name, role):

    # email should be unique
    allUsers = User.objects.filter(email=_email)

    data = {'success': '0', 'message': 'Failed.'}

    if len(allUsers) == 0:

        user = User(
            email=_email,
            password=_password,
            first_name=_first_name,
            last_name=_last_name,
            is_active=0,
            role=3,
            date_joined=timezone.now(),
        )

        user.save()
        data = {'success': '0', 'message': 'Successful.'}
    else:
        data = {
            'success': '0',
            'message': 'User with this email already exists!! try another email address.'
        }

    return json.dumps(data)


def getUserWithRole(email, password, _role):

    # get all authors
    authors = User.objects.filter(role=_role)

    data = {
        'success': '0',
        'message': 'Invalid email or password'
    }

    for i in authors:
        if i.email == email and i.password == password:
            if i.is_active == 0:
                data = {
                    'success': '0',
                    'message': 'User is not active'
                }
            else:
                data = {
                    'success': '1',
                    'message': 'Successful',
                    'data': {
                        'first_name': i.first_name,
                        'last_name': i.last_name,
                        'email': i.email,
                        'date_joined': str(i.date_joined),
                        'role': getUserRoleText(i.role),
                        'is_active': i.is_active
                    }
                }

    return json.dumps(data)


def getUserRoleText(role):

    if role == 1:
        return "Admin"
    elif role == 2:
        return "Blog Author"

    return "Guest"


def ActivateUser(request):

    adminID = request.POST.get("adminID")
    userID = request.POST.get("userID")

    isAdmin = User.objects.filter(id=adminID).filter(role=1)

    if(len(isAdmin) == 1):
        _user = User.objects.get(id=userID)
        if _user.is_active:
            data = {'success': '0', 'message': 'User is already active.'}
        else:
            _user.is_active = 1
            _user.save()

            author = Author(user=_user, city=None, country=None,
                            active_on=timezone.now())
            author.save()

            data = {'success': '1', 'message': 'Successful.'}
    else:
        data = {
            'success': '0',
            'message': 'You are not the admin.'
        }

    dump = json.dumps(data)
    return HttpResponse(dump, content_type='application/json')


def ActivatePost(request):

    adminID = request.POST.get("adminID")
    postID = request.POST.get("postID")
    description = request.POST.get("description")

    isAdmin = User.objects.filter(id=adminID).filter(role=1)

    if(len(isAdmin) == 1):
        _post = Article.objects.get(id=postID)

        _status = Status.objects.get(article=_post)

        if _status.status == "Approved":
            data = {'success': '0', 'message': 'Post is already active.'}
        else:
            _status.status = "Approved"
            _status.action_date = timezone.now()
            _status.description = description
            _status.save()

            data = {'success': '1', 'message': 'Successful.'}
    else:
        data = {
            'success': '0',
            'message': 'You are not the admin.'
        }

    dump = json.dumps(data)
    return HttpResponse(dump, content_type='application/json')
