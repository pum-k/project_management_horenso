import { Button, Input, Space, Table } from "antd";
import "antd/dist/antd.css";
import DeleteFile from "features/Storage/DeleteFile-Storage/deleteFile";
import { listFile } from "features/Storage/storageSlice";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RiDownload2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import "./Storage.scss";

const Storage = () => {
  const dataApi = useSelector((state) => state.storage.dataFile);

  const [dataSource, setDataSource] = useState([]);
  const [value, setValue] = useState("");

  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const typingTimeoutRef = useRef();

  // Get name value from URL param
  const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  };
  const query = useQuery();
  const nameParamValue = query.get("name");

  const [paramValue, setParamValue] = useState(nameParamValue);

  // Call api
  useEffect(() => {
    dispatch(
      listFile({
        idProject: params.idProject,
        nameParamValue: paramValue,
      })
    );
    setValue(paramValue);
  }, [dispatch, params.idProject, paramValue]);

  useEffect(() => {
    setDataSource(dataApi);
  }, [dataApi]);

  // debounce search start
  const onSearchChange = (value) => {
    setValue(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setParamValue(value);
    }, 300);

    history.push({
      search: "?" + new URLSearchParams({ name: value }),
    });
  };

  const FilterByNameInput = (
    <Input
      bordered={false}
      placeholder="Search file name..."
      value={value}
      onChange={(e) => onSearchChange(e.target.value)}
      allowClear
    />
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (t, r) => r.name,
    },
    // {
    //   title: "Task",
    //   dataIndex: "task",
    //   key: "Id",
    //   sorter: (a, b) => a.task.localeCompare(b.task),
    // },

    {
      title: "Type",
      dataIndex: "nameType",
      key: "nameType",
      render: (t, r) => r.nameType,
    },
    {
      title: "Last modified",
      dataIndex: "uploaded_at",
      key: "uploaded_at",
      sorter: (a, b) => new Date(a.uploaded_at) - new Date(b.uploaded_at),
    },
    // {
    //   title: "Member",
    //   dataIndex: "member",
    //   render: (t, r) => (
    //     <div className="user__tag">
    //       <img src={`${r.member}`} height="35px" width="35px" alt="" />
    //     </div>
    //   ),
    //   key: "Id",
    // },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<RiDownload2Fill />} size="medium" />
          <DeleteFile fileName={record.name} />
        </Space>
      ),
    },
  ];

  return (
    <div className="ctn storage">
      <div className="header">
        <div className="header__search">
          <i>
            <BsSearch className="icon" />
          </i>
          {FilterByNameInput}
        </div>
      </div>
      <div className="content">
        <Table dataSource={dataSource} columns={columns}></Table>
      </div>
    </div>
  );
};

export default Storage;
