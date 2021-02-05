import React from 'react';
import classnames from 'classnames';

import '../../style/_menu.scss';

interface IMenuProps extends JSX.IntrinsicAttributes {
    mode: 'horizontal' | 'vertical',
    theme?: 'green' | 'blue';
    children: JSX.Element | JSX.Element[];
    onClick?: () => void;
}

interface IMenuItemProps extends JSX.IntrinsicAttributes {
    id: string;
    title?: string;
    disabled?: boolean;
    children: JSX.Element | string;
}

interface ISubMenuProps extends JSX.IntrinsicAttributes {
    title: string;
    children: JSX.Element[];
}

class Menu extends React.Component<IMenuProps>{
    // 子菜单
    static SubMenu = (props: ISubMenuProps) => {
        const { children } = props;
        console.log('IMenuProps', children);
        return (<ul className={classnames('sub-nav-item')}>
            <li className="sub-item">{children}</li>
        </ul>)
    }

    // 菜单选项
    static Item = (props: IMenuItemProps) => {
        const { children, id } = props;
        console.log('IMenuItemProps', props);
        return <li key={id} className="layui-nav-item"><span className="nav-item-text" {...props}>{children}</span></li>
    }

    // 获取主题颜色
    getThemeColor = () => {
        const { theme } = this.props;
        switch (theme) {
            case "blue":
                return 'blue-theme';
            case "green":
                return 'green-theme';
            default:
                return '';
        }
    }

    render() {
        const { children, mode } = this.props;
        console.log(children);
        return <div className={classnames("menu-container", `${mode === 'vertical' ? 'menu-vertical' : ''}`, this.getThemeColor())}>
            {children}
        </div>
    }
}

export default Menu;