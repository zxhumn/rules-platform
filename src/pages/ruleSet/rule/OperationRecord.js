import React, { Component } from 'react'
import {
    Col,
    Row,
    Select,
    Table,
    Card,
    Form,
    Input,
    DatePicker,
    Button,
    Tabs,
    message,
    Collapse,
    Icon,
    Divider,
    Pagination,
    Modal
  } from 'antd';
const {RangePicker } = DatePicker;
  const dataSource = [
    {
      key: '1',
      name: '1',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '2',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = (target) => [
    {
      title: '序号',
      dataIndex: 'name',
      key: 'name',
       width: 100,
    },
    {
      title: '更改规则集',
      dataIndex: 'age',
      key: 'age',
        width: 200,
    },
    {
      title: '规则集名称',
      dataIndex: 'age',
      key: 'age',
        width: 200,
    },
    {
      title: '操作类型',
      dataIndex: 'address',
      key: 'address',
        width: 200,
    },
     {
        title: '操作账号',
        dataIndex: 'address',
        key: 'address',
          width: 200,
      },
     {
        title: '操作人姓名',
        dataIndex: 'address',
        key: 'address',
          width: 200,
      },
      {
        title: '操作时间',
        dataIndex: 'address',
        key: 'address',
          width: 200,
      },
       {
        title: '备注',
        dataIndex: 'address',
        key: 'address',
          width: 200,
      }
  
  ];
@Form.create()
class OperationRecord extends Component {
    constructor() {
        super();
        this.state = {
          loading: false
        }
      }
    render() {
        const {
            form: { getFieldDecorator },
          } = this.props;
          const formItemLayout = {
            labelCol: {
              span: 10,
            },
            wrapperCol: {
              span: 14,
            },
          };
          let {loading}=this.state
        return (
            <div>
         <div>
                <Row gutter={24}>
              <Form>
                <Col span={8}>
                  <Form.Item label="规则集编码" {...formItemLayout}>
                    {getFieldDecorator('warnNum', {
                      rules: [
                        {
                          whitespace: true,
                          message: '不能输入空格',
                        },
                        {
                          max: 30,
                          message: '输入内容长度不能大于30个字符',
                        },
                      ],
                    })(<Input placeholder="请输入规则集编码" />)}
                  </Form.Item>
                </Col>
                 <Col span={8}>
                  <Form.Item label="规则集名称" {...formItemLayout}>
                    {getFieldDecorator('warnNum', {
                      rules: [
                        {
                          whitespace: true,
                          message: '不能输入空格',
                        },
                        {
                          max: 30,
                          message: '输入内容长度不能大于30个字符',
                        },
                      ],
                    })(<Input placeholder="请输入规则集名称" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="操作类型" {...formItemLayout}>
                    {getFieldDecorator('warnEvent', {
                      rules: [
                        {
                          whitespace: true,
                          message: '不能输入空格',
                        },
                        {
                          max: 30,
                          message: '输入内容长度不能大于30个字符',
                        },
                      ],
                    })(<Input placeholder="请输入操作类型" />)}
                  </Form.Item>
                </Col>
                       <Col span={8}>
                    <Form.Item label="操作时间" {...formItemLayout}>
                        {getFieldDecorator('warnEvent', {
                        rules: [
                            {
                            whitespace: true,
                            message: '不能输入空格',
                            },
                            {
                            max: 30,
                            message: '输入内容长度不能大于30个字符',
                            },
                        ],
                        })(<RangePicker placeholder="请输入规则操作时间" />)}
                    </Form.Item>
                    </Col>
                    
               <Col span={3} offset={9}>
                  <Button
                    icon="search"
                    style={{ background: '#3377FF', color: '#ffffff' }}
                    loading={loading}
                    onClick={() => {
                      this.handleSubmit();
                    }}
                  >
                    查询
                  </Button>
                </Col>
                <Col span={3}>
                  <Button
                    style={{ background: '#FDAD4E', color: '#ffffff' }}
                    icon="reload"
                    onClick={() => {
                      this.initialValue();
                    }}
                  >
                    重置
                  </Button>
                </Col>
              </Form>
             </Row>
                </div>  
                <div>
                <Table  columns={columns(this)} dataSource={dataSource} pagination={false} />
                </div>
            </div>
     
            
        )
    }
}
export default OperationRecord
