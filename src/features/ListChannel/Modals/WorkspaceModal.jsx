import React from 'react';
import { Modal, Form, message, Input, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { addWorkspaceChannel } from '../ListChannelSlice';

function WorkspaceModal({
  openWorkspaceModal,
  setOpenWorkspaceModal,
  members,
}) {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onFinish = (value) => {
    console.log(value);
    setOpenWorkspaceModal(false);
    dispatch(addWorkspaceChannel(value));
  };

  const onFinishFailed = () => {
    message.error('Submit Failed!');
  };

  return (
    <div>
      <Modal
        visible={openWorkspaceModal}
        title="Add new workspace"
        okText="Create"
        cancelText="Cancel"
        onCancel={() => setOpenWorkspaceModal(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onFinish(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true }, { type: 'string', min: 6 }]}
          >
            <Input placeholder="Enter name of workspace" size="large" />
          </Form.Item>

          <Form.Item
            label="Members"
            name="members"
            rules={[
              {
                required: true,
                message: 'Please choose member to this conversation',
              },
            ]}
          >
            <Select mode="multiple" placeholder="Members in this conversation">
              {members.map((item) => (
                <Select.Option value={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default WorkspaceModal;
