import React, { Fragment, useEffect, useState } from "react";
import InputComponent from "../Input/InputComponent";
import styles from "./style.module.css";
import { Button, Col, Row, message } from "antd";
import InputEditCost from "../Input/InputEditCost";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axiosIntance";
import { CloseOutlined } from "@ant-design/icons";

const CostProduct = ({ dataProductCcq, isEdit, edit, fundForm, setIsEdit }) => {
  const { query } = useRouter();
  const [isHidden, setIsHidden] = useState(false);
  const [feeBuyComponents, setfeeBuyComponents] = useState([{ id: 0 }]);
  const [feeSaleComponents, setfeeSaleComponents] = useState([{ id: 0 }]);
  const [priceSale, setPriceSale] = useState([]);
  const [priceBuy, setPriceBuy] = useState([]);

  useEffect(() => {
    if (query.id === "create") setIsHidden(true);
  }, [query]);

  useEffect(() => {
    const feeBuyAllValues = feeBuyComponents
      .map((component) => component.values)
      .filter((value) => !!value);
    const feeSaleAllValues = feeSaleComponents
      .map((component) => component.values)
      .filter((value) => !!value);

    edit({
      ...fundForm,
      priceBuy: feeBuyAllValues,
      priceSale: feeSaleAllValues,
    });
  }, [feeBuyComponents, feeSaleComponents]);

  useEffect(() => {
    getPriceFunds(query?.id);
  }, [query]);

  const getPriceFunds = async (id) => {
    try {
      const response = await axiosInstance.get(
        `/admin/get-price-fund?id_fund=${id}`
      );

      if (response.data?.data?.code === 200) {
        const data = response.data?.data?.data;
        const priceBuy = data?.filter((item) => item.type === "buy");
        const priceSale = data?.filter((item) => item.type === "sale");
        setPriceSale(priceSale);
        setPriceBuy(priceBuy);
        setfeeBuyComponents(
          priceBuy.map((data, index) => ({ id: index, values: data }))
        );
        setfeeSaleComponents(
          priceSale.map((data, index) => ({ id: index, values: data }))
        );
      } else {
        message.error("Có lỗi khi lấy thông tin biểu phí, Tải lại trang web!");
      }
    } catch (error) {
      message.error(
        `${error?.message}` ||
          "Có lỗi khi lấy thông tin biểu phí, Tải lại trang web!"
      );
    }
  };

  const handleAddFeeBuy = () => {
    setfeeBuyComponents([...feeBuyComponents, { id: feeBuyComponents.length }]);
  };
  const handleAddFeeSale = () => {
    setfeeSaleComponents([
      ...feeSaleComponents,
      { id: feeSaleComponents.length },
    ]);
  };
  const handleRemoveFeeBuy = (id) => {
    setfeeBuyComponents((prevfeeBuyComponent) =>
      prevfeeBuyComponent.filter((component) => component.id !== id)
    );
  };
  const handleRemoveFeeSale = (id) => {
    setfeeSaleComponents((prevfeeSaleComponent) =>
      prevfeeSaleComponent.filter((component) => component.id !== id)
    );
  };
  const handleChangeFeeBuys = (id, values) => {
    setfeeBuyComponents((prevfeeBuyComponents) =>
      prevfeeBuyComponents.map((component) =>
        component.id === id ? { ...component, values } : component
      )
    );
  };
  const handleChangeFeeSales = (id, values) => {
    setfeeSaleComponents((prevfeeBuyComponents) =>
      prevfeeBuyComponents.map((component) =>
        component.id === id ? { ...component, values } : component
      )
    );
  };

  return (
    <div style={{ minHeight: "500px" }}>
      <Row>
        <Col span={12} className={styles.box_cost_main}>
          <div className={styles.box_cost} style={{ alignItems: "center" }}>
            <p>Phí quản lý: </p>
            <div>
              {isEdit || query.id === "create" ? (
                <InputComponent
                  value={fundForm?.management_fee}
                  subValue={"%"}
                  placeholder={"0 %"}
                  onChange={(e) =>
                    edit({ ...fundForm, management_fee: e.target.value })
                  }
                />
              ) : (
                <p className={styles.value}>
                  {dataProductCcq?.management_fee || 0}%
                </p>
              )}
            </div>
          </div>
        </Col>

        <Col span={12} className={styles.box_cost_main}>
          <div className={styles.box_cost} style={{ alignItems: "center" }}>
            <p>Thuế giao dịch:</p>
            <div>
              {isEdit || query.id === "create" ? (
                <InputComponent
                  value={fundForm?.transaction_tax}
                  subValue={"%"}
                  placeholder={"0 %"}
                  onChange={(e) =>
                    edit({ ...fundForm, transaction_tax: e.target.value })
                  }
                />
              ) : (
                <p className={styles.value}>
                  {dataProductCcq?.transaction_tax || 0} %
                </p>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={24} className={styles.box_cost_main}>
          <div className={styles.box_cost}>
            <p>Phí mua:</p>
            <div className={`${styles.box_purchase_fee} ${styles.value}`}>
              {isEdit || query.id === "create" ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Button
                        size="middle"
                        type="primary"
                        onClick={handleAddFeeBuy}
                      >
                        Thêm
                      </Button>
                    </div>
                    {feeBuyComponents.map((component) => (
                      <div
                        key={component.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flex: 1,
                        }}
                      >
                        <InputEditCost
                          id={component.id}
                          onInputChange={(values) =>
                            handleChangeFeeBuys(component.id, values)
                          }
                          initialValues={component.values}
                          type="buy"
                        />
                        <Button
                          size="middle"
                          type="dashed"
                          onClick={() => handleRemoveFeeBuy(component.id)}
                        >
                          <CloseOutlined />
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <Fragment>
                  {priceBuy?.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {priceBuy?.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {index !== priceBuy?.length - 1 ? (
                            <div
                              style={{
                                minWidth: "500px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <p> Từ</p>
                                <p> {Number(item?.from)?.toLocaleString()}</p>
                                <p>Đến</p>
                                <p>{Number(item?.to)?.toLocaleString()} VND</p>
                              </div>
                              <div>
                                <p>{item?.value || 0} %</p>
                              </div>
                            </div>
                          ) : (
                            <div
                              style={{
                                minWidth: "500px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <p>{Boolean(!item?.to) ? "Từ" : "Đến"}</p>
                                <p>{Number(item?.from)?.toLocaleString()} </p>
                                <p>VND</p>
                              </div>
                              <div>
                                <p>{item?.value || 0} %</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Fragment>
              )}
            </div>
          </div>
        </Col>
        <Col
          span={24}
          style={{ marginTop: 20 }}
          className={styles.box_cost_main}
        >
          <div className={styles.box_cost}>
            <p>Phí bán:</p>
            <div className={`${styles.box_purchase_fee} ${styles.value}`}>
              {isEdit || query.id === "create" ? (
                <Fragment>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Button
                      size="middle"
                      type="primary"
                      onClick={handleAddFeeSale}
                    >
                      Thêm
                    </Button>
                  </div>
                  {feeSaleComponents.map((component) => (
                    <div
                      key={component.id}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <InputEditCost
                        id={component.id}
                        onInputChange={(values) =>
                          handleChangeFeeSales(component.id, values)
                        }
                        initialValues={component.values}
                        type="sale"
                      />
                      <Button
                        size="middle"
                        type="dashed"
                        onClick={() => handleRemoveFeeSale(component.id)}
                      >
                        <CloseOutlined />
                      </Button>
                    </div>
                  ))}
                </Fragment>
              ) : (
                <Fragment>
                  {priceSale?.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {priceSale?.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {index !== priceSale?.length - 1 ? (
                            <div
                              style={{
                                minWidth: "500px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <p> Từ</p>
                                <p> {Number(item?.from)?.toLocaleString()}</p>
                                <p>đến</p>
                                <p>
                                  {Number(item?.to)?.toLocaleString()} tháng
                                </p>
                              </div>
                              <div>
                                <p>{item?.value || 0} %</p>
                              </div>
                            </div>
                          ) : (
                            <div
                              style={{
                                minWidth: "500px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <p>Trên</p>
                                <p>{Number(item?.from)?.toLocaleString()} </p>
                                <p>tháng</p>
                              </div>
                              <div>
                                <p>{item?.value || 0} %</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Fragment>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CostProduct;
