import datetime
import os
import random
import shutil

from django.contrib.auth.handlers.modwsgi import check_password
from django.contrib.auth.hashers import make_password
from django.db.models import F
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from yeyepy.models import User, Pub, User_info, User_care, Sign_dao, Comment, Good_video


def a(request):
    a1=User_info.objects.get(id=1)
    p=a1.head_img
    print(p)
    os.remove('media/'+'heads/20200322203959/wx70684121b6f06909.o6zAJsy4eif3mziRsfr4gD_DGXiU.JqQXCiIA74567d1b297_rOCTYk4.png')
    return HttpResponse(33)
def login(request):
    name=request.GET.get("username")
    password=request.GET.get("password")
    p=User.objects.get(username=name)
    passwd = make_password(password, 'a', 'pbkdf2_sha1')
    if passwd==p.password:
        user = make_password(p.username, 'a', 'pbkdf2_sha1')
        return JsonResponse({'user':user,'data':'Ok'})
    else:
        print('eeeee')
        return HttpResponse("No")
def get_ma(request):
    ma=random.randint(1000,9999)
    print(ma)
    return HttpResponse(ma)
def get_have_email(request):
    if request.method=='GET':
        email=request.GET.get("email")
        e=User.objects.filter(username=email)
        if len(e)==0:
            return HttpResponse("Ok")
        if len(e) == 1:
            return HttpResponse("No")
def signin(request):
    if request.method == "GET":
        name = request.GET.get("username")
        password = request.GET.get("password")
        password= make_password(password, 'a', 'pbkdf2_sha1')
        try:
            a=User(username=name, password=password)
            a.save()
            p=User.objects.get(username=name)
            b = User_info(name='新用户',sex='1',head_img='heads/20200323113213/wx70684121b6f06909.o6zAJsy4eif3mziRsfr4gD_DGXiU.blkPWvdpK3e77d1b297_G5dAjyg.png',sign_info='说的什么吧',
                          cares='',sign_dao='',my_care='',user=p)
            b.save()
            return HttpResponse("Ok")
        except  Exception as e:
            print(e)
            return HttpResponse(str(e)+"No")
def get_forget(request):
    name = request.GET.get("username")
    password = request.GET.get("password")
    try:
        user=User.objects.get(username=name)
        user.password=password
        user.save()
        return HttpResponse("Ok")
    except:
        return HttpResponse("No")
def get_info(request):
    num=0
    user_key=request.GET.get('user')
    try:
        key=User.objects.all()
        for i in range(len(key)):
            user = make_password(key[i].username, 'a', 'pbkdf2_sha1')
            print(user, user_key)
            if user == user_key + '=':
                usert = User.objects.get(username=key[i].username)
                i=User_info.objects.get(user=usert)
                data={
                    'care':len(User_care.objects.filter(cares=usert)),
                    'my_care':len(User_care.objects.filter(user=usert)),
                    'pub_num':len(Pub.objects.filter(user=usert).filter(key='1')),
                    'sign_num':len(Sign_dao.objects.filter(user=usert)),
                    'name':i.name,
                    'sex':i.sex,
                    'sign_info':i.sign_info,
                    'head_img':'http://127.0.0.1/all_pub/media/'+str(i.head_img)
                }
                return JsonResponse(data)
            else:
                num += 1
            if num == len(key):
                return HttpResponse("No")
    except Exception as e:
        print(e)
        return HttpResponse("No")
def change_info(request):
    num=0
    if request.method=='POST':
        user_key=request.POST.get('user')
        key=User.objects.all()
        user_img = request.FILES.get("url")
        person_sign = request.POST.get("person_sign")
        person_name = request.POST.get("person_name")
        for i in range(len(key)):
            user = make_password(key[i].username, 'a', 'pbkdf2_sha1')
            print(user, user_key)
            if user == user_key + '=':
                usert = User.objects.get(username=key[i].username)
                a = User_info.objects.get(user=usert)
                path = a.head_img
                if not os.path.exists('media/' + str(path)) or path=='':
                    pass
                else:
                    files=str(path).split('/')[1]
                    os.remove('media/' + str(path))
                    os.removedirs('media/heads/' + str(files))
                a.name = person_name
                a.head_img = user_img
                a.sign_info = person_sign
                a.save()
                return HttpResponse("Ok")
            else:
                num += 1
            if num == len(key):
                return HttpResponse("No")

def get_care(request):
    num=0
    if request.method == 'POST':
        user_key = request.POST.get('user')
        key = User.objects.all()
        care_user=request.POST.get('care_user')
        for i in range(len(key)):
            user = make_password(key[i].username, 'a', 'pbkdf2_sha1')
            if user == user_key + '=':
                usert = User.objects.get(username=key[i].username)
                print(care_user, usert.id)
                if int(care_user)==int((usert.id)):
                    return HttpResponse("person")
                elif(len(User_care.objects.filter(cares=care_user).filter(user=usert)))!=0:

                    return HttpResponse("have")
                else:
                    care_ok=User_care(user=usert,cares=care_user,time=getLastDate())
                    care_ok.save()
                    return HttpResponse("Ok")
            else:
                num += 1
            if num == len(key):
                return HttpResponse("No")
def get_share(request):
    num=0
    if request.method == 'POST':
        user_key = request.POST.get('user')
        key = User.objects.all()
        pub=request.POST.get('pub')
        care_user=request.POST.get('care_user')
        video = Pub.objects.get(id=pub)
        for i in range(len(key)):
            user = make_password(key[i].username, 'a', 'pbkdf2_sha1')
            if user == user_key + '=':
                usert = User.objects.get(username=key[i].username)
                if int(care_user)==int((usert.id)):
                    return HttpResponse("person")
                elif len(Pub.objects.filter(url=video.url).filter(user=usert))!=0:
                    return HttpResponse("have")
                else:
                    care_ok= Pub(user=usert, title= video.title, type=video.type, url=video.url, introduce=video.introduce, time=getLastDate(),key='2')
                    care_ok.save()
                    return HttpResponse("Ok")
            else:
                num += 1
            if num == len(key):
                return HttpResponse("No")
def get_comment(request):
    if request.method=='POST':
        pub=request.POST.get('pub')
        list=[]
        cs=Comment.objects.filter(pubs=pub).order_by(F('id').desc()).values()
        print(cs)
        for c in cs:
            data={
                "info":c['info'],
                'time':getLastDate(),
                'head_img':'http://127.0.0.1/all_pub/media/'+ str(User_info.objects.get(user=c['User_id']).head_img),
                'name':User_info.objects.get(user=c['User_id']).name,
            }
            list.append(data)
        return JsonResponse({'all_comment_num':len(cs),"list":list})
def pub_comment(request):
    num = 0
    if request.method == 'POST':
        user_key = request.POST.get('user')
        key = User.objects.all()
        pub = request.POST.get('pub')
        comment_info= request.POST.get('comment_info')
        for i in range(len(key)):
            user = make_password(key[i].username, 'a', 'pbkdf2_sha1')
            if user == user_key + '=':
                usert = User.objects.get(username=key[i].username)
                video=Pub.objects.get(id=pub)
                time=getLastDate()
                info=comment_info
                p=Comment(User=usert,pubs=video,time=time,info=info)
                p.save()
                return HttpResponse("Ok")
            else:
                num += 1
            if num == len(key):
                return HttpResponse("No")
def all_pub(request):
    try:
        list=[]
        depot = Pub.objects.all().order_by(F('id').desc()).values()
        for i in depot:
            print(i)
            if i['url']=='':
                pass
            else:
                data={
                    "user_name":User_info.objects.get(id=i['user_id']).name,
                      }
                i.update(data)
                i['url']='http://127.0.0.1/all_pub/media/'+i['url']
                i['comments']=len(Comment.objects.filter(pubs=i['id']))
                i['share']=len(Pub.objects.filter(url=i['url']))
                i['good'] = len(Good_video.objects.filter(pub=i['id']))
                list.append(i)
        return JsonResponse({'success': True, 'data':list})
    except Exception as e:
        print(e)
        return JsonResponse({'success': False, 'data': str(e)})


def getLastDate():
    return datetime.datetime.now().strftime('%Y-%m-%d')
def pub(request):
    if request.method=='POST':
        title = request.POST.get("title")
        type = request.POST.get("type")
        url = request.FILES.get("url")
        time = getLastDate()
        introduce = request.POST.get("introduce")
        user_key = request.POST.get('user')
        key = User.objects.all()
        num=0
        for i in range(len(key)):
            user = make_password(key[i].username, 'a', 'pbkdf2_sha1')
            if user == user_key+'=':
                usert = User.objects.get(username=key[i].username)
                p = Pub(user=usert, title=title, type=type, url=url, introduce=introduce, time=time,key='1')
                p.save()
                return HttpResponse("Ok")
            else:
                num+=1
            if num==len(key):
                return HttpResponse("No")

def get_good(request):
    num = 0
    if request.method == 'POST':
        user_key = request.POST.get('user')
        key = User.objects.all()
        pub = request.POST.get('pub')
        p=Pub.objects.get(id=pub)
        for i in range(len(key)):
            user = make_password(key[i].username, 'a', 'pbkdf2_sha1')
            if user == user_key + '=':
                usert = User.objects.get(username=key[i].username)
                if len(Good_video.objects.filter(user=usert).filter(pub=p))!=0:
                    return HttpResponse("have")
                else:
                    g=Good_video(user=usert,pub=p)
                    g.save()
                    return HttpResponse("Ok")
            else:
                num += 1
            if num == len(key):
                return HttpResponse("No")

def my_care_pub(request):
    num = 0
    care_user_list=[]
    list=[]
    if request.method == 'POST':
        user_key = request.POST.get('user')
        key = User.objects.all()
        for i in range(len(key)):
            user = make_password(key[i].username, 'a', 'pbkdf2_sha1')
            if user == user_key + '=':
                usert = User.objects.get(username=key[i].username)
                care_user=User_care.objects.filter(user=usert)
                for i1 in care_user:
                    care_user_list.append(i1.cares)
            else:
                num += 1
            if num == len(key):
                return HttpResponse("No")
        for l in care_user_list:
            temp= Pub.objects.filter(user=User.objects.get(id=l)).order_by(F('id').desc()).values()
            for i in temp:
                if i['url'] == '':
                    pass
                else:
                    data = {
                        "user_name": User_info.objects.get(id=i['user_id']).name,
                    }
                    i.update(data)
                    i['url'] = 'http://127.0.0.1/all_pub/media/' + i['url']
                    i['comments'] = len(Comment.objects.filter(pubs=i['id']))
                    i['share'] = len(Pub.objects.filter(url=i['url']))
                    i['good'] = len(Good_video.objects.filter(pub=i['id']))
                    list.append(i)
        return JsonResponse({'data':list})
def get_collection(request):
    num = 0
    care_user_list = []
    list = []
    if request.method == 'POST':
        user_key = request.POST.get('user')
        key = User.objects.all()
        for i in range(len(key)):
            user = make_password(key[i].username, 'a', 'pbkdf2_sha1')
            if user == user_key+"=":
                usert = User.objects.get(username=key[i].username)
                pos=Pub.objects.filter(user=usert,key='2')
                for i1 in pos:
                    care_user_list.append(i1.id)
            else:
                num += 1
            if num == len(key):
                return HttpResponse("No")
        for l in care_user_list:
            temp = Pub.objects.filter(id=l).order_by(F('id').desc()).values()
            for i in temp:
                if i['url'] == '':
                    pass
                else:
                    data = {
                        "user_name": User_info.objects.get(id=i['user_id']).name,
                        'checked': False,
                    }
                    i.update(data)
                    i['url'] = 'http://127.0.0.1/all_pub/media/' + i['url']
                    i['comments'] = len(Comment.objects.filter(pubs=i['id']))
                    i['share'] = len(Pub.objects.filter(url=i['url']))
                    i['good'] = len(Good_video.objects.filter(pub=i['id']))
                    list.append(i)
                    print(i)
        return JsonResponse({'data': list,'all_c':len(list)})
def get_delete_care_video(request):
    if  request.method=='POST':
        data=request.POST.get('data')
        for i in data.split(','):
            print(i)
            Pub.objects.get(id=int(i)).delete()
        return HttpResponse('Ok')
def get_care_list(request):
    num = 0
    all=[]
    times_list=[]
    care_user_list = []
    ids=[]
    if request.method == 'POST':
        user_key = request.POST.get('user')
        key = User.objects.all()
        for i in range(len(key)):
            user = make_password(key[i].username, 'a', 'pbkdf2_sha1')
            if user == user_key + "=":
                usert = User.objects.get(username=key[i].username)
                p=User_care.objects.filter(user=usert)
                for i in p:
                    care_user_list.append(i.cares)
                    times_list.append(i.time)
                    ids.append(i.id)
            else:
                num += 1
            if num == len(key):
                return HttpResponse("No")
        for l,t,d in zip(care_user_list,times_list,ids):
            temp = User_info.objects.filter(id=l).order_by(F('id').desc()).values()
            for i in temp:
                data = {
                    'id':d,
                    'time':t,
                    'name': i['name'],
                    'sex': i['sex'],
                    'head_img': 'http://127.0.0.1/all_pub/media/' + str(i['head_img'])
                }
                all.append(data)
        return JsonResponse({'data': all})
def get_delete_my_care_user(request):
    if request.method == 'POST':
        data = request.POST.get('care_user')
        User_care.objects.get(id=int(data)).delete()
        return HttpResponse('Ok')
def get_my_pub(request):
    num = 0
    care_user_list = []
    list = []
    if request.method == 'POST':
        user_key = request.POST.get('user')
        key = User.objects.all()
        for i in range(len(key)):
            user = make_password(key[i].username, 'a', 'pbkdf2_sha1')
            if user == user_key + "=":
                usert = User.objects.get(username=key[i].username)
                p=Pub.objects.filter(key='1').filter(user=usert)
                for i in p:
                    care_user_list.append(i.id)
            else:
                num += 1
            if num == len(key):
                return HttpResponse("No")
    for l in care_user_list:
        temp = Pub.objects.filter(id=l).order_by(F('id').desc()).values()
        for i in temp:
            print(i)
            if i['url'] == '':
                pass
            else:
                data = {
                    'id':l,
                }
                i.update(data)
                i['url'] = 'http://127.0.0.1/all_pub/media/' + i['url']
                i['comments'] = len(Comment.objects.filter(pubs=i['id']))
                i['share'] = len(Pub.objects.filter(url=i['url']))
                i['good'] = len(Good_video.objects.filter(pub=i['id']))
                list.append(i)
            print(i)
    return JsonResponse({'data': list, 'all_c': len(list)})
def get_delete_my_pub_video(request):
    if request.method == 'POST':
        data = request.POST.get('id')
        Good_video.objects.get(pub=data).delete()
        for i in Comment.objects.filter(pubs=data):
            i.delete()
        P=Pub.objects.get(id=data)
        P.delete()
        return HttpResponse('Ok')
def get_sign(request):
    num = 0
    time=getLastDate()
    if request.method == 'POST':
        user_key = request.POST.get('user')
        key = User.objects.all()
        for i in range(len(key)):
            user = make_password(key[i].username, 'a', 'pbkdf2_sha1')
            if user == user_key + "=":
                usert = User.objects.get(username=key[i].username)
                if len(Sign_dao.objects.filter(user=usert))==0:
                    l=Sign_dao(time=time,user=usert,sign_num='1')
                    l.save()
                    return HttpResponse('Ok')
                else:
                    l = Sign_dao.objects.get(user=usert)
                    if l.time==getLastDate():
                        return HttpResponse('have')
                    else:
                        l = Sign_dao(time=time, user=usert, sign_num='1')
                        l.save()
                        return HttpResponse('Ok')
            else:
                num += 1
            if num == len(key):
                return HttpResponse("No")

