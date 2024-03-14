export default [
    [
        {
            msg: '你好，我是您的专属客户经理。请问你有信用卡吗？',
            vdid: 'sp1',
            btn: [
                {
                    text: '有',
                    gotoBranch: 1,
                },
                {
                    text: '没有',
                    gotoBranch: 2,
                }
            ],
        }
    ],
    [
        {
            msg: '好的，请问你的信用卡有账单吗？',
            vdid: 'sp2',
            btn: [
                {
                    text: '有',
                    reply: {
                        msg: '好的，请问你办理过信用卡分期吗？',
                        vdid: 'sp3',
                        index: 1,
                        btn: [
                            {
                                text: '办理过',
                                gotoBranch: 3,
                            },
                            {
                                text: '没办理过',
                                reply: {
                                    msg: '最近我行推出信用卡分期7折优惠，为你推荐以下分期方案。',
                                    vdid: 'sp4',
                                    index: 2,
                                    btn: [
                                        {
                                            text: '了解分期方案',
                                        },
                                    ],
                                }
                            }
                        ],
                    },
                },
                {
                    text: '没有',
                    reply: {
                        msg: '更多优惠请关注活动页面',
                        vdid: 'sp5',
                        index: 1,
                    },
                },
            ],
        },
    ],
    [
        {
            msg: '打开你生活中无限可能，为你提供尊贵的信用卡服务。',
            vdid: 'sp6',
            btn: [
                {
                    text: '信用卡申请',
                },
            ],
        },
    ],
    [
        {
            msg: '这是你办理的分期业务，点击查看详情。',
            vdid: 'sp7',
            btn: [
                {
                    text: '查看详情',
                },
            ],
        },
    ],
];
