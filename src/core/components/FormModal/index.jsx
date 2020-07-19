import React, { useEffect } from 'react';
import { withModal } from "react-antd-dashboard";
import { Modal, Form } from 'antd';
const FormModal = props => {
    const { modalData, modalProps, addTitle, editTitle, formProps, ...rest } = props;
    const [form] = Form.useForm();
    const formLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    useEffect(() => {
        if (modalData)
            form.setFieldsValue(modalData);
        else form.resetFields();
    }, [modalData, form]);
    const onSubmit = () => {
        form.validateFields().then(values => {
            if (modalData)
                props.onEdit({ ...modalData, ...values });
            else
                props.onAdd({ ...modalData, ...values });
        });
    };
    return <Modal {...modalProps} title={modalData ? editTitle : addTitle} onOk={onSubmit} {...rest} >
        <Form {...formLayout} form={form} onFinish={onSubmit} onSubmit={onSubmit} {...formProps} >
            {props.children}
        </Form>
    </Modal>
};

export default withModal()(FormModal);