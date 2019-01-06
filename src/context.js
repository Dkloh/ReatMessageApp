import React, { Component } from "react";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    default:
      return state;
  }
};

/* The global state for the App >>> */
export class Provider extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: "John Doe",
        message:
          "The biggest retail story was the news that Sainsbury and Asda were in merger talks.",
        reply: ""
      },
      {
        id: 2,
        name: "Peter Roe",
        message:
          "One analyst called it a game changer in the UK grocery market of epic proportions.",
        reply: ""
      },
      {
        id: 3,
        name: "Anna Yahoo",
        message: "It still needs regulatory approval.",
        reply: ""
      },
      {
        id: 4,
        name: "Pete Rock",
        message: "That is expected in late January.",
        reply: ""
      }
    ],
    dispatch: action => this.setState(state => reducer(state, action))
  };
  /*provider holds the value, which holds the state*/
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
