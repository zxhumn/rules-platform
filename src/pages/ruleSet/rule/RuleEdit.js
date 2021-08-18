import React, { Component } from 'react'
import {
  Col,
  Row,
  Select,
  Card,
  Form,
  Input,
  Button,
  Tabs,
  message,
  Collapse,
  Icon,
  Divider,
  Pagination,
  List,
  Modal
} from 'antd';
import GGEditor from 'gg-editor';
import  {Flow,withPropsAPI,ItemPanel, Item} from 'gg-editor';
import EditableLabe from "gg-editor"
import Editproperties from "../commot/Editproperties"
import EditingConditions from "../commot/EditingConditions"
import EditActions from "../commot/EditAction"
import styles from '../../../layouts/Sword.less';
import logo1 from "../../../assets/属性2.png"
import logo2 from "../../../assets/规则.png"
import logo3 from "../../../assets/@2x.png"
import logo4 from "../../../assets/action.png"
import logo5 from "../../../assets/连接.png"
import logo6 from "../../../assets/测试.png"
import logo7 from "../../../assets/属性.png"
import logo8 from "../../../assets/模板.png"
import RuleLists from "../RuleLists"
import Test from "../editor/indexs"
import eggstyles from "../editor/index.css"

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
const { confirm } = Modal;
// const { Option } = Select;
// const data = [
//   'Racing car sprays burning fuel into crowd.',
//   'Japanese princess to wed commoner.',
//   'Australian walks 100km after outback crash.',
//   'Man charged over missing wedding girl.',
//   'Los Angeles battles huge wildfires.',
// ];
const data = {
  nodes: [
    {
      id: '0',
      label: 'Node',
      x: 50,
      y: 50,
      // "shape ": "flow-rect"

    },
    {
      id: '1',
      label: 'Node',
      x: 200,
      y: 50,
    },
    {
      id: '2',
      label: 'Node',
      x: 350,
      y: 50,
    },
    {
      id: '3',
      label: 'Node',
      x: 500,
      y: 50,
    },
    {
      id: '4',
      label: 'Node',
      x: 650,
      y: 50,
    },
    {
      id: '5',
      label: 'Node',
      x: 80,
      y: 200,
      shape: 'flow-circle',

    },
    
    
  ],
  edges: [
    {
      label: '',
      source: '0',
      sourceAnchor: 1,
      target: '1',
      targetAnchor: 0,
    },
    {
      label: '',
      source: '1',
      sourceAnchor: 2,
      target: '2',
      targetAnchor: 3,
    },
    {
      label: '',
      source: '2',
      sourceAnchor: 2,
      target: '3',
      targetAnchor: 3,
    },
    {
      label: '',
      source: '3',
      sourceAnchor: 4,
      target: '4',
      targetAnchor: 3,
    },
    {
      label: '',
      source: '1',
      sourceAnchor: 5,
      target: '5',
      targetAnchor: 1,
    
    },
  ],
};
@Form.create()
class RuleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isVisible: false,
      lick:[],
      Action:[]
    }
    this.handleSubmits=this.handleSubmits.bind(this)
  }
  ShowRuleList() {
    this.setState({

      isVisible: true,
      title: '规则模板引用',
    })
  }
  handleSubmits=(e)=>{
    this.setState({
      isVisible: false
    })
  }
  DelParRule(){
    confirm({
      title: '你确定要删除吗?',
      okText: '确认',
      cancelText: '取消',
      onOk() {  
       
       }
      })
  }
  save =()=>{
    const { propsAPI } = this.props;
	 
  };
  tests(){
    console.log(1)
    this.setState({
      Action:1
    })
  }
  TestClick(){
    this.setState({
      lick:1
    })
  }
  Testschancel(){
    this.setState({
      lick:[]
    })
  }
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    };
    const formItemLayouts = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const formAllItemLayout = {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 22,
      },
    };
    let { loading } = this.state
    return (
      <div>
        <div>
          <Card hoverable style={{ borderRadius: '10px' }}>

            <Form>
              <Row gutter={24}>
                <Col span={7}>
                  <Form.Item label="名称" {...formItemLayout} className={styles.inputItem}>
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
                <Col span={7}>
                  <Form.Item label="规则分组" {...formItemLayout} className={styles.inputItem}>
                    {getFieldDecorator('eventState', {
                      initialValue: '',
                    })(
                      <Select>
                        {/* {(eventStatusData || '').map(item => (
                          <Option key={item.dkey} value={item.dkey}>
                            {item.dvalue}
                          </Option>
                        ))} */}
                      </Select>
                    )}
                  </Form.Item>
                </Col>

              </Row>

              <Row gutter={24}>
                <Col span={14}>
                  <Form.Item label="描述" {...formAllItemLayout} className={styles.inputItem}>
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
                    })(<TextArea rows={4} placeholder="请输入规则集描述" />)}
                  </Form.Item>
                </Col>
                <Col span={2} style={{ marginTop: "35px", marginLeft: "20px" }}>
                  <div style={{ display: "flex" }} onClick={()=>{this.TestClick()}}>
                    <Icon type="caret-right" style={{ color: "#52c41a", fontSize: '36px' }} />
                    <span style={{ lineHeight: "36px" }} >测试</span>
                  </div>

                </Col>
                <Col span={3} style={{ marginTop: "35px" }}>
                  <Button
                    icon="loading"
                    style={{ background: '#3377FF', color: '#ffffff', border: 0 }}
                    loading={loading}
                    onClick={() => {
                      this.handleSubmit();
                    }}
                  >
                    保存
                  </Button>
                </Col>
                <Col span={4} style={{ marginTop: "35px" }}>
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

              </Row>
            </Form>

          </Card>
        </div>
        <div>

          <Card hoverable style={{ borderRadius: '10px', marginTop: 20 }}
            title={<div className={styles.EditTitle}>
              <div className={styles.EditTitleLeft}>
                <span>
                  <img src={logo1} alt="" style={{ width: "40px", height: "40px", marginBottom: "5px" }} />
                  <p>属性</p>
                </span>
                <span>
                  <img src={logo2} alt="" style={{ width: "40px", height: "40px", marginBottom: "5px" }} />
                  <p>条件</p>
                </span>
                <span>
                  <img src={logo3} alt="" style={{ width: "40px", height: "30px", marginBottom: "15px" }} />
                  <p>逻辑关系</p>
                </span>
                <span>
                  <img src={logo4} alt="" style={{ width: "40px", height: "40px", marginBottom: "5px" }} />
                  <p>输出动作</p>
                </span>
                <span>
                  <img src={logo5} alt="" style={{ width: "40px", height: "40px", marginBottom: "5px" }} />
                  <p>连线</p>
                </span>
                <span>
                  <img src={logo6} alt="" style={{ width: "30px", height: "30px", marginBottom: "15px" }} />
                  <p>子规则测试</p>
                </span>
              </div>
              <div className={styles.EditTitleMid}></div>
              <div className={styles.EditTitleRight}>
                <span onClick={() => {
                  this.ShowRuleList();
                }}>
                  
                  <img src={logo8} alt="" style={{ width: "40px", height: "40px", marginRight: "5px" }} />
                  <span>引用规则模板</span>
                
                </span>

                <span>
                  {/* <Button
                    icon="loading"
                
                    loading={loading}
                    onClick={() => {
                      // this.handleSubmit();
                    }}
                  > */}
                  <Select defaultValue="1" loading style={{ border: 0, width: "100px" }}>
                    <Option value="1">保存</Option>
                    <Option value="2">保存为规则模板</Option>
                  </Select>
                  {/* </Button> */}
                </span>
                <span>
                  <Button type="danger" icon="delete" onClick={()=>{this.DelParRule()}}>删除</Button>
                </span>

             
              </div>
            </div>}
          >
            <div className={styles.RuleContent}>
              <div className={styles.RuleLeft}>
                <Tabs tabPosition="left">
                  <TabPane tab={
                    <span>
                     <Icon type="file-search" />
                     规则1
                  </span>
                  } key="1">
                    <GGEditor>
                    <ItemPanel>
                       <EditableLabe />
                    </ItemPanel>
                     {/* <Flow className={eggstyles.graph} data={data} 
                      
                     onNodeClick={(e) => {
                        console.log(e);
                      }} /> */}
                     <Test></Test>
                    {/* <div>
                       <Button onClick={()=>{this.save()}}>保存</Button>
                    </div> */}
           <Row gutter={24}>
             {this.state.lick!==1?
            <Form>
              <Col span={18}>
                <Form.Item label="描述" {...formAllItemLayout} className={styles.inputItem}>
                  {getFieldDecorator('warnEvent33', {
                    rules: [
                      {
                        whitespace: true,
                        message: '不能输入空格',
                      },
                      {
                        // max: 30,
                        // message: '输入内容长度不能大于30个字符',
                      },
                    ],
                  })(<div style={{marginTop:"20px"}}><TextArea rows={4} placeholder="请输入规则集描述" /></div>)}
                </Form.Item>
              </Col>
             </Form>:      
             
         <div style={{height:"33px",background:"#d9d9d9",}}>
           <Col span={12} >
              <Col>
                <Col span={15} style={{color:"#000",marginLeft:"-30px"}}>输入参数</Col>
                <Col span={5}>
                <Button
                    style={{ background: '#3377FF', color: '#ffffff', border: 0}}
                  
                    onClick={() => {
                      this.tests();
                    }}
                  >
                    测试
                  </Button>

                </Col>
                 <Col span={4}>
                  <Button
                    style={{ background: '#FDAD4E', color: '#ffffff', border: 0,marginLeft:"30px"}}
                   
                    // onClick={() => {
                    //   this.initialValue();
                    // }}
                  >
                    清空
                  </Button>
                </Col>           
              </Col>
             <Col span={12} offset={0}>
              
                     
              <Form.Item label="客户性别" {...formItemLayouts} className={styles.inputItem}>
               {getFieldDecorator('warnEvent555', {
                 rules: [
                   {
                     whitespace: true,
                     message: '不能输入空格',
                   }
                 ],
               })(
               <Input></Input>
               )}
             </Form.Item>
             </Col>
             <Col span={12}>              
              <Form.Item label="转账金额" {...formItemLayouts} className={styles.inputItem}>
               {getFieldDecorator('warnEvent555', {
                 rules: [
                   {
                     whitespace: true,
                     message: '不能输入空格',
                   }
                 ],
               })(
               <Input></Input>
               )}
             </Form.Item>
             </Col>
             <Col span={12} offset={0}>
              
                     
              <Form.Item label="客户性别" {...formItemLayouts} className={styles.inputItem}>
               {getFieldDecorator('warnEvent555', {
                 rules: [
                   {
                     whitespace: true,
                     message: '不能输入空格',
                   }
                 ],
               })(
               <Input></Input>
               )}
             </Form.Item>
             </Col>
             <Col span={12}>              
              <Form.Item label="转账金额" {...formItemLayouts} className={styles.inputItem}>
               {getFieldDecorator('warnEvent555', {
                 rules: [
                   {
                     whitespace: true,
                     message: '不能输入空格',
                   }
                 ],
               })(
               <Input></Input>
               )}
             </Form.Item>
             </Col>
             <Col span={12} offset={0}>
              
                     
              <Form.Item label="客户性别" {...formItemLayouts} className={styles.inputItem}>
               {getFieldDecorator('warnEvent555', {
                 rules: [
                   {
                     whitespace: true,
                     message: '不能输入空格',
                   }
                 ],
               })(
               <Input></Input>
               )}
             </Form.Item>
             </Col>
             <Col span={12}>              
              <Form.Item label="转账金额" {...formItemLayouts} className={styles.inputItem}>
               {getFieldDecorator('warnEvent555', {
                 rules: [
                   {
                     whitespace: true,
                     message: '不能输入空格',
                   }
                 ],
               })(
               <Input></Input>
               )}
             </Form.Item>
             </Col>

             
           </Col>
           <Col span={12}>
             {this.state.Action1!==1?<div>
              <Col span={18}>规则执行：</Col>
               <Col span={2}>
                 <Button
                    style={{ background: '#FDAD4E', color: '#ffffff', border: 0,marginLeft:"30px"}}
                   
                    onClick={() => {
                      this.Testschancel();
                    }}
                  >
                    取消
                  </Button>
                </Col>
             </div>:
             <div>
             <Col span={18}>规则执行：</Col>
              <Col span={2}>
                <Button
                   style={{ background: '#FDAD4E', color: '#ffffff', border: 0,marginLeft:"30px"}}
                  
                   onClick={() => {
                     this.Testschancel();
                   }}
                 >
                   取消
                 </Button>
               </Col>
              <Col span={24} offset={0}>
                 测试完成
              </Col>
            </div>
              
             }
            
               
           </Col>
          </div>
        }
             
            </Row>
                      
                  </GGEditor>
                  </TabPane>
                  <TabPane tab={
                    <span>
                      <Icon type="file-search" />
                     规则2
                  </span>
                  } key="2">
                    Content of Tab 2
                </TabPane>
                  <TabPane tab={
                    <span>
                      <Icon type="file-search" />
                     规则3
                  </span>
                  } key="3">
                    Content of Tab 3
                </TabPane>
                </Tabs>
          
              </div>
              <div className={styles.RuleRight}>
                <div>
                  <h3 style={{ borderBottom: "1px solid #d9d9d9", padding: "10px" }}>编辑属性</h3>
                  <Editproperties />
                </div>
                <div>
                  <h3 style={{ borderBottom: "1px solid #d9d9d9", padding: "10px" }}>编辑条件</h3>
                  <EditingConditions></EditingConditions>
                </div>
                <div>
                  <h3 style={{ borderBottom: "1px solid #d9d9d9", padding: "10px" }}>编辑动作</h3>
                
                  <EditActions></EditActions>
                </div>
              </div>
              <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmits}
                    onCancel={(e, info) => {
                      // this.userForm.props.form.resetFields();
                      this.setState({
                        isVisible: false

                      })
                    }}
                    width={900}
                  >
                    <RuleLists wrappedComponentRef={(inst) => { this.userForm = inst; }} /> 

                  </Modal>
            </div>
             
          </Card>
        </div>

      </div>

    )
  }
}
export default withPropsAPI(RuleEdit)
