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

const Terms = () => {
  const [loading, setLoading] = useState(false);
  const [dataTerms, setDataTerms] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [open, setOpen] = useState(false);

  const [editRowSelected, setEditRowSelected] = useState(null);

  const searchInput = useRef(null);

  useEffect(() => {
    getTerms();
  }, []);

  const getTerms = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/product/term");

      if (res.data?.data?.code === 200) {
        const dataResponse = res.data?.data?.data;
        setDataTerms(dataResponse);
      } else {
        message.error("Lỗi khi lấy dữ liệu");
      }
      setLoading(false);
    } catch (error) {
      message.error(error?.message);
      setLoading(false);
    }
  };

  const createTerms = async (data) => {
    try {
      const res = await axiosInstance.post("/admin//product/term", data);

      if (res.data?.data?.code === 200) {
        onClose();
        getTerms();
        message.success("Tạo mới thành công!");
        return;
      } else {
        message.warning("Lỗi khi tạo mới!");
      }
    } catch (error) {
      message.error(error?.message);
    }
  };
  const updateTerms = async (id, data) => {
    try {
      const res = await axiosInstance.put(`/admin/product/term/${id}`, data);

      if (res.data?.data?.code === 200) {
        onClose();
        getTerms();
        message.success("Update thành công!");
        return;
      } else {
        message.warning("Lỗi khi update!");
      }
    } catch (error) {
      message.error(error?.message);
    }
  };
  const deleteTerms = async (id) => {
    try {
      const res = await axiosInstance.delete(`/admin/product/term/${id}`);

      if (res.data?.data?.code === 200) {
        onClose();
        getTerms();
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
      dataIndex: "id",
      key: "id",
      width: "5%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Letter",
      dataIndex: "letter",
      key: "letter",
      width: "10%",
      ...getColumnSearchProps("letter"),
    },
    {
      title: "Term",
      dataIndex: "term",
      key: "term",
      width: "10%",
      ...getColumnSearchProps("term"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Definition",
      dataIndex: "definition",
      key: "definition",
      ...getColumnSearchProps("definition"),
    },

    {
      title: "Action",
      dataIndex: "action",
      with: "10%",
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
            onConfirm={() => deleteTerms(record?.id)}
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
        dataSource={dataTerms}
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
          createTerms={createTerms}
          updateTerms={updateTerms}
        />
      </Drawer>
    </div>
  );
};
export default Terms;
