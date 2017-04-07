import React, {PropTypes} from 'react';


import DropDownSearch from '../components/DropDownSearch';
import MenuButton from '../components/MenuButton';
import OverlayMenu from '../components/OverlayMenu';
import TabBar from '../components/TabBar';



const styles = {
  container:{
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100%',
    zIndex: '2',
  },
  navBar:{
    position: 'absolute',
    height: '60px',
    top: '0px',
    left: '0px',
    width: '100%',
    paddingRight: '60px',
    transition: 'all 0.4s cubic-bezier(.17,.67,.17,.88)',
  },

  menuBtn: {
    position: 'fixed',
    right: '0px',
    top: '0px',
    width: '60px',
    height: '60px',
    zIndex: '5',
  },

  searchBox:{
    float: 'left',
    width: '100%',
    maxWidth: '100%',
    background: 'rgba(255,255,255,0.8)',
  },
  tabBar: {
    position: 'fixed',
    left: '0px',
    top: '60px',
    width: '100%',
    zIndex: '1',
  },
}
class NavBar extends React.Component{

  static propTypes = {
    dropDownItems: PropTypes.array.isRequired,
    menuItems: PropTypes.array.isRequired,
    dropDownIndex: PropTypes.number.isRequired,
    onTabItemClick: PropTypes.func,
    onDDItemClick: PropTypes.func,
    tabItems: PropTypes.array.isRequired,
    tabIndex: PropTypes.number.isRequired,
    dropDownIndex: PropTypes.number.isRequired,
  };

  constructor(props){
    super(props);
    this.state = {
      menuActive: false,
    };
    this.__onMenuBtnClick= this.__onMenuBtnClick.bind(this);
    this.__onSearchSubmit = this.__onSearchSubmit.bind(this);
  }



  __onMenuBtnClick(){
    this.setState({menuActive: !this.state.menuActive});
  }

  __onSearchSubmit(text){
    let cat = this.props.dropDownItems[this.state.activeIndex];
    alert(`You searched for '${text}' in '${cat}'`);
  }

  render(){
    const {style, dropDownItems, menuItems,
      onTabItemClick, onDDItemClick, dropDownIndex,
      tabIndex, tabItems
    } = this.props;
    const {menuActive} = this.state;

    return (
      <div style={styles.container}>
        <div style={{...styles.navBar, ...style}}>
          <OverlayMenu title="Menu"
            items={menuItems}
            visible={menuActive}
          />
          <MenuButton style={styles.menuBtn}
            onClick={this.__onMenuBtnClick}
            active={menuActive}
          />
          <DropDownSearch style={styles.searchBox}
            focusWidth="100%"
            items={dropDownItems}
            onSearchSubmit={this.__onSearchSubmit}
            onItemClick={onDDItemClick}
            activeIndex={dropDownIndex}
          />
        </div>
        <TabBar style={styles.tabBar} 
          bgColor="#fff"
          items={tabItems}
          align="center"
          onItemClick={onTabItemClick}
          activeIndex={tabIndex}
          height="40px"
          underlineHeight="4px"
          shadow={true}
        />
      </div>
    );
  }
}

export default NavBar;

