import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, message } from "antd";
import Highlighter from "react-highlight-words";
import axiosInstance from "@/utils/axiosIntance";
import { formatDate } from "@/utils/formatDate";

const Candidate = () => {
  const [loading, setLoading] = useState();
  const [dataCandidate, setDataCandidate] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

  useEffect(() => {
    getCandidate();
  }, []);

  const getCandidate = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/job/job-apply");

      if (res.data?.data?.code === 200) {
        const dataResponse = res.data?.data?.data;
        setDataCandidate(dataResponse);
      } else {
        message.warning("Lỗi khi lấy dữ liệu!");
      }

      setLoading(false);
    } catch (error) {
      message.error(error?.message);
      setLoading(false);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "id",
      dataIndex: "job_id",
      key: "job_id",
      width: "5%",
      ...getColumnSearchProps("job_id"),
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
      width: "10%",
      ...getColumnSearchProps("fullname"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "10%",
      ...getColumnSearchProps("email"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "10%",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Ngày apply",
      dataIndex: "apply_date",
      key: "apply_date",
      width: "10%",
      ...getColumnSearchProps("apply_date"),
      render: (_, record) => <p>{formatDate(record?.apply_date)}</p>,
    },
    {
      title: "Job apply",
      dataIndex: "job",
      key: "job",
      width: "10%",
      render: (_, record) => {
        return (
          <div>
            <p>{record?.job?.title}</p>
            <p>{record?.job?.level}</p>
            <p>{record?.job?.address}</p>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        style={{ padding: "0 20px", height: "100%" }}
        columns={columns}
        dataSource={dataCandidate}
        loading={loading}
      />
    </div>
  );
};
export default Candidate;
