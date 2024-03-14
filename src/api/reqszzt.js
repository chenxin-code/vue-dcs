import axios from "axios";

// 创建axios实例
export default {
  post(url, data,token,pageNum,pageSize) {  //  post
      const instance = axios.create({
          timeout: 8000,
          headers: {
              'Content-Type': 'application/json',
              'Accept-token':'Bearer '+token,
          }
      });
      return instance({
          method: 'post',
          url,
          data: data,
      }).then((res) => {
          return res
      }).catch(
          (error) => {
          }
      )
  },
  changestate(url, data,token) {  //  post
    const instance = axios.create({
        timeout: 8000,
        headers: {
            'Content-Type': 'application/json',
            'Accept-token':'Bearer '+token,
        }
    });
    return instance({
        method: 'post',
        url,
        data: data,
    }).then((res) => {
        return res
    }).catch(
        (error) => {
        }
    )
},
  postxml(url, data) {  //  post
    // let baseURL ='http://i3t1684507.wicp.vip/manager/wx/oauth'
    const instance = axios.create({
        // baseURL: baseURL,
        timeout: 8000,
        headers: {
            'Content-Type': 'application/xml'
        }
    });
    return instance({
        method: 'post',
        url,
        data: data,
    }).then((res) => {
        return res
    }).catch(
        (error) => {
        }
    )
},
  get(url,token) {  // get
      return axios({
          method: 'get',
          url,
        //   params, // get 请求时带的参数
          headers: {
              'Content-Type': 'application/json;',
              'Accept-token':'Bearer '+token
          }
      }).then(
          (res) => {
              return res
          }
      ).catch((error) => {
      })
  },
  getrequest(url, params) {  // get
    return axios({
        method: 'get',
        url,
        params, // get 请求时带的参数
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(
        (res) => {
            return res
        }
    ).catch((error) => {
    })
},
enterRecordpost(url, data,token) {  //  post
    // let baseURL ='http://i3t1684507.wicp.vip/manager/wx/oauth'
    const instance = axios.create({
        // baseURL: baseURL,
        timeout: 8000,
        headers: {
            'Content-Type': 'application/json',
            'Accept-token':'Bearer '+token
        }
    });
    return instance({
        method: 'post',
        url,
        data: data,
    }).then((res) => {
        return res
    }).catch(
        (error) => {
        }
    )
},
postRobot(url, data) {  //  post
    // let baseURL ='http://i3t1684507.wicp.vip/manager/wx/oauth'
    const instance = axios.create({
        // baseURL: baseURL,
        timeout: 8000,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return instance({
        method: 'post',
        url,
        data: data,
    }).then((res) => {
        return res
    }).catch(
        (error) => {
        }
    )
},
}
