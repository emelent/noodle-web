import React from 'react';
import Radium from 'radium';


const styles = {
  container: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: '4',
    height: '0vh',
    width: '100%',
    overflow: 'hidden',
    background: '#fff',
    transition: 'all 0.3s cubic-bezier(.17,.67,.17,.88)',
  },
  container__visible:{
    height: '100vh',
  },
  title: {
    color: '#000',
    fontSize: '2.2em',
    padding: '15px 20px',
  },
  item: {
    textAlign: 'center',
    color: '#000',
    padding: '15px 20px',
    fontSize: '1.4em',
    cursor: 'pointer',
    ':hover': {
      color: '#673AB7',
    }
  }
};

@Radium
class OverlayMenu extends React.Component{

  static propTypes = {
    visible: React.PropTypes.bool.isRequired,
    visibleStyle: React.PropTypes.object,
    items: React.PropTypes.array.isRequired,
    onItemClick: React.PropTypes.func,
    title: React.PropTypes.string,
    showTitle: React.PropTypes.bool,
    itemAlign: React.PropTypes.string,
  };

  static defaultProps = {
    onItemClick: () => {},
    title: 'Menu',
    showTitle: true,
    itemAlign: 'center',
  };

  renderItems(items, onItemClick){
    return items.map((el, i) => (
      <div style={{...styles.item, textAlign: this.props.itemAlign}}
        key={i}>
        {el}
      </div>
    ));
  }
  render(){
    let {style, visible, title, onItemClick, items,
      visibleStyle, showTitle, itemAlign} = this.props;
    if(visible){
      style = {...styles.container, ...styles.container__visible, 
        ...style,
        ...visibleStyle};
    }else{
      style = {...styles.container, ...style};
    }

    return (
      <div style={style}>
        {showTitle && 
          <div style={styles.title}>{title}</div>
        }
        {this.renderItems(items, onItemClick)}
      </div>
    );
  }
}

export default OverlayMenu;
