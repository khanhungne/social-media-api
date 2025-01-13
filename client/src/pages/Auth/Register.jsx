import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../assets/img/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';
import { useToast } from '../../context/ToastContext';
import { registerRoute } from '../../utils/APIRoutes'


const Auth = () => {
  const [values, setValues] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate();
  const showToast = useToast();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
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
      const { name, password, username, email } = values;
      try {
        const { data } = await axios.post(registerRoute, {
          name,
          username,
          email,
          password,
        });
        if (data) {
          showToast('success', "Đăng ký tài khoản thành công!", toastNoti);
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
    const { name, username, email, password, confirmPassword } = values;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === "") {
      toast.error("Không được bỏ trống họ tên.", toastNoti)
      return false;
    } else if (username === "") {
      toast.error("Không được bỏ trống biệt danh.", toastNoti)
      return false;
    } else if (email === "") {
      toast.error("Không được bỏ trống email.", toastNoti)
      return false;
    } else if (!emailRegex.test(email)) {
      toast.error("Email không đúng định dạng.", toastNoti);
      return false;
    } else if (username.length < 3) {
      toast.error("Ký tự của biệt danh phải lớn hơn 3.", toastNoti)
      return false;
    } else if (password.length < 6) {
      toast.error("Mật khẩu phải lớn hơn 8 kí tự.", toastNoti)
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu chưa giống nhau.", toastNoti)
      return false;
    }
    return true;
  }
  return (
    <div className="Auth container">
      <div className="a-left">
        <div className="Webname">
          <img src={Logo} alt="" className="logo" />
          <h6>Chia sẻ và kết nối của cuộc sống của bạn.</h6>
        </div>
      </div>

      <div className="a-right">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-center">Đăng ký tài khoản</h3>
          <div className="input-section d-flex">
            <input
              type="text"
              placeholder="Họ và tên"
              className="infoInput flex-fill"
              style={{ marginRight: '5px' }}
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Biệt danh"
              className="infoInput flex-fill"
              name="username"
              value={values.username}
              onChange={handleChange}
            />
          </div>

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
            <input
              type="password"
              className="infoInput col-12 "
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={values.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="input-section">
            <span className="toggle-btn">
              <Link to="/login" className="toggle-link">
                Đã có tài khoản? Đăng nhập ngay!
              </Link>
            </span>
            <button
              className="col-12 infoButton"
              type="Submit"
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>

  );
};

export default Auth;
