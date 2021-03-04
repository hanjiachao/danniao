import Axios from 'axios'
import store from '../store'
import { Toast } from "vant"
import Router from '../router/index'
import qs from 'qs'

// const baseUrl = 'http://danniao.hanyu.weyoui.cn/index.php/Home'
const baseUrl = 'http://hr-sfa.danniao.com/index.php/Home'


class HttpRequest {
  getInsideConfig() {
    const config = {
      baseURL: baseUrl,
      timeout: 5000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        // 'Content-Type': 'form-data'
      },
    }
    return config
  }

  // 请求s拦截
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // 在发送请求之前做些什么
      if (config.catchErrorDisabled) {
        this.catchErrorDisabled = true
      } else {
        this.catchErrorDisabled = false
      }
      if (!config.silence) {
        let loading = config.loading || '加载中...'
        Toast.loading(loading)
      }
      if (config.finishCallback) {
        instance.finishCallback = config.finishCallback
      }
      if (config.method === 'get' || config.method === 'delete') {
        // 消除ie对get请求默认取缓存的影响
        if (config.params) {
          config.params.t = new Date().getTime()
        } else {
          config.params = {
            t: new Date().getTime()
          }
        }
      }
      if (config.data instanceof FormData) {
        config.timeout = 30000
      }
      return config
    }, error => {
      // 对请求错误做些什么
      Toast.fail({
        message: '网络错误，请重试',
        duration: 2000
      })
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use(res => {
      if (res.data.errorCode == "100008") {
        Toast.fail({
          message: res.data.result.msg,
          duration: 1500,
        })
        store.commit('setAccessToken', null)
        setTimeout(function () {
          Router.push({
            path: '/Auth'
          })
        },1500)
      }
      if (res.data.status === 'ERROR') {
        Toast.fail({
          message: res.data.result.msg,
          duration: 2500
        })
        return Promise.reject()
      }
      Toast.clear()
      if (instance.finishCallback) {
        instance.finishCallback()
      }
      return res.data
    }, error => {
      Toast.clear()
      if (instance.finishCallback) {
        instance.finishCallback()
      }
      if (error.response && error.response.data) {
        let errorData = error.response.data
        if (errorData.result && typeof errorData.result === 'string') {
          errorData = errorData.result
        } else if (typeof errorData.result === 'object' && errorData.result.length > 0) {
          for (let i in errorData.result) {
            if (typeof errorData.result[i] === 'object') {
              errorData = errorData.result[i][0]
            } else {
              errorData = errorData.result[i]
            }
            break
          }
        } else if (errorData.errorMsg) {
          errorData = errorData.errorMsg
        } else {
          errorData = '服务器发生故障,请重试'
        }
        error.errorMessage = errorData
      } else {
        error.errorMessage = '服务器发生故障,请重试'
      }
      if (error && error.response && error.response.status === 503) {
        error.errorMessage = '系统正在维护，请稍后再试'
      }
      if (!this.catchErrorDisabled) {
        Toast.fail({
          message: error.errorMessage,
          duration: 2000,
          onClose: () => {
            if (error.response.data.errorCode == 200001) {
              store.commit('setAccessToken', null)
              Router.push({
                path: '/Auth'
              })
            }
          }
        })
      }
      return Promise.reject(error)
    })
  }

  // 请求实例
  request(options) {
    const instance = Axios.create()
    let source = Axios.CancelToken.source()
    let token = store.state.accessToken
    options.data = options.data || {}
    options.params = options.params || {}
    if (options.userinfo) {
      // config.headers.Authorization = 'Bearer ' + token
      options.data.access_token = token
      options.params.access_token = token
    }
    options.cancelToken = source.token
    options = Object.assign(this.getInsideConfig(), options)
    options.data = qs.stringify(options.data)
    this.interceptors(instance)
    let obj = instance(options)
    obj.abort = () => {
      source.cancel()
    }
    return obj
  }

  delete(options) {
    options.method = 'delete'
    return this.request(options)
  }

  patch(options) {
    options.method = 'patch'
    return this.request(options)
  }

  post(options) {
    options.method = 'post'
    return this.request(options)
  }

  get(options) {
    options.method = 'get'
    return this.request(options)
  }
}

export default new HttpRequest()
