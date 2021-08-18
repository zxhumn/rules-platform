import React from 'react';
import { message } from 'antd'
import { Flow, withPropsAPI } from 'gg-editor';
import { ref } from 'react.eval'
import styles from './index.less';

class FlowBody extends React.Component {

  constructor(props) {
    super(props);
     ref(this);
    this.state={
      Flows:[]
    }
  }

  save =()=>{
    const { propsAPI } = this.props;

    message.info(JSON.stringify(propsAPI.save()));
  };

  render() {
    const { data } = this.props;
    return <Flow className={styles.flow} data={data} onNodeClick={(e) => {

      this.setState({
         Flows:e.item.model.shape
       },()=>{
         console.log(this.state.Flows)
       })
      }}/>
  }
}

export default withPropsAPI(FlowBody);
