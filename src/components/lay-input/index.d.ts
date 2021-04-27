import React from 'react';
interface IInputProps {
    placeholder?: string;
    value?: string;
    error?: boolean;
    readonly?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent) => void;
}
/** 输入框 */
declare const Input: (props: IInputProps) => JSX.Element;
export default Input;
