# 标题通知

[![](https://img.shields.io/github/issues/jaywcjlove/iNotify.svg)](https://github.com/jaywcjlove/iNotify/issues) [![](https://img.shields.io/github/forks/jaywcjlove/iNotify.svg)](https://github.com/jaywcjlove/iNotify/network) [![](https://img.shields.io/github/stars/jaywcjlove/iNotify.svg)](https://github.com/jaywcjlove/iNotify/stargazers) [![](https://img.shields.io/github/release/jaywcjlove/iNotify.svg)](https://github.com/jaywcjlove/iNotify/releases)

这是重复造轮子...，标题闪烁、或者滚动提示，favicon数字显示。

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
    message: '有消息了。',
    effect: 'flash', // flash | scroll | favicon
    interval: 1000
})
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


## 例子

```js
//实例一
function iconNotify(num){
    if(!notify) notify = iNotify.init({
        effect: 'flash',
        interval: 500
    });
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

//实例二
notify = iNotify.init({
    effect: 'flash',
    interval: 500
});
notify.setFavicon("1")
```