import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {List, ListItem} from 'material-ui/List';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import {
  fetchAvailableModules, 
  fetchSelectedModules,
  updateSelectedModules,
  clearAvailableModulesError,
  clearSelectedModulesError
} from '../redux/moduleActions';


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Info</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

const listExample = (
<List>
  <Subheader>Available Modules</Subheader>
  <ListItem
    rightIconButton={rightIconMenu}
    primaryText="COS 132"
    secondaryText={"Imperative Programming"}
    secondaryTextLines={1}
  />
  <Divider inset={false} />
</List>
);

const mapStateToProps = state => ({
  modules: state.availableModules
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSelectedModules,
  fetchAvailableModules,
  updateSelectedModules,
  clearAvailableModulesError,
  clearSelectedModulesError
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
class SelectModulesView extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render(){
    return (
      <div>
        <h2>Select Modules</h2>
        {listExample}
      </div>
    );
  }
}

export default SelectModulesView;
