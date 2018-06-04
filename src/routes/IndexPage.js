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
        <h1 className="title">Welcome to Social Media Dashboard! </h1>
        <h4 className="author">By Loc Cao</h4>
      </div>
    );
  }

}

export default connect()(IndexPage);
