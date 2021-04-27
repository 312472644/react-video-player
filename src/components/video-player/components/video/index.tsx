import React, { useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';

interface IVideo {
  autoPlay?: boolean;
  src: string;
  getInstance: (el: HTMLVideoElement) => void;
}

/** 原生视频控件 */
const Video = (props: IVideo) => {
  let videoRef = useRef<HTMLVideoElement | null>(null);
  const { autoPlay, src, getInstance } = props;
  // 播放地址
  const [playUrl, setPlayUrl] = useState(src);

  useEffect(() => {
    setPlayUrl(src);
    if (videoRef) {
      videoRef.current?.load();
    }
  }, [src, videoRef]);

  return <video
    id="video"
    ref={(el) => {
      if (el && typeof getInstance === 'function') {
        getInstance(el);
        videoRef.current = el;
      }
    }}
    className={styles.video}
    autoPlay={autoPlay}
  >
    <source src={playUrl} type="video/mp4"></source>
  </video >
}

export default Video;