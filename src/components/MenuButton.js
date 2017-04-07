import React from 'react';


const styles = {
  container:{
    cursor: 'pointer',
    padding: '13px 0px',
  },

  stack: {
    background: '#000',
    height: '2px',
    width: '30px',
    margin: '5px auto 5px auto',
    transition: `cubic-bezier(.17,.67,.17,.88) margin 0.3s,
      cubic-bezier(.17,.67,.17,.88) transform 0.3s`,
  },

  stack_1_active:{
    margin: '12px auto 5px auto',
    transform: 'rotateZ(45deg)',
  },
  stack_2_active:{
    margin: '-8px auto 5px auto',
    transform: 'rotateZ(-45deg)',
  },
  stack_3_active:{
    opacity: '0',
  },
};

class MenuButton extends React.Component{

  static propTypes = {
    active: React.PropTypes.bool,
    bgColor: React.PropTypes.string,
    fgColor: React.PropTypes.string,
    onClick: React.PropTypes.func,
  };

  static defaultProps = {
    bgColor: 'rgba(255,255,255,0.95)',
    fgColor: '#000',
  };

  render(){
    let {bgColor, fgColor, style, active, onClick} = this.props;
    style = {...styles.container, 
      backgroundColor: bgColor, color: fgColor, ...style};
    let stackStyle = {...styles.stack, backgroundColor: fgColor};
    let s1 = (active)? {...stackStyle,...styles.stack_1_active}: 
      stackStyle;
    let s2 = (active)? {...stackStyle,...styles.stack_2_active}:
      stackStyle;
    let s3 = (active)? {...stackStyle,...styles.stack_3_active}:
      stackStyle;

    return (
      <div style={style} onClick={onClick}>
        <div style={s1}></div>
        <div style={s2}></div>
        <div style={s3}></div>
      </div>
    );
  }
}

export default MenuButton;
