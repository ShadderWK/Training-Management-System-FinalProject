import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Table, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ProfileOutlined, SearchOutlined } from "@ant-design/icons";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import { MemberInterface } from "../../interfaces/IMember";

import { GetMembers } from "../../service/HttpClientService";

import "./ListMember.css";

function ListMember() {
  const [member, setMember] = useState<MemberInterface[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const navigate = useNavigate();
  const defaultSelectedKeys = ["3"];

  const columns: ColumnsType<MemberInterface> = [
    {
      title: "UID",
      dataIndex: "ID",
      key: "ID",
      align: "center",
    },

    {
      title: "รูปภาพโปรไฟล์",
      dataIndex: "Image",
      key: "Image",
      align: "center",
      render: (text, record) => {
        return (
          <Image
            src={record.Image}
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
          />
        );
      },
    },

    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "Firstname",
      key: "ID",
      align: "center",
      render: (text, record) => {
        return `${record.Firstname} ${record.Lastname}`;
      },
    },

    {
      title: "อีเมล",
      dataIndex: "Email",
      key: "ID",
      align: "center",
    },

    {
      title: "ดูรายละเอียดเพิ่มเติม",
      key: "action",
      align: "center",
      render: (record) => (
        <span className="icon-table">
          <ProfileOutlined
            style={{
              fontSize: "20px",
              justifyContent: "center",
              alignItems: "center",
              color: "#1890ff",
            }}
            onClick={() => navigate(`/admin/member-detail/${record.ID}`)}
          />
        </span>
      ),
    },
  ];

  const filterMembersByName = () => {
    return member.filter((m) =>
      `${m.Firstname} ${m.Lastname}`
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
  };

  const fetchMembers = async () => {
    let res = await GetMembers();
    res && setMember(res);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/");
    }

    const role = localStorage.getItem("Role");
    if (role === "admin") {
      setRole(role);
    } else {
      localStorage.clear();
    }

    fetchMembers();
  }, []);

  return (
    <div>
      <NavbarAdmin />
      <Layout
        style={{
          maxWidth: "100vw",
          minHeight: "100vh",
          backgroundColor: "#EAEFFA",
        }}
      >
        <SidebarAdmin defaultSelectedKeys={defaultSelectedKeys} />
        <div className="list-member-container">
          <div className="list-member-title">
            <h1>รายชื่อสมาชิกทั้งหมด</h1>

            <div className="list-member-input">
              <input
                placeholder="ค้นหาชื่อ..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <SearchOutlined style={{ color: "#2B56BA" }} />
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={filterMembersByName()}
            scroll={{ x: 1200 }}
          />
        </div>
      </Layout>
    </div>
  );
}

export default ListMember;
