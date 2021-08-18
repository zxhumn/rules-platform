import { Col, Row } from 'antd';
import GGEditor, { Flow  } from 'gg-editor';
import React,{Component} from 'react';
import EditorMinimap from './components/EditorMinimap';
import  FlowContextMenu from './components/EditorContextMenu';
import  FlowDetailPanel  from './components/EditorDetailPanel';
import  FlowItemPanel  from './components/EditorItemPanel';
import  FlowToolbar  from './components/EditorToolbar/KoniToolbar';


import styles from './index.less';
import FlowBody from './FlowBody'

GGEditor.setTrackable(false);

const data = {
  nodes: [{
    type: 'node',
    size: '70*70',
    shape: 'flow-circle',
    color: '#FA8C16',
    label: '起止节点',
    x: 55,
    y: 55,
    id: 'ea1184e8',
    index: 0
  }, {
    type: 'node',
    size: '70*70',
    shape: 'flow-circle',
    color: '#FA8C16',
    label: '结束节点',
    x: 55,
    y: 255,
    id: '481fbb1a',
    index: 2,
  }],
  edges: [{
    source: 'ea1184e8',
    sourceAnchor: 2,
    target: '481fbb1a',
    targetAnchor: 0,
    id: '7989ac70',
    index: 1,
  }],
};

export default class ComponentName extends Component {
  constructor(props){
    super(props);
    this.state={
      Flows:[]
    }
  }
  render() {
    return (
   <div>
    <GGEditor className={styles.editor}>
      <Row type="flex" className={styles.editorHd}>
        <Col span={24}>
          <FlowToolbar/>
        </Col>
      </Row>
      <Row type="flex" className={styles.editorBd}>
        <Col span={4} className={styles.editorSidebar}>
          <FlowItemPanel />
        </Col>
        <Col span={16} className={styles.editorContent}>
          <FlowBody id='flowBody' data={data} />
        </Col>
        <Col span={4} className={styles.editorSidebar}>
          <FlowDetailPanel />
          <EditorMinimap />
        </Col>
      </Row>
      <FlowContextMenu />
    </GGEditor>
  </div>
    )
  }
}
