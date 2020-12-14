import React from 'react'
import {connect} from "react-redux";
import {fireMessage, loginUser} from "../components/userActions";
import {Message} from "../components/message";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        this.changeInputValue = this.changeInputValue.bind(this)
        this.changeCheckboxHandler = this.changeCheckboxHandler.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    changeInputValue = function(event) {
        event.persist()
        this.setState(prev => ({...prev, ...{
                [event.target.name]: event.target.value
            }}))
    }

    changeCheckboxHandler = function(event) {
        event.persist()
        this.setState(prev => ({...prev, ...{
                [event.target.name]: event.target.checked
            }}))
    }

    submitForm = function(event) {
        event.preventDefault()
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.state.email)) {
            return this.props.fireMessage("Email you entered is invalid!", "error")
        }
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(user)
    }

    render() {
        return (
            <div className="container pt-3">
                {this.props.message && <Message message={this.props.message} messageType={this.props.messageType} />}
                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label htmlFor="registration-email">Email address</label>
                        <input type="textd" className="form-control" name="email" id="registration-email" placeholder="Enter email" value={this.state.email} onChange={this.changeInputValue} />
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="registration-password">Password</label>
                            <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder="Password" value={this.state.password} onChange={this.changeInputValue}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>

        );
    }
}

const dispatchToProps = {
    loginUser, fireMessage
}

const stateToProps = state => ({
    message: state.user.message,
    messageType: state.user.messageType
})

export default connect(stateToProps, dispatchToProps)(Login)
