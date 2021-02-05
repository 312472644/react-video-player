import React from 'react';
import classnames from 'classnames';

import '../../style/_tab.scss';

interface ITabProps {
  defaultActiveKey?: string; // 默认选中
  children: React.ReactNode; // tab子选项
  onChange?: (item: ITabTitle) => void; // 点击选项卡切换事件
  theme?: 'default' | 'simple' | 'card';  // tab 样式 
}

interface ITabState {
  tabList: ITabTitle[],
  activeKey: string;
}

interface ITabTitle {
  title: string; // tab 文案
  name: string;  // tab key
  disabled?: boolean; // 是否禁用
  children?: React.ReactNode;
  render?: () => React.ReactElement; // tab title 重新渲染
}

interface ITabPanelProps extends ITabTitle {
  children?: React.ReactNode;
  activeName?: string;
}

// 主体map
const themeMap: Map<string, string> = new Map();
themeMap.set('default', 'layui-tab-title');
themeMap.set('simple', 'layui-simple');
themeMap.set('card', 'layui-card');

/** 选项卡内容 */
const TabPanel = (tabPanelProps: ITabPanelProps) => {
  const { children, activeName, name } = tabPanelProps;
  return (activeName === name ? <div className="tab-content">{children}</div> : null);
}

/** tab 选项卡 */
class LayTab extends React.Component<ITabProps, ITabState> {
  static defaultProps = {
    theme: 'default'
  };

  constructor(props: ITabProps) {
    super(props);
    this.state = {
      tabList: [],
      activeKey: '',
    };
  }

  /** 获取tablist列表 */
  getTabTitleList = () => {
    const { tabList } = this.state;
    const { children, defaultActiveKey } = this.props;
    const childrenList = [];

    if (Array.isArray(children)) {
      childrenList.push(...children);
    } else {
      childrenList.push(children);
    }

    childrenList.forEach((item: any) => {
      const { title, name, children, disabled, render } = item.props;
      tabList.push({
        disabled,
        title,
        name,
        children,
        render
      })
    })

    this.setState({
      tabList,
      activeKey: defaultActiveKey || tabList[0].name
    });
  }

  componentDidMount() {
    this.getTabTitleList();
  }

  /** 选项卡切换 */
  clickHandle = (tabItem: ITabTitle) => {
    const { onChange } = this.props;
    const { title, name } = tabItem;
    if (tabItem.disabled) {
      return;
    }
    this.setState({
      activeKey: tabItem.name
    })
    onChange?.({
      title,
      name
    });
  }

  render() {
    const { children, theme = '' } = this.props;
    const { tabList, activeKey } = this.state;
    return <div className={classnames("layui-tab", themeMap.get(theme))}>
      <div className="layui-tab-title">
        {/** 头部 */}
        <ul>
          {tabList.map((item) => {
            return <li key={item.name} onClick={() => { this.clickHandle(item) }} className={classnames(activeKey === item.name ? 'layui-this' : '', item.disabled ? 'disabled' : '')}>{item.render ? item.render() : item.title}</li>;
          })}
        </ul>
      </div>
      <div className="layui-tab-content">
        {React.Children.map(children, (child: any) => {
          if (child.type === TabPanel) {
            const { name, children } = child.props;
            return React.cloneElement(child, {
              activeName: activeKey,
              children,
              name,
            });
          }
        })}
      </div>
    </div >
  }
}

export { TabPanel };

export default LayTab;