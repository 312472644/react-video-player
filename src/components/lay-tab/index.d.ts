import React from 'react';
interface ITabProps {
    defaultActiveKey?: string;
    children: React.ReactNode;
    onChange?: (item: ITabTitle) => void;
    theme?: 'default' | 'simple' | 'card';
}
interface ITabState {
    tabList: ITabTitle[];
    activeKey: string;
}
interface ITabTitle {
    title: string;
    name: string;
    disabled?: boolean;
    children?: React.ReactNode;
    render?: () => React.ReactElement;
}
interface ITabPanelProps extends ITabTitle {
    children?: React.ReactNode;
    activeName?: string;
}
/** 选项卡内容 */
declare const TabPanel: (tabPanelProps: ITabPanelProps) => JSX.Element | null;
/** tab 选项卡 */
declare class LayTab extends React.Component<ITabProps, ITabState> {
    static defaultProps: {
        theme: string;
    };
    constructor(props: ITabProps);
    /** 获取tablist列表 */
    getTabTitleList: () => void;
    componentDidMount(): void;
    /** 选项卡切换 */
    clickHandle: (tabItem: ITabTitle) => void;
    render(): JSX.Element;
}
export { TabPanel };
export default LayTab;
