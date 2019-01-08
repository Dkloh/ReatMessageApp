import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import uuid from "uuid";

class AddContact extends Component {
  /*This hold the input of the input*/
  state = {
    name: "",
    message: "",
    reply: "",
    errors: {}
  };

  onSubmit = (dispatch, e) => {
    e.preventDefault();
    /*console.log(this.state);*/
    const { name, message, reply } = this.state;

    // Check for errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    if (message === "") {
      this.setState({ errors: { message: "Message is required" } });
      return;
    }
    /*if (reply === "") {
      this.setState({ errors: { reply: "Repply is required" } });
      return;
    }*/

    const newContact = {
      id: uuid(),
      name,
      message,
      reply
    };
    dispatch({ type: "ADD_CONTACT", payload: newContact });
    //Clear State
    this.setState({
      name: "",
      message: "",
      reply: "",
      errors: {}
    });
    //redirecting to the main page after submiting a new contact.
    this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, message, reply, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add a new message</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Message"
                    name="message"
                    type="text"
                    placeholder="Enter a message"
                    value={message}
                    onChange={this.onChange}
                    error={errors.message}
                  />
                  <TextInputGroup
                    label="Reply"
                    name="reply"
                    placeholder="Enter a reeply"
                    value={reply}
                    onChange={this.onChange}
                    error={errors.reply}
                  />
                  <input
                    type="submit"
                    value="Add Message"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
