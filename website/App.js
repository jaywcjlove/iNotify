import React, { Component } from 'react';
import Markdown from './components/Markdown';
import GithubCorner from './components/GithubCorner';
import DocumentStr from '../README.md';
import GithubShields from './components/GithubShields';
import Button from './components/Button';
import Footer from './components/Footer';
import styles from './styles/index.less';
import './styles/reset.less';
import Notify from '../src/main';
import notifyImg from './assets/iNotify.png';

import mp4 from './assets/msg.mp4';
import mp3 from './assets/msg.mp3';
import wav from './assets/msg.wav';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      button: [
        {
          label: 'Popup box',
          onClick: () => {
            this.iN.notify({
              title: 'Welcome to iNotify!',
              body: 'You are opening the iNotify website!',
            });
          },
        },
        {
          label: 'Play sound',
          onClick: () => {
            this.iN.player();
          },
        },
        {
          label: 'Stop playing sound',
          onClick: () => {
            this.iN.stopPlay();
          },
        },
        {
          label: 'Stop title animation',
          onClick: () => {
            this.iN.setTitle();
          },
        },
        {
          label: 'Play title animation',
          onClick: () => {
            this.iN.setTitle(true);
          },
        },
        {
          label: 'Title animation, update title',
          onClick: () => {
            this.iN.setTitle('Title animation, update title.');
          },
        },
        {
          label: 'Number of messages',
          onClick: () => {
            const num = Math.floor(Math.random() * 10) || 2;
            this.iN.faviconClear().setFavicon(num + 1);
          },
        },
        {
          label: 'Clear the messages number',
          onClick: () => {
            this.iN.faviconClear();
          },
        },
        {
          label: 'Open website.',
          onClick: () => {
            this.iN.notify({
              title: 'Welcome to iNotify!',
              body: 'You are opening the iNotify website!',
              openurl: 'https://github.com/jaywcjlove/iNotify',
              onclick: () => {
                console.log('on click');
                this.iN.close();
              },
              onshow: () => {
                console.log('on show');
              },
            });
          },
        },
        {
          label: 'Favicon Font color',
          onClick: () => {
            this.iN.setFaviconColor('#0043ff');
          },
        },
        {
          label: 'Favicon Background color',
          onClick: () => {
            this.iN.setFaviconColor('#f5ff00').setFaviconBackgroundColor('red');
          },
        },
      ],
    };
  }

  componentDidMount() {
    this.iN = new Notify({
      // effect: 'flash',
      effect: 'scroll',
      interval: 300,
      message: '有消息拉！',
      audio: {
        file: [mp4, mp3, wav],
      },
      notification: {
        title: '通知！',
        body: '您来了一条新消息',
      },
      onclick: () => {
        console.log('on click');
        this.iN.close();
      },
    });
    this.iN.setTitle('New news, welcome to iNotify!')
      .notify({
        title: 'Welcome to iNotify!',
        body: 'You are opening the iNotify website!',
        openurl: 'https://github.com/jaywcjlove/iNotify',
      })
      .player();
  }

  render() {
    const { button } = this.state;
    let DocumentStrSource = DocumentStr;
    if (DocumentStrSource) DocumentStrSource = DocumentStr.replace(/([\s\S]*)<!--dividing-->/, '');
    return (
      <div className={styles.wapper}>
        <GithubCorner url="https://github.com/jaywcjlove/iNotify" />
        <div className={styles.panel}>
          <h1>
            iNotify
          </h1>
          <img src={notifyImg} alt="iNotify" />
        </div>
        <div className={styles.button}>
          {button.map((item, key) => {
            return (
              <Button key={key} onClick={item.onClick}>
                {item.label}
              </Button>
            );
          })}
        </div>
        <Markdown source={DocumentStrSource} />
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
