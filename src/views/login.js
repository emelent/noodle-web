import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';


export default class LoginView extends React.Component{

  render() {
    return (
      <div>
        <h2>Log In</h2>
        <RaisedButton primary={true} label="Click Me" />
      </div>
    );
  }

};

