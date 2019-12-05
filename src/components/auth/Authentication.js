import React, { Component } from 'react';
import {getJwt} from '../helpers/Helpers';
import {withRouter, Redirect} from 'react-router-dom';

class Autentication extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        const jwt = getJwt();
        if(jwt){
            try{
                this.props.history.push("/home");
            }catch(error){
                localStorage.removeItem('token-jwt');
                localStorage.removeItem('user-id');
                localStorage.removeItem('user-email');
                this.props.history.push('/login');
            }
        }
        else{
            this.props.history.push("/login");
        }
    }

    render(){
        if(this.state.data === undefined){
            return (<Redirect to={'/login'}/>)
        }
        return( 
            <div>
                {this.props.children}
            </div>
        )
    }
}
export default withRouter(Autentication);