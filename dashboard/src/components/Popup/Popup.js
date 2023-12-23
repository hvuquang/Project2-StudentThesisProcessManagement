import React, { useState } from 'react';
import Modal from 'react-modal';
import './Popup.css'; // Tùy chỉnh CSS cho popup
import axios from "axios";
import common from "../../common/Common.json"


function Popup({ isOpen, onClose, accountType, onAddAccount, showToast, setShowToast }) {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [showToast, setShowToast] = useState(false);
    const pass = "123456"

    const handleSave = () => {
        axios.post(common.url_v1+'account/createAccount',{
            fullname: fullname,
            pass: pass,
            email: email,
            phone_number: phone,
            account_type: accountType
        }).then(res => {
            // Kiểm tra trạng thái thành công hoặc lỗi từ phản hồi
            if (res.status === 201) {
                // setErrorMessage('Tạo tài khoản thành công.');
                onAddAccount(res.data); // Cập nhật danh sách tài khoản
                // Hiển thị Toast khi đóng Popup
                setShowToast(true);

                // Ẩn Toast sau 2 giây
                setTimeout(() => {
                    setShowToast(false);
                }, 2000);
            } else {
                alert('Có lỗi xảy ra khi tạo tài khoản.');
            }
        })
            .catch(error => {
                alert(error)
            });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="popup-modal"
            overlayClassName="popup-overlay"
            ariaHideApp={false}
        >
            <div>
                <h2>Nhập thông tin</h2>
                <label>
                    Họ và tên:
                    <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Số điện thoại:
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
                <button className='saveBtn' onClick={handleSave}>Lưu</button>
                <button className='closeBtn' onClick={onClose}>Đóng</button>
            </div>
        </Modal>
    );
}

export default Popup;