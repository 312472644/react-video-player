import React from 'react';
interface IOption {
    label: string;
    value: string;
    disabled?: boolean;
}
interface ISelectProps {
    value?: IOption;
    data: IOption[];
    tips?: IOption;
    placeholder?: string;
    filter?: boolean;
    onSelect?: (item: IOption) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
/** 单选框 */
declare const Select: (props: ISelectProps) => JSX.Element;
export default Select;
