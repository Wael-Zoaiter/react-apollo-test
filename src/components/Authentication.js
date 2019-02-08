import React, { Component } from 'react';
import axios from 'axios';
import { Loading } from './ui';
import { Redirect } from 'react-router-dom';

const CLIENT_ID = '53eff2996ef8cde22386';
const REDIRECT_URI = process.env.NODE_ENV === 'production' ? `https://wael-zoaiter.github.io${process.env.PUBLIC_URL}` : 'http://localhost:3000/';

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
        console.log(process.env.PUBLIC_URL);
        
        return (
        <div className="authentication bg-dark">
            {this.state.isLoading ? <Loading /> : this.state.token ? <Redirect to="/page/1" /> : <a className="btn btn-light" href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}>Login with Github</a>}
        </div>
        )
    }
}

export default Authentication;