import React, { useState, useEffect } from 'react';
import { ExpandOutlined } from '@ant-design/icons';
import { hasPrototypeName } from '../../utils';

import styles from './index.module.scss';

interface IVideoPlayOutSide {
  videoRef: HTMLVideoElement;
}

/** 画中画 */
const VideoPlayOutSide = (props: IVideoPlayOutSide) => {
  let isOutSide = false;
  const { videoRef } = props;

  /** 是否支持该特性 */
  const [isSupport, setIsSupport] = useState(false);

  const clickHandle = () => {
    if (!isOutSide) {
      (videoRef as any).requestPictureInPicture();
    } else {
      (document as any).exitPictureInPicture();
    }
    isOutSide = !isOutSide;
  }

  useEffect(() => {
    setIsSupport(hasPrototypeName(videoRef, 'requestPictureInPicture'));
  }, [videoRef])

  return <div className={styles.playOutSide}>
    {
      isSupport ? <ExpandOutlined className="menuIcon" title="画中画" onClick={clickHandle} /> : null
    }
  </div>
}

export default VideoPlayOutSide;