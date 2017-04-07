import React from 'react';
import Radium from 'radium';


const styles = {
  container: {
    display: 'inline-block',
    position: 'relative',
    height: '280px',
    width: '230px',
    margin: '10px',
    background: '#fff',
    boxShadow: `0 4px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`,
    transition: 'all 0.3s cubic-bezier(.17,.67,.17,.88)',

    ':hover':{
      boxShadow: `0 14px 28px rgba(0,0,0,0.25), 
        0 10px 10px rgba(0,0,0,0.22)`,
    }
  },
  bgContainer:{
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    cursor: 'zoom-in',
  },
  bgImage:{
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '250%',

    ':hover': {
      width: '200%'
    },
  },
  bgOverlay: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.4)',
  },
  title:{
    position:'absolute',
    zIndex: '1',
    bottom: '8%',
    left: '-2px',
    height: '50px',
    width: '100%',
    background: '#fff',
    padding: '0 5px',
    lineHeight: '50px',
    textAlign: 'left',
    color: '#000',
    fontSize: '1.2em',
    boxShadow: 'rgba(0, 0, 0, 0.2) -1px 0px 2px 0px',
  },
  description: {
    position: 'absolute',
    zIndex: '1',
    top: '0px',
    left: '0px',
    padding: '15px 10px',
    overflow: 'hidden',
    color: '#fff',
  },
  btnAction: {
    position: 'absolute',
    zIndex: '1',
    bottom: '8%',
    right: '-10px',
    height: '50px',
    width: '50px',
    textAlign: 'center',
    background: '#7E57C2',
    lineHeight: '50px',
    color: 'rgba(0,0,0,0.3)',
    borderRadius: '0px',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(.17,.67,.17,.88)',

    ':hover': {
      color: '#fff',
    }
  },
  btnActionAfter:{
    position: 'absolute',
    width: '0px',
    height: '0px',
    background: 'none',
    bottom: '72px',
    right: '-10px',
    borderTop: '5px solid transparent',
    borderLeft: '5px solid #583d88',
    borderRight: '5px solid transparent',
    borderBottom: '5px solid #583d88',
  },
};

@Radium
class Card extends React.Component{

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    bgUrl: React.PropTypes.string,
    bgColor: React.PropTypes.string,
    description: React.PropTypes.string,
    onActionClick: React.PropTypes.func,
    onCardClick: React.PropTypes.func,
  };

  static defaultProps = {
    bgColor: '#F06292',
  };

  render(){
    let {title, style, bgColor, bgUrl, description, onCardClick,
      onActionClick} = this.props;
    
    let bgStyles = {
      ...styles.bgContainer,
      backgroundColor: bgColor,
    };
    let img = (bgUrl)? (
      <div>
        <img key={2} style={styles.bgImage} src={bgUrl} alt="" />
        <div style={styles.bgOverlay}></div>
      </div>
    ) : null;

    return (
       <div key={1} style={{...styles.container, ...style}}>
          <div style={bgStyles} onClick={onCardClick}>
            {img}
            <div style={styles.description}>
              {description}
            </div>
          </div>

          <div style={styles.title}>{title}</div>
          <div style={styles.btnAction} onClick={onActionClick}>
            <i className="fa fa-heart"></i>
          </div>
          <div style={styles.btnActionAfter}>
          </div>
       </div>
    );
  }
}

export default Card;
