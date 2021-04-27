import React from 'react';
interface ICheckBoxProps {
    type?: 'switch' | 'init' | 'primary';
    value: string;
    title?: string;
    disabled?: boolean;
    isChecked?: boolean;
    switchText?: string;
    defaultValue?: string;
    onChange?: (value: string, e?: React.MouseEvent) => void;
}
interface IGroupProps extends JSX.IntrinsicAttributes {
    defaultValue?: string[];
    children: JSX.Element[];
    onChange?: (value: string) => void;
}
/** 复选框 */
declare class CheckBox extends React.Component<ICheckBoxProps> {
    static Group: (group: IGroupProps) => JSX.Element;
    getClassName: () => string;
    clickEvent: (e: React.MouseEvent) => void;
    getCheckText: () => string[];
    render(): JSX.Element;
}
export default CheckBox;
