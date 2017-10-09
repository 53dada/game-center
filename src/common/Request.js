

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

export default Request = {


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

