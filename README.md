# 标题通知

[![](https://img.shields.io/github/issues/jaywcjlove/iNotify.svg)](https://github.com/jaywcjlove/iNotify/issues) [![](https://img.shields.io/github/forks/jaywcjlove/iNotify.svg)](https://github.com/jaywcjlove/iNotify/network) [![](https://img.shields.io/github/stars/jaywcjlove/iNotify.svg)](https://github.com/jaywcjlove/iNotify/stargazers) [![](https://img.shields.io/github/release/jaywcjlove/iNotify.svg)](https://github.com/jaywcjlove/iNotify/releases)

这是重复造轮子...，标题闪烁、或者滚动提示，favicon数字显示。打开chrome浏览器调试工具，按照下面截图的方式放到调试里面调用一下，你就可以看到效果了。

![界面预览](https://github.com/jaywcjlove/iNotify/blob/master/iNotify.png?raw=true)


## 下载

### npm

```
$ npm install title-notify
```


### bower

```
$ bower install inotify
```

## init

effect: flash | scroll | favicon  

```js 
iNotify.init({
    message: '有消息了。',//标题
    effect: 'flash', // flash | scroll 闪烁还是滚动
    //可选播放声音
    audio:{
        file: 'msg.mp4'
    },
    //标题闪烁，或者滚动速度
    interval: 1000,
    //可选，默认绿底白字的  Favicon
    updateFavicon:{
        // favicon 字体颜色
        textColor: "#fff",
        //背景颜色，设置背景颜色透明，将值设置为“transparent”
        backgroundColor: "#2F9A00" 
    }
})
```
## 声音设置

### player
播放声音

```js
iNotify.player()
```

### loopPlay
自动播放声音

```js
iNotify.loopPlay()
```

### stopPlay
停止播放声音

```js
iNotify.stopPlay()
```

### setURL
设置播放声音URL

```js
iNotify.setURL()
```

## setTitle
设置标题  

```js
iNotify.setTitle('新标题')
```


## setInterval
设置时间间隔  

```js
iNotify.setInterval(2000)
```
## addTimer
添加计数器

```js
iNotify.addTimer()
```
## clearTimer
清除计数器  

```js
iNotify.clearTimer()
```

## setFavicon
设置icon 显示数字

```js
iNotify.setFavicon(10)
```
## faviconClear
清除数字显示原来的icon

```js
iNotify.faviconClear()
```

## 其它

`iNotify.init().title;` 获取标题


## 例子


### 实例一

```js
function iconNotify(num){
    if(!notify) {
        var notify = iNotify.init({
            effect: 'flash',
            interval: 500
        });
    }
    if(num===0){
        notify.faviconClear()
        notify.setTitle();
    }else if(num<100){
        notify.setFavicon(num)
        notify.setTitle("有新消息！");
    }else if(num>99){
        notify.setFavicon('..')
        notify.setTitle("有新消息！");
    }
}
```

### 实例二

```js
var notify = iNotify.init({
    effect: 'flash',
    interval: 500
});
notify.setFavicon("1")
```

### 实例三

```js
var iN = iNotify.init({
    effect: 'flash',
    interval: 500,
    message:"有消息拉！",
    updateFavicon:{//可选，默认绿底白字
        textColor: "#fff",// favicon 字体颜色
        backgroundColor: "#2F9A00" //背景颜色
    }
}).setFavicon(10);
```

### 实例四

```js
var iN = iNotify.init().setFavicon(5);
```


### 实例五

```js
var iN = iNotify.init({
    effect: 'flash',
    interval: 500,
    message:"有消息拉！",
    audio:{
        file: 'msg.mp4'
    }
}).setFavicon(10).player();
```
