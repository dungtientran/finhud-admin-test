import React, { Fragment, useEffect, useState } from 'react';
import InputComponent from '../../../../components/Input/InputComponent';
import styles from './style.module.css';
import { Col, Row } from 'antd';
import InputEditCost from '../../../../components/Input/InputEditCost';
import { useRouter } from 'next/router';


const CostProduct = ({ dataProductCcq, isEdit, edit, fundForm, setIsEdit }) => {
    const [isHidden, setIsHidden] = useState(false);
    const { query } = useRouter();
    useEffect(() => {
        if (query.id === 'create') setIsHidden(true);
    }, [query]);
    return (
        <div style={{ minHeight: '500px' }}>
            <Row>
                <Col span={12} className={styles.box_cost_main}>
                    <div className={styles.box_cost}>
                        <p >Phí quản lý: </p>
                        <div>
                            {isEdit || query.id === 'create' ? (
                                <InputComponent
                                    value={fundForm?.management_fee}
                                    subValue={"%"}
                                    placeholder={'0 %'}
                                    onChange={e => edit({ ...fundForm, management_fee: e.target.value })}
                                />
                            ) : (
                                <p className={styles.value}>{dataProductCcq?.management_fee || 2}%</p>
                            )}
                        </div>
                    </div>
                    <div className={styles.box_cost}>
                        <p>Phí mua:</p>
                        <div className={`${styles.box_purchase_fee} ${styles.value}`}>
                            {isEdit || query.id === 'create' ? (
                                <Fragment>
                                    <InputEditCost
                                        iconleft={
                                            <img src='/icons/prev_cost_ccq.svg' alt='prev_cost_ccq' />
                                        }
                                        iconright={
                                            <img src='/icons/dow_cost_ccq.svg' alt='dow_cost_ccq' />
                                        }
                                        value={dataProductCcq?.small_purchase_fee}
                                        percent={dataProductCcq?.small_percent_purchase}
                                        icon={
                                            <img src='/icons/subtraction_ccq.svg' alt='subtraction_ccq.svg' />
                                        }
                                        placeholder={'0 VND'}
                                        placeholder_percent={'0 %'}
                                    />
                                    <InputEditCost
                                        iconleft={
                                            <img src='/icons/prev_cost_ccq.svg' alt='prev_cost_ccq' />
                                        }
                                        value={dataProductCcq?.large_purchase_fee}
                                        percent={dataProductCcq?.large_selling_purchase}
                                        icon={
                                            <img src='/icons/subtraction_ccq.svg' alt='subtraction_ccq.svg' />

                                        }
                                        placeholder={'0 VND'}
                                        placeholder_percent={'0 %'}
                                        hidden={isHidden}
                                    />
                                    <InputEditCost
                                        iconleft={
                                            <img src='/icons/next_ccq.svg' alt='next_ccq.svg' />
                                        }
                                        hidden={true}
                                        icon={
                                            <img src='/icons/plus_ccq.svg' alt='plus_ccq.svg' />
                                        }
                                    />
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div>
                                        <span>
                                            <img src="/icons/prev_ccq.svg" alt="prev_ccq" />
                                        </span>
                                        <span>
                                            {Number(dataProductCcq?.min_transaction).toLocaleString()} VND
                                        </span>
                                        <span>
                                            {dataProductCcq?.small_percent_purchase || 0.5}%
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <img src="/icons/next_cost_ccq.svg" alt="next_cost_ccq" />
                                        </span>
                                        <span>
                                            {Number(dataProductCcq?.min_transaction).toLocaleString()} VND
                                        </span>
                                        <span>
                                            {dataProductCcq?.large_percent_purchase || 0.2} %
                                        </span>
                                    </div>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </Col>


                <Col span={12} className={styles.box_cost_main}>
                    <div className={styles.box_cost}>
                        <p >Thuế giao dịch:</p>
                        <div>
                            {isEdit || query.id === 'create' ? (
                                <InputComponent
                                    value={dataProductCcq?.transaction_tax}
                                    subValue={"%"}
                                    placeholder={"0 %"}
                                />
                            ) : (
                                <p className={styles.value}>{dataProductCcq?.transaction_tax || 0} %</p>
                            )}
                        </div>
                    </div>
                    <div className={styles.box_cost}>
                        <p>Phí bán:</p>
                        <div className={`${styles.box_purchase_fee} ${styles.value}`}>
                            {isEdit || query.id === 'create' ? (
                                <Fragment>
                                    <InputEditCost
                                        iconleft={
                                            <img src='/icons/prev_cost_ccq.svg' alt='prev_cost_ccq' />

                                        }
                                        iconright={
                                            <img src='/icons/dow_cost_ccq.svg' alt='dow_cost_ccq' />
                                        }
                                        value={dataProductCcq?.small_selling_fee}
                                        percent={dataProductCcq?.small_selling_purchase}
                                        icon={
                                            <img src='/icons/subtraction_ccq.svg' alt='subtraction_ccq.svg' />
                                        }
                                        placeholder={'0 VND'}
                                        placeholder_percent={'0 %'}
                                    />
                                    <InputEditCost
                                        iconleft={
                                            <img src='/icons/prev_cost_ccq.svg' alt='prev_cost_ccq' />
                                        }
                                        value={dataProductCcq?.large_selling_fee}
                                        percent={dataProductCcq?.large_selling_purchase}
                                        icon={
                                            <img src='/icons/subtraction_ccq.svg' alt='subtraction_ccq' />

                                        }
                                        placeholder={'0 VND'}
                                        placeholder_percent={'0 %'}
                                    />
                                    <InputEditCost
                                        iconleft={
                                            <img src='/icons/next_ccq.svg' alt='next_ccq' />
                                        }
                                        hidden={true}
                                        icon={
                                            <img src='/icons/plus_ccq.svg' alt='plus_ccq' />

                                        }
                                        placeholder={'0 VND'}
                                    />

                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div>
                                        <span>
                                            <img src="/icons/prev_ccq.svg" alt="prev_ccq" />

                                        </span>
                                        <span>
                                            {Number(dataProductCcq?.min_transaction).toLocaleString()} VND
                                        </span>
                                        <span>
                                            {dataProductCcq?.small_selling_purchase || 0.5}%
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <img src="/icons/next_cost_ccq.svg" alt="next_cost_ccq" />


                                        </span>
                                        <span>
                                            {Number(dataProductCcq?.min_transaction).toLocaleString()} VND
                                        </span>
                                        <span>
                                            {dataProductCcq?.large_selling_purchase || 0.5}%
                                        </span>
                                    </div>
                                </Fragment>
                            )}
                        </div>

                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default CostProduct
