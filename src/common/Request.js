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

ins.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (!token) {
    location.href= config.main
    return Promise.reject(response.data);
  }
  config.headers.common.Authorization = token || '';
  return config;
}, error => Promise.reject(error));

ins.interceptors.response.use(response => {
    if(response.data.code ==0){
        return response.data
    }
    // token异常 跳授权页面
    if(response.data.code==-99){
        location.href= config.main
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
export const bet = (value,betType) => ins.post(`api/game/zhuanpan/bet`,{
    value,
    betType
});

// 获取用户信息
export const getUser = ()=> ins.get(`api/user`)

// 获取推广二维码内容
export const getQr = ()=>ins.get(`api/user/qrCodeContent`)

// 获取用户余额
export const getBalance = ()=> ins.get(`api/user/balance`)

// record
export const getRecord = ()=> ins.get(`api/game/zhuanpan/betRecord`)

// agentFee
export const agentFee = ()=>ins.get(`api/game/agentFee`)

export const subordinates = (params) => ins.get(`api/user/subordinates`,{
    params
})
// zhuanpan poll
export const zhuanpanPool = ()=>ins.get(`api/game/zhuanpan/pool`)

export default {
    getUser,
    getQr,
    getBalance,
    getRecord,
    bet,
    zhuanpanPool

}