import React, { useState } from "react";
import {
  HomeOutlined,
  FolderOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
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
    <Link to="/member/home">
      <HomeOutlined style={{ color: "#2B56BA" }} />
    </Link>
  ),
  getItem(
    "คอร์สเรียนของฉัน",
    "2",
    <Link to="/member/course">
      <FolderOutlined style={{ color: "#2B56BA" }} />
    </Link>
  ),
  getItem(
    "การชำระเงิน",
    "3",
    <Link to="/member/payment">
      <ShoppingCartOutlined style={{ color: "#2B56BA" }} />
    </Link>
  ),
  getItem(
    "ติดต่อเจ้าหน้าที่",
    "4",
    <Link to="/member/question">
      <CommentOutlined style={{ color: "#2B56BA" }} />
    </Link>
  ),
  getItem(
    "ออกจากระบบ",
    "5",
    <LogoutOutlined style={{ color: "#2B56BA" }} />,
    undefined,
    signout
  ),
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

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
          defaultSelectedKeys={["1"]}
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

export default Sidebar;
