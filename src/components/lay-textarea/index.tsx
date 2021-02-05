import React, { useState } from 'react';
import classnames from 'classnames';

import '../../style/_textarea.scss';

interface IProps {
    value: string;
    placeHolder?: string;
    limit?: number;
    onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

/** 文本域 */
const TextArea = (props: IProps) => {
    const { value, limit, onChange } = props;
    const [inputCount, setInputCount] = useState(0);

    const changeEvent = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const { value } = e.target as HTMLTextAreaElement;
        onChange?.(e);
        setInputCount(value.trim().length);
    }

    return <div className="layui-textarea-container">
        <textarea maxLength={limit} value={value} className="layui-textarea" onInput={changeEvent}></textarea>
        <div className="layui-limit">
            <span className={classnames('use-word-count', `${inputCount === limit ? 'is-max' : ''}`)}>{inputCount || value.trim().length}</span>
            <span className="total-word">/{limit}</span>
        </div>
    </div>
}

export default TextArea;