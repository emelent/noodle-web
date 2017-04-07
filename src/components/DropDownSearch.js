import React from 'react';
import Radium from 'radium';

import SearchBox from './SearchBox';

const styles = {
  container: {
    position: 'relative',
    display: 'inline-block',
    height: '60px',
    maxWidth: '70%',
    width: '280px',
    transition: 'all 0.4s cubic-bezier(.17,.67,.17,.88)',
  },

  searchBox: {
    display: 'block',
    width: 'auto',
    height: '60px',
    overflow: 'hidden',
    marginRight: '80px',
  },
  iconContainer: {
    float: 'right',
    background: 'rgba(255,255,255,0.8)',
    display: 'inline-block',
    height: '60px',
    width: '80px',
    lineHeight: '60px',
    padding: '0 30px',
    color: '#555',
    cursor: 'pointer',
  },
  icon: {
    fontWeight: 'bold',
    transition: 'all 0.4s cubic-bezier(.17,.67,.17,.88)',
  },
  icon__open: {
    transform: 'rotateZ(180deg)',
  },

  list:{
    position: 'absolute',
    zIndex: '5',
    width: '100%',
    maxHeight: '300px', 
    overflowY: 'scroll',
    background: '#fff',
    color: '#555',
    textAlign: 'left',
    transformOrigin: 'top',
    transform: 'scaleY(0)',
    transition: 'all 0.2s cubic-bezier(.17,.67,.17,.88)',
  },

  list__open:{
    transform: 'scaleY(1)',
  },

  listItem:{
    padding: '20px',
    cursor: 'pointer',

    ':hover':{
      background: '#eee',
    }
  },

  listItem__active:{
    color: '#673AB7',
    fontWeight: 'bold',
    cursor: 'auto',
    ':hover':{
      background: '#fff',
    }
  },

};

@Radium
class DropDownSearch extends React.Component{
  
  static propTypes = {
    items: React.PropTypes.array.isRequired,
    activeIndex: React.PropTypes.number,
    onItemClick: React.PropTypes.func,
    onOpen: React.PropTypes.func,
    onClose: React.PropTypes.func,
    onSearchSubmit: React.PropTypes.func,
    focusWidth: React.PropTypes.string,
  };

  static defaultProps = {
    activeIndex: 0,
    onItemClick: () => {},
    onOpen: () => {},
    onClose: () => {},
    focusWidth: '400px',
  };

  constructor(props){
    super(props);
    
    this.__onMenuClick= this.__onMenuClick.bind(this);
    this.__onOpen = this.__onOpen.bind(this);
    this.__onClose = this.__onClose.bind(this);
    this.__onFocus = this.__onFocus.bind(this);
    this.__onBlur = this.__onBlur.bind(this);
    this.state = {
      open: false,
      focus: false,
    };
  }

  __onFocus(){
    this.setState({focus: true});
  }

  __onBlur(){
    this.setState({focus: false});
  }

  __onMenuClick(){
    if(this.state.open){
      this.__onClose();
    }else{
      this.__onOpen();
    }
  }

  __onOpen(){
    this.setState({open: true});
    this.props.onOpen();
  }

  __onClose(){
    this.setState({open: false});
    this.props.onClose();
  }

  
  renderItems(items, activeIndex, onItemClick){
    return items.map((el, i) => {
      if(i == activeIndex)
        return null;
      return (
        <div style={styles.listItem}
          key={i}
          onClick={() => {onItemClick(i); this.__onClose();}}
        >
          {el}
        </div>
      );
    });
  }

  render(){
    let {style, items, onItemClick, activeIndex, focusWidth, 
      onSearchSubmit} = this.props;
    let {open, focus} = this.state;
    
    let ddlStyle = {...styles.list};
    let iconStyle = {...styles.icon};
    if(open){
      iconStyle = {...iconStyle, ...styles.icon__open};
      ddlStyle = {...ddlStyle, ...styles.list__open};
    }

    if(focus){
      style = {...style, width: focusWidth} 
    }

    return (
      <div style={{...styles.container, ...style}} 
        ref={this.props.rootRef}
      >
        <div style={styles.iconContainer}
          onClick={this.__onMenuClick}
        >
          <i className="fa fa-angle-down"
            style={iconStyle}
          ></i>
        </div>
        <SearchBox style={styles.searchBox} 
          onSubmit={onSearchSubmit}
          focusWidth="auto"
          onFocus={this.__onFocus}
          onBlur={this.__onBlur}
        />
        <div style={ddlStyle}>
          <div style={{...styles.listItem, ...styles.listItem__active}}>
            {items[activeIndex]}
          </div>
          {this.renderItems(items, activeIndex, onItemClick)}
        </div>
      </div>
    );
  }
};

export default DropDownSearch;
