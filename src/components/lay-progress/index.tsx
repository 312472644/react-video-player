import React from 'react';
import classnames from 'classnames';

import '../../style/_progress.scss'

interface IProps {
  size?: 'normal' | 'lager',
  color?: string;
  width: string;
  showPercent?: boolean;
}

/** 进度条 */
const LayuiProgress = (props: IProps) => {
  const { width, size, color, showPercent } = props;

  return <div className={classnames('layui-progress', size === 'lager' ? 'lager' : '')}>
    <div className="layui-progress-bar" style={{ width: `${width}%`, backgroundColor: color }}>
      {showPercent && <span className={size === 'lager' ? 'percent-text_center' : 'percent-text_top'}>{width}%</span>}
    </div>
  </div >
}

export default LayuiProgress;