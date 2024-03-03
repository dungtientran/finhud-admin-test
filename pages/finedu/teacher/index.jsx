import React, { useEffect, useRef, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Drawer,
  Input,
  Popconfirm,
  Space,
  Table,
  message,
} from "antd";
import Highlighter from "react-highlight-words";
import axiosInstance from "@/utils/axiosIntance";
import { formatDate } from "@/utils/formatDate";
import FormCecruitment from "./_components/Form";
import Form from "./_components/Form";

const Teacher = () => {
  const [loading, setLoading] = useState(false);
  const [dataTeacher, setDataTeacher] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [open, setOpen] = useState(false);

  const [editRowSelected, setEditRowSelected] = useState(null);

  const searchInput = useRef(null);

  useEffect(() => {
    getTeacher();
  }, []);

  const getTeacher = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/edu/lecturer");
      if (res.data?.data?.code === 200) {
        const dataResponse = res.data?.data?.data?.rows;
        setDataTeacher(dataResponse);
      } else {
        message.error("Lỗi khi lấy dữ liệu");
      }
      setLoading(false);
    } catch (error) {
      message.error(error?.message);
      setLoading(false);
    }
  };

  const createTeacher = async (data) => {
    try {
      const res = await axiosInstance.post("/admin/edu/lecturer", data);

      if (res.data?.data?.code === 200) {
        onClose();
        getTeacher();
        message.success("Tạo mới thành công!");
        return;
      } else {
        message.warning("Lỗi khi tạo mới!");
      }
    } catch (error) {
      message.error(error?.message);
    }
  };
  const updateTeacher = async (id, data) => {
    try {
      const res = await axiosInstance.put(`/admin/edu/lecturer/${id}`, data);

      if (res.data?.data?.code === 200) {
        onClose();
        getTeacher();
        message.success("Update thành công!");
        return;
      } else {
        message.warning("Lỗi khi update!");
      }
    } catch (error) {
      message.error(error?.message);
    }
  };
  const deleteTeacher = async (id) => {
    try {
      const res = await axiosInstance.delete(`/admin/edu/lecturer/${id}`);

      if (res.data?.data?.code === 200) {
        onClose();
        getTeacher();
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
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: "",
      render: (_, record) => <Avatar alt="avatar" src={record?.avatar} />,
    },
    {
      title: "Chuyên ngành",
      dataIndex: "major",
      key: "major",
      width: "",
      ...getColumnSearchProps("major"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "location",
      key: "location",
      width: "",
      ...getColumnSearchProps("location"),
    },
    {
      title: "Giới thiệu",
      dataIndex: "description",
      key: "description",
      width: "",
      ...getColumnSearchProps("description"),
    },
    {
      title: "Facebook",
      dataIndex: "facebook_url",
      key: "facebook_url",
      width: "",
      ...getColumnSearchProps("facebook_url"),
    },
    {
      title: "Instagram",
      dataIndex: "instagram_url",
      key: "instagram_url",
      width: "",
      ...getColumnSearchProps("instagram_url"),
    },
    {
      title: "Linkedin",
      dataIndex: "linkedin_url",
      key: "linkedin_url",
      width: "",
      ...getColumnSearchProps("linkedin_url"),
    },
    {
      title: "Twitter",
      dataIndex: "twitter_url",
      key: "twitter_url",
      width: "",
      ...getColumnSearchProps("twitter_url"),
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
            onConfirm={() => deleteTeacher(record?.id)}
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
        dataSource={dataTeacher}
        loading={loading}
      />
      <Drawer
        title={!!editRowSelected ? "Update giảng viên" : "Tạo mới giảng viên"}
        onClose={onClose}
        open={open}
      >
        <Form
          initForm={editRowSelected}
          createRecruitment={createTeacher}
          updateRecruitment={updateTeacher}
        />
      </Drawer>
    </div>
  );
};
export default Teacher;
