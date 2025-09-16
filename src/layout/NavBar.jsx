import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown, Grid } from "antd";
import { logout } from "../store/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import notify from "../hooks/Notifications";
import avatar from '../assets/noProfile.png';

import {
  ReadOutlined,
  EditOutlined,
  DatabaseOutlined,
  LoginOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  ControlOutlined,
  PlusCircleOutlined,
  ApartmentOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Modal from "../components/confirm/Modal";
import { getProfile } from "../store/reducers/userSlice";

const NavBar = ({ auth }) => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const profile = useSelector((state) => state?.user?.user);
  const screens = Grid.useBreakpoint();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    setModalOpen(true);
  };

  const confirmModal = () => {
    dispatch(logout());
    notify("you Logged out successfully", "success");
    navigate("/");
  };

  const cancelModal = () => {
    setModalOpen(false);
  };

  const menuItems = [
    {
      label: <Link to="/dashboard">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/about">About</Link>,
      key: "about",
      icon: <InfoCircleOutlined />,
    },
    auth
      ? {
          label: "Articles",
          key: "articles",
          icon: <ReadOutlined />,
          children: [
            {
              label: <Link to="/articles/create">Create Article</Link>,
              key: "create_article",
              icon: <EditOutlined />,
            },
            {
              label: <Link to="/categories/create">Create Category</Link>,
              key: "create_category",
              icon: <ApartmentOutlined />,
            },
            {
              label: <Link to="/categories">Read Articles</Link>,
              key: "read_articles",
              icon: <DatabaseOutlined />,
            },
          ],
        }
      : {
          label: "Articles",
          key: "articles",
          icon: <ReadOutlined />,
          onClick: () => navigate("/categories"),
        },
    auth
      ? {
          label: "Control",
          key: "control",
          icon: <ControlOutlined />,
          children: [
            {
              label: "Add Member",
              key: "add_member",
              icon: <PlusCircleOutlined />,
              onClick: () => navigate("/register"),
            },
            {
              label: <Link to="/committee-form">Add Committee</Link>,
              key: "add_committee",
              icon: <PlusCircleOutlined />,
            },
          ],
        }
      : null,
    auth
      ? {
          label: "Logout",
          key: "logout",
          icon: <LoginOutlined />,
          onClick: handleLogout,
        }
      : {
          label: "Login",
          key: "login",
          icon: <LoginOutlined />,
          onClick: () => navigate("/"),
        },
    auth && {
      label: screens.lg ? (
        <Dropdown
          placement="bottomRight"
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "username",
                label: (
                  <>
                  <span className="font-semibold block">
                    {profile?.name || "User"}
                  </span>
                  <span className="font-semibold">
                    {profile?.email || "User Email"}
                  </span>
                  </>
                ),
                disabled: true,
              },
              {
                type: "divider",
              },
              {
                key: "profile",
                label: "Profile",
                icon: <UserOutlined />,
                onClick: () => navigate("/profile"),
              },
            ],
          }}
        >
          <div className="flex items-center cursor-pointer gap-2">
            <img
              src={profile?.image_url || avatar}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover border border-white shadow-md bg-white"
            />
            <span className="lg:hidden">Profile</span>
          </div>
        </Dropdown>
      ) : (
        <div
          className="flex items-center cursor-pointer gap-2 -ml-3"
          onClick={() => navigate("/profile")}
        >
          <img
            src={profile?.image_url || avatar}
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover border border-white shadow-md bg-white"
          />
          <span className="lg:hidden">Profile</span>
        </div>
      ),
      key: "dropdown_profile",
    },
  ].filter(Boolean);

  // const profileDropdownMenu = [
  //   {
  //     key: "username",
  //     label: profile?.name || "User",
  //     disabled: true,
  //     style: { fontWeight: "bold", cursor: "default" },
  //   },
  //   {
  //     type: "divider",
  //   },
  //   {
  //     key: "profile",
  //     label: "Profile",
  //     icon: <UserOutlined />,
  //     onClick: () => navigate("/profile"),
  //   },
  //   {
  //     key: "logout",
  //     label: "Logout",
  //     icon: <LogoutOutlined />,
  //     onClick: handleLogout,
  //   },
  // ];

  return (
    <>
      <nav className="bg-customBlue3 fixed w-full top-0 py-2 z-50 shadow-lg h-16">
        <div className="container">
          <div className="grid grid-cols-2">
            <Link to="/">
              <img
                className="w-[50px] aspect-square"
                src="/images/logo.png"
                alt="Logo"
              />
            </Link>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              className="!bg-transparent !border-b-0  bg-[#BED7EA] flex justify-end items-center"
              items={menuItems}
            />
          </div>
        </div>
      </nav>
      <Modal
        heading={"Logout Confirmation"}
        message={"Are You Sure You Want to Logout?"}
        onConfirm={confirmModal}
        onCancel={cancelModal}
        isOpen={modalOpen}
      />
    </>
  );
};

export default NavBar;
