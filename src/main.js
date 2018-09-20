
// 提醒是否添加chrome通知
if (window.Notification && window.Notification.permission !== 'granted') {
  window.Notification.requestPermission();
}
let iconURL = '';
const repeatableEffects = ['flash', 'scroll'];

const defaultNotification = {
  title: 'iNotify !',
  body: 'You have a new message.',
  openurl: '',
};

function jsonArguments(news, olds) {
  for (const a in olds) {
    if (news[a]) {
      olds[a] = news[a];
    }
  }
  return olds;
}
function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

function createAudio(url) {
  const audioElm = document.createElement('audio');
  let source;
  if (isArray(url) && url.length > 0) {
    for (let i = 0; i < url.length; i++) {
      source = document.createElement('source');
      source.src = url[i];
      source.type = `audio/${getExtension(url[i])}`;
      audioElm.appendChild(source);
    }
  } else {
    audioElm.src = url;
  }
  return audioElm;
}

function getFavicon(setting) {
  let ic = document.querySelectorAll('link[rel~=shortcut]')[0];
  if (!ic) {
    ic = changeFavicon('O', setting);
  }
  return ic;
}

function getExtension(fileName) {
  return fileName.match(/\.([^\\.]+)$/)[1];
}

function changeFavicon(num, settings) {
  const canvas = document.createElement('canvas');
  const head = document.getElementsByTagName('head')[0];
  const linkTag = document.createElement('link');
  let ctx = null;

  canvas.height = 32;
  canvas.width = 32;
  ctx = canvas.getContext('2d');
  ctx.fillStyle = settings.backgroundColor;
  ctx.fillRect(0, 0, 32, 32);

  ctx.textAlign = 'center';
  ctx.font = '22px "helvetica", sans-serif';
  ctx.fillStyle = settings.textColor;
  num && ctx.fillText(num, 16, 24);

  // 生成到
  linkTag.setAttribute('rel', 'shortcut icon');
  linkTag.setAttribute('type', 'image/x-icon');
  linkTag.setAttribute('id', `new${settings.id}`);
  linkTag.setAttribute('href', canvas.toDataURL('image/png'));
  iconURL = canvas.toDataURL('image/png');
  return head.appendChild(linkTag);
}


function Notify(config) {
  if (config) {
    this.init(config);
  }
}

Notify.prototype = {
  init(config) {
    if (!config) {
      config = {};
    }
    this.interval = config.interval || 100; // 响应时长
    this.effect = config.effect || 'flash'; // 效果
    this.title = config.title || document.title; // 标题
    this.message = config.message || this.title; // 原来的标题
    this.onclick = config.onclick || this.onclick; // 点击事件
    this.openurl = config.openurl || this.openurl; // 点击事件
    this.updateFavicon = config.updateFavicon || {
      id: 'favicon',
      textColor: '#fff',
      backgroundColor: '#2F9A00',
    };
    this.audio = config.audio || '';
    this.favicon = getFavicon(this.updateFavicon);
    this.cloneFavicon = this.favicon.cloneNode(true);
    iconURL = (config.notification && config.notification.icon) ? config.notification.icon : (config.icon ? config.icon : this.favicon.href);
    defaultNotification.icon = iconURL;
    this.notification = config.notification || defaultNotification;
    // 初始化生成声音文件节点
    if (this.audio && this.audio.file) {
      this.setURL(this.audio.file);
    }
    return this;
  },
  render() {
    if (this.effect === 'flash') {
      document.title = (this.title === document.title) ? this.message : this.title;
    } else if (this.effect === 'scroll') {
      const title = this.message || document.title;
      if (!this.scrollTitle || !this.scrollTitle.slice(1)) {
        document.title = title;
        this.scrollTitle = title;
      } else {
        this.scrollTitle = this.scrollTitle.slice(1);
        document.title = this.scrollTitle;
      }
    }
    return this;
  },
  // 设置标题
  setTitle(str) {
    if (str === true) {
      if (repeatableEffects.indexOf(this.effect) >= 0) {
        return this.addTimer();
      }
    } else if (str) {
      this.message = str;
      this.scrollTitle = '';
      this.addTimer();
    } else {
      this.clearTimer();
    }
    return this;
  },
  setURL(url) {
    if (url) {
      if (this.audioElm) {
        this.audioElm.remove();
      }
      this.audioElm = createAudio(url);
      document.body.appendChild(this.audioElm);
    }
    return this;
  },
  loopPlay() {
    this.setURL();
    this.audioElm.loop = true;
    this.player();
    return this;
  },
  stopPlay() {
    this.audioElm && (this.audioElm.loop = false, this.audioElm.pause());
    return this;
  },
  // 播放声音
  player() {
    if (!this.audio || !this.audio.file) {
      return;
    }
    if (!this.audioElm) {
      this.audioElm = createAudio(this.audio.file);
      document.body.appendChild(this.audioElm);
    }
    this.audioElm.play();
    return this;
  },
  notify(json) {
    let nt = this.notification;
    const url = json.openurl ? json.openurl : this.openurl;
    const onclick = json.onclick ? json.onclick : this.onclick;
    if (window.Notification) {
      if (json) {
        nt = jsonArguments(json, nt);
      } else {
        nt = defaultNotification;
      }
      const option = {};
      option.icon = json.icon ? json.icon : iconURL;
      option.body = nt.body;
      if (json.dir) option.dir = json.dir;
      const n = new Notification(nt.title, option);
      n.onclick = () => {
        (onclick && typeof onclick === 'function') && onclick(n);
        url && window.open(url);
      };
      n.onshow = () => {
        (json.onshow && typeof json.onshow === 'function') && json.onshow(n);
      };
      n.onclose = () => {
        (json.onclose && typeof json.onclose === 'function') && json.onclose(n);
      };
      n.onerror = () => {
        (json.onerror && typeof json.onerror === 'function') && json.onerror(n);
      };
      this.Notifiy = n;
    }
    return this;
  },
  // 是否许可弹框通知
  isPermission() {
    return window.Notification && Notification.permission === 'granted';
  },
  // 设置时间间隔
  setInterval(num) {
    if (num) {
      this.interval = num;
      this.addTimer();
    }
    return this;
  },
  // 设置网页Icon
  setFavicon(num) {
    if (!num && num !== 0) {
      return this.faviconClear();
    }
    const oldicon = document.getElementById(`new${this.updateFavicon.id}`);
    if (this.favicon) {
      this.favicon.remove();
    }
    if (oldicon) {
      oldicon.remove();
    }
    this.updateFavicon.num = num;
    changeFavicon(num, this.updateFavicon);
    return this;
  },
  // 设置 Favicon 文字颜色
  setFaviconColor(color) {
    if (color) {
      this.faviconRemove();
      this.updateFavicon.textColor = color;
      changeFavicon(this.updateFavicon.num, this.updateFavicon);
    }
    return this;
  },
  // 设置 Favicon 背景颜色
  setFaviconBackgroundColor(color) {
    if (color) {
      this.faviconRemove();
      this.updateFavicon.backgroundColor = color;
      changeFavicon(this.updateFavicon.num, this.updateFavicon);
    }
    return this;
  },
  faviconRemove() {
    this.faviconClear();
    const oldicon = document.getElementById(`new${this.updateFavicon.id}`);
    if (this.favicon) {
      this.favicon.remove();
    }
    if (oldicon) {
      oldicon.remove();
    }
  },
  // 添加计数器
  addTimer() {
    this.clearTimer();
    if (repeatableEffects.indexOf(this.effect) >= 0) {
      this.timer = setInterval(this.render.bind(this), this.interval);
    }
    return this;
  },
  close() {
    if (this.Notifiy) this.Notifiy.close();
  },
  // 清除Icon
  faviconClear() {
    const newicon = document.getElementById(`new${this.updateFavicon.id}`);
    const head = document.getElementsByTagName('head')[0];
    const ficon = document.querySelectorAll('link[rel~=shortcut]');
    newicon && newicon.remove();
    if (ficon.length > 0) {
      for (let i = 0; i < ficon.length; i++) {
        ficon[i].remove();
      }
    }
    head.appendChild(this.cloneFavicon);
    iconURL = this.cloneFavicon.href;
    this.favicon = this.cloneFavicon;
    return this;
  },
  // 清除计数器
  clearTimer() {
    this.timer && clearInterval(this.timer);
    document.title = this.title;
    return this;
  },
};

export default Notify;
