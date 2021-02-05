import React from 'react';
import classname from 'classnames';
import '../../style/_button.scss';

interface IButtonProps extends JSX.IntrinsicAttributes {
    type?: 'init' | 'normal' | 'warm' | 'danger';
    disabled?: boolean;
    children: string;
    size?: 'lg' | 'sm' | 'xs',
    radius?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

interface IGroupProps extends JSX.IntrinsicAttributes {
    children: JSX.Element[] | JSX.Element;
}

/** 按钮*/
class Button extends React.Component<IButtonProps> {
    // 按钮组
    static Group = (groups: IGroupProps) => {
        return (<div className={'btn-group'}>{groups.children}</div>)
    }

    calcClassName = (propValue?: string | boolean): string => {
        return propValue ? `btn-${propValue}` : "";
    }

    render() {
        const { type, disabled, children, size, radius, onClick } = this.props;
        return (<><button onClick={onClick} disabled={disabled} className={classname('button', this.calcClassName(radius), this.calcClassName(type), this.calcClassName(size))}>{children}</button></>);
    }
}

export default Button;