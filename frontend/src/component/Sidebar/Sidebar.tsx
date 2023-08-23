import React, { useState } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";

import "./Sidebar.css";

import LogoImg from "../../assets/Logo.png";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Q&A", "1", <QuestionCircleOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      style={{ backgroundColor: "#fff" }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="sidebar-title">
        <img className="sidebar-logo" src={LogoImg} />
        {!collapsed ? (
          <div className="sidebar-title-text">
            <p>สถาบันวิจัย</p>
            <p>และพัฒนา</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="sidebar-menu">
        <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
      </div>
    </Sider>
  );
}

export default Sidebar;
