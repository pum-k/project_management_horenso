import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BubbleChat from 'features/ChatOnTask/components/BubbleChat';
import './Chatbox.scss';
import { sendMessage, sendRepliedMessage, sendImage } from './ChatBoxSlice';
import { Form, Input, Button, Space, Upload, message, Tooltip } from 'antd';
import moment from 'moment';
import Title from 'antd/lib/typography/Title';
import {
  SendOutlined,
  CloseOutlined,
  PictureOutlined,
  FileAddOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import RenderImgMessage from './components/RenderImgMessage';

const Chatbox = () => {
  const [repliedMessage, setRepliedMessage] = useState('');
  const [repliedContainer, setRepliedContainer] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatBox.messages);

  console.log(repliedMessage);

  //---------Upload Image-------------->

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || 'image/png';
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isJpgOrPng) {
      message.error('Invalid file type or format');
    }
    if (!isLt5M) {
      message.error('File size must be smaller than 5MB');
    }
    return isJpgOrPng && isLt5M;
  };

  const handleChangeUpload = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      console.log(info);
      getBase64(info.file.originFileObj, (imageUrl) => {
        const newMessage = {
          user: {
            user_name: 'Tuong Minh',
            display_name: 'loo',
            avatar: 'lmao',
          },
          sendAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          replied_message: null,
          mess: imageUrl,
          type: 'image',
        };
        dispatch(sendImage(newMessage));
        message.success('Upload avatar successful');
      });
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    let data = new FormData();
    data.append('file', file);
    data.append('owner', localStorage.getItem('access_token') || '');
    // data.append('room_id', roomId);
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  //<----------------------------------

  const onClickReplyMessage = (item) => {
    setRepliedContainer(true);
    setRepliedMessage(item);
    console.log(item);
  };
  const onHandleSubmit = (data) => {
    if (data.message && !repliedMessage) {
      const tempMessage = {
        user: {
          user_name: 'Tuong Minh',
          display_name: 'loo',
          avatar: 'lmao',
        },
        sendAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        mess: [{ text: data.message, isLiked: false, isDisLiked: false }],
        replied_message: null,
        type: 'text',
      };
      form.resetFields();
      setRepliedContainer(false);
      dispatch(sendMessage(tempMessage));
    } else if (data.message && repliedMessage) {
      const feedbackMessage = {
        user: {
          user_name: 'Tuong Minh',
          display_name: 'loo',
          avatar: 'lmao',
        },
        sendAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        mess: [{ text: data.message, isLiked: false, isDisLiked: false }],
        replied_message: repliedMessage,
        type: 'text',
      };
      form.resetFields();
      setRepliedContainer(false);
      setRepliedMessage('');
      dispatch(sendRepliedMessage(feedbackMessage));
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null)
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  const [form] = Form.useForm();

  return (
    <div className="chatbox">
      <div className="chatbox__content">
        {messages.length === 0 ? (
          <Title level={2}>Let's talk with your partner now!</Title>
        ) : (
          messages.map((message, index) => {
            if (message.type === 'text')
              return (
                <BubbleChat
                  key={index}
                  bubbleChatIndex={index}
                  user={message.user}
                  sendAt={message.sentAt}
                  mess={message.mess}
                  replied_message={message.replied_message}
                  type={message.type}
                  message={message}
                  handleClickReply={onClickReplyMessage}
                />
              );
            else if (message.type === 'image')
              return (
                <RenderImgMessage
                  key={index}
                  index={index}
                  user={message.user}
                  sendAt={message.sentAt}
                  mess={message.mess}
                  replied_message={message.replied_message}
                  type={message.type}
                  message={message}
                  handleClickReply={onClickReplyMessage}
                />
              );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <Form
        layout="horizontal"
        size="small"
        form={form}
        onFinish={onHandleSubmit}
        className="chatbox__control"
      >
        {repliedContainer && (
          <div className="chatbox__control__replied-container">
            <Text style={{ color: '#fff', marginBottom: '0' }}>
              {repliedMessage}
            </Text>
            <Button
              onClick={() => setRepliedContainer(false)}
              type="default"
              shape="circle"
              icon={<CloseOutlined />}
              size="small"
            />
          </div>
        )}

        <Form.Item name="message" style={{ width: '100%' }}>
          <Input
            autocomplete="off"
            style={{ padding: '0.5rem' }}
            placeholder="Enter your message..."
            size="large"
            autoFocus
            suffix={
              <Space>
                <Tooltip title="Attach File">
                  <FileAddOutlined className="hover-section" />
                </Tooltip>

                <Upload
                  name="image"
                  showUploadList={false}
                  customRequest={dummyRequest}
                  onChange={handleChangeUpload}
                  beforeUpload={beforeUpload}
                >
                  <Tooltip title="Upload Picture">
                    <PictureOutlined className="hover-section" />
                  </Tooltip>
                </Upload>
                <Tooltip title="Smileee!!!">
                  <SmileOutlined className="hover-section" />
                </Tooltip>

                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '2.5rem' }}
                >
                  <SendOutlined />
                </Button>
              </Space>
            }
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Chatbox;
