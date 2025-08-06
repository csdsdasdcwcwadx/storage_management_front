import React, { memo, useRef, useState } from "react";
// import { useQuery } from '@tanstack/react-query';
// import { fetchStocks } from "../../api_calls/stocks";
import styles from "./styles.module.scss";
import Dialog, { E_direction } from "../Common/Modules/Dialog";
import InputBar, { E_RegexType } from "../Common/Modules/InputBar";
import { I_Stock } from "../../interfaces/stocks";

const title = [ "進貨日期", "廠商", "食材名稱", "進貨總價", "進貨數量", "單位", "耗損數量", "耗損成本", "耗損率(%)", "食材分裝份數", "食材單份成本", "單價(含稅)", "實際使用數量", "使用成本", "備註" ];

function DisplayTable () {
    // const { data } = useQuery({
    //     queryKey: ['stocks'],
    //     queryFn: fetchStocks,
    // })
    const [stockData, setStockData] = useState<I_Stock[]>([]);
    const [open, setOpen] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const portionRef = useRef<HTMLInputElement>(null);
    const consumptionRef = useRef<HTMLInputElement>(null);
    const vendorRef = useRef<HTMLInputElement>(null);
    const restockRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <main className={styles.displaytable}>
                <button onClick={() => setOpen(true)}>新增訂單</button>
                <table>
                    <thead>
                        <tr>
                            {
                                title.map(name => {
                                    return <th key={name}>{name}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stockData?.map((stock, index) => {
                                const importTotalPrice = stock.stock_Quantity * stock.stock_Price;
                                const usageCost = stock.stock_Quantity - stock.consumption;
                                return (
                                    <tr key={stock.createdAt}>
                                        <td>{stock.restockDate}</td>
                                        <td>{stock.vendorName}</td>
                                        <td>{stock.stock_Name}</td>
                                        <td>{importTotalPrice}</td>
                                        <td>{stock.stock_Quantity}</td>
                                        <td>kg</td>
                                        <td>{stock.consumption}</td>
                                        <td>{stock.consumption * stock.stock_Price}</td>
                                        <td>{(stock.consumption / stock.stock_Quantity * 100).toFixed(2)}%</td>
                                        <td>{stock.portion}</td>
                                        <td>{(importTotalPrice / stock.portion).toFixed(2)}</td>
                                        <td>{stock.stock_Price}</td>
                                        <td>{usageCost}</td>
                                        <td>{(usageCost * stock.stock_Price).toFixed(2)}</td>
                                        <td>{stock.stock_Description}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </main>
            <Dialog isOpen={open} handleDispatch={setOpen} direction={E_direction.TOP} theName={styles.adddialog}>
                <div className={styles.adddialog}>
                    <InputBar title='姓名' placeholder='請輸入姓名' type={E_RegexType.NAME} ref={nameRef} maxlength={10}/>
                    <InputBar title='價格' placeholder='請輸入價格' type={E_RegexType.NUMBER} ref={priceRef} maxlength={10}/>
                    <InputBar title='數量' placeholder='請輸入數量' type={E_RegexType.NUMBER} ref={quantityRef} maxlength={10}/>
                    <InputBar title='備註' placeholder='請輸入備註' type={E_RegexType.NAME} ref={descriptionRef} maxlength={10}/>
                    <InputBar title='份數' placeholder='請輸入份數' type={E_RegexType.NUMBER} ref={portionRef} maxlength={10}/>
                    <InputBar title='消耗量' placeholder='請輸入消耗量' type={E_RegexType.NUMBER} ref={consumptionRef} maxlength={10}/>
                    <InputBar title='供應商名稱' placeholder='請輸入供應商名稱' type={E_RegexType.NAME} ref={vendorRef} maxlength={10}/>
                    <InputBar title='庫存日期' placeholder='請輸入庫存日期' type={E_RegexType.NAME} ref={restockRef} maxlength={10}/>
                    <div>
                        <button onClick={() => {
                            const config: I_Stock = {
                                id: 0,
                                stock_Name: nameRef?.current?.value || "",
                                stock_Price: parseFloat(priceRef?.current?.value || "0"),
                                stock_Quantity: parseFloat(quantityRef?.current?.value || "0"),
                                stock_Description: descriptionRef?.current?.value || "",
                                portion: parseFloat(portionRef?.current?.value || "0"),
                                consumption: parseFloat(consumptionRef?.current?.value || "0"),
                                vendorName: vendorRef?.current?.value || "",
                                restockDate: restockRef?.current?.value || "",
                                createdAt: new Date().toDateString(),
                            }
                            setStockData(stocks => [...stocks, { ...config, id: stocks.length + 1 }]);
                            setOpen(false);
                            nameRef.current!.value = "";
                            priceRef.current!.value = "";
                            quantityRef.current!.value = "";
                            descriptionRef.current!.value = "";
                            portionRef.current!.value = "";
                            consumptionRef.current!.value = "";
                            vendorRef.current!.value = "";
                            restockRef.current!.value = "";
                        }}>確認</button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default memo(DisplayTable);