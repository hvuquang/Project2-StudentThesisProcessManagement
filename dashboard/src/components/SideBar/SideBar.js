import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "./SideBar.css";
import logo from "../../images/Screenshot_2023-12-02_121808-removebg-preview.png";

function SideBar() {
  return (
    <div className="sidebar">
      <Link to="/" className="logo-link">
        <img src={logo} alt='Logo' />
      </Link>
      <ul>
        <li>
          <Link to="/manage-account" className="menu-link">
            <FontAwesomeIcon icon={faUser} />
            <span>Quản lí tài khoản</span>
          </Link>
        </li>
        <li>
          <Link to="/manage-reports" className="menu-link">
            <FontAwesomeIcon icon={faTasks} />
            <span>Quản lí báo cáo</span>
          </Link>
        </li>
        <li>
          <Link to="/manage-change-topics" className="menu-link">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Quản lý ĐTĐT</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SideBar;