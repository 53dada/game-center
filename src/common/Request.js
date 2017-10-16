import axios from 'axios';
import config from './Domain'

let baseURL;
if (process.env.NODE_ENV == 'development') {
    baseURL = '/';
} else {
    baseURL = ''; // 真实环境地址
}

export const ins = axios.create({
    baseURL,
});

ins.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    if (!token) {
        location.href = config.main
        return Promise.reject(response.data);
    }
    request.headers.common.Authorization = token || '';
    return request;
}, error => Promise.reject(error));

ins.interceptors.response.use(response => {
    if (response.data.code == 0) {
        return response.data
    }
    // token异常 跳授权页面
    if (response.data.code == -99) {
        location.href = config.main
        return Promise.reject(response.data);
    }

}, error => {
    // if (error.response.status === 401) {
    //     vm.$notify.error('未登录，请先登录');
    //     auth.logout();
    //     vm.$router.push('login');
    // } else {
    //     vm.$notify.error(`${error.response.status},${error.response.statusText}`);
    // }
    return Promise.reject(error);
});



// 下注
export const bet = (value, betType) => ins.post(`api/game/zhuanpan/bet`, {
    value,
    betType
});

// 获取用户信息
export const getUser = () => ins.get(`api/user`)

//赢钱排行榜
export const getRankWin = () => ins.get(`api/rank/win`)

//充值排行榜
export const getRankPay = () => ins.get(`api/rank/pay`)

// 获取推广二维码内容
export const getQr = () => ins.get(`api/user/qrCodeContent`)

// 获取用户余额
export const getBalance = () => ins.get(`api/user/balance`)

// 获取下注记录
export const getRecord = () => ins.get(`api/game/zhuanpan/betRecord`)

// 获取佣金利率
export const agentFee = () => ins.get(`api/setting/agentFee`)

// 获取游戏手续费
export const fee = () => ins.get(`api/setting/fee`)

//获取下级数量
export const subordinates = (params) => ins.get(`api/user/subordinates`, {
    params
})

//查询时间段内的佣金总和
export const queryCommissionSum = (params) => ins.get(`api/user/queryCommissionSum`, {
    params
})

// zhuanpan poll
export const zhuanpanPool = () => ins.get(`api/game/zhuanpan/pool`)

export default {
    getUser,
    getQr,
    getBalance,
    getRecord,
    bet,
    zhuanpanPool,
    getRankWin,
    getRankPay,
    queryCommissionSum,
    agentFee,
    subordinates,
    fee
}