import React from 'react';
import Radium from 'radium';
import {Link} from 'react-router';

import Button from '../components/CustomButton';

const styles = {
  container: {
    position: 'fixed',
    top: '60px',
    left: '-300px',
    height: 'calc(100% - 60px)',
    zIndex: '4',
    width: '300px',
    overflowY: 'scroll',
    background: '#fff',
    transition: 'all 0.3s cubic-bezier(.17,.67,.17,.88)',
  },
  container__show:{
    left: '0px',
  },
  titleContainer:{
    height: 140,
    padding: '20px 0',
    backgroundColor: '#fff',
    textAlign: 'center',
    boxShadow: 'inset rgba(0,0,0,0.1) 1px 2px 3px'
  },
  title:{
    fontSize: '1.2em',
    padding: 10,
  },
  logoImg:{
    width: 120,
  },

  list:{
    position: 'relative',
  },

  listTitleContainer:{
    backgroundColor: '#eee',
    padding: 10,
  },
  listTitle: {
    fontSize: '1.2em',
  },
  btn:{
    display: 'inline-block',
    padding: '0.5em 1em',
  },
  item: {
    position: 'relative',
    textAlign: 'left',
    color: '#000',
    padding: '15px 40px',
    fontSize: '1em',
    cursor: 'pointer',

    ':hover': {
      backgroundColor: '#eee',
    }
  },
  item__active:{
  },
  check:{
    color: '#673AB7',
    position: 'absolute',
    left: 10,
  }
}

@Radium
class SlideMenu extends React.Component{

  static propTypes = {
    show: React.PropTypes.bool,
    filterItems: React.PropTypes.array,
    activeFilters: React.PropTypes.array,
    onFilterItemClick: React.PropTypes.func,
    onFilterApply: React.PropTypes.func,
    onFilterClear: React.PropTypes.func,
    catIndex: React.PropTypes.number,
    loggedIn: React.PropTypes.bool,
  };

  static defaultProps = {
    catIndex: 0,
    onFilterItemClick: () => {},
    activeFilters: [],
  };

  constructor(props){
    super(props);
  }

  renderfilterItems(filterItems, activeFilters, onFilterItemClick){
    let isActive = (el) =>{
      return activeFilters.indexOf(el) > -1;
    };
    let getStyle = (el) =>{
      if(isActive(el)){
        return {...styles.item, ...styles.item__active};
      }
      return styles.item;
    };

    return filterItems.map((el, i) => (
      <div key={i}
        style={getStyle(el)}
        onClick={() => onFilterItemClick(i)}
      >
        {isActive(el) &&
          <i className="fa fa-check"
            style={styles.check}
          ></i>
        }
        {el}
      </div>
    ));
  }

  render(){
    let {style, filterItems, show, activeFilters, 
      onFilterItemClick, onFilterClear, onFilterApply} = this.props;
    if(show){
      style = {...styles.container, 
        ...style, 
        ...styles.container__show
      };
    }else{
      style = {...styles.container, 
        ...style, 
      };
    }

    return (
      <div style={style}>
        <div style={styles.titleContainer}>
          <img src="assets/images/logo.svg" alt="" 
            style={styles.logoImg}
          />
        </div>
        <div style={styles.title}><Link to="/help">Help</Link></div>
        <div style={styles.title}><Link to="/about">About</Link></div>
        <div style={styles.list}>
          <div style={styles.listTitleContainer}>
            <span style={styles.listTitle}>Filters</span>
            <Button style={{...styles.btn, 
              marginLeft: 50,
              marginRight: 5}}
              onClick={onFilterApply}
            >
              Apply
            </Button>
            <Button style={styles.btn}
              onClick={onFilterClear}
            >Clear</Button>
          </div>
          {this.renderfilterItems(filterItems, activeFilters, onFilterItemClick)}
        </div>
      </div>
    );
  }
}

export default SlideMenu;
