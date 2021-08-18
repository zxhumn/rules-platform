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
import OperationRecord from "./OperationRecord"
const { confirm } = Modal;
// import style from "../css/index"

//  const columns = [
//       {
//         title: '开户业务规则集',
//         dataIndex: 'index',
//         key: 'index',
//         width: 200,
//         render: text => <a>{text}</a>,
//       },
//       {
//         title: '开户业务',
//         dataIndex: 'warnNum',
//         key: 'warnNum',
//         width: 200,

//         render: text => <a>{text}</a>,
//       },
//       {
//         title: '规则描述',
//         dataIndex: 'riType',
//         key: 'riType',
//         width: 400,
//       },
//       {
//         title: '操作',
//         key: 'action',
//         fixed: 'right',
//         width: 200,
//         render: text => (
//           <span
//             onClick={() => {
//               this.goToPage(text);
//             }}
//           >
//             <a>修改</a>
//             <a>删除</a>
//             <a>停用</a>
//           </span>
//         ),
//       },
//     ];
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
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 200,
    render: text => (
      <span>
        <a 
          onClick={() => 
           target.goEditPage(text)      
        }
        >修改</a>
        <Divider type="vertical" />
        <a
         onClick={() => 
          target.goDelPage(text)      
         }
        >删除</a>
        <Divider type="vertical" />
        <a
         onClick={() => 
          target.goStopPage(text)      
       }
        >停用</a>
      </span>
    ),
  },

];
const { Panel } = Collapse;
@Form.create()
class RuleList extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isVisible:false
    }
  }
  tcallback(key) {
    console.log(key)
  }
  goEditPage(){
     this.props.history.push('/ruleConfiguration/edit')
  }
  goDelPage(){
    confirm({
      title: '你确定要删除列表内容吗?',
      okText: '确认',
      cancelText: '取消',
      onOk() {  
       
       }
      })
  }
  goStopPage(){
    confirm({
      title: '你确定要停用列表内容吗?',
      okText: '确认',
      cancelText: '取消',
      onOk() {  
       
       }
      })
  }
  genExtra = () => (
    //      <Icon
    //     type="setting"
    //     onClick={event => {
    //       // If you don't want click extra trigger collapse, you can prevent this:
    //       event.stopPropagation();
    //     }}
    //   />
    <Col>
      <a onClick={()=>{this.AddParRule()}}>新增子规则</a>
      <Divider type="vertical" />
      <a onClick={()=>{this.DelParRule()}}>删除</a>
      <Divider type="vertical" />
    

    </Col>
  )
  onChangePage(pageNumber) {
    console.log(pageNumber)
  }
  AddRule() {
    this.props.history.push('/ruleConfiguration/edit')
  }
  AddParRule(){
    this.props.history.push('/ruleConfiguration/edit')
  }
  DelParRule(){
     confirm({
        title: '你确定要删除列表内容吗?',
        okText: '确认',
        cancelText: '取消',
        onOk() {  
             
         }
        })
  }
  CaoParRule(){
     this.setState({
        isVisible:true,
        title:"查看操作记录"
     })
  }
  handleSubmit=()=>{
    this.setState({
      isVisible:false
    })
  }
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 15,
      },
    };
    let { loading, warnManagerData } = this.state;

    return (
      <div>
        <div>
          <Card hoverable style={{ borderRadius: '10px' }}>
            <Row gutter={24}>
              <Form>
                <Col span={6}>
                  <Form.Item label="规则分组" {...formItemLayout}>
                    {getFieldDecorator('eventState', {
                      initialValue: '',
                    })(
                      <Select style={{ width: '100%' }} allowClear>
                        {/* {(eventStatusData || '').map(item => (
                          <Option key={item.dkey} value={item.dkey}>
                            {item.dvalue}
                          </Option>
                        ))} */}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
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
                <Col span={6}>
                  <Form.Item label="规则集编码" {...formItemLayout}>
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
                    })(<Input placeholder="请输入规则集编码" />)}
                  </Form.Item>
                </Col>
                <Col span={2}>
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
          </Card>
        </div>
        <div>
          <Card hoverable style={{ borderRadius: '10px', marginTop: 20 }} title={<Button icon ="history"  onClick={()=>{this.CaoParRule()}}>查看操作记录</Button>} extra={<Button
            style={{ background: '#3377FF', color: '#ffffff', border: 0 }}
            loading={loading}
            onClick={() => {
              this.AddRule();
            }}
          >   
                新增规则集
                  </Button>}>
            <Collapse defaultActiveKey={['1']} onChange={this.tcallback}>
              <div style={{ background: "#FAFAFA", display: "flex", lineHeight: "3.5", color: "#000", borderBottom: "1px solid #d9d9d9" }}>
                <div style={{ flex: 9, paddingLeft: "20px" }}>规则集编码：RS2108</div>
                <div style={{ paddingRight: "50px" }}>子规则数：4</div>

              </div>
              <Collapse.Panel header={<span><span style={{ marginLeft: "110px" }}>开户业务规则集</span ><span style={{ marginLeft: "200px" }}>开户业务</span><span style={{ marginLeft: "240px" }}>开户业务规则集描述:这是一个开户业务的规则集。</span></span>} key="1" extra={this.genExtra()}>
                <Table  columns={columns(this)} dataSource={dataSource} showHeader={false} pagination={false} />
              </Collapse.Panel>
              <div style={{ background: "#FAFAFA", display: "flex", lineHeight: "3.5", color: "#000", borderBottom: "1px solid #d9d9d9" }}>
                <div style={{ flex: 9, paddingLeft: "20px" }}>规则集编码：RS2108</div>
                <div style={{ paddingRight: "50px" }}>子规则数：4</div>

              </div>
              <Collapse.Panel header={<span><span style={{ marginLeft: "110px" }}>账务核对管理业务规则集</span ><span style={{ marginLeft: "143px" }}>账务核对管理业务</span><span style={{ marginLeft: "184px" }}>规则集描述：这是一个账务核对管理业务的规则集。</span></span>} key="2" extra={this.genExtra()}>
                {/* <p>{text}</p> */}
              </Collapse.Panel>
              <div style={{ background: "#FAFAFA", display: "flex", lineHeight: "3.5", color: "#000", borderBottom: "1px solid #d9d9d9" }}>
                <div style={{ flex: 9, paddingLeft: "20px" }}>规则集编码：RS2108</div>
                <div style={{ paddingRight: "50px" }}>子规则数：4</div>

              </div>
              <Collapse.Panel header={<span><span style={{ marginLeft: "110px" }}>开户业务规则集</span ><span style={{ marginLeft: "200px" }}>开户业务</span><span style={{ marginLeft: "240px" }}>开户业务规则集描述:这是一个开户业务的规则集</span></span>} key="3" extra={this.genExtra()}>
                {/* <p>{text}</p> */}
              </Collapse.Panel>
            </Collapse>

            <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChangePage} style={{ height: '32px', lineHeight: '32px', textAlign: 'center', marginTop: "20px" }} />
             <Modal
            title={this.state.title}
            visible={this.state.isVisible}
            onOk={this.handleSubmit}
            onCancel={(e,info) => {
              // this.userForm.props.form.resetFields();
                this.setState({
                    isVisible: false,
             
                })
            }}
            width={1000}
            >
            <OperationRecord wrappedComponentRef={(inst) => {this.userForm = inst;}}/>
           
        </Modal>    


          </Card>
        </div>
      </div>
    )
  }
}

export default RuleList;