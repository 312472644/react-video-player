import React, { useState } from 'react';
import { Popover } from 'antd';
import classnames from 'classnames';

import styles from './index.module.scss';

interface IVideoSpeed {
  videoRef: HTMLVideoElement
}

/** 视频加速 */
const VideoSpeed = (props: IVideoSpeed) => {
  const { videoRef } = props;
  // 倍速弹框
  const [playRateFlag, setPlayRateFlag] = useState(false);
  // 视频播放速度
  const [playRate, setPlayRate] = useState(1);

  /** 加速播放事件 */
  const playRateEvent = (value: number) => {
    videoRef.playbackRate = value;
    setPlayRate(value);
    setPlayRateFlag(false);
  };

  /** 渲染视频加速播放 */
  const renderPlayRate = () => {
    const rateList = [0.5, 1.0, 1.5, 2, 2.5].reverse();
    return (
      <ul className={styles.playRateMenu}>
        {rateList.map((item) => {
          return (
            <li
              key={item}
              onClick={() => {
                playRateEvent(item);
              }}
              className={classnames(
                styles.playRateItem,
                playRate === item ? styles.activePlayRate : ""
              )}
            >
              {item === 1 ? "1.0X" : `${item}X`}
            </li>
          );
        })}
      </ul>
    );
  };

  return <div className={styles.speedContainer}>
    <Popover
      trigger="click"
      overlayClassName={styles.popoverSpeed}
      visible={playRateFlag}
      content={renderPlayRate}
    >
      <span
        onClick={() => {
          setPlayRateFlag(!playRateFlag);
        }}
        className={styles.speedText}
      >
        {playRate === 1 ? "倍速" : `x ${playRate}`}
      </span>
    </Popover></div >
}

export default VideoSpeed;