import React from 'react';
interface IProps {
    size?: 'normal' | 'lager';
    color?: string;
    width: string;
    showPercent?: boolean;
}
/** 进度条 */
declare const LayuiProgress: (props: IProps) => JSX.Element;
export default LayuiProgress;
