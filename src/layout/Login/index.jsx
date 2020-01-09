import React from 'react';
import { Form, Button, Input, Icon } from 'antd';
import "./index.css";
class Login extends React.Component{
    handleSubmit =  e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.onLogin(values);  
          }
        });
      };
    render(){
        const { getFieldDecorator } = this.props.form;
        const {logo,loginLogoStyle}=this.props;
        return (
          <div className="login-panel">
            {logo&&<img src={logo} alt="logo" className="login-logo" style={loginLogoStyle} />}
            <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "Username is mandatory!" }]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "Password is mandatory!" }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
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

export default Form.create({})(Login);