import React, { useEffect, useState } from "react";
import classnames from "classnames";

import Video from './components/video';
import VideoPlay from './components/video-play';
import VideoVoice from './components/video-voice';
import VideoSpeed from './components/video-speed';
import VideoSetting from './components/video-setting';
import VideoFullScreen from './components/video-full-screen';
import VideoPauseDialog from './components/video-pause-dialog';
import VideoLoading from './components/video-loading';
import VideoPlayOutSide from './components/video-play-out-side';

import "antd/dist/antd.css";
import styles from "./index.module.scss";

/** 视频基本信息 */
interface IProps {
  autoPlay?: boolean; // 是否自动播放
  width?: string; // 视频宽度
  height?: string; // 视频高度
  src: string; // 视频播放地址
  poster?: string; // 视频正在下载时显示的图像
  voice?: number; // 初始声音大小
  loop?: boolean; // 是否循环播放
}

/** 视频对外提供参数 */
interface IPlayer {
  option: IProps;
  loading: boolean; // 加载动画
}

/** 视频播放 */
const VideoPlayer = (props: IPlayer) => {
  const { option, loading = true } = props;
  const { src, width, height, voice, loop, autoPlay } = option;
  const [videoRef, setVideoRef] = useState<HTMLVideoElement>({} as HTMLVideoElement);
  // 是否全屏
  const [isFullScreen, setIsFullScreen] = useState(false);
  // 是否为播放状态
  const [showPauseDialog, setShowPauseDialog] = useState(false);

  useEffect(() => {
    if (!loading) {
      setShowPauseDialog(true);
    }
  }, [loading])

  return (
    <div
      className={classnames(
        styles.videoContainer,
        isFullScreen ? styles.fullScreen : ""
      )}
      style={{ width: width, height: height }}
      id="video-player"
    >
      {/** 播放器 */}
      <div className={styles.videoWrapper}>
        <Video src={src} getInstance={(el) => setVideoRef(el)} autoPlay={autoPlay}></Video>
        <div className={classnames(styles.videoMenu)}>
          {/** 播放菜单 */}
          <div className={styles.videoOperation}>
            <div className={styles.left}>
              <VideoPlay videoRef={videoRef} />
            </div>
            <div className={classnames(styles.right, styles.set)}>
              {/** 倍速 */}
              <VideoSpeed videoRef={videoRef} />
              {/** 声音 */}
              <VideoVoice videoRef={videoRef} voice={voice} />
              {/** 设置 */}
              <VideoSetting videoRef={videoRef} loop={loop} />
              {/** 画中画 */}
              <VideoPlayOutSide videoRef={videoRef} />
              {/** 是否全屏 */}
              <VideoFullScreen screenResize={(flag) => {
                setIsFullScreen(flag);
              }} />
            </div>
          </div>
        </div>
      </div>
      {/** 加载动画 */}
      <VideoLoading visible={loading} />
      {/** 暂停遮罩层 */}
      <VideoPauseDialog visible={showPauseDialog} videoRef={videoRef} />
    </div>
  );
};

export default VideoPlayer;
