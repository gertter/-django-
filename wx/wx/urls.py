"""wx URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, re_path
from django.views.static import serve

from wx import settings
from yeyepy.views import login, get_ma, get_have_email, signin, get_forget, pub, all_pub, change_info, get_info, a, \
    get_care, get_comment, pub_comment, get_share, get_good, my_care_pub, get_collection, get_delete_care_video, \
    get_care_list, get_delete_my_care_user, get_my_pub, get_delete_my_pub_video, get_sign

urlpatterns = [
    url(r'^static/(?P<path>.*)$', serve,
        {'document_root': settings.STATIC_ROOT}, name='static'),
    re_path(r'media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    url(r'^media/(?P<path>.*)$', serve,
        {'document_root': settings.MEDIA_ROOT}, name='media'),
    path('admin/', admin.site.urls),
    path('login/',login),
    path('get_ma/',get_ma),
    path('get_have_email/',get_have_email),
    path('signin/',signin),
    path('get_forget/',get_forget),
    path('pub/',pub),
    path("all_pub/",all_pub),
    path('change_info/',change_info),
    path('get_info/',get_info),
    path('get_care/',get_care),
    path('get_comment/',get_comment),
    path('pub_comment/',pub_comment),
    path('get_share/',get_share),
    path('get_good/',get_good),
    path('my_care_pub/',my_care_pub),
    path('get_collection/',get_collection),
    path('get_delete_care_video/',get_delete_care_video),
    path('get_care_list/',get_care_list),
    path('get_delete_my_care_user/',get_delete_my_care_user),
    path('get_my_pub/',get_my_pub),
    path('get_delete_my_pub_video/', get_delete_my_pub_video),
    path('get_sign/',get_sign)
]
