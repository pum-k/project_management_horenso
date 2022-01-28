import { Avatar, Comment, Dropdown, Menu, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import moment from 'moment';
import React, { createElement, useState } from 'react';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  CommentOutlined,
} from '@ant-design/icons';

const BubbleChat = (props) => {
  const { user, mess, sendAt, handleClickReply, replied_message } = props;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  // const [repliedMessage, setRepliedMessage] = useState(false);
  // const [reply, setReply] = useState('');

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  // const handleClickReply = (item) => {
  //   console.log(item);
  //   if (!item) return;
  // };

  const actions = [
    // <Tooltip key="comment-basic-like" title="Like">
    //   <span onClick={like}>
    //     {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
    //     <span className="comment-action">{likes}</span>
    //   </span>
    // </Tooltip>,
    // <Tooltip key="comment-basic-dislike" title="Dislike">
    //   <span onClick={dislike}>
    //     {React.createElement(
    //       action === 'disliked' ? DislikeFilled : DislikeOutlined
    //     )}
    //     <span className="comment-action">{dislikes}</span>
    //   </span>
    // </Tooltip>,
    <span key="comment-basic-reply-to">Reply to: {replied_message}</span>,
  ];
  return (
    <>
      <Comment
        actions={replied_message ? actions : null}
        author={<Text>{user.user_name}</Text>}
        avatar={<Avatar src={user.avatar} alt={user.user_name} />}
        content={mess.map((item, index) => (
          <>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1" onClick={() => handleClickReply(item)}>
                    <CommentOutlined style={{ marginRight: '0.3rem' }} />
                    Reply to
                  </Menu.Item>
                </Menu>
              }
              trigger={['contextMenu']}
            >
              <Text key={index}>{item}</Text>
            </Dropdown>

            <br />
          </>
        ))}
        datetime={
          <Tooltip title={moment(sendAt).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(sendAt).fromNow()}</span>
          </Tooltip>
        }
      />
    </>
  );
};

export default BubbleChat;
