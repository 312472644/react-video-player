import React from 'react';

import '../../style/_radio.scss';

interface IRadioProps {
    title: string;
    value: string;
    name: string;
    onChange?: (value: string) => void;
}

interface IRadioState {
    isChecked: boolean
}

interface IRadioGroupProps extends JSX.IntrinsicAttributes {
    value: string;
    onChange?: (value: string) => void;
    children: JSX.Element[];
}

/** 单选框 */
class Radio extends React.Component<IRadioProps, IRadioState>{

    constructor(props: IRadioProps) {
        super(props);
        this.state = { isChecked: false };
    }

    static Group = (group: IRadioGroupProps) => {
        const { children, onChange } = group;

        return <div className="radio-group">{children.map((item: any, index) => {
            return <Radio key={index} {...item.props as IRadioProps} onChange={onChange} />;
        })}</div>
    }

    // 单选按钮点击事件
    radioClickEvent = (e: React.MouseEvent) => {
        const { onChange } = this.props;
        const element = e.target as HTMLInputElement;
        const checkValue = element.dataset.value;
        onChange?.(checkValue ? checkValue : '');
        this.setState({
            isChecked: true
        })
    }

    render() {
        const { title, value, name } = this.props;
        const { isChecked } = this.state;
        return <div className="layui-radio" onClick={this.radioClickEvent} >
            <input type="radio" name={name} className="native-radio" data-value={value} defaultChecked={isChecked} />
            <i className="layui-icon"></i>
            <span className="radio-text">{title}</span>
        </div >
    }
}

export default Radio;