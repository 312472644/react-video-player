import { Slider } from 'antd';
import React, { useEffect, useState } from 'react';
import { IVideoProgressHover } from '../../interfaces';
import { transFormDate } from '../../utils';

import styles from './index.module.scss';

interface IVideoProgress {
  videoRef: HTMLVideoElement;
  currentTime: number; // 视频当前时间
  videoTotalTime: number; // 视频总时长
}

// 定时器标记
let timerId: any;
/** 播放进度条 */
const VideoProgress = (props: IVideoProgress) => {
  const { videoRef, currentTime, videoTotalTime } = props;
  const [videoCurrentTime, setVideoCurrentTime] = useState(currentTime);
  const [hoverInfo, setHoverInfo] = useState<IVideoProgressHover>({
    left: 0,
    currentTimeTip: '',
    showTip: false,
  });
  const { left, currentTimeTip, showTip } = hoverInfo;

  /** 拖动进度条事件 */
  const timeUpdateEvent = (value: number) => {
    videoRef.currentTime = value;
    setVideoCurrentTime(value);
  };

  /** 获取视频截图 */
  const createVideoSnippet = () => {
    const video = document.getElementById("video") as CanvasImageSource;
    const canvas = document.getElementById("video-snippet") as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
  }

  /** 进度条鼠标事件 */
  const progressMouseEnter = (event: React.MouseEvent) => {
    timerId = setTimeout(() => {
      let rootLeft = 0;
      let rootWidth = 0;
      let rootRight = 0;
      let positionLeft = event.clientX;
      const videoRootElement = document.querySelector('#video-player');
      const clientRects = videoRootElement?.getClientRects() || [];
      if (clientRects.length) {
        rootLeft = clientRects[0].left;
        rootWidth = clientRects[0].width;
        rootRight = clientRects[0].right;
      }
      // 获取鼠标放置位置视屏时间
      const percent = (event.clientX - rootLeft) / rootWidth;
      const canvasElement = document.getElementById('video-snippet') as HTMLCanvasElement;
      const videoContainerElement = document.getElementById('video-container') as HTMLEmbedElement;
      // 是否超过视频容器
      if (event.clientX + canvasElement.width > rootRight) {
        positionLeft = rootRight - canvasElement.width;
        videoContainerElement.style.transform = 'translate(0, -25px)';
      } else {
        videoContainerElement.style.transform = 'translate(-20px, -25px)';
      }
      setHoverInfo({
        left: positionLeft,
        currentTimeTip: transFormDate(videoTotalTime * percent),
        showTip: true,
      });
      createVideoSnippet();
    }, 1000);
  };

  /** 进度条鼠标移开时间 */
  const progressMouseLeave = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    setHoverInfo({ showTip: false, left: 0, currentTimeTip: "" });
  }

  useEffect(() => {
    setVideoCurrentTime(currentTime);
  }, [currentTime])

  return <div
    className={styles.progressContainer}
    onMouseEnter={progressMouseEnter}
    onMouseLeave={progressMouseLeave}
  >
    {/** 显示进度进度条 */}
    <Slider
      value={videoCurrentTime}
      tipFormatter={(value = 0) => {
        return transFormDate(value);
      }}
      max={videoTotalTime}
      onChange={timeUpdateEvent}
      tooltipVisible={false}
    />
    {/** 进度条提示 */}
    <div
      className={styles.progressTips}
      style={{
        left,
        display: showTip ? "block" : "none",
      }}
      id="video-container"
    >
      <canvas id="video-snippet" width="150" height="100" className={styles.videoSnippet}></canvas>
      <span className={styles.timeTip}>{currentTimeTip}</span>
    </div>
  </div>
}

export default VideoProgress;