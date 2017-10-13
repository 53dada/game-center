import MockAdapter from 'axios-mock-adapter';
import {ins} from './common/Request';

const mock = new MockAdapter(ins);

mock.onGet('/api/user').reply(200,{
    "code": 0,
    "data": {
        "balance": 7010, //余额
        "commission": 0,//佣金余额
        "id": 21,//用户id
        "uniqueId": "fowugb" //用户字符串唯一id
    },
    "msg": ""
})

mock.onGet('/api/user/qrCodeContent').reply(200,
    {
        "code": 0,
        "data": "xxxxxx.com?state=21"
    }
)

mock.onGet('/api/game/zhuanpan/betRecord').reply(200,{
    "code": 0,
    "data": {
        "count": 10,//每页显示的数量
        "countTotal": 251, //总记录数
        "index": 1,//第几页 0开始
        "list": [
            {
                "betType": 1, //下注类型 0=小盘 1=中盘 2=大盘
                "createTime": 1507593607000, //下注时间
                "currentBalance": 7060,//下注后的当前余额
                "gameType": 2,// 2=转盘游戏
                "id": 361,
                "status": 0,//可忽略
                "userId": 21,
                "value": 100,//下注金额
                "amount":11//中奖金额
            },
            {
                "betType": 1, //下注类型 0=小盘 1=中盘 2=大盘
                "createTime": 1507593607000, //下注时间
                "currentBalance": 7060,//下注后的当前余额
                "gameType": 2,// 2=转盘游戏
                "id": 361,
                "status": 0,//可忽略
                "userId": 21,
                "value": 100,//下注金额
                "amount":11//中奖金额
            },
            {
                "betType": 1, //下注类型 0=小盘 1=中盘 2=大盘
                "createTime": 1507593607000, //下注时间
                "currentBalance": 7060,//下注后的当前余额
                "gameType": 2,// 2=转盘游戏
                "id": 361,
                "status": 0,//可忽略
                "userId": 21,
                "value": 100,//下注金额
                "amount":11//中奖金额
            },
            {
                "betType": 1, //下注类型 0=小盘 1=中盘 2=大盘
                "createTime": 1507593607000, //下注时间
                "currentBalance": 7060,//下注后的当前余额
                "gameType": 2,// 2=转盘游戏
                "id": 361,
                "status": 0,//可忽略
                "userId": 21,
                "value": 100,//下注金额
                "amount":11//中奖金额
            },
            {
                "betType": 1, //下注类型 0=小盘 1=中盘 2=大盘
                "createTime": 1507593607000, //下注时间
                "currentBalance": 7060,//下注后的当前余额
                "gameType": 2,// 2=转盘游戏
                "id": 361,
                "status": 0,//可忽略
                "userId": 21,
                "value": 100,//下注金额
                "amount":11//中奖金额
            }
        ]
    }
})

mock.onGet('/api/user/balance').reply(200,{
    "code": 0,
    "data": 7010
})

mock.onPost('/api/game/zhuanpan/bet').reply(200,{
    "code": 0,
    "data": {
        "index": 1, //开奖下标 0开始
        "value": 150 //中奖金额
    },
    "msg": "下注成功"
})

mock.onGet('/api/game/zhuanpan/pool').reply(200,{
    "code":0,
    data:2333
})

mock.onAny().passThrough();
