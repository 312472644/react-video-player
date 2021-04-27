import React, { useEffect, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Popover, Switch } from 'antd';

import styles from './index.module.scss';

interface IVideoSetting {
  videoRef: HTMLVideoElement;
  loop?: boolean; // 是否是循环播放
}

/** 视频设置 */
const VideoSetting = (props: IVideoSetting) => {
  const { videoRef, loop = false } = props;
  const [isLoop, setIsLoop] = useState(loop);

  useEffect(() => {
    videoRef.loop = loop;
  }, [videoRef, loop])
  /** 渲染视频设置 */
  const renderSet = () => {
    return (
      <div className={styles.videoSet}>
        <span className={styles.videoSetText}>循环播放</span>
        <Switch
          checked={isLoop}
          onChange={(checked: boolean) => {
            setIsLoop(checked);
            videoRef.loop = checked;
          }}
        ></Switch>
      </div>
    );
  };
  return <div className={styles.speedContainer}>
    <Popover
      trigger="click"
      overlayClassName={styles.popoverSet}
      content={renderSet}
    >
      <SettingOutlined className="menuIcon" />
    </Popover>
  </div>
}

export default VideoSetting;