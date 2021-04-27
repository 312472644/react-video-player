import { PlayCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { hasPrototypeName } from '../../utils';

import styles from './index.module.scss';

interface IVideoPauseDialog {
  visible: boolean;
  videoRef: HTMLVideoElement;
}

/** 视频暂停弹框 */
const VideoPauseDialog = (props: IVideoPauseDialog) => {
  const { visible, videoRef } = props;
  const [showFlag, setShowFlag] = useState(visible);

  const onClickHandle = () => {
    videoRef.play();
    setShowFlag(false);
  }

  /** 暂停 */
  const pauseHandle = () => {
    setShowFlag(true);
  }

  useEffect(() => { setShowFlag(visible) }, [visible]);

  useEffect(() => {
    if (hasPrototypeName(videoRef, 'addEventListener')) {
      videoRef.addEventListener('pause', pauseHandle);
    }
    return () => {
      if (hasPrototypeName(videoRef, 'addEventListener')) {
        videoRef.removeEventListener('pause', pauseHandle);
      }
    }
  }, [videoRef]);

  return showFlag ? (
    <div className={styles.pauseDialog}>
      <PlayCircleOutlined
        style={{ fontSize: "60px", color: "#fff" }}
        onClick={onClickHandle}
      />
    </div>
  ) : null;
}

export default VideoPauseDialog;
