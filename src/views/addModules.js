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
  addTemporaryModule,
  removeTemporaryModule,
  clearTemporaryModules,
  clearAvailableModulesError,
  clearSelectedModulesError
} from '../redux/action_creators/modules';


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


const mapStateToProps = state => ({
  modules: state.modules
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSelectedModules,
  fetchAvailableModules,
  updateSelectedModules,
  addTemporaryModule,
  removeTemporaryModule,
  clearTemporaryModules,
  clearAvailableModulesError,
  clearSelectedModulesError
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
class AddModulesView extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchAvailableModules();
    this.props.fetchSelectedModules();
  }

  renderAvailableModuleList(){
    const available = this.props.modules.getIn(['available', 'modules']);
    const selected = this.props.modules.getIn(['selected', 'modules']);
    const temp = this.props.modules.get('tempModules');

    const filtered = available.filterNot(module => (
      selected.has(module) || temp.has(module)
    ));

    const items = filtered.map((module) => {
      let code = module.code.slice(0,3) + ' ' + module.code.slice(3);
      return (
        <div key={module.id}>
          <ListItem
            rightIconButton={rightIconMenu}
            primaryText={
              <span style={styles.moduleCode}>{code.toUpperCase()}</span>
            }
            secondaryText={
             <p>
               <span style={styles.moduleName}>
                 {module.name.toUpperCase()}
               </span><br/>
               <span style={styles.moduleDescription}>
                {module.description}
               </span> 
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider inset={false} />
        </div>);
    });

    return (
      <List>
        <Subheader>Available Modules</Subheader>
        {items}
      </List>
    );
  }
  render(){
    const availableModulesList = this.renderAvailableModuleList();
    return (
      <div>
        <h2>Select Modules</h2>
        <div>
          {availableModulesList}
        </div>
      </div>
    );
  }
}

const styles = {
  moduleCode: {
    color: darkBlack,
    textTransform: 'upperCase',
  },
  moduleName: {
    color: darkBlack,
    textTransform: 'upperCase'
  },
  moduleDescription: {
  }
};
export default AddModulesView;
