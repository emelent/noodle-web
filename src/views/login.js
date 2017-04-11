import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import {actionCreator as userAction} from '../redux/userReducer';


const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
 login : userAction.login
}, dispatch);


@connect(mapStateToProps, mapDispatchToProps)
class LoginView extends React.Component{

  constructor(props){
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick(){
    let email = this.tfEmail.getValue();
    let password= this.tfPassword.getValue();
    this.props.login(email, password);
  }

  render() {
    return (
      <div>
        <h2>Log In</h2>
        <div>
          <TextField
            floatingLabelText="Email"
            ref={el => this.tfEmail = el}
          /><br/>

          <TextField
            floatingLabelText="Password"
            type="password"
            ref={el => this.tfPassword = el}
          /><br/>
        </div>
        <RaisedButton primary={true} label="Log In" 
          onTouchTap={this.handleLoginClick}/>
      </div>
    );
  }

};

export default LoginView;
