import React, { memo, ReactNode, useEffect, useState } from "react";
import styles from './styles.module.scss';
import cN from 'classnames';

export enum E_direction {
    TOP = 'TOP',
    LEFT = 'LEFT',
    BOTTOM = 'BOTTOM',
    RIGHT = 'RIGHT',
}

type I_props = {
    isOpen: boolean;
    handleDispatch: Function;
    children: ReactNode;
    direction: E_direction;
    theName: string;
    isOverflow?: boolean;
}

function LightBox ({isOpen, handleDispatch, children, direction, theName, isOverflow}: I_props) {
    const [dark, setDark] = useState<boolean>(false);

    useEffect (()=>{
        const { body } = document;
        const parent = document.querySelector(`.blocker .${theName}`) as HTMLElement;
        const blocker = parent.parentNode as HTMLElement;
        if(isOpen) {
            blocker?.setAttribute('style', `display: block; background-color: ${getComputedStyle(parent).backgroundColor};`);
            setDark(true);
            body.classList.add(styles.lockpage);
            setTimeout(()=>{
                blocker?.classList.add(styles.show);
            },10)
        }else{
            blocker?.classList.remove(styles.show);
            setTimeout(()=>{
                setDark(false);
                body.classList.remove(styles.lockpage);
                blocker?.removeAttribute('style');
            },500)
        }
    },[isOpen, theName])

    return (
        <>
            <div className={cN([styles.blocker], 'blocker', styles[direction], {[styles.overflow]: isOverflow})}>
                <span className={cN(styles.close)} onClick={()=>handleDispatch(false)}>
                    {/* <i className="icon ic-ln toolclose" /> */}
                </span>
                {children}
            </div>
            <div className={cN({[styles.background]:dark})} onClick={()=>handleDispatch(false)}> </div>
        </>
    )
}

export default memo(LightBox);