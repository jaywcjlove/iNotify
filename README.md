[![](https://img.shields.io/github/issues/jaywcjlove/iNotify.svg)](https://github.com/jaywcjlove/iNotify/issues) [![](https://img.shields.io/github/forks/jaywcjlove/iNotify.svg)](https://github.com/jaywcjlove/iNotify/network) [![](https://img.shields.io/github/stars/jaywcjlove/iNotify.svg)](https://github.com/jaywcjlove/iNotify/stargazers) [![](https://img.shields.io/github/release/jaywcjlove/iNotify.svg)](https://github.com/jaywcjlove/iNotify/releases)

# 标题通知

这是重复造轮子...

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
