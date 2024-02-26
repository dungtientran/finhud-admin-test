import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import avatar from "../../asset/image/avatar.jpg";
import { FiChevronDown } from "react-icons/fi";
import { MdLogout, MdOutlineAccountBox } from "react-icons/md";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import { SearchContext } from "@/context/searchContext";
import _ from "lodash";

const navbarTitle = {
  "/system/account": "Tài khoản",
  "/system/request": "Tài khoản",
  "/customer/request": "Phê duyệt",
  "/customer/asset": "Tài sản",
  "/customer/asset/[id]": "Tài sản",
  "/customer/request/[id]": "Phê duyệt",
  "/system/request/create-request": "Yêu cầu",
  "/system/request/create": "Tạo tài khoản",
  "/system/request/create/[id]": "Tạo tài khoản",
  "/system/request/update": "Cập nhật tài khoản",
  "/system/request/update/[id]": "Cập nhật tài khoản",
  "/system/request/reset-password": "Đặt lại mật khẩu",
  "/system/request/reset-password/[id]": "Đặt lại mật khẩu",
  "/transaction/order": "Sổ lệnh",
  "/transaction/order/[id]": "Sổ lệnh",
  "/transaction/request": "Phê duyệt",
  "/transaction/request/[id]": "Phê duyệt",
  "/product/ccq": "Chứng chỉ quỹ",
  "/manage/recruitment": "Tin tuyển dụng",
  "/manage/candidate": "Hồ sơ ứng viên",
  "/manage/terms": "Thuật ngữ",
};

function Navbar() {
  // context
  const { search, setSearch, setIsSearch } = useContext(SearchContext);

  //
  const { user, logout } = useUser();
  const router = useRouter();
  const [showAccountOption, setShowAccountOption] = useState(false);
  const [searchText, setSearchText] = useState("");
  const accountRef = useRef();
  const handleOptionClick = (path) => {
    // console.log('path: ' + path)
    router.push(path);
  };
  useEffect(() => {
    window.addEventListener("click", (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setShowAccountOption(false);
      }
    });
  }, []);

  const getNavBarTitle = (path) => {
    if (router.pathname === "/customer/request/[id]") {
      let title = navbarTitle[path];
      if (router.query.type == 1) {
        title = title + " - " + "Thay đổi thông tin";
      } else if (router.query.type == 0) {
        title = title + " - " + "Mở tài khoản";
      } else if (router.query.type == 2) {
        title = title + " - " + "Đóng tài khoản";
      } else if (router.query.type == 3) {
        title = title + " - " + "KYC";
      } else if (router.query.type == 4) {
        title = title + " - " + "Chuyển đổi sở hữu";
      }
      return title;
    }
    const title = navbarTitle[path] || "Tài khoản";
    return title;
  };

  useEffect(() => {
    setSearch("");
    setIsSearch(false);
  }, [router.pathname]);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (searchText) {
      const searchCustom = _.deburr(searchText);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: `${searchCustom}` },
      });
      setSearchText("");
    }
  };

  return (
    <div className={`${styles["navbar"]}`}>
      <div className={`${styles["navbar-left"]}`}>
        <p className={`${styles["navbar-title"]}`}>
          {getNavBarTitle(router.pathname)}
        </p>
        <div>
          <form
            onSubmit={handleSubmitSearch}
            className={`${styles["navbar-search-box"]}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z"
                fill="#666666"
              />
            </svg>
            <input
              type="text"
              className={`${styles["navbar-search-input"]}`}
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div className={`${styles["navbar-right"]}`}>
        <div className={`${styles["navbar-notification"]}`}>
          <svg
            width="18"
            height="25"
            viewBox="0 0 18 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.3337 17.5891C14.8498 15.0264 15.7154 13.6085 15.1321 8.86483C14.6094 4.61467 11.3546 3.39788 9.68751 3.05053V0H7.99126V3.05053C6.32184 3.39788 3.06703 4.61462 2.54557 8.86483C1.96228 13.6063 2.82788 15.0264 1.34396 17.5891C0.949638 18.2655 0.457323 18.8093 0 19.2286V20.218H17.6764V19.2286C17.2203 18.8093 16.7257 18.2655 16.3337 17.5891V17.5891Z"
              fill="#CCCCCC"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.83818 24.9755C9.98309 24.9755 10.9112 24.0665 10.9112 22.9452C10.9112 21.8239 9.98309 20.915 8.83818 20.915C7.69327 20.915 6.76514 21.8239 6.76514 22.9452C6.76514 24.0665 7.69327 24.9755 8.83818 24.9755Z"
              fill="#CCCCCC"
            />
          </svg>
        </div>
        <div className={`${styles["navbar-account"]}`}>
          <div className={`${styles["account-info"]}`}>
            <p className="text">{user?.name}</p>
            <p className="text-small">{user?.role?.name}</p>
          </div>
          <div>
            <Image
              src={avatar}
              width={40}
              height={40}
              className={`${styles["account-avatar"]}`}
              alt="avatar"
            />
          </div>
          <div
            className={`${styles["account-more"]}`}
            onClick={() => setShowAccountOption(!showAccountOption)}
            ref={accountRef}
          >
            <FiChevronDown className={`${styles["chevron-down"]}`} />
            {showAccountOption && (
              <ul className={`${styles["account-options"]}`}>
                <li
                  className={`${styles["account-option"]}`}
                  onClick={() => handleOptionClick("/account")}
                >
                  <MdOutlineAccountBox
                    style={{ fontSize: "20px", marginRight: "5px" }}
                  />
                  Tài khoản
                </li>
                <li className={`${styles["account-option"]}`} onClick={logout}>
                  <MdLogout style={{ fontSize: "20px", marginRight: "5px" }} />
                  Thoát
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
