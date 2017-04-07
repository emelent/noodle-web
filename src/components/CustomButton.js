import React from 'react';
import Radium from 'radium';
import color from 'color';


const styles = {
  base: {
    display: 'inline-block',
    padding: '1.5em 2em',
    border: '0px',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: 700,
    fontFamily: 'Raleway',
    transition: 'all 0.3s cubic-bezier(.17,.67,.17,.88)',
  },
  disabled: {
    opacity: .4,
    cursor: 'not-allowed'
  }
};

@Radium
class CustomButton extends React.Component{
  static propTypes = {
    bgColor: React.PropTypes.string,
    fgColor: React.PropTypes.string,
    darken: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    hover: React.PropTypes.bool,
    alpha: React.PropTypes.number,
  };

  static defaultProps = {
    bgColor: '#673AB7',
    fgColor: '#fff',
    darken: false,
    hover: true,
    alpha: 0.2,
    disabled: false,
  };

  render(){
    let {style, bgColor, fgColor, darken, alpha, disabled, onClick,
      hover} = this.props; 

    if(disabled){
      style = {...styles.base, ...style, ...styles.disabled};
    }else{
      style = {
        ...styles.base,
        backgroundColor: bgColor,
        color: fgColor,
        ...style,
      };
      if(hover){
        if(darken){
          style[':hover'] = {
            backgroundColor: color(bgColor).darken(alpha).hexString()
          };
        }else{
          style[':hover'] = {
            backgroundColor: color(bgColor).lighten(alpha).hexString()
          };
        }
      }
    }

    return ( 
      <button style={style} onClick={onClick}>
        {this.props.children}
      </button>
    );
  }
};

export default CustomButton;
