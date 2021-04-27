import React, { useState, useEffect } from 'react';
import { SoundOutlined } from '@ant-design/icons';
import { Popover, Slider } from 'antd';

import styles from './index.module.scss';

interface IVideoVoice {
  videoRef: HTMLVideoElement;
  voice?: number; // 初始声音大小
}

/** 声音控件 */
const VideoVoice = (props: IVideoVoice) => {
  const { videoRef, voice = 0 } = props;
  const [videoVoice, setVideoVoice] = useState(voice);

  const voiceChangeHandle = (value: number) => {
    videoRef.volume = value / 100;
    setVideoVoice(value);
  }

  const renderVoice = () => {
    return (
      <div className={styles.voiceBox}>
        <span className={styles.voiceText}>{videoVoice}%</span>
        <Slider vertical value={videoVoice} onChange={voiceChangeHandle}></Slider>
      </div>
    );
  }

  useEffect(() => {
    videoRef.volume = voice / 100;
  }, [videoRef, voice])

  return <div className={styles.voiceContainer}>
    <Popover
      trigger="click"
      overlayClassName={styles.popoverVoice}
      content={renderVoice}
    >
      <SoundOutlined
        title="声音"
        className="menuIcon"
      ></SoundOutlined>
    </Popover>
  </div>
}

export default VideoVoice;