import React, { Fragment, useEffect, useState } from 'react'
import styles from '../../style.module.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import GoBackButton from '@/components/Button/GoBackButton';
import SortSelect from '@/components/Select/SortSelect';
import CustomerEquityTable from '@/components/Table/CustomerEquity';
import { useRouter } from 'next/router';
import axiosInstance from '@/utils/axiosIntance';
import CustomSkeletion from '@/components/Skeleton/CustomSkeletion';
import { getCustumerDetailsAsset, getCustumerDetailsEquity } from '@/apiClient/customerAccount';
const sortItems = [
    {
        value: 'name',
        Label: 'CCQ'
    },
    {
        value: 'type',
        Label: 'Loại quỹ'
    },
    {
        value: 'company',
        Label: 'Công ty'
    },
    {
        value: 'amount',
        Label: 'Số lượng'
    },
    {
        value: 'purchased_price',
        Label: 'Giá trị'
    },
    {
        value: 'percentage_percent',
        Label: '% Tài sản'
    },
    {
        value: 'profit',
        Label: 'Lợi nhuận'
    },
    {
        value: 'percentage',
        Label: 'Lợi nhuận %'
    },
]
function AssetDetail() {
    const [dataData, setDataData] = useState();
    const [pageCount, setPageCount] = useState(1);
    const [currentpage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState('');
    const [percentageTypeFund, setPercentageTypeFund] =
        useState([1, 1, 1]);
    const [percentageFund, setPercentageFund] = useState([
        1, 1, 1, 1, 1, 1,
    ]);
    const [topFunds, setTopFunds] = useState([]);
    const [userAsset, setUserAsset] = useState(undefined);
    const [equity, setEquity] = useState(undefined);
    const { query } = useRouter();
    const userId = query?.id;

    const fetchUserEquity = async () => {
        setLoading(true);
        const res1 = await getCustumerDetailsAsset(userId);
        const res2 = await getCustumerDetailsEquity(userId);
        setUserAsset(res1?.data);
        setEquity(res2?.data);
        setLoading(false);
    }

    useEffect(() => {
        if (userId) {
            fetchUserEquity();
        } else {
            return undefined
        }
    }, [userId]);

    const handleFilter = (value) => {
        setSort(value);
        setCurrentPage(1);
    };
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        datasets: [
            {
                label: '# of Value',
                data: percentageTypeFund,
                backgroundColor: [
                    '#50D27E',
                    '#40CEFF',
                    '#FFA500',
                ],
                borderColor: [
                    '#c47f00',
                    '#02ab3e',
                    '#00ade8',
                ],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        const percentage = {
            1: 0,
            2: 0,
            3: 0,
        };
        let top5Amount = 0;
        let totalCurrent = 0;
        let currentTotalEquity = 0;
        let totalPurchasedPrice = 0;
        const asset = equity?.map((element, index) => {
            totalCurrent = totalCurrent + parseInt(element?.amount);
            // cai current value nay la da tinh o backend roi
            currentTotalEquity += element.current_value;
            totalPurchasedPrice += Number(element.purchased_price);
            if (element?.fund?.type?.id === '3') {
                percentage['3'] =
                    Number(percentage['3']) + Number(element?.amount);
            } else if (element?.fund?.type?.id === '2') {
                percentage['2'] =
                    Number(percentage['2']) + Number(element?.amount);
            } else {
                percentage['1'] =
                    Number(percentage['1']) + Number(element?.amount);
            }
            if (index < 5) {
                top5Amount += parseInt(element?.amount);
                setTopFunds((prev) => {
                    return [...prev, element?.fund?.name];
                });
            } else if (index === 5) {
                setTopFunds((prev) => {
                    return [...prev, 'Khác'];
                });
            }
            return {
                source: {
                    image: element?.fund?.company_logo_url,
                    name: element?.fund?.name,
                    type: element?.fund?.type?.name,
                },
                purchased_price: element?.purchased_price,
                amount: parseInt(element?.amount),
                company: element?.fund?.company,
                fund_id: element?.fund?.id,
                profit: Number(element?.current_value) - (Number(element?.purchased_price)),
                // eslint-disable-next-line max-len
                percentage: ((Number(element?.current_value) - Number(element?.purchased_price)) / Number(element?.purchased_price) * 100).toFixed(0),
            };
        });
        setDataData({
            asset,
            currentTotalEquity: currentTotalEquity.toFixed(0),
            // eslint-disable-next-line max-len
            currentTotalProfitPercent: (currentTotalEquity - totalPurchasedPrice) / totalPurchasedPrice * 100,
            currentTotalProfit: Number((currentTotalEquity - totalPurchasedPrice).toFixed(0)),
            increase: currentTotalEquity - totalPurchasedPrice >= 0 ? true : false,
        });
        if (totalCurrent !== 0) {
            setPercentageTypeFund(Object.values(percentage));
        } else {
            setPercentageTypeFund([]);
            setPercentageFund([]);
        }
    }, [equity])
    const calculatePercentage = (index, elements) => {
        const total = elements.reduce((a, b) => a + b, 0);
        return Math.round((100 * elements[index - 1]) / total);
    };
    return (
        <div className='main-content'>
            <div>
                <GoBackButton />
            </div>
            {loading
                ?
                <CustomSkeletion
                    style={{ marginTop: "52px" }}
                />
                : (
                    <Fragment>
                        <div className={`${styles['asset-box']}`}>
                            <div className='text-small'>
                                {userAsset?.name} ({userId})
                            </div>
                            <div className={`${styles['asset-value']}`}>
                                <p className='text-small'>
                                    Tài sản:
                                    <span style={{ marginLeft: '8px' }} className={`${styles['asset-value-1']}`}>
                                        {Number(dataData?.currentTotalEquity).toLocaleString()}
                                        VND
                                    </span>
                                </p>
                                <p className='text-small'>
                                    Lợi nhuận:
                                    <span style={{ marginLeft: '8px' }} className={`${styles['asset-value-2']}`}>
                                        {Number(dataData?.currentTotalProfit).toLocaleString()}
                                        (<span>
                                            {dataData?.currentTotalProfitPercent.toFixed()}%
                                        </span>)
                                    </span>
                                </p>
                            </div>
                            <div className={`${styles['chart']}`}>
                                <div className='flex al-ct'>
                                    <div className={`${styles['donut-chart']}`} >
                                        <Doughnut data={data} height={150} width={150} />
                                    </div>
                                    <div >
                                        <p className={`${styles['fund_caption']}`}>
                                            <span className={`${styles['dot']}`} style={{ backgroundColor: '#50D27E' }}></span>
                                            {`Quỹ trái phiếu ${calculatePercentage(
                                                1,
                                                percentageTypeFund,
                                            )}%`}
                                        </p>
                                        <p className={`${styles['fund_caption']}`}>
                                            <span className={`${styles['dot']}`} style={{ backgroundColor: '#40CEFF' }}></span>
                                            {`Quỹ cân bằng ${calculatePercentage(
                                                2,
                                                percentageTypeFund,
                                            )}%`}
                                        </p>
                                        <p className={`${styles['fund_caption']}`}>
                                            <span className={`${styles['dot']}`} style={{ backgroundColor: '#FFA500' }}></span>
                                            {`Quỹ đầu tư ${calculatePercentage(
                                                3,
                                                percentageTypeFund,
                                            )}%`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`${styles['sort']}`} style={{ margin: '40px 0px' }}>
                            <p className="text-small" style={{ marginRight: '10px' }}>
                                Sắp xếp :
                            </p>
                            <SortSelect handleSelected={handleFilter} options={sortItems} />
                        </div>
                        <CustomerEquityTable
                            data={dataData?.asset}
                            sort={sort}
                        />
                    </Fragment>
                )}
        </div>
    )
}

export default AssetDetail
