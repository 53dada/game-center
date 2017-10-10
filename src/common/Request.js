import axios from 'axios';

let baseURL;
if (process.env.NODE_ENV == 'development') {
    baseURL = '/';
} else {
    baseURL = ''; // 真实环境地址
}

const ins = axios.create({
  baseURL,
});

ins.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (!token) {
      const error = new Error();
      error.message = 'no token';
      error.response = {
          status: 401,
      };
      throw error;
  }
  config.headers.common.Authorization = token || '';
  return config;
}, error => Promise.reject(error));

ins.interceptors.response.use(response => response.data, error => {
  // if (error.response.status === 401) {
  //     vm.$notify.error('未登录，请先登录');
  //     auth.logout();
  //     vm.$router.push('login');
  // } else {
  //     vm.$notify.error(`${error.response.status},${error.response.statusText}`);
  // }
  return Promise.reject(error);
});

export default ins;


function _request(url, options) {
    fetch(url, options)
        .then((response) => response.json())
        .then((jsonData) => {
            if (jsonData.code == 0) {
                console.log(jsonData.data)
            } else {
                console.log(jsonData.msg)
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

export const Request = {


    /**
     * post方式请求接口
     * @param {*} url 地址
     * @param {*} body json对象
     * @param {*} success 成功回调
     * @param {*} err  失败回调
     */
    post(url, body) {
        _request(url, {
            method: 'POST',
            headers: {
                'Authorization': window.localStorage.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        });
    },
    /**
     *
     * get方式请求接口
     * @param {*} url 地址
     * @param {*} params 参数
     * @param {*} success 成功回调
     * @param {*} err 失败回调
     */
    get(url, params) {
        if (params) {

            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        _request(url, {
            method: 'GET',
            headers: {
                'Authorization': window.localStorage.token
            }
        });
    },


}

