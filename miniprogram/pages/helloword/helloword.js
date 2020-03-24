Page({

  data: {
    user:''
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
          if (res.data =='Ok') {
            wx: wx.showToast({
              title: '邮箱不存在',
              duration: 2000,
              mask: true,
              icon:'none'
            })
          }
        
        },
        
      })
    }


  },
  get_login: function (e) {
    var that = this;
    var name=e.detail.value.email;
    var password = e.detail.value.password;
    if(name==''){
      wx: wx.showToast({
        title: '请输入邮箱',
        duration: 1000,
        mask: true,
        icon: 'none',
      })
    }
    else if(password==''){
      wx: wx.showToast({
        title: '请输入密码',
        duration: 1000,
        mask: true,
        icon: 'none',
      })
    }
    else{
      wx.request({
        url: 'http://127.0.0.1:80/login/',
        method: "GET",
        data: {username:name,password:password},
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
     
          if (res.data.data =='No'){
            wx: wx.showToast({
              title: '密码错误',
              duration: 1000,
              mask: true,
              icon:'none',
            })
          }
          else if (res.data.data =='Ok'){
            wx.showLoading({
              title: '加载中',
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 2000)
            wx.navigateTo({
              url:'../../pages/index/index?user='+ res.data.user});
          }
          
        },
        fail(res) {
          wx.showToast({
            title: '服务器开小差了',
            icon: "none",
            duration: 2000,
          })
        }

      })
    }
  },
  
})