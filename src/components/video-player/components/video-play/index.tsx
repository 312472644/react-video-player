import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';

import VideoProgress from '../video-progress';

import { hasPrototypeName, transFormDate } from '../../utils';

import styles from './index.module.scss';

interface IVideoPlay {
  videoRef: HTMLVideoElement;
  loading?: boolean;
}

/** 播放状态 */
enum PlayStatus {
  Play = "play",
  Paused = "paused",
}

/** 视频播放 */
const VideoPlay = (props: IVideoPlay) => {
  const { videoRef } = props;
  // 播放状态
  const [playStatus, setPlayStatus] = useState<PlayStatus>();
  // 播放总时长
  const [videoTotalTime, setVideoTotalTime] = useState(0);
  // 当前播放时间
  const [currentTime, setCurrentTime] = useState(0);

  /** 播放事件 */
  const playHandle = () => {
    videoRef.play();
    setPlayStatus(PlayStatus.Paused);
  };

  /** 暂停事件 */
  const pauseEvent = () => {
    videoRef.pause();
    setPlayStatus(PlayStatus.Play);
  };

  /** 视频加载完成事件 */
  const videoLoadEvent = (event: any) => {
    const duration = event.target.duration;
    setVideoTotalTime(duration);
  };

  /** 正在播放事件 */
  const playIngEvent = (event: any) => {
    const currentTime = event.target.currentTime;
    setCurrentTime(currentTime);
  };

  /** 播放结束事件 */
  const endEvent = () => {
    setPlayStatus(PlayStatus.Play);
  };

  /** 事件绑定 */
  const bindEvent = useCallback(() => {
    if (hasPrototypeName(videoRef, 'addEventListener')) {
      videoRef.addEventListener("loadedmetadata", videoLoadEvent);
      videoRef.addEventListener("timeupdate", playIngEvent);
      videoRef.addEventListener("ended", endEvent);
      // 点击播放事件
      videoRef.addEventListener('play', () => {
        setPlayStatus(PlayStatus.Paused);
      });
    }
  }, [videoRef]);

  /** 解除事件监听 */
  const releaseEvent = useCallback(() => {
    if (hasPrototypeName(videoRef, 'addEventListener')) {
      videoRef.removeEventListener('loadedmetadata', videoLoadEvent);
      videoRef.removeEventListener('timeupdate', playIngEvent);
      videoRef.removeEventListener('ended', endEvent);
    }
  }, [videoRef])

  useEffect(() => {
    bindEvent();
  }, [bindEvent]);

  useEffect(() => {
    return () => {
      releaseEvent();
    }
  }, [releaseEvent])

  return <><div className={styles.videoPlayContainer}>
    {/** 播放进度条 */}
    <VideoProgress currentTime={currentTime} videoRef={videoRef} videoTotalTime={videoTotalTime} />
    {PlayStatus.Paused === playStatus || !PlayStatus.Paused ? (
      <PauseOutlined
        className="menuIcon"
        onClick={pauseEvent}
      />
    ) : (
      <CaretRightOutlined
        className="menuIcon"
        onClick={playHandle}
      />
    )}
    {/** 播放时间信息 */}
    <div className={styles.videoTime}>
      <span>{transFormDate(currentTime)}</span>
      <span className={styles.splitChar}>/</span>
      <span>{transFormDate(videoTotalTime)}</span>
    </div>
  </div>
  </>
}

export default VideoPlay;