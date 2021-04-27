import React from 'react';
import ReactDOM from 'react-dom';

import VideoPlayer from 'sugar-video-player';
import 'sugar-video-player/dist/video-player/index.css'

import mp4 from './mv.mp4';

ReactDOM.render(
  <React.StrictMode>
    <VideoPlayer loading={false} option={{
      src: mp4,
      width: '100%',
      height: '300px'
    }}></VideoPlayer>
  </React.StrictMode>,
  document.getElementById('root')
);
