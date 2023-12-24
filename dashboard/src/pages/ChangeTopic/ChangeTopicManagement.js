import React, { useState, useEffect } from 'react'
import "./ChangeTopicManagement.css"
import common from "../../common/Common.json";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

function ChangeTopicManagement() {
    const [registerTopics, setRegisterTopics]= useState(null);
    useEffect(() => {
        axios.get(common.url_v1 + 'registerTopic/getAllRegisterTopicByStatus').then(res => {
            setRegisterTopics(res.data);
        })
    }, []);
    const change_topic = [
        {
            "ma_sv": {
                "_id": "656adfdc6ed7f1cc0c9e9f91",
                "fullname": "adam",
                "email": "test2@gmail.com"
            },
            "topic_name": "Quản lý sinh viên"
        }
    ]
    
    const confirmHandler = (ma_sv) => {
        axios.put(common.url_v1 + "registerTopic/facultyConfirmChangeTopic/" + ma_sv).then(() => {
            // Sau khi xác nhận thành công, cập nhật registerTopics bằng cách loại bỏ change_topic
            const updatedTopics = registerTopics.filter(topic => topic.ma_sv._id !== ma_sv);
            setRegisterTopics(updatedTopics);
        }).catch(error => {
            // Xử lý lỗi nếu cần
            console.error("Error confirming topic:", error);
        });
    }

  return (
      <div className="change-topic-management">
          <h1>Danh sách yêu cầu đổi đề tài</h1>

          <table className="change-topic-table">
              <thead>
                  <tr>
                      <th>Mã sinh viên</th>
                      <th>Tên sinh viên</th>
                      <th>Tên đề tài</th>
                      <th>Thao tác</th>
                  </tr>
              </thead>
              <tbody>
                  {registerTopics ? registerTopics.map((topic, index) => (
                      <tr key={index}>
                          <td>{topic.ma_sv._id}</td>
                          <td>{topic.ma_sv.fullname}</td>
                          <td>{topic.topic_name}</td>
                          <td>
                              <button className="confirm-button" onClick={()=>confirmHandler(topic.ma_sv._id)}>Xác nhận</button>
                          </td>
                      </tr>
                  )) : <Loading />}
              </tbody>
          </table>
      </div>
  )
}

export default ChangeTopicManagement
