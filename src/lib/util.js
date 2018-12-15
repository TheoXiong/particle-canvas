export function setEnv () {
  if (typeof window !== 'undefined' && window) {
    window.requestAnimationFrame = window.requestAnimationFrame ||
                                  window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame ||
                                  window.msRequestAnimationFrame ||
                                  window.oRequestAnimationFrame ||
                                  function (callback) {
                                    return window.setTimeout(callback, 1000 / 60)
                                  }

    window.cancelAnimationFrame = window.cancelAnimationFrame ||
                                  window.webkitCancelAnimationFrame ||
                                  window.mozCancelAnimationFrame ||
                                  window.msCancelAnimationFrame ||
                                  window.oCancelAnimationFrame ||
                                  function (id) {
                                    window.clearTimeout(id)
                                  }
  }
}