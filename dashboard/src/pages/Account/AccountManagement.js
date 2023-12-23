import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './AccountMangement.css';
import Popup from '../../components/Popup/Popup';
import Toast from '../../components/Toast/Toast';
import Loading from '../../components/Loading/Loading';


function AccountManagement() {
    const [accounts, setAccounts] = useState(null);
    const [accountType, setAccountType] = useState('sv');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [pages,setPages] = useState(0);
    const [selectedPage, setSelectedPage] = useState(1);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/v1/account/pageNumber/'+accountType).then(res=>setPages(res.data))
        axios.get(`http://localhost:8000/v1/account/getAccountByAccountType/${accountType}`+"&"+selectedPage)
            .then((res) => {
                setAccounts(res.data);
            });
    }, [accountType]);

    const handleAddAccount = (newAccount) => {
        setAccounts([...accounts, newAccount]); // Thêm tài khoản mới vào danh sách cục bộ
    };

    const handleEdit = (accountId) => {
        // Xử lý sự kiện khi nhấn vào icon sửa
    };

    const handleDelete = (accountId) => {
        // Xử lý sự kiện khi nhấn vào icon xóa
        console.log(`Delete account ${accountId}`);
    };

    const handleShowPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const selectedPageHandle = (indexPage)=>{
        setSelectedPage(indexPage);
        axios.get(`http://localhost:8000/v1/account/getAccountByAccountType/${accountType}` + "&" + indexPage)
            .then((res) => {
                setAccounts(res.data);
            });
    }

    return (
        <div className="account-table-container">
            <h1>Danh sách tài khoản</h1>

            <div className="button-container">
                <div>
                    <button
                        className={`account-type-button ${accountType === 'sv' ? 'active' : ''}`}
                        onClick={() => setAccountType('sv')}
                    >
                        Sinh viên
                    </button>
                    <button
                        className={`account-type-button ${accountType === 'gv' ? 'active' : ''}`}
                        onClick={() => {setSelectedPage(1); setAccountType('gv')}}
                    >
                        Giáo viên
                    </button>
                </div>
                <div>
                    <button
                        className="add-account-button"
                        onClick={handleShowPopup}
                    >
                        <FontAwesomeIcon icon={faPlus} /> Thêm
                    </button>
                </div>
            </div>
            {isPopupOpen && (
                <Popup
                    isOpen={isPopupOpen}
                    onClose={handleClosePopup}
                    accountType={accountType}
                    onAddAccount={handleAddAccount}
                    onClosePopup={handleClosePopup}
                    showToast={showToast}
                    setShowToast={setShowToast}
                />
            )}
            <table className="account-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Số Điện Thoại</th>
                        <th>Email</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts ? accounts?.map((account) => (
                        <tr key={account._id}>
                            <td>{account._id}</td>
                            <td>{account.fullname}</td>
                            <td>{account.phone_number}</td>
                            <td>{account.email}</td>
                            <td>
                                <button onClick={() => handleEdit(account.id)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(account.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    )) : <Loading/>}
                </tbody>
            </table>
            <div className="pagination">
                {[...Array(pages)].map((_, index) => (
                    <button
                        key={index + 1}
                        className={`page-button ${selectedPage === index + 1 ? 'active' : ''}`}
                        onClick={() => selectedPageHandle(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            {showToast && <Toast message="Thêm tài khoản thành công"/>} {/* Hiển thị toast */}
        </div>
    );
}

export default AccountManagement;