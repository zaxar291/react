import React from 'react'
import {connect} from "react-redux";
import {fireMessage} from "./userActions";
import {addComment} from "./postActions";
import {Message} from "./message";

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            comment: "",
            name: ""
        }
        this.changeInputValue = this.changeInputValue.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    changeInputValue = function(event) {
        event.persist()
        this.setState(prev => ({...prev, ...{
                [event.target.name]: event.target.value
            }}))
    }

    submitHandler = function(event) {
        event.preventDefault()
        if (this.state.name === "") {
            return this.props.fireMessage("You passed 'name' field", "error")
        }
        const newComment = {
            name: this.state.name,
            email: this.props.user.email,
            comment: this.state.comment,
            postId: this.props.post.id
        }

        this.props.addComment(newComment)
    }

    render() {
        return (
            <div className="accordion">
                <h1>Leave a comment</h1>
                {this.props.message && <Message message={this.props.message} messageType={this.props.messageType} />}
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="text" name="email" className="form-control" placeholder="Your email" value={this.props.user.email} readOnly={true}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input type="text" name="name" className="form-control" placeholder="Your name" onChange={this.changeInputValue}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Comment</label>
                        <input type="text" name="comment" className="form-control" placeholder="Your comment" onChange={this.changeInputValue}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Leave a comment</button>
                </form>

            </div>
        )
    }
}

const dispatchToProps = {
    fireMessage, addComment
}

const stateToProps = state => ({
    message: state.user.message,
    messageType: state.user.messageType,
    user: state.user.user
})

export default connect(stateToProps, dispatchToProps)(Comments);
