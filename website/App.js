import React, { Component } from 'react';
import Markdown from './components/Markdown';
import GithubCorner from './components/GithubCorner';
import DocumentStr from './doc.md';
import GithubShields from './components/GithubShields';
import Button from './components/Button';
import Footer from './components/Footer';
import styles from './styles/index.less';
import './styles/reset.less';
import Notify from '../src/main';

import mp4 from './assets/msg.mp4';
import mp3 from './assets/msg.mp3';
import wav from './assets/msg.wav';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      button: [
        {
          label: '弹出框',
          onClick: () => {
            this.iN.notify({
              title: '欢迎使用iNotify',
              body: '你正在打开 iNotify 官网！',
            });
          },
        },
        {
          label: '播放声音',
          onClick: () => {
            this.iN.player();
          },
        },
        {
          label: '停止播放声音',
          onClick: () => {
            this.iN.stopPlay();
          },
        },
        {
          label: '清除标题闪烁',
          onClick: () => {
            this.iN.setTitle();
          },
        },
        {
          label: '播放闪烁动画',
          onClick: () => {
            this.iN.setTitle(true);
          },
        },
        {
          label: '闪烁标题提示',
          onClick: () => {
            this.iN.setTitle('新消息');
          },
        },
        {
          label: '消息数',
          onClick: () => {
            const num = Math.floor(Math.random() * 10) || 2;
            this.iN.faviconClear().setFavicon(num + 1);
          },
        },
        {
          label: '清空消息数',
          onClick: () => {
            this.iN.faviconClear();
          },
        },
        {
          label: 'Favicon 字体颜色',
          onClick: () => {
            this.iN.setFaviconColor('#0043ff');
          },
        },
        {
          label: 'Favicon 背景颜色',
          onClick: () => {
            this.iN.setFaviconColor('#f5ff00').setFaviconBackgroundColor('red');
          },
        },
      ],
    };
  }

  componentDidMount() {
    this.iN = new Notify({
      effect: 'flash',
      interval: 500,
      message: '有消息拉！2',
      audio: {
        file: [mp4, mp3, wav],
      },
      notification: {
        title: '通知！',
        body: '您来了一条新消息',
      },
    });
    this.iN.setTitle('新标题')
      .notify({
        title: '欢迎使用iNotify',
        body: '你正在打开 iNotify 官网！',
      })
      .player();
  }

  render() {
    const { button } = this.state;
    return (
      <div className={styles.wapper}>
        <GithubCorner url="https://github.com/jaywcjlove/iNotify" />
        <div className={styles.panel}>
          <h1>
            iNotify
          </h1>
          <div className={styles.button}>
            {button.map((item, key) => {
              return (
                <Button key={key} onClick={item.onClick}>
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
        <Markdown source={DocumentStr} />
        <GithubShields
          source={[
            {
              href: 'https://github.com/jaywcjlove/iNotify/stargazers',
              img: 'https://img.shields.io/github/stars/jaywcjlove/iNotify.svg?style=social',
            },
            {
              href: 'https://github.com/jaywcjlove/iNotify/network',
              img: 'https://img.shields.io/github/forks/jaywcjlove/iNotify.svg?style=social',
            },
            {
              href: 'https://github.com/jaywcjlove/iNotify/watchers',
              img: 'https://img.shields.io/github/watchers/jaywcjlove/iNotify.svg?style=social&label=Watch',
            },
            {
              href: 'https://github.com/jaywcjlove/followers',
              img: 'https://img.shields.io/github/followers/jaywcjlove.svg?style=social',
            },
          ]}
        />
        <Footer name="Kenny Wong" href="http://jaywcjlove.github.io" year="2015-present" />
      </div>
    );
  }
}
