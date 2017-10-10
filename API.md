## api/game/zhuanpan/bet POST 下注

#### request
```json
{
	"value":100, //下注金额
	"betType":1  // 0=小盘 1=中盘 2=大盘
}
```
#### response
```json
{
    "code": 0,
    "data": {
        "index": 2, //开奖下标 0开始
        "value": 50 //中奖金额
    },
    "msg": "下注成功"
}
```


## api/user GET 获取用户信息 - 对应我的页面

#### request
EMPTY
#### response
```json
{
    "code": 0,
    "data": {
        "balance": 7010, //余额
        "commission": 0,//佣金余额
        "id": 21,//用户id
        "uniqueId": "fowugb" //用户字符串唯一id
    },
    "msg": ""
}
```

## api/user/qrCodeContent GET 获取推广二维码内容
#### request
EMPTY
#### response
```json
{
    "code": 0,
    "data": "xxxxxx.com?state=21"
}
```

## api/user/balance GET 获取用户余额 给游戏页面使用
#### request
EMPTY
#### response
```json
{
    "code": 0,
    "data": 7010
}
```

## api/game/zhuanpan/betRecord GET 获取转盘游戏记录 - 暂时不要做分页
#### request
EMPTY
#### response
```json
{
    "code": 0,
    "data": {
        "count": 10,//每页显示的数量
        "countTotal": 251, //总记录数
        "index": 0,//第几页 0开始
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
            }
        ]
    }
}
```

## api/game/agentFee GET 获取游戏的佣金利率 - 参考Subordinate.vue 已经实现
#### request
EMPTY
#### response
```json
{
    "code": 0,
    "data": {
        "时时彩": "0.025,0.01,0.005,0.005,0.005",
        "大转盘": "0.025,0.01,0.005,0.005,0.005",
        "QQ在线": "0.025,0.01,0.005,0.005,0.005"
    }
}
```

## api/user/subordinates?number=5 GET 获取下级人数 - 参考Subordinate.vue 已经实现
#### request
```string
number=5 //几级
```
#### response
```json
{
    "code": 0,
    "data": [
        0,//1级
        0,//2级
        0,//3级
        0,//4级
        0//5级
    ]
}
```
