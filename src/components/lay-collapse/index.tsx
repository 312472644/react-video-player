import React, { useState } from 'react';
import classnames from 'classnames';
import { RightOutlined, UpOutlined } from '@ant-design/icons';

import '../../style/_collapse.scss';

interface ICollapseProps {
  children: React.ReactNode;
  accordion?: boolean;
  activeKey?: string | string[];
  onChange?: (flag: boolean, activeId?: string) => void;
}

interface IPanelProps {
  header: string;
  id: string;
  active?: boolean;
  children: React.ReactNode
  onClick?: (flag: boolean, activeId?: string) => void;
}

/**折叠面板 */
const LayCollapse = (props: ICollapseProps) => {
  const { children, onChange } = props;
  const [activeKey, setActiveId] = useState('');

  const panelClick = (flag: boolean, activeId: string) => {
    onChange?.(flag, activeId);
    setActiveId(activeId);
  }

  return <div className="layui-collapse">
    {React.Children.map(children, (child: any) => {
      return <CollapsePanel active={activeKey === child.props.id} {...child.props} onClick={panelClick}></CollapsePanel>
    })}
  </div>
}

/**折叠面板子菜单 */
const CollapsePanel = (props: IPanelProps) => {
  const { children, header, id, active, onClick } = props;
  const [show, setShow] = useState(active);

  const collapseClick = (id: string) => {
    setShow(!show);
    onClick?.(!show, id);
  }

  return <div className="layui-colla-item">
    <div className="layui-colla-title" onClick={() => { collapseClick(id) }}>
      {show ? <UpOutlined className="icon" style={{ fontSize: 12 }} /> : <RightOutlined className="icon" style={{ fontSize: 12 }} />}
      <span>{header}</span>
    </div>
    <div className={classnames("layui-colla-content", !show ? 'hide' : '')}>
      {children}
    </div>
  </div>;
}

export { CollapsePanel }

export default LayCollapse;