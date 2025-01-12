import React, { useState } from 'react';
import './Meeting.scss';
import '../../../styles/ContainerContents.scss';
import Header from './components/Header/Header';
import { Switch, Route, Link, useParams } from 'react-router-dom';
import Workplace from './components/Workplace/Workplace.jsx';
const Meeting = () => {
  const { idProject } = useParams();
  console.log(idProject);
  const [room, setRoom] = useState([
    {
      id: '291adw',
      name: 'Phân tích giai đoạn xây dựng giao diện người dùng',
      decription:
        'Cuộc họp được lên khi chúng Cuộc họp được lên khi chúng Cuộc họp được lên khi chúng Cuộc họp được lên khi chúng Cuộc họp được lên khi chúng Cuộc họp được lên khi chúng Cuộc họp được lên khi chúng Cuộc họp được lên khi chúngta cần thảo luận về hướng giải quyết và phát triển của dự án ở giai đoạn một. Với 2 nhiệm vụ chính trong giai đoạn này là thiết kế mô hình ứng dụng và nghiên cứu API / Liberty liên quan',
      timeStart: '19:00 12/06/2021',
      status: true,
    },
    {
      id: '291a2dw',
      name: 'Phân tích giai đoạn 1',
      decription:
        'Cuộc họp được lên khi chúng ta cần thảo luận về hướng giải quyết và phát triển của dự án ở giai đoạn một. Với 2 nhiệm vụ chính trong giai đoạn này là thiết kế mô hình ứng dụng và nghiên cứu API / Liberty liên quan',
      timeStart: '19:00 12/06/2021',
      status: false,
    },
  ]);

  return (
    <div className="ctn meeting">
      <Header room={room} />
      <Workplace room={room} />
    </div>
  );
};

export default Meeting;
