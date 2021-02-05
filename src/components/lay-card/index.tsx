import React from 'react';

import '../../style/_card.scss';

interface IProps {
  title: string;
  children: React.ReactNode
}

/**卡片面板 */
const LayCard = (props: IProps) => {
  const { children, title } = props;
  return <div className="layui-card">
    <div className="layui-card-header">{title}</div>
    <div className="layui-card-body">{children}</div>
  </div>;
}

export default LayCard;