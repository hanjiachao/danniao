import ajax from './ajax.js'
import { Toast } from "mand-mobile"
const plugin = {
  install(vue) {
    vue.$common = {
      toast: Toast,
      ajax: ajax,
      setTitle (title) {
        document.title = title
      },
      getQueryString (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = location.href.split('#')[1].substr(location.href.split('#')[1].indexOf('?') + 1).match(reg)  // 获取url中"?"符后的字符串并正则匹配
        var context = ''
        if (r !== null) {
          context = r[2]
        }
        reg = null
        r = null
        return context === null || context === '' || context === 'undefined' ? '' : context
      },
      checkMobile (mobile) {
        return /^1\d{10}$/.test(mobile)
      },
      getKeyValue (key, data) {
        if (key.indexOf('.') > -1) {
          let levelKeys = key.split('.')
          let item = Object.assign({}, data)
          for (let i in levelKeys) {
            if (item[levelKeys[i]]) {
              item = item[levelKeys[i]]
            } else {
              return ''
            }
          }
          return item
        } else {
          return data[key]
        }
      },
      compress (fileBase64, fileName, ratio, callback) {
        Toast.loading('压缩中...')
        let _this = this
        let image = new Image()
        image.src = fileBase64
        image.onload = function () {
          let canvas = document.createElement('canvas')
          let context =  canvas.getContext('2d')
          let imageWidth = image.width / 2
          let imageHeight = image.height / 2
          let data = ''
          canvas.width = imageWidth
          canvas.height = imageHeight
          context.clearRect(0, 0, imageWidth, imageHeight);
          context.drawImage(image, 0, 0, imageWidth, imageHeight)
          data = canvas.toDataURL('image/jpeg', ratio)
          let blob = _this.dataURLtoBlob(data)
          // let zipFile =  new File([blob], fileName)
          let zipFile =  _this.blobToFile(blob, fileName)
          callback(zipFile, data)
        }
        image.onerror = function () {
          Toast.failed('上传失败,请重试', 2000)
        }
      },
      blobToFile (blob, fileName) {
        blob.lastModifiedDate = new Date()
        blob.name = fileName
        return blob
      },
      dataURLtoBlob (dataurl) {
        var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n)
        for (let i = 0; i < n; i++) {
          Toast.loading(Math.round((i / n) * 100) + '%')
          u8arr[i] = bstr.charCodeAt(i)
        }
        // while (n--) {
        //   Toast.loading(n + typeof n)
        //   u8arr[n] = bstr.charCodeAt(n)
        // }
        return new Blob([u8arr], { type: mime })
      }
    }
    vue.mixin({
      beforeCreate () {
        this.$common = vue.$common
      }
    })
  }
}
export default plugin
export const install = plugin.install