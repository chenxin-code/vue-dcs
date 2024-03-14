import axios from "axios";

class Axios {
  constructor(config = {}) {
    let inst = axios.create(config);
    inst.interceptors.request.use(
      (config) => {
        console.log("REQ_USE", config);
        return config;
      },
      (error) => {
        console.error("REQ_ERR", error);
        return Promise.reject(error);
      }
    );
    inst.interceptors.response.use(
      (res) => {
        console.log("RES_USE", res);
        return res;
      },
      (error) => {
        console.error("RES_ERR", error);
        return Promise.reject(error);
      }
    );
    this.inst = inst;
  }

  Request(...params) {
    return this.inst.request(...params);
  }

  Get(...params) {
    return this.inst.get(...params);
  }

  Delete(...params) {
    return this.inst.delete(...params);
  }

  Head(...params) {
    return this.inst.head(...params);
  }

  Options(...params) {
    return this.inst.options(...params);
  }

  Put(...params) {
    return this.inst.put(...params);
  }

  Post(...params) {
    return this.inst.post(...params);
  }

  Patch(...params) {
    return this.inst.patch(...params);
  }

  GetUri(...params) {
    return this.inst.getUri(...params);
  }
}

export default Axios;
