import React, { useState, useEffect } from 'react';
import Input from '../lay-input';
import classnames from 'classnames';
import '../../style/_select.scss';

interface IOption {
    label: string;
    value: string;
    disabled?: boolean;
}

interface ISelectProps {
    value?: IOption,
    data: IOption[],
    tips?: IOption,
    placeholder?: string;
    filter?: boolean;
    onSelect?: (item: IOption) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/** 单选框 */
const Select = (props: ISelectProps) => {
    const { data, onSelect, value, placeholder, tips, filter, onChange } = props;

    const [openStatus, setOpenStatus] = useState(false);
    const [selectItem, setSelectItem] = useState({ label: '', value: '' });
    const [inputValue, setInputValue] = useState('');
    const [isCover, setIsCover] = useState(false);
    const [dataList, setDataList] = useState<IOption[]>([]);

    const titleClickEvent = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenStatus(!openStatus);
        isCoverContent(e);
        focusInput(e);
    }

    // 文本框获取焦点
    const focusInput = (e: React.MouseEvent) => {
        if (!filter) {
            return;
        }
        const { target } = e;
        const element = target as HTMLInputElement;
        // 父元素节点
        const parentElement = element.parentElement;
        const inputElement = parentElement?.querySelector(".lay-input") as HTMLInputElement;
        inputElement.focus();
    }

    // 是否超过当前页面高度
    const isCoverContent = (e: React.MouseEvent) => {
        const { target } = e;
        const element = target as HTMLElement;
        // 父元素节点
        const parentElement = element.parentElement;
        const clientRects = parentElement?.getClientRects() || [];
        const { top = 0, height = 0 } = clientRects[0];
        const dlHeight = data.length * 38 + 2;
        const contentHight = dlHeight + top + height;
        const docClientHight = document.documentElement.clientHeight;
        setIsCover(docClientHight < contentHight);
    }

    // 选中事件
    const select = (item: IOption, index: string) => {
        if (item.disabled) {
            return;
        }
        setSelectItem(item);
        setOpenStatus(false);
        setInputValue(item.label);
        onSelect?.(item);
    }

    // document点击事件
    const clickEvent = (e: MouseEvent) => {
        setOpenStatus(false);
    }

    // 初始化值
    const initSelect = () => {
        if (tips) {
            data.unshift(tips);
        }
        setDataList(JSON.parse(JSON.stringify(data)));
        const element = data.find(item => { return item.label === value?.label });
        if (element) {
            setSelectItem(element);
            setInputValue(element.label)
        }
    };

    // 输入事件
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const filterResult = data.filter(item => {
            return item.label.includes(value.trim());
        });
        setDataList(filterResult);
        setInputValue(value);
        onChange?.(e);
    }

    useEffect(() => {
        initSelect();
        document.addEventListener('click', clickEvent);
        return () => { document.removeEventListener('click', clickEvent) };
    }, []);

    return (
        <div className={classnames("lay-select", openStatus ? "selected" : "")}>
            <div className="layui-select-title" onClick={(e: React.MouseEvent) => { titleClickEvent(e) }}>
                <Input readonly={!filter} onChange={inputChange} value={inputValue} placeholder={placeholder} />
                <i className="layui-edge"></i>
            </div>
            <dd className={classnames("layui-select-content", `${isCover ? 'selectup' : ''}`)}>
                {
                    dataList.length ? dataList.map((item, index) => {
                        return <dl key={index} onClick={() => { select(item, index.toString()) }} className={classnames(`${item.label === selectItem.label ? 'dl-this' : ''}`, `${tips && index === 0 ? 'select-tips' : ''}`, `${item.disabled ? 'dl-disabled' : ''}`)}>{item.label}</dl>
                    }) : <dl className="select-none">无匹配项</dl>
                }
            </dd>
        </div>
    )
}

export default Select;