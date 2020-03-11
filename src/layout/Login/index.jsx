import React from 'react';
import { Form, Button, Input } from 'antd';
import "./index.css";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class Login extends React.Component {
  handleSubmit = (values) => {
    this.props.onLogin(values);
  };
  render() {
    const { logo, loginLogoStyle } = this.props;
    return (
      <div className="login-panel">
        {logo && <img src={logo} alt="logo" className="login-logo" style={loginLogoStyle} />}
        <Form onFinish={this.handleSubmit} className="login-form">

          <Form.Item
            rules={[{ required: true, message: "Username is required!" }]}
            name="username">

            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />

          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password is required!" }]}>

            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />

          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Login
              </Button>
          </Form.Item>
        </Form>
      </div>);
  }
}

export default Login;