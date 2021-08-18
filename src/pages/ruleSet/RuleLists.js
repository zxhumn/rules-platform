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

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = (target) => [
    {
      title: '编号',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '分组',
      dataIndex: 'address',
      key: 'address',
    },
    {
        title: '描述',
        dataIndex: 'address',
        key: 'address',
      }
  
  ];
@Form.create()
class RuleLists extends Component {
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
                  <Form.Item label="模板分组" {...formItemLayout}>
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
                    })(<Input placeholder="请输入规则模板分组" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="模板名称" {...formItemLayout}>
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
                    })(<Input placeholder="请输入规则模板名称" />)}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Button
                    icon="search"
                    style={{ background: '#3377FF', color: '#ffffff', border: 0 }}
                    loading={loading}
                    onClick={() => {
                      this.handleSubmit();
                    }}
                  >
                    查询
                  </Button>
                </Col>
                <Col span={4}>
                  <Button
                    style={{ background: '#FDAD4E', color: '#ffffff', border: 0 }}
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
export default RuleLists
