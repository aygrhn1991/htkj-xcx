Page({
    data: {
        user: null,
        userState: null,
        userStateText: null,
        userPage: [{
            name: '办公',
            pages: [{ imgUrl: '/img/addjob.png', url: '/pages/modules/addjob/addjob/addjob', text: '加班申报' },
                // { imgUrl: '/img/empty.jpg', url: '/pages/modules/addjob/addjob/addjob', text: 'Grid' }
            ]
        },
            // {
            //     name: '车间生产',
            //     pages: [{ text: '生产计划1', imgUrl: '/img/empty.jpg', url: '/pages/modules/produce/plan/plan' }]
            // },
            // {
            //     name: '管理',
            //     pages: [{ text: '生产计划1', imgUrl: '/img/empty.jpg', url: '/pages/modules/produce/plan/plan' }]
            // }
        ]
    },
    onLoad: function () {
        wx.login({
            success: res => {
                wx.showLoading({ title: '加载中' });
                wx.request({
                    url: getApp().globalData.host + `/auth/login/${res.code}`,
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
                                    userStateText: res.data.message
                                });
                            } else {
                                getApp().globalData.openid = res.data.data;
                                wx.redirectTo({ url: '../register/register' });
                            }
                        }
                    },
                    complete: function () { wx.hideLoading() }
                })
            }
        })
    },
})