import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import uuid from "uuid";

class EditContact extends Component {
  routeParamId = null;
  reduxState = null;

  /*This hold the input of the input*/
  state = {
    name: "",
    message: "",
    reply: "",
    errors: {}
  };

  componentDidMount() {
    this.routeParamId = this.props.match.params.id;

    this.setFormFieldValues();
  }

  setFormFieldValues() {
    const contacts = this.reduxState;

    const foundContact = contacts.find(
      contact => contact.id == this.routeParamId // this is ok because IDs can be both numeric or GUID
    );

    if (foundContact) {
      this.setState({
        name: foundContact.name,
        message: foundContact.message,
        reply: "",
        errors: {}
      });
    } else {
      alert(`Error: contact with id="${this.routeParamId}" not found.`);
    }
  }

  fetchMessage() {
    this.setState({
      name: "",
      message: "",
      reply: "",
      errors: {}
    });
  }

  onSubmit = (dispatch, e) => {
    e.preventDefault();
    console.log(this.state);
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
    if (reply === "") {
      this.setState({ errors: { reply: "Reply is required" } });
      return;
    }

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
    return (
      <Consumer>
        {value => {
          if (!this.reduxState) {
            this.reduxState = value.contacts;
          }

          const { name, message, reply, errors } = this.state;

          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Reply to a message</div>
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
                    placeholder="///Enter a message"
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
                    value="Add Reply"
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

export default EditContact;
