function Timer(fn, t) {
  let timerObj = setTimeout(fn, t)

  this.stop = function() {
    if (timerObj) {
      clearTimeout(timerObj)
      timerObj = null
    }
    return this
  }

  this.start = function() {
    if (!timerObj) {
      this.stop()
      timerObj = setTimeout(fn, t)
    }
    return this
  }

  this.reset = function(newT = t) {
    t = newT
    return this.stop().start()
  }
}

export default Timer
