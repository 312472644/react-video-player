import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';

interface IVideoFullScreen {
  screenResize: (isFullScreen: boolean) => void;
}

/** 视频全屏 */
const VideoFullScreen = (props: IVideoFullScreen) => {
  const { screenResize } = props;
  // 是否全屏
  const [isFullScreen, setIsFullScreen] = useState(false);

  const resizeHandle = useCallback(() => {
    if (isFullScreen) {
      return;
    }
    if (document.fullscreenElement === null) {
      setIsFullScreen(false);
      screenResize(false);
    }
  }, [isFullScreen, screenResize])

  /** 窗口大小事件 */
  const windowResize = useCallback(() => {
    window.addEventListener("resize", resizeHandle);
  }, [resizeHandle]);

  /** 视频全屏或退出全屏 */
  const fullScreen = () => {
    if (document.fullscreenElement === null) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
    screenResize(!isFullScreen);
  };

  useEffect(() => {
    windowResize();
  }, [windowResize]);

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', resizeHandle);
    }
  }, [resizeHandle])

  return <div>
    {isFullScreen ? (
      <FullscreenExitOutlined
        title="退出全屏"
        className="menuIcon"
        onClick={fullScreen}
      />
    ) : (
      <FullscreenOutlined
        title="全屏"
        className="menuIcon"
        onClick={fullScreen}
      ></FullscreenOutlined>
    )}
  </div>
}

export default VideoFullScreen;