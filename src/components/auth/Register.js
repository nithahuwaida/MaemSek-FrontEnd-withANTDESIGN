import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Form, Input, Icon, Button, Typography } from 'antd';
import './Style.css';
import Logo from '../../image/LogoMaemSek.png';
import { connect } from 'react-redux';
import { register } from '../../public/redux/actions/user';

const { Title} = Typography;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    loading : false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        this.props.dispatch(register(values))
        .then(res =>{
          this.props.history.push('/login')
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  login= () =>{
    this.props.history.push('login');
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
        <div className='auth'>
          <Row >

            {/* Logo */}
            <Col className='col-logo' span={14}>
              <img src={Logo} alt="Logo"/>
              <Title>" MaemSek Ojo Lali! "</Title>
            </Col>

            {/* Form */}
            <Col className='col-form' span={10}>
              <div className='div-auth'><br/>
                <Title>SELAMAT  DATANG</Title>
                <Form onSubmit={this.handleSubmit} className="auth-form">
                <Form.Item >
                    {getFieldDecorator('fullname', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your fullname!',
                        },
                      ],
                    })(
                    <Input
                    prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.5)' }} />}
                    placeholder="Fullname"
                    />
                    )}
                  </Form.Item>
                  <Form.Item >
                    {getFieldDecorator('username', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your username!',
                        },
                      ],
                    })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />}
                    placeholder="Username"
                    />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('email', {
                      rules: [
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail!',
                        },
                      ],
                    })(
                    <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.5)' }} />}
                        placeholder="E-mail"
                    />
                    )}
                  </Form.Item>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                        {
                          validator: this.validateToNextPassword,
                        },
                      ],
                    })(
                    <Input.Password 
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
                        type="password"
                        placeholder="Password"                    
                    />
                    )}
                  </Form.Item>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('confirm', {
                      rules: [
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        {
                          validator: this.compareToFirstPassword,
                        },
                      ],
                    })(
                    <Input.Password 
                    onBlur={this.handleConfirmBlur}
                    type="password"
                    placeholder="Confirm Password"
                    />
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button 
                    loading={this.state.loading}
                    type="primary" 
                    htmlType="submit" 
                    className="auth-form-button">
                      Register
                    </Button>
                    <Button type='link' onClick={this.login} ghost>Punya akun? Silakan login!</Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>

          </Row>
        </div>
    );
  }
}
const Register = Form.create({ name: 'register' })(RegistrationForm);
const mapStateToProps = state =>{
  return {
    user : state.user,
  }
}
export default connect(mapStateToProps)(Register);
          