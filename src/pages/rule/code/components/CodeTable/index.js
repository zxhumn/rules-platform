/* eslint-disable no-debugger */
import React, { Component } from 'react';
import { Col, Row, Button, Card, Input, Table, Popconfirm, Form, message, Icon } from 'antd';
import moment from 'moment';
import styles from './styles.less';
// import EditAndNewForm from '../EditAndNewForm/index';
import ConstantsForm from '../ConstantsForm/index';
import VariableForm from '../VariableForm/index';
import SelectType from '../SelectType/index';
import QuoteTable from '../QuoteTable/index';
import Record from '../Record/index';
import {
  parametersGet,
  parametersDelete,
  getConstants,
  deleteConstants,
} from '../../../../../services/rule';

// @Form.create()
class variable extends Component {
  constructor() {
    super();
    this.state = {
      codeTableData: {}, // 列表数据
      tableParam: {
        pageIdx: 1,
        pageSize: 10,
        category: '',
        name: '',
        code: '',
      }, // 查询参数
      tableLoading: false, // 表格加载
      variableFormVisible: false, // 变量弹窗
      variableFormData: '', // 变量新增修改表单
      variableFormTitle: '', // 变量弹窗抬头
      constantsFormVisible: false, // 常量弹窗
      constantsFormTitle: '', // 常量抬头
      constantsFormData: '', // 常量新增修改表单
      recordTableVisible: false, // 操作记录弹窗
      quoteTableVisible: false,
      quoteTableName: '', // 文件引用传的参数
      quoteTablCategory: '', // 文件引用传的参数
      selectTypeVisible: false, // 分类弹窗
      dateKey: '', // 打开弹框传入的key,用于刷新弹框
    };
  }

  componentDidMount() {
    const { name } = this.props;
    if (name === '变量') {
      this.getparameters();
    } else if (name === '常量') {
      this.getConstants();
    }
  }

  // 获取变量列表
  async getparameters() {
    this.setState({
      tableLoading: true,
    });
    const { tableParam } = this.state;
    const response = await parametersGet(tableParam);
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

  // 获取常量列表
  async getConstants() {
    this.setState({
      tableLoading: true,
    });
    const { tableParam } = this.state;
    const response = await getConstants(tableParam);
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

  // 清空内容
  handleReset = () => {
    const {
      form: { resetFields },
    } = this.props;
    resetFields();
  };

  // 常量子列表
  expandedRowRender = record => {
    const { name } = this.props;
    const { codeTableData } = this.state;
    const chilrdColumns = [
      { title: '实际值', dataIndex: 'value', key: 'value' },
      { title: '显示值', dataIndex: 'name', key: 'name' },
      { title: `${name}类型`, dataIndex: 'type', key: 'type' },
      {
        title: `文件引用`,
        key: 'action',
        render: row => (
          <a
            onClick={() => {
              this.quoteTableShow(row, record);
            }}
          >
            文件引用
          </a>
        ),
      },
    ];
    // 遍历列表，当其中一个的category等于点击这一行的category的时候，展示该行的子列表
    const data = codeTableData.data
      .filter(item => {
        return item.category === record.category;
      })
      .map(item => {
        return item.contents;
      });

    return <Table columns={chilrdColumns} dataSource={data[0]} pagination={false} />;
  };

  // 新增
  editAndNewMotalShow() {
    const dateKey = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss.SSS');
    const { name } = this.props;
    if (name === '变量') {
      this.setState({
        variableFormVisible: true,
        variableFormData: '',
        variableFormTitle: '新增变量',
        dateKey,
      });
    } else if (name === '常量') {
      this.setState({
        constantsFormVisible: true, // 常量弹窗
        constantsFormTitle: '新增常量', // 常量抬头
        dateKey,
      });
    }
  }

  // 取消弹窗关闭
  handleCancel() {
    const { name } = this.props;
    if (name === '变量') {
      this.setState({
        variableFormVisible: false,
      });
    } else if (name === '常量') {
      this.setState({
        constantsFormVisible: false,
      });
    }
  }

  // 确定弹窗关闭
  handleOk() {
    const { name } = this.props;
    if (name === '变量') {
      this.setState(
        {
          variableFormVisible: false,
        },
        () => {
          this.getparameters();
        }
      );
    } else if (name === '常量') {
      this.setState(
        {
          constantsFormVisible: false,
        },
        () => {
          this.getConstants();
        }
      );
    }
  }

  // 修改
  handleEdit(row) {
    const dateKey = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss.SSS');
    const { name } = this.props;
    if (name === '变量') {
      this.setState({
        variableFormVisible: true,
        variableFormData: row,
        variableFormTitle: '修改变量',
        dateKey,
      });
    } else if (name === '常量')
      this.setState({
        constantsFormVisible: true, // 常量弹窗
        constantsFormTitle: '修改常量', // 常量抬头
        constantsFormData: row.category,
        dateKey,
      });
  }

  // 显示文件引用
  quoteTableShow(row, record) {
    const { name } = this.props;
    if (name === '变量') {
      this.setState({
        quoteTableVisible: true,
        quoteTableName: row.name,
        quoteTablCategory: row.category,
      });
    } else if (name === '常量') {
      this.setState({
        quoteTableVisible: true,
        quoteTableName: row.name,
        quoteTablCategory: record.label,
      });
    }
  }

  // 文件引用弹窗关闭
  quoteTableClose() {
    this.setState({
      quoteTableVisible: false,
    });
  }

  // 显示操作记录
  recordTableShow() {
    // setState里的recordTableVisible 用于控制弹窗的显示隐藏

    this.setState({
      recordTableVisible: true,
    });
  }

  // 隐藏操作记录
  recordTableHandleCancel() {
    this.setState({
      recordTableVisible: false,
    });
  }

  // 打开下拉分类编辑弹窗
  openSelectType() {
    this.setState({
      selectTypeVisible: true,
    });
  }

  // 关闭下拉分类编辑弹窗
  closeSelectType() {
    this.setState({
      selectTypeVisible: false,
    });
  }

  // 查询
  handleSubmit() {
    const {
      name,
      form: { validateFields },
    } = this.props;
    const { tableParam } = this.state;
    this.setState({
      tableParam: { ...tableParam, pageIdx: 1, pageSize: 10 },
    });
    // 校验输入框的值是否符合验证规则
    validateFields((err, values) => {
      if (!err) {
        Object.assign(tableParam, values);
        if (name === '变量') {
          this.getparameters();
          message.success('查询成功');
        } else if (name === '常量') {
          this.getConstants();
          message.success('查询成功');
        }
      }
    });
  }

  // 页码改变
  handleChange(page) {
    const { tableParam } = this.state;
    const { name } = this.props;

    this.setState(
      {
        tableParam: {
          ...tableParam,
          pageIdx: page.current,
          pageSize: page.pageSize,
        },
      },

      () => {
        if (name === '常量') {
          this.getConstants();
        } else if (name === '变量') {
          this.getparameters();
        }
      }
    );
  }

  // 删除
  async handleDelete(row) {
    const { name } = this.props;
    const params = {
      name: row.name,
      parameterSet: row.category,
    };
    if (name === '变量') {
      const response = await parametersDelete(params);
      if (response.success) {
        message.success('删除成功');
        this.getparameters();
      } else {
        message.error(response.msg);
      }
    } else if (name === '常量') {
      const response = await deleteConstants(row.category);
      if (response.success) {
        message.success('删除成功');
        this.getConstants();
      } else {
        message.error(response.msg);
      }
    }
  }

  render() {
    const {
      codeTableData,
      variableFormVisible,
      variableFormData,
      variableFormTitle,
      constantsFormVisible,
      constantsFormTitle,
      constantsFormData,
      recordTableVisible,
      quoteTableVisible,
      quoteTableName,
      quoteTablCategory,
      selectTypeVisible,
      tableParam,
      tableLoading,
      dateKey,
    } = this.state;
    const {
      name,
      form
    } = this.props;

    const columns = [
      {
        title: '序号',
        width: 80,
        ellipsis: true,
        render: (text, record, index) => {
          return <span>{index + 1}</span>;
        },
      },
      {
        title: `${name}代码`,
        dataIndex: name === '变量' ? 'name' : 'category',
        key: name === '变量' ? 'name' : 'category',
        width: 200,
        ellipsis: true,
      },
      {
        title: `${name}名称`,
        dataIndex: 'label',
        key: 'label',
        width: 200,
        ellipsis: true,
      },

      {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',

        ellipsis: true,
      },
      {
        title: '操作',
        key: 'action',
        width: 250,
        render: row => (
          <span>
            <a
              style={{ marginRight: 10 }}
              onClick={() => {
                this.handleEdit(row);
              }}
            >
              修改
            </a>
            <Popconfirm
              title="确认删除?？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                this.handleDelete(row);
              }}
            >
              <a style={{ marginRight: 10 }}>删除</a>
            </Popconfirm>

            {name === '变量' && (
              <a
                style={{ marginRight: 10 }}
                onClick={() => {
                  this.quoteTableShow(row);
                }}
              >
                文件引用
              </a>
            )}
          </span>
        ),
      },
    ];
    if (name === '变量') {
      columns.splice(3, 0, {
        title: (
          <div>
            {`${name}分类`}
            <Icon
              title="编辑分类"
              type="setting"
              style={{ marginLeft: '20px', color: '#1890FF' }}
              onClick={() => {
                this.openSelectType();
              }}
            />
          </div>
        ),
        dataIndex: 'category',
        key: 'category',
        ellipsis: true,
        width: 200,
      });

      columns.splice(4, 0, {
        title: `${name}类型`,
        dataIndex: 'type',
        key: 'type',
        width: 150,
        ellipsis: true,
      });
    }
    return (
      <div>
        <Card className={styles.nav} bordered={false}>
          <Form className={styles.form}>
            <Row gutter="12" align="middle" type="flex">
              <Col span={4}>
                <Form.Item 
                 name="code"
                 label="代码"
                 rules={
                  [
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
                  ]
                 }
                >
                  <Input placeholder={`请输入${name}代码`} />
                </Form.Item>
              </Col>
              {/* <Col span={4}>
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
              </Col> */}
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
                    type="primary"
                    icon="plus"
                    onClick={() => {
                      this.editAndNewMotalShow();
                    }}
                  >
                    新增
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
        </Card>
        <Card
          title="查询列表"
          hoverable
          bordered={false}
          extra={
            <span
              style={{ color: '#1991FF' }}
              onClick={() => {
                this.recordTableShow();
              }}
            >
              查看记录
            </span>
          }
          style={{ marginTop: 20, borderRadius: 5 }}
        >
          <Table
            onExpand={this.onExpand}
            columns={columns}
            dataSource={codeTableData.data}
            loading={tableLoading}
            onChange={page => {
              this.handleChange(page);
            }}
            // 定义子展开表格，当name等于常量的时候，可点击每一行展开对应的子表格
            expandedRowRender={name === '常量' && this.expandedRowRender}
            pagination={{
              total: codeTableData.totalCount,
              size: tableParam.pageSize,
              current: tableParam.pageIdx,
              showQuickJumper: true,
            }}
          />
        </Card>
        {/* <ConstantsForm
          category={constantsFormData} // 常量传category
          title={constantsFormTitle} //
          name={name}
          key={dateKey}
          visible={constantsFormVisible}
          handleCancel={() => {
            this.handleCancel();
          }}
          handleOk={() => {
            this.handleOk();
          }}
        /> */}
        {/* <VariableForm
          VariableFormData={variableFormData}
          title={variableFormTitle} //
          name={name}
          key={dateKey}
          visible={variableFormVisible}
          handleCancel={() => {
            this.handleCancel();
          }}
          handleOk={() => {
            this.handleOk();
          }}
        /> */}
        {/* 文件引用组件 */}
        {/* <QuoteTable
          tableName={name} // 区分是常量引用还是变量引用
          visible={quoteTableVisible}
          key={quoteTableName}
          name={quoteTableName}
          category={quoteTablCategory}
          handleCancel={() => {
            this.quoteTableClose();
          }}
        /> */}
        {/* 查看记录组件 */}
        {/* <Record
          visible={recordTableVisible}
          key={name}
          name={name}
          handleCancel={() => {
            this.recordTableHandleCancel();
          }}
        /> */}
        {/* 编辑分类弹窗 */}
        {/* <SelectType
          visible={selectTypeVisible}
          key={selectTypeVisible}
          handleCancel={() => {
            this.closeSelectType();
          }}
        /> */}
      </div>
    );
  }
}

export default variable;
