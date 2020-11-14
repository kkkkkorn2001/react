import { Tree } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { Layout } from 'antd';
import './Treeview.css';
import treeData from './Tree';
import App from './App';
import Photo from './Photo';
const { Sider, Content } = Layout;
class Demo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      img : undefined,
    }
  }
  onSelect=(keys,e)=>{
    this.setState(
      { 
        img : e.node.name,
      }
    );
    console.log(e.node.name);
  }
  render(){
  return (
    <>
    <Layout>
    <Sider className = 'v_tree'>
    <Tree
      className="dir_tree"
      defaultExpandParent = {true}
      onSelect = {this.onSelect}
      treeData={treeData}
    />
    </Sider>
    <Content>
     
      {(this.state.img)?<Photo imgSrc={this.state.img}/>:<App/>}

      
    </Content>
    </Layout>
    </>
  );
  }
}
export default Demo;