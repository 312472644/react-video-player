import React from 'react';
interface IButtonProps extends JSX.IntrinsicAttributes {
    type?: 'init' | 'normal' | 'warm' | 'danger';
    disabled?: boolean;
    children: string;
    size?: 'lg' | 'sm' | 'xs';
    radius?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}
interface IGroupProps extends JSX.IntrinsicAttributes {
    children: JSX.Element[] | JSX.Element;
}
/** 按钮*/
declare class Button extends React.Component<IButtonProps> {
    static Group: (groups: IGroupProps) => JSX.Element;
    calcClassName: (propValue?: string | boolean | undefined) => string;
    render(): JSX.Element;
}
export default Button;