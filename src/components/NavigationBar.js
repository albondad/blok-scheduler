import React, {Component} from 'react';
import Tabs from './Tabs'

class navigationBar extends Component {
  state = {
    showTabs: false,
  }
  toggleShowTabs = () => {
    let showTabs = !this.state.showTabs;
    this.setState({showTabs: showTabs});
    this.props.functions.toggleBodyBackdrop();
  }

  render() {
    this.props.functions.toggleShowTabs = this.toggleShowTabs;
    return (
      <div>
        <div className='container-fluid navigationBar-container'>
          <div className='row m-0 navigationBar-menu' onClick={this.toggleShowTabs}>
            <div className='col p-0'>MENU</div>
            <div className='col p-0 text-right'><i className="fas fa-bars fa-fw"></i></div>
          </div>
          {
            this.state.showTabs ?
            <Tabs
              schedules={this.props.schedules}
              functions={this.props.functions}
            />
            : null
          }
        </div>
      </div>
    )
  }
}

export default navigationBar;
