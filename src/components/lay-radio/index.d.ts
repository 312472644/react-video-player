import React from 'react';
interface IRadioProps {
    title: string;
    value: string;
    name: string;
    onChange?: (value: string) => void;
}
interface IRadioState {
    isChecked: boolean;
}
interface IRadioGroupProps extends JSX.IntrinsicAttributes {
    value: string;
    onChange?: (value: string) => void;
    children: JSX.Element[];
}
/** 单选框 */
declare class Radio extends React.Component<IRadioProps, IRadioState> {
    constructor(props: IRadioProps);
    static Group: (group: IRadioGroupProps) => JSX.Element;
    radioClickEvent: (e: React.MouseEvent) => void;
    render(): JSX.Element;
}
export default Radio;
