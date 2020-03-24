
Page({

  data: {
    isShowConfirm_name:false,
    change_info:false,
    isShowConfirm_sign:false,
    person_name:"1",
    person_sign:'',
    user_img:'../../images/user_head.png',
    nickname: '',
    isShowConfirm_head_img:false,

  },

  cancel: function () {
    var that = this
    that.setData({
      isShowConfirm_name: false,
      isShowConfirm_sign: false,
      isShowConfirm_head_img:false,
    })
  },
  get_sign(){
    this.setData({
      isShowConfirm_sign: true,
     
    })
  },
  get_name(){
    this.setData({
      isShowConfirm_name: true,
  
    })
  },
  get_head_img() {
    this.setData({
      isShowConfirm_head_img: true,

    })
  },
  get_sign_info(e){
    this.setData({
      person_sign:e.detail.value.user_sign,
    })
  },
  get_name_info(e) {
    this.setData({
      person_name: e.detail.value.user_name,
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
  get_head_img_fun(){
       that.upload_file(urldate.upimg + 'shop/shopIcon', this.data.user_img)
  },
  upload_file: function (url, filePath) {
    var that = this;
    var signature = signa.signaturetik('token=' + token, 'userAccessToken=' + userAccessToken, 'studentAccessToken=' + studentAccessToken);
    wx.uploadFile({
      url: urldate.upimg,
      filePath: filePath,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      }, // 设置请求的 header
      formData: {//需要的参数
        'token': token,
        'signature': signature,
        'userAccessToken': userAccessToken,
        'studentAccessToken': studentAccessToken
      }, // HTTP 请求中其他额外的 form data
      success: function (res) {
        var data = JSON.parse(res.data);
        that.setData({
          userimg: data.path,
        });
        that.showMessage('上传成功');
      },
      fail: function (res) {
      }
    })
  },
})