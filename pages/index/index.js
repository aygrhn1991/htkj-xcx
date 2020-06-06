Page({
  data: {
    user: null,
    userState: null,
    userStateInfo: null
  },
  gotoAddJob: function () {
    wx.navigateTo({
      url: '../modules/addjob/addjob/addjob'
    })
  },
  onLoad: function () {
    wx.login({
      success: res => {
        wx.request({
          url: 'https://wx2.fenglingtime.com/auth/login/' + res.code,
          success: res => {
            this.setData({
              userState: res.data.data.state
            });
            getApp().globalData.openid = res.data.data.openid;
            switch (this.data.userState) {
              case 0:
                wx.redirectTo({
                  url: '../register/register'
                });
                break;
              case 1:
                this.setData({
                  userStateInfo: res.data.message
                });
                break;
              case 2:
                this.setData({
                  user: res.data.data.data
                })
              case 3:
                this.setData({
                  userStateInfo: res.data.message
                });
            }
          }
        })
      }
    })
  },
})
