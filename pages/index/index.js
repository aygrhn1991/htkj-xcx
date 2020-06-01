const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    result: null,
    openid: null,
    intxt: null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  intxt: function (e) {
    this.setData({
      intxt: e.detail.value
    })
  },
  addJob: function () {
    wx.navigateTo({
      url: '../modules/addjob/addjob'
    })
    // console.log(this.data.intxt)
    // wx.request({
    //   url: 'https://wx2.fenglingtime.com/api/addJob/' + wx.getStorageSync('openid'),
    //   success: res => {
    //     console.log(res);
    //     if (res.data.result == 'ok') {
    //       this.setData({
    //         result: '申报成功'
    //       })
    //     }
    //   }
    // })
  },
  onLoad: function () {
    // 登录
    // wx.login({
    //   success: res => {
    //     wx.request({
    //       url: 'https://wx2.fenglingtime.com/api/checkUser/' + res.code,
    //       success: res => {
    //         console.log('openid',res.data.openid);
    //         app.globalData.openid = res.data.openid;
    //         if (!res.data.user) {
    //           wx.redirectTo({
    //             url: '../register/register'
    //           })
    //         } else {
    //           console.log('用户存在');
    //         }
    //       }
    //     })
    //   }
    // })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,

      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
