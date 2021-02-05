import React from 'react';
import classnames from 'classnames';

import '../../style/_checkbox.scss';

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
class CheckBox extends React.Component<ICheckBoxProps> {
    // 复选框分组
    static Group = (group: IGroupProps) => {
        const { children, defaultValue, onChange } = group;

        const checkBoxChange = (value: string, e?: React.MouseEvent) => {
            let checkValueList: string[] = [];
            const event = e as React.MouseEvent;
            const target = event.target as HTMLInputElement;
            const parentElement = target.parentElement?.parentElement;
            const checkBox = parentElement?.querySelectorAll('input[type="checkbox"]:checked');
            checkBox?.forEach(item => {
                const checkValue = item.getAttribute('data-value');
                checkValueList.push(checkValue ? checkValue : '');
            })
            onChange?.(checkValueList.join(','));
        }

        return <div className="checkbox-group">{children.map((item: any, index) => {
            const { value } = item.props as ICheckBoxProps;
            return <CheckBox key={index} isChecked={defaultValue?.includes(value)} {...item.props as ICheckBoxProps} onChange={(value: string, e?: React.MouseEvent) => {
                checkBoxChange(value, e);
            }} />
        })}</div>
    }

    // 获取复选框样式类型
    getClassName = (): string => {
        const { type } = this.props;
        switch (type) {
            case "switch":
                return 'checkbox-switch';
            case "primary":
                return 'checkbox-primary';
            case "init":
                return "";
            default:
                return "checkbox-primary";
        }
    }

    // 复选框单机事件
    clickEvent = (e: React.MouseEvent) => {
        const { onChange } = this.props;
        const target = e.target as HTMLInputElement;
        const { value } = target.dataset;
        const checked = target.checked;
        this.setState({
            isChecked: checked
        })
        onChange?.(checked && value ? value : '', e);
    }

    // 获取复选框文本值
    getCheckText = () => {
        const { switchText } = this.props;
        return switchText ? switchText.split('|') : []
    }

    render() {
        const { value, type, title, disabled, defaultValue, isChecked } = this.props;
        const checkList = this.getCheckText();
        const checked = defaultValue === value || isChecked;

        return <div className={classnames('check-box', this.getClassName())} onClick={this.clickEvent}>
            <input type="checkbox" name={value} data-value={value} disabled={disabled} defaultChecked={checked}></input>
            {type === "switch" ? <div className={classnames("layui-checkbox")}>
                <em>{checked ? checkList[0] : checkList[1]}</em>
                <i></i>
            </div> : <div className={classnames('layui-checkbox')}>
                    <span className='layui-checkbox-text'>{title}</span>
                    <i className="layui-icon-ok"></i>
                </div>}
        </div>
    }
}

export default CheckBox;