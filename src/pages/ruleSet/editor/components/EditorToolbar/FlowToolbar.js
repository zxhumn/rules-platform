import { Divider, Icon, Tooltip } from 'antd';
import React from 'react';
import {Toolbar}  from 'gg-editor';
import { ref } from 'react.eval'
import ToolbarButton from './ToolbarButton';
import styles from './index.less';

const FlowToolbar = () => (
  <Toolbar className={styles.toolbar}>
    <ToolbarButton command="undo" text="撤销" />
    <ToolbarButton command="redo" text="前进" />
    <Divider type="vertical" />
    <ToolbarButton command="copy" text="复制" />
    <ToolbarButton command="paste" text="粘贴" />
    <ToolbarButton command="delete" text="删除" />
    <Divider type="vertical" />
    <ToolbarButton command="zoomIn" icon="zoom-in" text="放大" />
    <ToolbarButton command="zoomOut" icon="zoom-out" text="缩小" />
    <ToolbarButton command="autoZoom" icon="fit-map" text="自适应" />
    <ToolbarButton command="resetZoom" icon="actual-size" text="当前大小" />
    <Divider type="vertical" />
    <ToolbarButton command="toBack" icon="to-back" text="下一级" />
    <ToolbarButton command="toFront" icon="to-front" text="上一级" />
    <Divider type="vertical" />
    <ToolbarButton command="multiSelect" icon="multi-select" text="多选" />
    <ToolbarButton command="addGroup" icon="group" text="合并组" />
    <ToolbarButton command="unGroup" icon="ungroup" text="解除组" />
    <Tooltip placement="bottom" title='保存'>
      <Icon onClick={()=>ref('flowBody.save')} type='save' style={{margin: '0 7px',cursor: 'pointer'}} />
    </Tooltip>
  </Toolbar>
);

export default FlowToolbar;
