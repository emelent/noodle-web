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
  login : userAction.login,
  reEnstateToken: userAction.reEnstateToken,
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

  componentDidMount(){
    //attempt to reload token from cache
    this.props.reEnstateToken();
  }

  render() {
    return (
      <div style={style.container}>
        <h2>Log In</h2>
        <div>
          <TextField
            style={style.textfield}
            floatingLabelText="Email"
            ref={el => this.tfEmail = el}
          /><br/>

          <TextField
            style={style.textfield}
            floatingLabelText="Password"
            type="password"
            ref={el => this.tfPassword = el}
          /><br/>
        </div>
        <RaisedButton 
          style={style.loginButton}
          primary={true} label="Log In" 
          onTouchTap={this.handleLoginClick}/>
      </div>
    );
  }

};

const style = {
  container: {
    width: '300px',
    margin: '50px auto'
  },
  textfield: {
    margin: '5px 0px',
    width: '100%',
  },
  loginButton: {
    margin: '10px 0px',
    float: 'right'
  }

};
export default LoginView;
