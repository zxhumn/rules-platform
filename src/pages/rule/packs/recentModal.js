import React, { PureComponent } from 'react';
import { Modal, Card, Table, Button, Row, Col, Form, Input, Select, Radio, Transfer, Switch,DatePicker,Tooltip ,message  } from 'antd';

import moment from 'moment';
import { connect } from 'dva';
import {  PACKS_HISTORY,PACKS_OPS } from '../../../actions/rule';
import { history, ops } from "../../../services/rule"
import style from './index.less';
// import CodeMirronr  from './codeMirronr'
import CodeMirronr from './codeMirronr'


const {RangePicker } = DatePicker;
const success = content => {
  message.success(content);
};

const error = content => {
  message.error(content);
};
@connect(({ rule }) => ({
  rule
}))
@Form.create()
export default class restModal extends PureComponent {
  constructor() {
    super();
    this.state = {
      loading: false,
      visible: false,
      rowSelection: [],
      data:[],
      columns:[],
      opsList:[],
      table: {
        current: 1,
        pageSize: 5,
        pageTotal: 0,
        pages: 20
      },
      start:0,//时间控件，开始时间
      end:0

      

    };
    this.onTableChange=this.onTableChange.bind(this)
    this.onChangeTime=this.onChangeTime.bind(this)
    this.onReset = this.onReset.bind(this)
  }
componentWillMount() {
  this.getTable(this.state.table.current,this.state.table.pageSize)
  this.getOps({type:4})
 this.getList({})
  // console.log('componentDidMount',);
  // this.getTable()
}
async getList(params) {
  if(params){

    Object.assign(params,{type:4})
  }else{
    params={type:4}
  }
  const response = await history(params);
  if (response.success) {
    let obj=response.data
    let  table= {
      current: obj.pageProperty.pageIdx,
      pageSize: this.state.table.pageSize,
      pageTotal: obj.totalCount,
      pages:   obj.pageProperty.pageIdx,
    }
    this.setState({
      data: response.data.data,
      table
    }, () => {
      console.log(this.state.PaddList)
    })

  }

}
async getOps(params) {
  const response = await ops(params);
  if (response.success) {
    this.setState({
      opsList: response.data
    })
  }
}
  onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    }, () => {
      this.props.childClick(this.state.visible)
    });
  };

  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false
    }, () => {
      this.props.childClick(this.state.visible)
    });
  };
  getTable(current,size) {
    const columns = [
      {
        title: '序号',
         width:80,
         render: (text, record, index) => {
          //生成序号
          return (
              <span>{(current-1)*size+index+1}</span>
          )
      },
      },
      {
        title: '更改ID编码',
        dataIndex: 'code',
          width: 100,
          ellipsis: {
            showTitle: false,
          },
          render: name => (
            <Tooltip placement="topLeft" title={name}>
             {name}
            </Tooltip>
          )
      },
      {
        title: '更改知识包',
        dataIndex: 'name',
          width: 100,
          ellipsis: {
            showTitle: false,
          },
          render: name => (
            <Tooltip placement="topLeft" title={name}>
             {name}
            </Tooltip>
          )
      },
      {
        title: '操作类型',
        dataIndex: 'op',
          width: 100,
          ellipsis: {
            showTitle: false,
          },
          render: name => (
            <Tooltip placement="topLeft" title={name}>
             {name}
            </Tooltip>
          )
      },
       {
          title: '操作账号',
          dataIndex: 'account',
            width: 100,
            ellipsis: {
              showTitle: false,
            },
            render: name => (
              <Tooltip placement="topLeft" title={name}>
               {name}
              </Tooltip>
            )
        },
       {
          title: '操作人姓名',
          dataIndex: 'uname',
            width: 120,
            ellipsis: {
              showTitle: false,
            },
            render: name => (
              <Tooltip placement="topLeft" title={name}>
               {name}
              </Tooltip>
            )
        },
        {
          title: '操作时间',
          dataIndex: 'time',
            width: 150,
            ellipsis: {
              showTitle: false,
            },
            render: name => (
              <Tooltip placement="topLeft" title={name}>
               <span>{ moment(name).format("YYYY/MM/DD HH:mm")}</span>
              </Tooltip>
            )
           
        },
         {
          title: '备注',
          dataIndex: 'remark',
          width: 100,
            ellipsis: {
              showTitle: false,
            },
            render: name => (
              <Tooltip placement="topLeft" title={name}>
                {name}
              </Tooltip>
            )
        }           
    
    ];
    this.setState({
      columns: columns,
    })

  }
    // 页码改变
    onTableChange(page) {
      const {
        form: { getFieldsValue, validateFields },
        dispatch
    } = this.props;
    const formData = getFieldsValue(); // 获取所有输入框的值
    // 筛选值不为空的属性
    Object.keys(formData).forEach(item => {
        if (!formData[item]) delete formData[item];
        return formData;
    });
      this.setState(
        {
          current: page.current,
          pageSize: page.pageSize,
        },
        () => {
          let { current, pageSize } = this.state
          let obj ={
              pageIdx:current,
              pageSize:pageSize
        }
        // Object.assign(formData,obj)
        
    console.log('formData:', formData,obj);
    
    this.getTable(current,pageSize)
        // dispatch(PACKS_LIST(formData)) 
        this.getList(obj)
        }
      );
    }
     // 查询
     handleSubmit() {
      const {
          form: { getFieldsValue, validateFields },
          dispatch
      } = this.props;

      // 校验输入框的值是否符合验证规则
      validateFields((err, values) => {
          if (!err) {

              this.setState({ loading: true });
              // 请求数据
              const formData = getFieldsValue(); // 获取所有输入框的值
              if(formData.warnEvent){
                formData.start=this.state.start
                formData.end=this.state.end
                delete formData.warnEvent
              }
              
              // 筛选值不为空的属性
              Object.keys(formData).forEach(item => {
                  if (!formData[item]) delete formData[item];
                  return formData;
              });
              
              if(JSON.stringify(formData)=='{}'){        
                this.setState({
                  loading: false,
                })
               message.warning('请先选择至少一个查询项')
               return
                
                }
              this.getTable(1,this.state.table.pageSize)
              // console.log('提交',formData,this.state.table,values)
              this.getList(formData)
              this.setState({
                loading: false,
              },()=>{
                  
              success('查询成功');
              });
          } else {
              error('查询失败');
          }
      });
  }
  onReset = () => {
    const {
        form: { resetFields },
    } = this.props;
    resetFields();    
 this.getList({})
    success('重置成功');

    // this.getPersonnelMonitorList({})
};
  handlePost(value) {
    // console.log(`Selected-1: ${value}`);
    // this.setState({
    //     stateValue:value
    // })
  }
  onChangeTime(value, dateString) {
    const time1=new Date(dateString[0]).getTime()
    const time2=new Date(dateString[1]).getTime()
    this.setState({
      start:time1,
      end:time2,

    })
  }
  
  render() {
    const layout1 = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
    const layout = {
      labelCol: {
          span: 2,
      },
      wrapperCol: {
          span: 22,
      },
  };
    const {
      form: { getFieldDecorator, setFieldsValue, getFieldsValue },
      recentmodalVisible,
    } = this.props;

    const { selectedRowKeys,loading,table,data,columns,opsList} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    return (
      <div>
        <Modal
        centered
          title="操作记录"
          width={1000}
          visible={recentmodalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          // destroyOnClose={false}
        >
           <div>
           <Row gutter={24}>
              <Form
              {...layout1}
              >
                <Col span={8}>
                  <Form.Item label="ID编码" {...formItemLayout}>
                    {getFieldDecorator('code', {
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
                    })(<Input placeholder="请输入ID编码" />)}
                  </Form.Item>
                </Col>
                 <Col span={8}>
                  <Form.Item label="知识包名称" {...formItemLayout}>
                    {getFieldDecorator('name', {
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
                    })(<Input placeholder="请输入知识包名称" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                        label="操作类型"
                        name="op"
                        rules={[{ required: false, message: '请选择操作类型' }]}
                      >
                        {getFieldDecorator('op')(
                          <Select 
                            placeholder="请选择操作类型" onChange={this.handlePost}  allowClear>

                            {opsList && opsList.map(d => (
                              <Select.Option key={d} value={d}>
                                {d}
                              </Select.Option>
                            ))}
                          </Select>)}
                      </Form.Item>
                </Col>
                       <Col span={8}>
                    <Form.Item label="操作时间" {...formItemLayout}>
                        {getFieldDecorator('warnEvent')
                        (<RangePicker placeholder="请输入规则操作时间" 
                        onChange={this.onChangeTime}
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        />)}
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
                      this.onReset();
                    }}
                  >
                    重置
                  </Button>
                </Col>
              </Form>
             </Row>
                </div>  
                <div>
                <Table  columns={columns} dataSource={data} pagination={false}
                 rowKey={row => row.id}
                 onChange={page => {
                    this.onTableChange(page);
                  }}
                  pagination={{
                       total: table.pageTotal,
                    pageSize:table.pageSize,
                    pages:table.pages,
                    current:table.current,
                    showQuickJumper: true,
                  }}
                  // style={{height:380}}
                 />
                </div>
         
        </Modal>
      </div>
    );
  }
}