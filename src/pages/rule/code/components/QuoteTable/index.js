/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-debugger */
import React, { Component } from 'react';
import { Table, Modal } from 'antd';
import { whouseme, constantsWhouseme } from '../../../../../services/rule';
// import EventBus from '../../../../../utils/eventBus';

class QuoteTable extends Component {
  constructor() {
    super();
    this.state = {
      codeTableData: '',
      tableParam: {
        pageIdx: 1,
        pageSize: 10,
        name: '',
      }, // 查询参数
      tableLoading: false,
    };
  }

  componentDidMount() {
    const { tableParam } = this.state;
    const { name, category } = this.props;
    this.setState(
      {
        tableParam: { ...tableParam, name, category },
      },
      () => {
        this.getWhouseme();
      }
    );
  }

  // 获取列表数据
  async getWhouseme() {
    this.setState({
      tableLoading: true,
    });
    const { tableParam } = this.state;
    const { tableName } = this.props;
    const response = await (tableName === '变量'
      ? whouseme(tableParam)
      : constantsWhouseme(tableParam));
    if (response.success) {
      this.setState({
        codeTableData: response.data,
        tableLoading: false,
      });
    } else {
      this.setState({
        tableLoading: false,
      });
    }
  }

  // 关闭弹窗
  handleCancel() {
    const { handleCancel } = this.props;
    handleCancel();
  }

  // 页码改变
  handleChange(page) {
    const { tableParam } = this.state;
    this.setState(
      {
        tableParam: {
          ...tableParam,
          pageIdx: page.current,
          pageSize: page.pageSize,
        },
      },

      () => {
        this.getWhouseme();
      }
    );
  }

  render() {
    const { codeTableData, tableLoading, tableParam } = this.state;
    const { visible } = this.props;
    const columns = [
      {
        title: '文件路径',
        dataIndex: 'path',
        key: 'path',
        width: 300,
        ellipsis: true,
      },
      {
        title: '规则及名称',
        dataIndex: 'label',
        key: 'label',
        width: 100,
        ellipsis: true,
      },
      {
        title: '规则及编码',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        ellipsis: true,
      },

      {
        title: '子规则编码',
        dataIndex: 'payload',
        key: 'payload',
        width: 100,
        ellipsis: true,
      },
    ];

    return (
      <div>
        <Modal
          footer={false}
          destroyOnClose
          maskClosable={false}
          title="文件引用"
          visible={visible}
          onCancel={() => {
            this.handleCancel();
          }}
          width={900}
        >
          <Table
            onExpand={this.onExpand}
            columns={columns}
            dataSource={codeTableData.data}
            loading={tableLoading}
            onChange={page => {
              this.handleChange(page);
            }}
            style={{ marginTop: 20 }}
            pagination={{
              total: codeTableData.totalCount,
              size: tableParam.pageSize,
              current: tableParam.pageIdx,
              showQuickJumper: true,
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default QuoteTable;
