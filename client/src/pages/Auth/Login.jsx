import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../assets/img/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { loginRoute } from '../../utils/APIRoutes';
import { useToast } from '../../context/ToastContext';


const Auth = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate();
  const showToast = useToast();
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }
  const toastNoti = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, email } = values;
      try {
        const { data } = await axios.post(loginRoute, {
          email,
          password
        })
        if (data) {
          showToast('success', "Chào mừng bạn trở lại!", toastNoti);
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          showToast('error', error.response.data.message, toastNoti);
        } else {
          showToast('error', "Đăng ký thất bại! Lỗi không xác định.", toastNoti);
        }
      }
    }

  };
  const handleValidation = () => {
    const { password, email } = values;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      toast.error("Không được bỏ trống email.", toastNoti)
      return false;
    } else if (!emailRegex.test(email)) {
      toast.error("Email không đúng định dạng.", toastNoti);
      return false;
    } else if (password === "") {
      toast.error("Không được bỏ trống mật khẩu.", toastNoti)
      return false;
    }
    return true;
  }
  return (
    <div className="Auth container">
      <div className="row login-container">
        <div className="a-left col-6">
          <div className="Webname">
            <img src={Logo} alt="" className="logo" />
            <h6>Chia sẻ và kết nối của cuộc sống của bạn.</h6>
          </div>
        </div>

        <div className="a-right col-6">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h3 className="text-center">Đăng nhập</h3>
            <div className="input-section">
              <input
                type="text"
                placeholder="Email"
                className="infoInput col-12"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-section">
              <input
                type="password"
                className="infoInput col-12"
                placeholder="Mật khẩu"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <div className="input-section">
              <span className="toggle-btn">
                <Link to="/register" className="toggle-link">
                  Bạn chưa có tài khoản? Đăng ký ngay!
                </Link>
              </span>
              <button
                className="col-12 infoButton"
                type="Submit"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
