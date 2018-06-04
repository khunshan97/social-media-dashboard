import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { List, Popconfirm, Button, Icon, message } from 'antd';
import PostModal from './PostModal';
import Loading from '../../components/Loading';
import './Posts.less';

class Posts extends React.Component {
  state = {
    list: [],
  };

  componentWillReceiveProps(nextProps) {
    const { list, users } = nextProps;
    this.setState({ list, users });
  }

  deleteHandler = (id) => {
    let { list } = this.state;
    list = _.filter(list, item => item.id !== id);
    
    this.props.dispatch({
      type: 'posts/remove',
      payload: { id },
    });
    
    this.setState({ list });
    message.success('Delete success!');
  }  

  editHandler = (id, values) => {
    let { list, users } = this.state;
    let index = _.findIndex(list, { id });
    let _users = users.filter(item => item.id === values.userId);
    
    this.props.dispatch({
      type: 'posts/patch',
      payload: { id, values },
    });
    
    values.userName = _users[0].name;
    list[index] = values;
    this.setState({ list });
    message.success('Edit success!')
  }

  createHandler = (values) => {
    let { list } = this.state;
    let obj = { id: list.length + 1, ...values };
    list.push(obj);

    this.props.dispatch({
      type: 'posts/create',
      payload: values,
    });

    this.setState({ list });
    message.success('Create success!');
  }

  render() {
    const { list } = this.state;

    if(!list.length) return <Loading />

    return (
      <div className="postWrapper">
        <div className="create" style={{textAlign: "left"}}>
            <PostModal record={{}} onOk={this.createHandler}>
              <Button type="primary" icon="plus">Create Post</Button>
            </PostModal>
        </div>
        <List
          itemLayout="vertical"
          dataSource={list}
          pagination={{
            pageSize: 5,
          }}
          renderItem={post => (
            <List.Item
              actions={[
                <PostModal record={post} onOk={this.editHandler}>
                  <a href="javascript:void(0)" style={{color: "#ffc53d"}}><Icon type="edit" /></a>
                </PostModal>, 
                <Popconfirm
                  title="Confirm to delete?"
                  onConfirm={this.deleteHandler.bind(this, post.id)}
                >
                  <a href="javascript:void(0)" style={{marginLeft: 10, color: "#f20"}}><Icon type="delete" /></a>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                title={<a href={`#posts/${post.id}`}>{post.title}</a>}
                description={post.body}
              />
              <span><Icon type="user" />{` ${post.userName}`}</span>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list, users } = state.posts;
  return {
    list: list,
    users: users
  };
}

export default connect(mapStateToProps)(Posts);