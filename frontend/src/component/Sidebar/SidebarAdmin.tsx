import React, { useState } from "react";
import {
  HomeOutlined,
  PictureOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import "./Sidebar.css";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  onClick?: () => void
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  } as MenuItem;
}

const signout = () => {
  localStorage.clear();
  window.location.href = "/";
};

const items: MenuItem[] = [
  getItem(
    "หน้าหลัก",
    "1",
    <Link to="/admin/home">
      <HomeOutlined style={{ color: "#2B56BA" }} />
    </Link>
  ),

  getItem(
    "แก้ไขข่าวสาร",
    "2",
    <Link to="/admin/edit-news">
      <PictureOutlined style={{ color: "#2B56BA" }} />
    </Link>
  ),

  getItem(
    "แก้ไข FAQ",
    "3",
    <Link to="/admin/edit-faq">
      <QuestionCircleOutlined style={{ color: "#2B56BA" }} />
    </Link>
  ),

  getItem(
    "ออกจากระบบ",
    "4",
    <LogoutOutlined style={{ color: "#2B56BA" }} />,
    undefined,
    signout
  ),
];

interface SidebarProps {
  defaultSelectedKeys?: string[];
}

function SidebarAdmin({ defaultSelectedKeys }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sider
      style={{
        backgroundColor: "#fff",
        paddingTop: "24px",
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="dark"
      width={220}
    >
      <div>
        <Menu
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          items={items}
          style={{
            color: "#2B56BA",
            fontWeight: "400",
            fontSize: "20px",
            fontFamily: "IBM Plex Sans Thai",
          }}
        />
      </div>
    </Sider>
  );
}

export default SidebarAdmin;
