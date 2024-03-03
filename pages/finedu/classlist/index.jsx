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
import Link from "next/link";

const ClassList = () => {
  const [loading, setLoading] = useState(false);
  const [dataClassList, setDataClassList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [open, setOpen] = useState(false);

  const [editRowSelected, setEditRowSelected] = useState(null);

  const searchInput = useRef(null);

  useEffect(() => {
    getClassList();
  }, []);

  const getClassList = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        "/admin/edu/course?page=1&size=10000"
      );

      if (res.data?.data?.code === 200) {
        const dataResponse = res.data?.data?.data?.rows;

        const dataRender = dataResponse?.map((item) => {
          return {
            ...item,
            teacher: item?.course_teacher?.name,
          };
        });
        setDataClassList(dataRender);
      } else {
        message.error("Lỗi khi lấy dữ liệu");
      }
      setLoading(false);
    } catch (error) {
      message.error(error?.message);
      setLoading(false);
    }
  };

  const createClassList = async (data) => {
    try {
      const res = await axiosInstance.post("/admin/edu/course", data);

      if (res.data?.data?.code === 200) {
        onClose();
        getClassList();
        message.success("Tạo mới thành công!");
        return;
      } else {
        message.warning("Lỗi khi tạo mới!");
      }
    } catch (error) {
      message.error(error?.message);
    }
  };
  const updateClassList = async (id, data) => {
    try {
      const res = await axiosInstance.put(`/admin/edu/course/${id}`, data);

      if (res.data?.data?.code === 200) {
        onClose();
        getClassList();
        message.success("Update thành công!");
        return;
      } else {
        message.warning("Lỗi khi update!");
      }
    } catch (error) {
      message.error(error?.message);
    }
  };
  const deleteClassList = async (id) => {
    try {
      const res = await axiosInstance.delete(`/admin/edu/course/${id}`);

      if (res.data?.data?.code === 200) {
        onClose();
        getClassList();
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
      title: "Tên lớp học",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
      render: (_, record) => <p>{Number(record?.price)?.toLocaleString()}</p>,
    },
    {
      title: "Sale",
      dataIndex: "sale_price",
      key: "sale_price",
      ...getColumnSearchProps("sale_price"),
      render: (_, record) => (
        <p>{Number(record?.sale_price)?.toLocaleString()}</p>
      ),
    },
    {
      title: "Số lượng học viên",
      dataIndex: "student_count",
      key: "student_count",
      ...getColumnSearchProps("student_count"),
      render: (_, record) => (
        <p>{Number(record?.student_count)?.toLocaleString()}</p>
      ),
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
      key: "teacher",
      ...getColumnSearchProps("teacher"),

      render: (_, record) => <p>{record?.course_teacher?.name}</p>,
    },
    {
      title: "Chi tiết",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="small">
          <Link href={`/finedu/classlist/${record?.id}`}>Xem</Link>
        </Space>
      ),
    },
    {
      title: "",
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
            onConfirm={() => deleteClassList(record?.id)}
          >
            <Button type="primary" size="small">
              <DeleteOutlined />
            </Button>
          </Popconfirm>

          {/* <Link href="/finedu/classlist/12345">Chi tiết</Link> */}
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
        dataSource={dataClassList}
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record?.student_count}
            </p>
          ),
        }}
      />
      <Drawer
        title={!!editRowSelected ? "Update tin lớp học" : "Tạo mới tin lớp học"}
        onClose={onClose}
        open={open}
        width={660}
      >
        <FormCecruitment
          initForm={editRowSelected}
          createClassList={createClassList}
          updateClassList={updateClassList}
        />
      </Drawer>
    </div>
  );
};
export default ClassList;
