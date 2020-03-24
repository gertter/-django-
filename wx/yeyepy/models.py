from django.db import models

class User(models.Model):
    username=models.EmailField("邮箱")
    password = models.CharField("密码", max_length=255)
    class Meta:
        db_table="User"
    def __str__(self):
        return self.username



class Pub(models.Model):
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    title=models.CharField("名称",max_length=20)
    type=models.CharField("类型",max_length=10)
    url=models.FileField(upload_to='files/%Y%m%d%H%M%S/')
    introduce=models.CharField("介绍",max_length=100)
    time=models.CharField("时间",max_length=20)
    good=models.CharField("赞",max_length=100,default='')
    share = models.CharField("分享", max_length=100,default='')
    comments = models.CharField("评论", max_length=100,default='')
    key= models.CharField("评论", max_length=1,default='')
    class Meta:
        db_table = "Video"

    def __str__(self):
        return self.title
class Comment(models.Model):
    info=models.CharField("时间",max_length=200,default='')
    time = models.CharField("时间", max_length=20,default='')
    User=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    pubs=models.ForeignKey(Pub,on_delete=models.SET_NULL,null=True)
    class Meta:
        db_table = "commnets"
    def __str__(self):
        return self.info
class User_info(models.Model):
    chooce={
        ('1','男'),
        ('2','女')
    }
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    name=models.CharField("名字",max_length=100)
    sex = models.CharField("性别",max_length=1,choices=chooce)
    head_img=models.FileField(upload_to='heads/%Y%m%d%H%M%S/')
    sign_info = models.CharField("sign",max_length=100)
    cares=models.CharField('关注',max_length=255,default='')
    sign_dao=models.CharField("签到",max_length=100,default='')
    my_pub = models.CharField('发布', max_length=255,default='')
    my_care = models.CharField('发布', max_length=255,default='')
    class Meta:
        db_table = "info"

    def __str__(self):
        return self.name
class User_care(models.Model):
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    cares=models.CharField('123',max_length=100,null=True)
    time = models.CharField('123', max_length=100, null=True)
    class Meta:
        db_table = "Care"
    def __str__(self):
        return self.user
class Sign_dao(models.Model):
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    sign_num=models.CharField('123',max_length=100,null=True)
    time = models.CharField('123', max_length=100, null=True)
    class Meta:
        db_table = "sing_dao"
    def __str__(self):
        return self.user
class Good_video(models.Model):
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    pub=models.ForeignKey(Pub,on_delete=models.SET_NULL,null=True)
    class Meta:
        db_table = "good"
    def __str__(self):
        return self.user
