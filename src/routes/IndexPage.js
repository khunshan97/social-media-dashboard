import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

import './IndexPage.less';

class IndexPage extends React.PureComponent{
  state = {
    text: '',
  }

  buttonClickHandler = () => {
    this.setState({text: 'Welcome to dva!'});
  }

  render() {
    
    return (
      <div className="normal">
        <h1 className="title">Wohoo! </h1>
        <Button size="large" onClick={this.buttonClickHandler}>Click me! </Button>
        <h4>{this.state.text}</h4>
      </div>
    );
  }

}

export default connect()(IndexPage);
