import React, { Component } from 'react';
import {getJwt} from '../helpers/Helpers';
import {withRouter} from 'react-router-dom';
// import {withRouter, Redirect} from 'react-router-dom';
// import axios from 'axios';

class Autentication extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){
        const jwt = getJwt();
        if(!jwt){
            this.props.history.push("/login");
        }
        else if(jwt === undefined|| jwt === null || jwt === ''){
            localStorage.removeItem('token-jwt');
            this.props.history.push('/login');
        }else{
            // axios.get(`${process.env.REACT_APP_BASE_URL}/products`, {headers: {"Authorization": jwt}})
            // .then(res => {
            //     this.setState({
            //     data: res.data.response
            //     });
            // }).catch(err=>{
            //     this.props.history.push('/login');
            //     localStorage.removeItem('token-jwt');
            //     localStorage.removeItem('user-id');
            //     localStorage.removeItem('user-email');
            // });
            // this.props.history.push("/");
            console.log('berhasil')

        }
    }

    render(){
        // if(this.state.data === undefined|| this.state.data === null || this.state.data === ''){
        //     return (<Redirect to={'/login'}/>)
        // }
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}
export default withRouter(Autentication);