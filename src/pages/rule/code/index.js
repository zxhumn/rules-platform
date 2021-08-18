import React, { Component } from 'react';
import { Tabs } from 'antd';
import CodeTable from './components/CodeTable/index';

const { TabPane } = Tabs;

class Code extends Component {
  constructor() {
    super();
    this.state = {};
  }

  // handleChange(key) {
  //   console.log(key);
  // }

  // eslint-disable-next-line react/sort-comp
  render() {
    return (
      <div>
        <Tabs
          defaultActiveKey="1"
          // onChange={key => {
          //   this.handleChange(key);
          // }}
          tabBarStyle={{
            background: '#ffffff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 5,
            marginBottom: 0,
          }}
        >
          <TabPane tab="变量管理" key="1">
            <CodeTable name="变量" key="1" />
          </TabPane>
          <TabPane tab="常量管理" key="2">
            <CodeTable name="常量" key="2" />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Code;
