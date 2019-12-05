import React from 'react';
import 'antd/dist/antd.css';
import './Style.css';
import Logo from '../../image/LogoMaemSek.png';
import { connect } from 'react-redux';
import { login } from '../../public/redux/actions/user';
import { Row, Col, Form, Icon, Input, Button, Typography } from 'antd';

const { Title } = Typography;

class LoginForm extends React.Component {
  state = {
    loading: false,
  };
  register = ()=>{
    this.props.history.push('/register')
  }
  
  handleSubmit = async(e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        this.props.dispatch(login(values))
        .then(res =>{
          localStorage.setItem('token-jwt', this.props.user.dataUser[0].jwt);
          localStorage.setItem('user-id', this.props.user.dataUser[0].user.id);
          localStorage.setItem('user-email', this.props.user.dataUser[0].user.email);
          this.props.history.push('/home')
        });
        // console.log('Received values of form: ', values);
        
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
        <div className='auth'>
          <Row >
            <Col className='col-logo' span={14}>
              <img src={Logo} alt="Logo"/>
              <Title>" MaemSek Ojo Lali! "</Title>
            </Col>
            <Col className='col-form' span={10}>
              <div className='div-auth'><br/>
                <Title>SELAMAT  DATANG</Title>
                <Form onSubmit={e => this.handleSubmit(e)} className="auth-form">
                  <Form.Item>
                    {getFieldDecorator('email', {
                      rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />}
                        placeholder="email"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
                        type="password"
                        placeholder="Password"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="auth-form-button" 
                    loading={this.state.loading}>
                      Log in
                    </Button>
                    <Button 
                    type='link' 
                    onClick={this.register} ghost>
                      Tidak punya akun? Register sekarang!
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
    );
  }
}
const Login = Form.create({ name: 'normal_login' })(LoginForm);

const mapStateToProps = state =>{
  return {
    user : state.user,
  }
}
export default connect(mapStateToProps)(Login);