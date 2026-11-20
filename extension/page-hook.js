(function () {
  if (window.__mwPageHook) return;
  window.__mwPageHook = true;

  var last = null;
  var pos = null;

  function post() {
    var msg = null;
    if (last) {
      msg = {
        paused: !!last.paused,
        currentTime: last.currentTime || 0,
        duration: (isFinite(last.duration) && last.duration > 0) ? last.duration : 0,
        muted: !!(last.muted || last.volume === 0),
        ended: !!last.ended,
        at: Date.now()
      };
    } else if (pos) {
      msg = { paused: null, currentTime: pos.currentTime, duration: pos.duration, muted: null, at: Date.now() };
    }
    if (msg) { try { window.postMessage({ __mwMedia: msg }, '*'); } catch (e) {} }
  }

  function bind(el) {
    if (last === el) { post(); return; }
    last = el;
    ['play', 'pause', 'timeupdate', 'volumechange', 'durationchange', 'ended', 'seeked', 'ratechange'].forEach(function (ev) {
      try { el.addEventListener(ev, post); } catch (e) {}
    });
    post();
  }

  var proto = HTMLMediaElement.prototype;
  var origPlay = proto.play;
  proto.play = function () {
    bind(this);
    var r = origPlay.apply(this, arguments);
    if (r && typeof r.catch === 'function') r.catch(function () {});
    return r;
  };
  var origPause = proto.pause;
  proto.pause = function () {
    bind(this);
    return origPause.apply(this, arguments);
  };

  if (navigator.mediaSession && navigator.mediaSession.setPositionState) {
    var origPos = navigator.mediaSession.setPositionState.bind(navigator.mediaSession);
    navigator.mediaSession.setPositionState = function (st) {
      if (st && isFinite(st.duration) && st.duration > 0) {
        pos = { currentTime: st.position || 0, duration: st.duration };
        if (!last) post();
      }
      try { return origPos(st); } catch (e) {}
    };
  }

  setInterval(post, 500);
})();
