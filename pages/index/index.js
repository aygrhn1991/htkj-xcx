Page({
    data: {
        user: null,
        userState: null,
        userStateInfo: null
    },
    gotoAddJob: function() {
        wx.navigateTo({ url: '../modules/addjob/addjob/addjob' })
    },
    onLoad: function() {
        wx.login({
            success: res => {
                wx.request({
                    url: getApp().globalData.host + '/auth/login/' + res.code,
                    success: res => {
                        if (res.data.success) {
                            getApp().globalData.user = res.data.data;
                            this.setData({
                                user: res.data.data,
                                userState: 2
                            })
                        } else {
                            if (res.data.data == 1 || res.data.data == 3) {
                                this.setData({
                                    userState: res.data.data,
                                    userStateInfo: res.data.message
                                });
                            } else {
                                getApp().globalData.openid = res.data.data;
                                wx.redirectTo({ url: '../register/register' });
                            }
                        }
                    }
                })
            }
        })
    },
})