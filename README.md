### 说明

😏sugar-video-player 是一个视频播放插件，支持一些基础视频播放设置。

### 安装

```
yarn add sugar-video-player 或者 npm install sugar-video-player
```

### 插件依赖

该插件依赖于 antd 和@ant-design/icons,使用前,请确认依赖是否安装。

### 实例

```
import VideoPlayer from 'sugar-video-player';
ReactDOM.render(<VideoPlayer />, mountNode);
```

##### 引入样式

import 'sugar-video-player/dist/video-player/index.css';

### 代码示例

```
import VideoPlayer from 'sugar-video-player';
import 'sugar-video-player/dist/video-player/index.css';

<VideoPlayer loading={false} option={{
      src: mp4,
      width: '100%',
      height: '300px'
}}></VideoPlayer>
```

### Props 描述

| 属性     | 类型    | 默认值 | 描述                     |
| -------- | ------- | ------ | ------------------------ |
| option   | IProps  | -      | 视频播放设置             |
| loading  | boolean | false  | 视频加载动画             |
| autoPlay | boolean | -      | 是否自动播放             |
| width    | string  | 100%   | 视频播放器宽度           |
| height   | string  | 100%   | 视频播放设置             |
| src      | string  | -      | 视频播放地址             |
| poster   | string  | -      | 视频正在下载时显示的图像 |
| voice    | number  | 20     | 视频播放初始声音大小     |
| loop     | boolean | false  | 视频是否循环播放         |
