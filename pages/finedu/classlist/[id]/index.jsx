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
import Link from "next/link";
import { useRouter } from "next/router";
import FormClassList from "./Form";

const ClassListDetails = () => {
  const router = useRouter();
  const { id } = router.query;

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
      const res = await axiosInstance.get(`/admin/edu/course/${id}`);
      console.log("ClassListDetails", res);
      if (res.data?.data?.code === 200) {
        const dataResponse = res.data?.data?.data;
        setDataClassList([dataResponse]);
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
      const res = await axiosInstance.post("/admin/job", data);

      if (res.data?.data?.code === 201) {
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
      const res = await axiosInstance.post(`/admin/edu/lesson`, data);

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
      const res = await axiosInstance.delete(`/admin/job/${id}`);

      if (res.data?.data?.code === 201) {
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
      title: "Những gì bạn học được",
      dataIndex: "what_you_can_learn",
      key: "what_you_can_learn",
      render: (_, record) => (
        <div
          dangerouslySetInnerHTML={{
            __html: record?.what_you_can_learn,
          }}
          className="rich_text"
        ></div>
      ),
    },
    {
      title: "Yêu cầu",
      dataIndex: "requirement",
      key: "requirement",
      render: (_, record) => (
        <div
          dangerouslySetInnerHTML={{
            __html: record?.what_you_can_learn,
          }}
          className="rich_text"
        ></div>
      ),
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "language",
      key: "language",
      render: (_, record) => (
        <div
          dangerouslySetInnerHTML={{
            __html: record?.what_you_can_learn,
          }}
          className="rich_text"
        ></div>
      ),
    },
    {
      title: "level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Lesson",
      dataIndex: "lesson",
      key: "lesson",
      render: (_, record) => (
        <div style={{ maxHeight: "350px", overflow: "auto" }}>
          {record?.lesson?.data?.map((item, i) => (
            <div key={i}>
              <p style={{ display: "flex", flexDirection: "column" }}>
                Nội dung:
                <span style={{ fontWeight: "700" }}>{item?.description}</span>
              </p>
              <p style={{ display: "flex", flexDirection: "column" }}>
                Video:
                <span style={{ fontWeight: "700" }}>{item?.video_url}</span>
              </p>
              <p style={{ display: "flex", flexDirection: "column" }}>
                Duration:
                <span style={{ fontWeight: "700" }}>{item?.duration}</span>
              </p>
            </div>
          ))}
        </div>
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
            Thêm bài học
          </Button>
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
        {/* <Button onClick={showDrawer}>Thêm mới</Button> */}
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
      <Drawer title="Thêm khóa học" onClose={onClose} open={open}>
        <FormClassList
          initForm={editRowSelected}
          createClassList={createClassList}
          updateClassList={updateClassList}
        />
      </Drawer>
    </div>
  );
};
export default ClassListDetails;
