import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Menu } from "antd";
import logo from "../../asset/image/logo.png";
// import account from '../../asset/icon/sidebar/account.sgv';
import Image from "next/image";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import {
  AccountSvg,
  CustomerAccountSvg,
  CustomerAssetSvg,
  CustomerRequestSvg,
  CustomerSvg,
  ProductCcqSvg,
  ProductSvg,
  RequestSystemSvg,
  SystemSvg,
  TransactionOrderSvg,
  TransactionRequestSvg,
  TransactionSvg,
} from "@/asset/icon";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Hệ thống", "system", <SystemSvg style={{ fontSize: 27 }} />, [
    getItem(
      "Tài khoản",
      "/system/account",
      <AccountSvg style={{ fontSize: 24 }} />
    ),
    getItem(
      "Yêu cầu",
      "/system/request",
      <RequestSystemSvg style={{ fontSize: 24 }} />
    ),
  ]),
  getItem("Khách hàng", "customer", <CustomerSvg style={{ fontSize: 27 }} />, [
    getItem(
      "Tài khoản",
      "/customer/account",
      <CustomerAccountSvg style={{ fontSize: 24 }} />
    ),
    getItem(
      "Phê duyệt",
      "/customer/request",
      <CustomerRequestSvg style={{ fontSize: 24 }} />
    ),
    getItem(
      "Tài sản",
      "/customer/asset",
      <CustomerAssetSvg style={{ fontSize: 24 }} />
    ),
  ]),
  getItem(
    "Giao dịch",
    "transaction",
    <TransactionSvg style={{ fontSize: 27 }} />,
    [
      getItem(
        "Sổ lệnh",
        "/transaction/order",
        <TransactionOrderSvg style={{ fontSize: 24 }} />
      ),
      getItem(
        "Phê duyệt",
        "/transaction/request",
        <TransactionRequestSvg style={{ fontSize: 24 }} />
      ),
    ]
  ),
  getItem("Sản phẩm", "product", <ProductSvg style={{ fontSize: 27 }} />, [
    getItem(
      "Chứng chỉ quỹ",
      "/product/ccq",
      <ProductCcqSvg style={{ fontSize: 24 }} />
    ),
  ]),
  getItem("Quản lý", "manage", <ProductSvg style={{ fontSize: 27 }} />, [
    getItem(
      "Tin tuyển dụng",
      "/manage/recruitment",
      <ProductCcqSvg style={{ fontSize: 24 }} />
    ),
    getItem(
      "Hồ sơ ứng viên",
      "/manage/candidate",
      <ProductCcqSvg style={{ fontSize: 24 }} />
    ),
    getItem(
      "Thuật ngữ",
      "/manage/terms",
      <ProductCcqSvg style={{ fontSize: 24 }} />
    ),
  ]),
  getItem("FinEdu", "finedu", <ProductSvg style={{ fontSize: 27 }} />, [
    getItem(
      "Giảng viên",
      "/finedu/teacher",
      <ProductCcqSvg style={{ fontSize: 24 }} />
    ),
    getItem(
      "Danh sách lớp học",
      "/finedu/classlist",
      <ProductCcqSvg style={{ fontSize: 24 }} />
    ),
  ]),
];

function Sidebar() {
  const router = useRouter();
  const onClick = (e) => {
    router.replace(e.key);
  };
  const [menuItems, setMenuItems] = useState(items);
  const { user } = useUser();

  useEffect(() => {
    if (user?.role_id === 0) {
      const m = items.filter((item) => {
        return item?.key === "customer" || item?.key === "transaction";
      });
      setMenuItems(m);
    }
    if (user?.role_id === 3 || user?.role_id === 4 || user?.role_id === 5) {
      const m = items.filter((item) => item?.key === "system");
      setMenuItems(m);
    }
    if (
      user?.role_id === 0 ||
      user?.role_id === 3 ||
      user?.role_id === 4 ||
      user?.role_id === 5
    ) {
      const m = items.filter((item) => item?.key === "transaction");
      setMenuItems(m);
    }
  }, [user]);
  return (
    <div className={`${style["side-bar"]}`}>
      <div className={`${style["side-bar-head"]}`}>
        <p className={`${style["side-bar-title"]}`}>
          <Image src={logo} width={30} height={30} alt="logo" /> FinHub Admin
        </p>
      </div>
      <div className={`${style["side-bar-menu"]}`}>
        <Menu
          onClick={onClick}
          style={{ width: "100%" }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["system"]}
          mode="inline"
          items={items}
        />
      </div>
    </div>
  );
}

export default Sidebar;
