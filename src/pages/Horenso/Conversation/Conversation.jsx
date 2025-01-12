import Chatbox from 'features/ChatBox/Chatbox';
import ConversationSetting from 'features/ConversationSetting/ConversationSetting';
import Listchannel from 'features/ListChannel/ListChannel';
import React, { useState } from 'react';
import './Conversation.scss';

const Conversation = () => {
  const [openCreatechannel, setOpenCreatechannel] = useState(false);
  return (
    <div className='ctn ctn-con'>
      <Listchannel />
      <Chatbox />
      <ConversationSetting />
    </div>
  );
};

export default Conversation;
