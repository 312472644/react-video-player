import { Spin } from 'antd';
import React from 'react';

import styles from './index.module.scss';

interface IVideoLoading {
  visible: boolean;
}

/** 视屏加载动画 */
const VideoLoading = (props: IVideoLoading) => {
  const { visible } = props;
  return visible ? <div className={styles.videoLoad}>
    <Spin tip="视频正在加载中..." className={styles.loading}></Spin>
  </div> : null;
}

export default VideoLoading;