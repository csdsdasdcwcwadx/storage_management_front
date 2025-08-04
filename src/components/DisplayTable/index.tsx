import React, { memo } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchStocks } from "../../api_calls/stocks";
import styles from "./styles.module.scss";

const title = [ "進貨日期", "廠商", "食材名稱", "進貨總價", "進貨數量", "單位", "耗損數量", "耗損成本", "耗損率(%)", "食材分裝份數", "食材單份成本", "單價(含稅)", "實際使用數量", "使用成本", "備註" ];

function DisplayTable () {
    const { data } = useQuery({
        queryKey: ['stocks'],
        queryFn: fetchStocks,
    })

    return (
        <main className={styles.displaytable}>
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
                        data?.map((stock, index) => {
                            const importTotalPrice = stock.stock_Quantity * stock.stock_Price;
                            const usageCost =  stock.stock_Quantity - stock.consumption;
;
                            return (
                                <tr key={ stock.id + "" }>
                                    <td>{ stock.restockDate }</td> {/* 進貨日期 */}
                                    <td>{ stock.vendorName }</td> {/* 廠商 */}
                                    <td>{ stock.stock_Name }</td> {/* 食材名稱 */}
                                    <td>{ importTotalPrice }</td> {/* 進貨總價 */}
                                    <td>{ stock.stock_Quantity }</td> {/* 進貨數量 */}
                                    <td>kg</td> {/* 單位 */}
                                    <td>{ stock.consumption }</td> {/* 耗損數量 */}
                                    <td>{ stock.consumption * stock.stock_Price }</td> {/* 耗損成本 */}
                                    <td>{ stock.consumption / stock.stock_Quantity * 100 }%</td> {/* 耗損率 */}
                                    <td>{ stock.portion }</td> {/* 食材分裝份數 */}
                                    <td>{ importTotalPrice / stock.portion }</td> {/* 食材單份成本 */}
                                    <td>{ stock.stock_Price }</td> {/* 單價 */}
                                    <td>{ usageCost }</td> {/* 實際使用數量 */}
                                    <td>{ usageCost * stock.stock_Price }</td> {/* 使用成本 */}
                                    <td>備註</td> {/* 備註 */}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </main>
    )
}

export default memo(DisplayTable);