import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {hashHistory} from 'react-router';
import { Paper, TextField, RaisedButton } from 'material-ui';
import ActionAccountCicle from 'material-ui/svg-icons/action/account-circle';

import {isAuthenticated, login, reEnstateToken} from '../redux/action_creators/user';

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
  reEnstateToken
}, dispatch);


@connect(mapStateToProps, mapDispatchToProps)
class LoginView extends React.Component{

  constructor(props){
    super(props);
  }


  componentDidMount(){
    //attempt to reload token from cache
    this.props.reEnstateToken();
  }

  render() {
    return (
      <div style={styles.center}>
        <Paper style={styles.paper}>
          <ActionAccountCicle style={{ height: 100, width: 100 }}/><br/>
          <TextField ref='identity'
                     hintText='email'
                     floatingLabelText='email'
                     onKeyDown={this.submit} /><br/>
          <TextField ref='password'
                     hintText='password'
                     floatingLabelText='password'
                     type='password'
                     onKeyDown={this.submit} /><br />
          <RaisedButton style={styles.submit}
                        label='Login'
                        onTouchTap={this.submit}
                        primary />
        </Paper>
      </div>
    );
  }

  submit = (event) => {
    const identity = this.refs.identity.state.hasValue;
    const password = this.refs.password.state.hasValue;

    if (event.type === 'keydown' && event.keyCode !== 13) return;

    this.props.login(identity, password);
  }

};

const styles = {
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 10
  },
  paper: {
    maxHeight: 400,
    maxWidth: 400,
    textAlign: 'center',
    padding: '20px 40px'
  },
  submit: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%'
  }
};

export default LoginView;
