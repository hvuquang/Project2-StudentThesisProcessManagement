import React, { useState, useEffect } from 'react';
import './ReportManagement.css';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import common from "../../common/Common.json";

function ReportManagement() {
    const [reports, setReports] = useState(null);
    const [selectedPage,SetSelectedPage] = useState(1);
    const [pageNumber,setPageNumber] = useState(0);

    useEffect(() => {
        axios.get(common.url_v1+'report/getSubmitReport/'+selectedPage).then(res => {
            setReports(res.data);
        })
        axios.get(common.url_v1+'report/pageNumber').then(res=>{
            setPageNumber(res.data);
        })
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    const selectedPageHandle = (indexPage) => {
        SetSelectedPage(indexPage);
        axios.get(common.url_v1+"report/getSubmitReport/" + indexPage)
            .then((res) => {
                setReports(res.data);
            });
    }

    return (
        <div className="report-management">
            <h1>Danh sách báo cáo đồ án</h1>

            <table className="report-table">
                <thead>
                    <tr>
                        <th>Mã Sinh Viên</th>
                        <th>Tên sinh viên</th>
                        <th>Loại báo cáo</th>
                        <th>File báo Cáo</th>
                        <th>Thời Gian Nộp</th>
                    </tr>
                </thead>
                <tbody>
                    {reports ? reports.map((report, key) => (
                        report.submit_reports.map((submitReport, index) => (
                            <tr key={`${key}-${index}`} className={(key + index) % 2 === 0 ? 'even-row' : 'odd-row'}>
                                <td>{submitReport.ma_sv._id}</td>
                                <td>{submitReport.ma_sv.fullname}</td>
                                <td>{submitReport.loai_bao_cao}</td>
                                <td>
                                    <a href={common.url + `${submitReport.file}`} target="_blank" rel="noopener noreferrer">
                                        <span className="file-icon">File</span>
                                    </a>
                                </td>
                                <td>{formatDate(submitReport.createdAt)}</td>
                            </tr>
                        ))
                    )) : <Loading />}
                </tbody>
            </table>
            <div className="report-management">
                {/* ... (phần code khác) */}
                <div className="report-pagination">
                    {[...Array(pageNumber)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => selectedPageHandle(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReportManagement;