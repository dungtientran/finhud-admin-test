import React, { useEffect, useRef, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Input, Popconfirm, Space, Table, message } from "antd";
import Highlighter from "react-highlight-words";
import axiosInstance from "@/utils/axiosIntance";
import { formatDate } from "@/utils/formatDate";
import FormCecruitment from "./_components/Form";

const Recruitment = () => {
  const [loading, setLoading] = useState(false);
  const [dataRecruitment, setDataRecruitment] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [open, setOpen] = useState(false);

  const [editRowSelected, setEditRowSelected] = useState(null);

  const searchInput = useRef(null);

  useEffect(() => {
    getRecruitment();
  }, []);

  const getRecruitment = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/job");

      if (res.data?.data?.code === 200) {
        const dataResponse = res.data?.data?.data;
        setDataRecruitment(dataResponse);
      } else {
        message.error("Lỗi khi lấy dữ liệu");
      }
      setLoading(false);
    } catch (error) {
      message.error(error?.message);
      setLoading(false);
    }
  };

  const createRecruitment = async (data) => {
    try {
      const res = await axiosInstance.post("/admin/job", data);

      if (res.data?.data?.code === 201) {
        onClose();
        getRecruitment();
        message.success("Tạo mới thành công!");
        return;
      } else {
        message.warning("Lỗi khi tạo mới!");
      }
    } catch (error) {
      message.error(error?.message);
    }
  };
  const updateRecruitment = async (id, data) => {
    try {
      const res = await axiosInstance.put(`/admin/job/${id}`, data);

      if (res.data?.data?.code === 201) {
        onClose();
        getRecruitment();
        message.success("Update thành công!");
        return;
      } else {
        message.warning("Lỗi khi update!");
      }
    } catch (error) {
      message.error(error?.message);
    }
  };
  const deleteRecruitment = async (id) => {
    try {
      const res = await axiosInstance.delete(`/admin/job/${id}`);

      if (res.data?.data?.code === 201) {
        onClose();
        getRecruitment();
        message.success("Xóa thành công!");
        return;
      } else {
        message.warning("Lỗi khi xóa!");
      }
    } catch (error) {
      message.error(error?.message);
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
      dataIndex: "id",
      key: "id",
      width: "5%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "10%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "10%",
      ...getColumnSearchProps("address"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Deadline",
      dataIndex: "apply_deadline",
      key: "apply_deadline",
      width: "10%",
      ...getColumnSearchProps("address"),
      render: (_, record) => <p>{formatDate(record?.apply_deadline)}</p>,
    },
    {
      title: "Mô tả",
      dataIndex: "job_description",
      key: "job_description",
      render: (_, record) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {record?.job_description?.map((job, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3>{job?.title}</h3>
                <p>{job?.desc}</p>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "10%",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            onClick={() => {
              showDrawer(), setEditRowSelected(record);
            }}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Chắc chắn xóa"
            onConfirm={() => deleteRecruitment(record?.id)}
          >
            <Button type="primary" size="small">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const showDrawer = () => {
    setOpen(true);
    setEditRowSelected(null);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div style={{ marginBottom: "30px", padding: "20px" }}>
        <Button onClick={showDrawer}>Thêm mới</Button>
      </div>
      <Table
        style={{ padding: "0 20px", height: "100%" }}
        columns={columns}
        dataSource={dataRecruitment}
        loading={loading}
      />
      <Drawer
        title={
          !!editRowSelected ? "Update tin tuyển dụng" : "Tạo mới tin tuyển dụng"
        }
        onClose={onClose}
        open={open}
      >
        <FormCecruitment
          initForm={editRowSelected}
          createRecruitment={createRecruitment}
          updateRecruitment={updateRecruitment}
        />
      </Drawer>
    </div>
  );
};
export default Recruitment;
