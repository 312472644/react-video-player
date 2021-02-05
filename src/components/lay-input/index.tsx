import React from 'react';
import classnames from 'classnames';
import '../../style/_input.scss';

interface IInputProps {
    placeholder?: string;
    value?: string;
    error?: boolean;
    readonly?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent) => void;
}

/** 输入框 */
const Input = (props: IInputProps) => {
    const { placeholder, value, error, readonly, onChange, onBlur } = props;
    return (<><input type="text" onBlur={onBlur} readOnly={readonly} className={classnames('lay-input', `${error ? 'error' : ''}`)} onChange={onChange} value={value} placeholder={placeholder ? placeholder : '请输入内容'}></input></>);
}

export default Input;