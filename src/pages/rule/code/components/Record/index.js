import React, { Component } from 'react';
import { Button, Input, Row, Col, DatePicker, Modal, Table, Form, Select, message } from 'antd';
import moment from 'moment';
import { ops, history } from '../../../../../services/rule';
import styles from './styles.less';

const { RangePicker } = DatePicker;
const { Option } = Select;

// @Form.create()
class Record extends Component {
  constructor() {
    super();
    this.state = {
      tableParam: {
        pageIdx: 1,
        pageSize: 10,
        type: 2,
        name: '',
        code: '',
        end: '',
        start: '',
        op: '',
      }, // 查询参数
      tableLoading: false, // 表格加载
      codeTableData: '', // 列表数据
      selectData: [], // 下拉选项
    };
  }

  componentDidMount() {
    const { name } = this.props;
    const { tableParam } = this.state;
    // 用于请求查看记录的参数，等于4的时候为查看变量记录，为0的时候为查看常量记录
    if (name === '变量') {
      const type = 2;
      this.setState(
        {
          tableParam: { ...tableParam, type },
        },
        () => {
          this.getHistory();
          this.getHistoryOps(type);
        }
      );
    } else if (name === '常量') {
      const type = 0;
      this.setState(
        {
          tableParam: { ...tableParam, type },
        },
        () => {
          this.getHistory();
          this.getHistoryOps(type);
        }
      );
    }
  }

  // 获取时间
  onChangeTime(value, dateString) {
    const time1 = new Date(dateString[0]).getTime();
    const time2 = new Date(dateString[1]).getTime();
    const { tableParam } = this.state;
    this.setState({
      tableParam: { ...tableParam, start: time1, end: time2 },
    });
  }

  // 获取列表数据
  async getHistory() {
    this.setState({
      tableLoading: true,
    });
    const { tableParam } = this.state;
    const response = await history(tableParam);
    if (response.success) {
      this.setState({
        codeTableData: response.data,
        tableLoading: false,
      });
    } else {
      message.error(response.msg);
      this.setState({
        tableLoading: false,
      });
    }
  }

  // 获取下拉列表
  async getHistoryOps(type) {
    const response = await ops({ type });
    if (response.success) {
      this.setState({
        selectData: response.data,
      });
    }
  }

  // 控制时间的筛选范围
  disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }

  // 查询
  handleSubmit() {
    const {
      form: { validateFields },
    } = this.props;
    const { tableParam } = this.state;

    // 校验输入框的值是否符合验证规则
    validateFields((err, values) => {
      if (!err) {
        // eslint-disable-next-line no-param-reassign
        delete values.warnEvent;
        Object.assign(tableParam, values);
        this.setState(
          {
            tableParam: { ...tableParam, pageIdx: 1, pageSize: 10 }, // 重置页码为第一页
          },
          () => {
            this.getHistory();
            message.success('查询成功');
          }
        );
      }
    });
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
        this.getHistory();
      }
    );
  }

  // 关闭弹窗
  handleCancel() {
    const { handleCancel } = this.props;
    handleCancel();
  }

  // 清空内容
  handleReset() {
    const {
      form: { resetFields },
    } = this.props;
    resetFields();
    const { tableParam } = this.state;
    this.setState({
      tableParam: { ...tableParam, start: '', end: '' },
    });
  }

  render() {
    const { codeTableData, tableParam, selectData, tableLoading } = this.state;
    const {
      visible,
      name,
      form: { getFieldDecorator },
    } = this.props;
    const columns = [
      {
        title: '序号',
        // dataIndex: 'id',
        width: 80,
        ellipsis: true,
        render: (text, row, index) => {
          return <span>{tableParam.pageSize * (tableParam.pageIdx - 1) + index + 1}</span>;
        },
      },
      {
        title: `更改${name}编码`,
        dataIndex: 'code',
        width: 150,
        ellipsis: true,
      },
      {
        title: `更改${name}名称`,
        dataIndex: 'name',
        width: 100,
        ellipsis: true,
      },
      {
        title: '操作类型',
        dataIndex: 'op',
        width: 120,
        ellipsis: true,
      },
      {
        title: '操作账号',
        dataIndex: 'account',
        width: 120,
        ellipsis: true,
      },
      {
        title: '操作人姓名',
        dataIndex: 'uname',
        width: 120,
        ellipsis: true,
      },
      {
        title: '操作时间',
        dataIndex: 'time',
        width: 150,
        ellipsis: true,
        render: text => <span>{moment(text).format('YYYY/MM/DD HH:mm')}</span>,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        ellipsis: true,
      },
    ];
    return (
      <div>
        <Modal
          footer={false}
          destroyOnClose
          maskClosable={false}
          title="操作记录"
          visible={visible}
          onCancel={() => {
            this.handleCancel();
          }}
          width={1300}
        >
          <Form className={styles.form}>
            <Row gutter="12" align="middle" type="flex">
              <Col span={4}>
                <Form.Item>
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        max: 30,
                        message: '字符不能大于30个字符',
                      },
                      {
                        validator: (rule, value, callback) => {
                          // eslint-disable-next-line no-useless-escape
                          const reg = new RegExp(/[^\a-\z\A-\Z0-9]/g);
                          if (reg.test(value)) {
                            return callback('请输入英文或者数字');
                          }
                          return callback();
                        },
                      },
                    ],
                  })(<Input placeholder={`请输入${name}编码`} />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item>
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        max: 30,
                        message: '字符不能大于30个字符',
                      },
                    ],
                  })(<Input placeholder={`请输入${name}名称`} />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item>
                  {getFieldDecorator('op')(
                    <Select style={{ width: '100%' }} allowClear placeholder="请选择操作类型">
                      {selectData.map(item => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item>
                  {getFieldDecorator('warnEvent')(
                    <RangePicker
                      disabledDate={this.disabledDate}
                      showTime={{ format: 'HH:mm' }}
                      format="YYYY-MM-DD HH:mm"
                      placeholder={['开始时间', '结束时间']}
                      onChange={(value, dateString) => {
                        this.onChangeTime(value, dateString);
                      }}
                      onOk={this.onOk}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item>
                  <Button
                    type="primary"
                    icon="search"
                    onClick={() => {
                      this.handleSubmit();
                    }}
                  >
                    查询
                  </Button>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item>
                  <Button
                    icon="redo"
                    onClick={() => {
                      this.handleReset();
                    }}
                  >
                    重置
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
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

export default Record;
