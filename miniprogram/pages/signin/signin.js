Page({
  data:{
    mange_ma:'',
    ma:'',
    show_ok_btn:false,
    show_no_btn:true,
    eamil_key:false,
    'text':'点击获取',
    timer:'',
    ma_tg:false,
  },

  // 验证
  get_user_name_info:function(e){
    var than=this;
    if(!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(e.detail.value))){
      wx.showToast({
        title: '邮箱输入有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
    else{
      wx.request({
        url:'http://localhost:80/get_have_email/', //仅为示例，并非真实的接口地址
        method:'GET',
        data: {
          email:e.detail.value,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data =='Ok'){
            than.setData({ 
            show_no_btn:false, 
            show_ok_btn:true,
            })
          }
          else if (res.data =='No'){
            wx:wx.showToast({
              title: '邮箱已存在',
              duration:2000,
              icon:'none',
              mask: true,
            })
          }
          
        },
        
      })
    }
    
    
  },
  get_signin: function(e) {
    var that = this;
    var name = e.detail.value.email;
    var password = e.detail.value.password;
    var repassword= e.detail.value.repassword;
    var ma= e.detail.value.yanzhegnma;
    if(password!=repassword){
        wx:wx.showToast({
        title: '两次密码不相同',
        icon:'none',
        duration:1000,
        mask: true,
      })
    }
    else if (this.data.ma_tg==false){
      wx: wx.showToast({
        title: '验证未通过',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
    }
    else{
      wx.request({
        url: 'http://localhost:80/signin/', 
        method: 'GET',
        data:{
          username:name,
          password:password,
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if(res.data=='Ok'){
            wx.showToast({
              title: '注册成功',
              icon: 'none',
              duration: 2000,
              mask: true,
            })
            wx.navigateTo({
              url: '../../pages/helloword/helloword' //目的页面url
            })
          }
          else{
            wx.showToast({
              title: '注册失败',
              icon: 'none',
              duration: 2000,
              mask: true,
            })
          }
            
        }
        
  
      })
    }
    
  },
get_p(){
  var a=60;
  this.data.timer = setInterval(() => { //注意箭头函数！！
    this.setData({
      text: a
    });
    a-=1;
  }, 1000);
},
  // 发送验证码
  pub_ma(){
    var a = 60;
    wx.showToast({
      title: '验证码已经发送',
      duration: 1000,
      icon: 'none',
      mask: true,
    })
    var than=this;
    than.setData({
      show_ok_btn: false,
      show_no_btn: true,
    })
    this.data.timer = setInterval(() => { //注意箭头函数！！
      this.setData({
        text: a
      });
      if (a == 59) {
        wx.request({
          url: 'http://localhost:80/get_ma/', //仅为示例，并非真实的接口地址
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            than.setData({
              mange_ma: res,
            })
          },

        })
      }
      if (a == 0) {
        clearInterval(than.data.timer);
        than.setData({
          show_ok_btn: true,
          show_no_btn: false,
          text: '点击获取',
        })
      }
      a -= 1;
    }, 1000);
  
  },

  maInput:function(e){
    this.setData({
      ma:e.detail.value,

    })
  },
  get_yan:function(e){
    var ma=this.data.ma;
    var manage_ma = this.data.mange_ma;
    if (ma != manage_ma.data){
        wx: wx.showToast({
          title: '验证码错误',
          duration: 1000,
          mask: true,
        })
      }
    if (ma == manage_ma.data) {
      this.setData({
        ma_tg:true,
      })
    }
  },
  get_password:function(e){
    if(e.detail.value.length<6){
      wx.showToast({
        title: '密码不能小于6位',
        duration: 1000,
        icon:'none',
        mask: true,
      })
    }
  },
})