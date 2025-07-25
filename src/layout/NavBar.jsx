import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { logout } from "../store/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import notify from "../hooks/Notifications";
import avatar from '../assets/noProfile.png'


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
} from "@ant-design/icons";
import Modal from "../components/confirm/Modal";
import { getProfile } from "../store/reducers/userSlice";

const NavBar = ({ auth }) => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const profile = useSelector((state)=>state?.user?.user)
  useEffect(()=>{
dispatch(getProfile())
  }, [dispatch])
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () =>{
                setModalOpen(true)
  }

  const confirmModal = () =>{
                dispatch(logout())
                notify("you Logged out successfully", "success");

            navigate("/")

  }

  const cancelModal = () =>{
    setModalOpen(false);
  }

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
              onClick:()=> navigate("/register")
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
  label: (
    <div className="flex lg:items-center lg:justify-center gap-2 lg:gap-0">
      <img
        src={profile?.image_url || avatar}
        alt="Avatar"
        className=" w-8 h-8 rounded-full object-cover lg:border lg:border-white lg:shadow-md -ml-2 gap-1 lg:-ml-0 lg:gap-0"
      />
      <span className="lg:hidden inline-block ">Profile</span>
    </div>
  ),
  key: "profile",
  icon: null,
  onClick: () => navigate("/profile"),
},
  ].filter(Boolean);

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
    onConfirm = {confirmModal}
    onCancel={cancelModal}
    isOpen={modalOpen}
    />
    </>
  );
};

export default NavBar;
