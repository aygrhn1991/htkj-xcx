Page({
    data: {
        user: null,
        userState: null,
        userStateText: null,
        userPage: [{
                name: '办公',
                pages: [
                    { name: '加班', icon: 'time',size:25, path: '/pages/modules/addjob/addjob/addjob' }
                ]
            },
            {
                name: '车间生产',
                pages: [
                    { name: '生产计划1', icon: 'discover',size:25, path: '/pages/modules/addjob/addjobrecord/addjobrecord' },
                    { name: '生产计划2', icon: 'discover',size:25, path: '/pages/modules/addjob/addjobrecord/addjobrecord' },
                    { name: '生产计划3生产计划3', icon: 'discover',size:25, path: '/pages/modules/addjob/addjobrecord/addjobrecord' },
                    { name: '生产计划4', icon: 'discover',size:25, path: '/pages/modules/addjob/addjobrecord/addjobrecord' },
                    { name: '生产计划5', icon: 'discover',size:25, path: '/pages/modules/addjob/addjobrecord/addjobrecord' }
                ]
            },
            {
                name: '管理',
                pages: [
                    { name: '加班统计', icon: 'time',size:25, path: '/pages/modules/addjob/addjob/addjob' }
                ]
            },
        ]
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
                                    userStateText: res.data.message
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