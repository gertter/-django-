Page({
  data:{
    enter_password:false,
    ma: '',
    eamil_key:false,
    show_ok_btn: false,
    show_no_btn:true,
    text:'点击获取'
  },
  get_user_name_info: function (e) {
    var than = this;
    if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(e.detail.value))) {
      wx.showToast({
        title: '邮箱输入有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
    else {
      wx.request({
        url: 'http://localhost:80/get_have_email/', //仅为示例，并非真实的接口地址
        method: 'GET',
        data: {
          email: e.detail.value,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)
          if (res.data == 'Ok') {
            wx: wx.showToast({
              title: '邮箱不存在',
              duration: 2000,
              mask: true,
              icon: 'none'
            })
          }
          else if (res.data =="No"){
            than.setData({
              show_ok_btn: true,
              show_no_btn: false,
            })
           
          }

        },

      })
    }


  },
  pub_ma(){
      var a = 60;
      wx.showToast({
        title: '验证码已经发送',
        duration: 1000,
        icon: 'none',
        mask: true,
      })
      var than = this;
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
                ma: res.data,
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
  get_my_ma:function(e){
    var my_ma=e.detail.value;
    if ((my_ma.length==4)&&(my_ma!=this.data.ma)){
      wx:wx.showToast({
        title: '验证码错误',
        icon:'none',
        duration:1000,
      })
    }
    else if ((my_ma.length == 4) && (my_ma == this.data.ma)){
      this.setData({
        enter_password:true
      })
    }
  },
  get_email(){
    this.setData({
      eamil_key: true,
    })
  },
  get_forget:function(e){
    var that = this;
    var name = e.detail.value.email;
    var password = e.detail.value.password;
    var repassword = e.detail.value.repassword;
    if (password != repassword) {
      wx: wx.showToast({
        title: '两次密码不相同',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
    }
    if(password.length<6) {
      wx: wx.showToast({
        title: '密码不能小于6位数',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
    }
    else {
      wx.request({
        url: 'http://localhost:80/get_forget/',
        method: 'GET',
        data: {
          username: name,
          password: password,
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.data == 'Ok') {
            wx.showToast({
              title: '重置成功',
              icon: 'none',
              duration: 1000,
              mask: true,
            })
            wx.navigateTo({
              url: '../../pages/helloword/helloword' //目的页面url
            })
          }
          else {
            wx.showToast({
              title: '重置失败',
              icon: 'none',
              duration: 1000,
              mask: true,
            })
          }
        },

      })
    }
  }
})