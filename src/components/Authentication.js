import React, { Component } from 'react';
import axios from 'axios';
import { Loading } from './ui';
import { Redirect } from 'react-router-dom';

const CLIENT_ID = '53eff2996ef8cde22386';
const REDIRECT_URI = 'https://wael-zoaiter.github.io/react-apollo-test/';

class Authentication extends Component {
constructor(props) {
  super(props)

  this.state = {
     isLoading: false,
     token: null
  }
}

    componentDidMount() {
        const code = window.location.href.match(/\?code=(.*)/) && window.location.href.match(/\?code=(.*)/)[1];
        
        if(code) {
            this.setState({
                isLoading: true
            });
            axios.get(`https://mygatekeeper.herokuapp.com/authenticate/${code}`)
            .then((res) => {
                this.setState({
                    isLoading: false,
                    token: res.data.token,
                    error: res.data.error
                });
                if(res.data.token) localStorage.setItem('token', res.data.token);
            }, (err) => console.log(err));
        }
    }
    render() {
        return (
        <div className="authentication">
            {this.state.isLoading ? <Loading /> : this.state.token ? <Redirect to="/page/1" /> : <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}>Login</a>}
        </div>
        )
    }
}

export default Authentication;