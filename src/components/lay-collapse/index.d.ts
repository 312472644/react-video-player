import React from 'react';
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
    children: React.ReactNode;
    onClick?: (flag: boolean, activeId?: string) => void;
}
/**折叠面板 */
declare const LayCollapse: (props: ICollapseProps) => JSX.Element;
/**折叠面板子菜单 */
declare const CollapsePanel: (props: IPanelProps) => JSX.Element;
export { CollapsePanel };
export default LayCollapse;
