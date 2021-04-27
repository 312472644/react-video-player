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

declare class VideoPlayer extends React.Component<IPlayer> { }

export default VideoPlayer;