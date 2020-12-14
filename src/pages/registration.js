import React from 'react'
import {connect} from "react-redux";
import {createUser, fireMessage} from "../components/userActions";
import {Message} from "../components/message";

class Registration extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            licenseConfirmed: false
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
        if (!this.state.licenseConfirmed) {
            return this.props.fireMessage("You didn't accept license agreement!", "error")
        }
        const newUser = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.createUser(newUser)
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
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="licenseConfirm" name="licenseConfirmed" checked={this.state.licenseConfirmed} onChange={this.changeCheckboxHandler}/>
                            <label className="form-check-label" htmlFor="licenseConfirm">I accept the license agreement</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>

        );
    }
}

const dispatchToProps = {
    createUser, fireMessage
}

const stateToProps = state => ({
    message: state.user.message,
    messageType: state.user.messageType
})

export default connect(stateToProps, dispatchToProps)(Registration)
