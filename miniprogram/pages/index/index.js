
Page({
  inputValue: '',
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  data: {
    user: '',
    // 索引
    list_item: [
      { "url": "xx", "name": "Django", "url1": "xx", "name1": "Redis", "url2": "xx", "name2": "Mysql", "url3": "xx", "name3": "Vue"},
      { "url": "xx", "name": "Mysql", "url1": "xx", "name1": "Node.JS", "url2": "xx", "name2": "LInux", "url3": "Apche", "name3": "PHP" },
      { "url": "xx", "name": "C", "url1": "xx", "name1": "C++", "url2": "JAVA", "name2": "C#", "url3": "xx", "name3": "AI" },
  ],
  collection_video_list:[],
  my_care_user_list:[],
  selectAllStatus:false,
  all_collection:'',
  my_care_videl_list: [],
  my_pub_video_list:[],
  // 数据
  all_pub_video:[],
  // 初始化显示
    main_show: true,
    comment:false,
    myrecom:false,
    all_pub:true,
    my_pub:false,
    my_care:false,
    colection:true,
    setting:false,
    person_show: false,
    share_show: false,
    colection_show:false,
    viedo_list_show :true,

    // 个人中心
    all_comment_num:'',
    isShowConfirm_name: false,
    change_info: false,
    isShowConfirm_sign: false,
    person_name: "新用户",
    person_sign: '说的什么吧',
    user_img: '',
    nickname: '',
    isShowConfirm_head_img: false,
    main_person:true,
    my_care_show:false,
    py_pub_video_show:false,
    my_pub_person_page_show:false,
    sign_dao:'',
    care:'',
    my_pub:'',
    my_care:'',
    curret_video:'',
  // 轮播图
    indicatorDots: true,
    indicatorDots1: false,
    vertical: false,
    autoplay: true,
    circular: false,
    autoplay1:true,
    interval: 2000,
    interval1: 4000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,

    // 下拉
    agree:false,
    selectShow: false,//初始option不显示
    nowText: "请选择视频类型",//初始内容
    animationData: {},//右边箭头的动画
    propArray: [{ "text": "Python" }, { "text": "Html" }, { "text": "Css" }, { "text": "JavaScript" }, { "text": "Jquery" }, { "text": "Dango" }, { "text": "Mysql" }, { "text": "Vue" }, { "text": "React" }, { "text": "Bootstrap" }, { "text": "Pandas" }, { "text": "Natplotlob" }, { "text": "Numpy" }, { "text": "Flask" }, { "text": "Linux" }, { "text": "Node" }, { "text": "JAva" },],
    // 视频上传
    video_url:'',
  },
  // 显示函数
  mainclick:function(){
      this.setData({
      main_show:true,
      colection_show:false,
      person_show:false,
      share_show:false
      })
  },
  shareclick: function () {
    var than=this
    wx.request({
      url: 'http://127.0.0.1:80/all_pub/',
      success(res) {
        than.setData({
          all_pub_video: res.data.data
        })
      }
    })
    this.setData({
    main_show:false,
    colection_show:false,
    person_show :false,
   share_show:true
    })
  },
  get_video_show(){
    this.setData({
      my_pub:false,
      viedo_list_show:true,
    })
  },
  get_my_pub(){
    this.setData({
      my_pub: true,
      viedo_list_show: false,
    })
  },
  colectionclick: function () {
    this.get_collection_video()
    this.setData({
      main_show: false,
      colection_show: true,
      person_show: false,
      share_show: false
    })
  },
 personclick: function () {
   var than=this
   wx.request({
     url: 'http://127.0.0.1:80/get_info/',
     data: {
       user: than.data.user
     },
     success(res) {
       if (res.data == "No") {
         than.setData({
           user_img: "../../images/user_head.png",
         })
       }
       else {
         than.setData({
           person_name: res.data.name,
           person_sign: res.data.sign_info,
           user_img: res.data.head_img,
           care:res.data.my_care,
           sign_dao:res.data.sign_num,
           my_pub:res.data.pub_num,
         })
       }
     }
   })
   this.setData({
     main_show: false,
     colection_show: false,
     person_show: true,
     share_show: false
   })
  },
  get_all_pub: function () {
    this.setData({
      all_pub:true,
      my_care:false
    })
  },
  get_my_care: function () {
    var than = this
    wx.request({
      url: 'http://127.0.0.1:80/my_care_pub/',
      method: "POST",
      data: {
        user: than.data.user,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
     
        than.setData({
          all_pub: false,
          my_care_videl_list:res.data.data,
          my_care: true
        })
      }
    })
  },
  get_comment_show(event){
    var than=this
    const pub = event.currentTarget.dataset.pub
    than.setData({curret_video:pub})
    wx.request({
      url: 'http://127.0.0.1:80/get_comment/',
       method:"POST",
       data:{
         pub:pub,
       },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        than.setData({
          comment: true,
          all_comment_num:res.data.all_comment_num,
          user_comment_info: res.data.list,
        })
        
      }
    })
    
  },
  get_comment_hide() {
    var than=this
    wx.request({
      url: 'http://127.0.0.1:80/all_pub/',
      success(res) {
        than.setData({
          all_pub_video: res.data.data
        })

      }
    })
    this.setData({
      comment: false
    })
  },
  get_my_recom(){
    this.setData({
      myrecom:!this.data.myrecom,
    })

  },
  get_settings(){
    this.setData({
      setting:!this.data.setting,
    })
  },
  // 初始化数据
 
  onLoad: function (options) {
    var than = this
    than.setData({
      user: options.user
    })
    
  },
  

  // 下拉
  selectToggle: function () {
    var nowShow = this.data.selectShow;//获取当前option显示的状态
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(0).step();
      this.setData({
        animationData: animation.export()
      })
    } else {
      animation.rotate(180).step();
      this.setData({
        animationData: animation.export()
      })
    }
    this.setData({
      selectShow: !nowShow
    })
  },
  setText: function (e) {
    var nowData = this.properties.propArray;
    var nowIdx = e.target.dataset.index;
    var nowText = nowData[nowIdx].text;
    this.animation.rotate(0).step();
    this.setData({
      selectShow: false,
      nowText: nowText,
      animationData: this.animation.export()
    })
  },
  // 上传视频
  chooseVideo: function () {
    var that = this
    wx.chooseVideo({
      success: function (res) {
       
        that.setData({
          video_url: res.tempFilePath,
        })
        wx.showToast({
          title:'加载成功',
          duration: 1000,
          mask: true,
          icon: 'none'
        })
      },
      error:function(res){
        wx.showToast({
          title: '加载失败',
          duration: 1000,
          mask: true,
          icon: 'none'
        })
        }
    })
  },

  // 个人中
  cancel: function () {
    var that = this
    that.setData({
      isShowConfirm_name: false,
      isShowConfirm_sign: false,
      isShowConfirm_head_img: false,
    })
  },
  get_sign() {
    this.setData({
      isShowConfirm_sign: true,

    })
  },
  get_name() {
    this.setData({
      isShowConfirm_name: true,

    })
  },
  get_head_img() {
    this.setData({
      isShowConfirm_head_img: true,
    })
  },
  get_sign_info(e) {
    this.setData({
      person_sign: e.detail.value.user_sign,
    })
  },
  get_name_info(e) {
    this.setData({
      person_name: e.detail.value.user_name,
    })
  },
  // 修改信息
  get_change_info(){
    var than=this
    wx.uploadFile({
      url: 'http://127.0.0.1:80/change_info/',
      filePath:than.data.user_img,
      name: 'url',
      formData: {
        user:than.data.user,
        person_name:than.data.person_name,
        person_sign:than.data.person_sign,
      },
      success(res) {
        const data = res.data
        if(data=='Ok'){
          wx.showToast({
            title: '修改成功',
            duration: 2000,
          })
        }
      }
    })
  },
  upShopLogo: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "red",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageShop('album');//从相册中选择
          } else if (res.tapIndex == 1) {
            that.chooseWxImageShop('camera');//手机拍照
          }
        }
      }
    })
  },
  chooseWxImageShop: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        that.setData({
          user_img: res.tempFilePaths[0]
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  get_change(){
    this.setData({
      main_person:false,
      change_info:true,
    })
  },
  get_main_person()
  {
    this.setData({
      main_person: true,
      change_info: false,
      setting:false,
    })
  },
  // 签到
  get_sign_fun_(){
    var than=this
    wx.request({
      url: 'http://127.0.0.1:80/get_sign/',
      data: {
        user: than.data.user,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res.data)
        if(res.data=='have'){
          wx.showToast({
            title: '今天已经签到',
            icon: 'none',
            duration: 2000
          })
        }
        if(res.data=='Ok'){ 
          than.personclick()
          wx.showToast({
            title: '签到成功',
            icon: 'success',
            duration: 2000
          })}
        
      }
    })
    
  },
  // 我的发布
  get_py_pub_video_show(){
    var than=this
    wx.request({
      url: 'http://127.0.0.1:80/get_my_pub/',
      data: {
        user: than.data.user,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        than.setData({
          my_pub_video_list:res.data.data,
          py_pub_video_show: true,
          main_person: false,
        })
      }
    })
    
  },
  get_main_person_show(){
    this.setData({
      py_pub_video_show: false,
      main_person: true,
      my_care_show:false,
    })
  },
  get_my_pub_person(){

    this.setData({
    my_pub_person_page_show:true,
    py_pub_video_show:false,
    })
  },
  get_my_pub_show(){
    var than=this
    than.get_py_pub_video_show()
    this.setData({
      py_pub_video_show: true,
      my_pub_person_page_show: false,
    })
  },
  get_my_care_show(){
    var than = this
    wx.request({
      url: 'http://127.0.0.1:80/get_care_list/',
      method: "POST",
      data: {
        user: than.data.user,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res.data)
        console.log(res.data)
        than.setData({
          all_pub: false,
          my_care: true,
          my_care_user_list:res.data.data,
        })
      }
    })
    than.setData({
      main_person: false,
      my_care_show: true,
    })
  },

  // 发布功能
  get_pub:function(e){
    var than=this;
    if (e.detail.value.name == '')
    {
      wx.showToast({
        title: '名称不能为空',
        duration: 2000,
        icon: 'none'
      });
    }
    else if (than.data.nowText == "请选择视频类型"){
      wx.showToast({
        title: '请选择视频类型',
        duration: 1000,
        mask: true,
        icon: 'none'
      })
    }
    else if (e.detail.value.intro == '') {
      wx.showToast({
        title: '介绍不能为空',
        duration: 1000,
        mask: true,
        icon: 'none'
      })
    }
    else if (than.data.agree ==false) {
      wx.showToast({
        title: '请勾选夜夜Py协议',
        duration: 1000,
        mask: true,
        icon: 'none'
      })
    }
    else if (this.data.video_url==''){
      wx.showToast({
        title: '请选择视频',
        duration: 1000,
        mask: true,
        icon: 'none'
      })
    }
    else{
      var title=e.detail.value.name;
      var type=than.data.nowText;
      var url=than.data.video_url;
      var intro=e.detail.value.intro;
  
      wx.uploadFile({
        url: 'http://127.0.0.1:80/pub/',
        filePath: url,
        name: 'url',
        formData: {
            user: than.data.user,
            title: title,
            type: type,
            introduce: intro,
        },
        success(res) {
          const data = res.data
          if (data =='Ok'){
            wx:wx.showToast({
              title: '发布成功',
              duration: 2000,
            })
          }
          if (data == 'No') {
            wx: wx.showToast({
              title: '服务器开小差了',
              duration: 2000,
            })
          }
        }
      })
    }
  },
  // 同意规则
  checkboxChange(){
    this.setData({
      agree: !this.data.agree,
    })
  },
  //关注用户
  get_care_user:function(event) {
    var than=this;

    const users = event.currentTarget.dataset.user
    wx.request({
      url: 'http://127.0.0.1:80/get_care/',
      method:'POST',
      data:{
        user:than.data.user,
        care_user:users,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        if(res.data=='person'){
          wx.showToast({
            title: '这是你的发布的呀',
            icon:'none',
            duration:2000,
          })
        }
        if (res.data == 'have') {
          wx.showToast({
            title: '你已经关注过了',
            icon: 'none',
            duration: 2000,
          })
        }
        if (res.data == 'Ok') {
          wx.showToast({
            title: '关注成功',
            icon: 'none',
            duration: 2000,
          })
        }
      }
    })
  },
  // 分享
  get_share: function (event) {
    var than = this;
    const pub_user= event.currentTarget.dataset.user
    const pub = event.currentTarget.dataset.pub
    wx.request({
      url: 'http://127.0.0.1:80/get_share/',
      method: 'POST',
      data: {
        user: than.data.user,
        pub: pub,
        care_user:pub_user
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data == 'person') {
          wx.showToast({
            title: '这是你的发布的呀',
            icon: 'none',
            duration: 2000,
          })
        }
        if (res.data == 'have') {
          wx.showToast({
            title: '你已经转发过了',
            icon: 'none',
            duration: 2000,
          })
        }
        if (res.data == 'Ok') {
          wx.showToast({
            title: '转发成功',
            icon: 'none',
            duration: 2000,
          })
        }
      }
    })
  },
  // 发布评论
  get_pub_comment:function(e){
    const comment_info=e.detail.value.word
    var than=this
    const user=than.data.user
    const curret_video = than.data.curret_video

    wx.request({
      url: 'http://127.0.0.1:80/pub_comment/',
      method: "POST",
      data: {
        pub: curret_video,
        user:user,
        comment_info:comment_info,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if(res.data=='Ok'){
          wx.request({
            url: 'http://127.0.0.1:80/get_comment/',
            method: "POST",
            data: {
              pub: curret_video,
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success(res) {
              than.setData({
                all_comment_num: res.data.all_comment_num,
                user_comment_info: res.data.list,
              })

            }
          })
        }
      }
    })
  },
  // 赞
  get_good: function (event){
    var than = this;
    const pub_user = event.currentTarget.dataset.user
    const pub = event.currentTarget.dataset.pub
    wx.request({
      url: 'http://127.0.0.1:80/get_good/',
      method: 'POST',
      data: {
        user: than.data.user,
        pub: pub,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data == 'have') {
          wx.showToast({
            title: '你已经赞过了',
            icon: 'none',
            duration: 2000,
          })
        }
        if (res.data == 'Ok') {
          wx.showToast({
            title: '点赞成功',
            icon: 'none',
            duration: 2000,
          })
          wx.request({
            url: 'http://127.0.0.1:80/all_pub/',
            success(res) {
              than.setData({
                all_pub_video: res.data.data
              })
            }
          })
        }
      }
    })
  },
  // 收藏的
 get_collection_video(){
   var than=this
  
   wx.request({
     url:'http://127.0.0.1:80/get_collection/',
     data:{
       user:than.data.user
     },
     method: 'POST',
     header: {
       "Content-Type": "application/x-www-form-urlencoded"
     },
     
     success(res) {
       
        than.setData({
          collection_video_list:res.data.data,
          all_collection:res.data.all_c,
        })
     },
   })
 },
  checkboxChange1:function(e){
    var than=this
    const index = e.currentTarget.dataset.index;  
    let carts = than.data.collection_video_list;                   
    const checked = carts[index].checked;   
    carts[index].checked = !checked; 
    than.setData({
      collection_video_list: carts
    });
  },
  get_delete_c(){
    var mycars = new Array()
    var than=this    
    var collection_video_list = this.data.collection_video_list
    for (var i = 0; i < collection_video_list.length;i++)
    {
      const checked = collection_video_list[i].checked;
      if (collection_video_list[i].checked==true)
      {
        mycars[i] = collection_video_list[i].id;
      }
    }
    if(mycars.length==0){
      wx:wx.showToast({
        title: '未选择任何视频',
        icon: 'none',
        duration: 1000,
      })
    }
    wx.request({
      url: 'http://127.0.0.1:80/get_delete_care_video/',
      data: {
        data: mycars
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if(res.data=='Ok'){
          wx: wx.showToast({
            title: '删除成功',
            icon: 'none',
            duration: 1000,
          })
          than.get_collection_video()
        }
      }
    })
   
  },
  get_check_all(){
    var than = this
    than.setData({
      selectAllStatus:!than.data.selectAllStatus
    })
    const all = than.data.selectAllStatus;
    var collection_video_list = than.data.collection_video_list
    for (var i = 0; i < collection_video_list.length; i++) {
      if (collection_video_list[i].checked=all)
      {   
      }
      else{
        collection_video_list[i].checked = all;
      }
    }
    than.setData({
      collection_video_list: collection_video_list
    })
  },
  get_delete_my_care_user:function(e){
    var than=this;
    var care_user=e.currentTarget.dataset.index;
    wx.request({
      url: 'http://127.0.0.1:80/get_delete_my_care_user/',
      data: {
        user:than.data.user,
        care_user:care_user,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data == 'Ok') {
          wx: wx.showToast({
            title: '删除成功',
            icon: 'none',
            duration: 1000,
          })
          than.get_my_care_show()
        }
      }
    })
  },
  delete_my_pub:function(e){
    var than=this
    var video=e.currentTarget.dataset.index;
    console.log(video)
      wx.request({
        url: 'http://127.0.0.1:80/get_delete_my_pub_video/',
        data: {
          id:video
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(res) {
          if (res.data == 'Ok') {
            wx: wx.showToast({
              title: '删除成功',
              icon: 'none',
              duration: 1000,
            })
            than.get_py_pub_video_show()
          }
        }
      })
  }
})