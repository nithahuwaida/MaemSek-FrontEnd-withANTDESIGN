import React from 'react';
import 'antd/dist/antd.css';
import './Style.css';
import Logo from '../../image/LogoMaemSek.png';
import { connect } from 'react-redux';
import { login } from '../../public/redux/actions/user';
import { Row, Col, Form, Icon, Input, Button, Typography, notification } from 'antd';


const { Text } = Typography;

class LoginForm extends React.Component {
  state = {
    loading: false,
    redirect : false
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
          localStorage.setItem('token-jwt', this.props.user.userList.jwt);
          if(this.props.user.userList.jwt === undefined|| this.props.user.userList.jwt === null || this.props.user.userList.jwt === ''){
            this.setState({ loading: false })
            localStorage.removeItem('token-jwt');
            notification['error']({
              message: 'Error',
              description:
              this.props.user.userList,
            });
          }else{
            localStorage.setItem('user-id', this.props.user.userList.user.id);
            localStorage.setItem('user-email', this.props.user.userList.user.email);
            this.props.history.push('/')
            notification['success']({
              message: 'Login Berhasil',
              description:
                'Selamat Datang di Aplikasi Maem Sek',
            });
          }
        }).catch(error => {
          this.setState({ loading: false })
          console.log(error)
        });
        // console.log('Received values of form: ', values);
      }else{
        console.log('error') 
        this.setState({ loading: false })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div className='auth'>
          <Row >
            <Col className='col-logo' span={14}>
              <img className='image' src={Logo} alt="Logo"/><br/>
              <Text className='text'>" MaemSek Ojo Lali! "</Text>
            </Col>
            <Col className='col-form' span={10}>
              <div className='div-auth'><br/>
                <Text className='text'>SELAMAT  DATANG</Text>
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