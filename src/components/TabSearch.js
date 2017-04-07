import React from 'react';

import SearchBox from './SearchBox';
import TabBar from './TabBar';


const styles = {
  container: {
    height: '60px',
    width: '100%',
    overflow: 'hidden',
  },

  searchContainer: {
    float: 'left',
    width: '200px',
  },

  tabContainer:{
    width: 'auto',
    overflow: 'hidden',
  }
};

class TabSearch extends React.Component{

  static propTypes = {
    items: React.PropTypes.array.isRequired,
    activeIndex: React.PropTypes.number,
    onTabItemClick: React.PropTypes.func,
    onSearchSubmit: React.PropTypes.func,
  };

  static defaultProps = {
    activeIndex: -1,
  };

  constructor(props){
    super(props);
  }

  render(){
    const {items, activeIndex, onTabItemClick, onSearchSubmit} = this.props;

    return(
      <div style={styles.container}>
        <SearchBox style={styles.searchContainer}
          onSubmit={onSearchSubmit}
        />
        <div style={styles.tabContainer}>
          <TabBar items={items} 
            onTabItemClick={onTabItemClick} 
            activeIndex={activeIndex}
          />
        </div>
      </div>
    );
  }
}

export default TabSearch;
