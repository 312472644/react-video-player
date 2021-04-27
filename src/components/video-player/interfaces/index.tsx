/** 视频设置参数 */
export interface IVideoSetOption {
  loop?: boolean; // 视频循环播放
}

/** 视频进度条hover */
export interface IVideoProgressHover {
  left: number; // 鼠标左边距 
  currentTimeTip: string, // 当前播放时间
  showTip: boolean,// 是否展示提示
}