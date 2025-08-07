import React, { useState, useEffect, memo, forwardRef, HTMLInputAutoCompleteAttribute } from 'react';
import styles from './styles.module.scss';
import cN from 'classnames';

export enum E_RegexType {
    PHONE = 'PHONE',
    NAME = 'NAME',
    ADDRESS = 'ADDRESS',
    EMAIL = 'EMAIL',
    NUMBER = 'NUMBER',
}

interface I_props {
    title: string;
    placeholder: string;
    type: E_RegexType;
    value?: string | number;
    unnecessary?: boolean;
    trigger?: boolean;
    maxlength: number;
    name?: string;
    autoComplete?: HTMLInputAutoCompleteAttribute;
}

function InputBar ({title, placeholder, type, value, unnecessary, trigger, maxlength, name, autoComplete}: I_props, ref: React.ForwardedRef<HTMLInputElement>) {
    const [input, setInput] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string | undefined>();

    useEffect(() => {
        value && setInput(`${value}`);
    },[value])

    useEffect(() => {
        if(trigger) setErrMsg(undefined);
        else setErrMsg(`${title}必填`);
    },[trigger, title])


    useEffect(() => {
        
        let flag = true;
        const RegexNumTypes = /^[0-9]*$/;
        // const RegexChineseTypes = /^[^\u4e00-\u9fa5]+$/;
        const RegexPhoneNum = /^09\d{8}$/;
        const RegexDecimalPoint = /^\d+$/;
        const Regexmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        switch(type) {
            // 手機驗證，不為空、為數字、為手機格式
            case E_RegexType.PHONE:
                if(!RegexPhoneNum.test(input!)) {
                    flag = false;
                    setErrMsg('此欄位須為手機格式');
                }
                if(!RegexNumTypes.test(input!)) {
                    flag = false;
                    setErrMsg('此欄位須為數字');
                }
                if(!unnecessary && input === '') {
                    flag = false;
                    setErrMsg(`${title}必填`);
                }
                break;
            case E_RegexType.NAME:
            case E_RegexType.ADDRESS:
                if(!unnecessary && input === '') {
                    flag = false;
                    setErrMsg(`${title}必填`);
                }
                break;
            case E_RegexType.EMAIL:
                if(!Regexmail.test(input!)) {
                    flag = false;
                    setErrMsg('此欄位須為信箱格式');
                }
                if(!unnecessary && input === '') {
                    flag = false;
                    setErrMsg(`${title}必填`);
                }
                break;
            case E_RegexType.NUMBER:
                if(!RegexDecimalPoint.test(input!)) {
                    flag = false;
                    setErrMsg('此欄位只允許數字');
                }
                if(!unnecessary && input === '') {
                    flag = false;
                    setErrMsg(`${title}必填`);
                }
                break;
            default:
                if(!unnecessary && input === '') {
                    flag = false;
                    setErrMsg(`${title}必填`);
                }
        }
        if(flag) setErrMsg(undefined);
    },[input, type, unnecessary, title])

    return (
        <div className={styles.inputblock}>
            <span>{title}</span>
            <input
                placeholder={placeholder}
                onChange={e=>setInput(e.target.value)}
                ref={ref}
                defaultValue={value}
                maxLength={maxlength}
                name={name || title}
                autoComplete={autoComplete || "on"}
            />
            {errMsg && <span className={cN(styles.err, 'error')}>{errMsg}</span>}
        </div>
    );
}

export default memo(forwardRef(InputBar));