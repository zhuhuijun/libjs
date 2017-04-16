export let UAString = 'MicroMessenger'.toLowerCase()
export let ua = window.navigator.userAgent.toLowerCase()

export let inWechat = () => {
  return ua.indexOf(UAString) > -1 || typeof window.wxuserAgent !== 'undefined'
}

export let checkWxVersion = () => {
  var ua = window.navigator.userAgent,
      re  = new RegExp(UAString + '\/([0-9]{1,}[\\.0-9]{0,})', 'i'),
      rv

  if (re.exec(ua) !== null) {
    rv = parseFloat(RegExp.$1)
  }

  return rv
}

export let actions = {}

actions.close = (callback) => {
  let { WeixinJSBridge } = window
  if (!WeixinJSBridge) {
    console.warn(`[env: NOT_WECHAT]no WeixinJSBridge`)
    typeof window.close === 'function' && window.close()
    return false
  }

  let fn = typeof callback === 'function' && callback || (() => {})

  window.WeixinJSBridge.invoke('closeWindow', {}, fn)
  return true
}
