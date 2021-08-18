import React, { Component } from 'react'
import {  Col,
    Row,
    Select,
    Card,
    Form,
    Input,
    Icon,
    DatePicker,
    TreeSelect
}from "antd"
import styles from "../../../layouts/Sword.less"
const { TreeNode } = TreeSelect;
const {RangePicker } = DatePicker;
let {Option}=Select;
const channellist=[
  { value:"2",label:"选择变量",id:2},
  { value:"3",label:"选择参数",id:3},
  { value:"4",label:"选择方法",id:4},
  { value:"5",label:"选择函数",id:5},
  { value:"6",label:"集合",id:6},

]
const channellist2=[
    { value:"1",label:"输入值",id:1},
    { value:"2",label:"选择变量",id:2},
    { value:"3",label:"选择变量",id:3},
    { value:"4",label:"选择参数",id:4},
    { value:"5",label:"选择方法",id:5},
    { value:"6",label:"选择函数",id:6},

  
  ]
const datalist=[
  { value:"2",label:"激活当前互斥组规则",id:2},
  { value:"3",label:"激活执行组",id:3},
  { value:"4",label:"激活执行组并执行",id:4},
  { value:"5",label:"求正弦",id:5},
]
const compare=[
  { value:"1",label:"大于",id:1},
  { value:"2",label:"大于或等于",id:2},
  { value:"3",label:"小于",id:3},
  { value:"4",label:"小于或等于",id:4},
  { value:"5",label:"等于",id:6},
  { value:"6",label:"等于(不区分大小写)",id:7},
  { value:"7",label:"开始于",id:8},
  { value:"8",label:"不开始于",id:9},
  { value:"9",label:"结束于",id:10},
  { value:"10",label:"不结束于",id:11},
  { value:"11",label:"不等于",id:12},
]
const treeData = [{

  label: '打印内容到控制台',
  value: '0-0',
  key: '0-0'
  },
  {
    label: '赋值',
    value: '0-1',
    key: '0-1',
    
  children: [{
    label: 'List是否为空',
    value: '0-1-1',
    key: '0-1-1',
}, {
    label: '从List中删除对象',
    value: '0-1-2',
    key: '0-1-2',
}],
  },
  {
  
  label: 'Map结合',
  value: '0-3',
  key: '0-3',
 
  }];
 @Form.create()
 class EditingConditions extends Component {
     constructor(props) {
        super(props);
        this.state = {
          Convalue:2,
          value: undefined,
          Convalues:2
        }
      }
      // changeEvent(e){
      //   console.log(e)
      // }
      CuisineSource(item){
         this.setState({
          Convalue:item.key
        },()=>{
         console.log(this.state.Convalue) 
        })
      }
      CuisineSources(item){
        this.setState({
         Convalues:item.key
       },()=>{
        console.log(this.state.Convalues) 
       })
     }
      Addproper(){

      }
      Delproper(){
        
      }
      onChange = value => {
        console.log(value);
        this.setState({ value });
      };
    render() {
        const formItemLayout = {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 15,
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
          const {
            form: { getFieldDecorator },
          } = this.props;

        return (
            <div>
           <Row gutter={24}>
              <Form>
                <Col span={6}>
                <Form.Item  {...formAllItemLayout} className={styles.inputItem}>
                    {getFieldDecorator('warnEvent', {
                      rules: [
                        {
                          whitespace: true,
                          message: '不能输入空格',
                        }
                      ],
                    })(
                        <Select
                        placeholder="请选择类型"
                        // onChange={(e) => this.changeEvent(e)}
                        style={{marginLeft:"30px"}}


                      >
                          {channellist&&channellist.map(item => (
                              <Option key={item.id}  onClick={(item,e) => this.CuisineSource(item)}>{item.label}</Option>
                          ))}
                         
                       </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item  {...formAllItemLayout} className={styles.inputItem}>
                    {getFieldDecorator('warnEvent1', {
                      rules: [
                        {
                          whitespace: true,
                          message: '不能输入空格',
                        }
                      ],
                    })(
                        <div>
                          {this.state.Convalue==2?
                           <Select placeholder="客户等级" style={{marginLeft:"30px"}}>
                            <Select.Option key={0} value={0}  >
                              客户等级
                            </Select.Option>
                            <Select.Option key={1} value={1}>
                              客户年龄
                            </Select.Option>
                        </Select>:""}
                          {this.state.Convalue==3?
                            <Select placeholder="参数1"  style={{marginLeft:"30px"}}  >
                            <Select.Option key={0} value={0}>
                              参数1
                            </Select.Option>
                            <Select.Option key={1} value={1}>
                              参数2
                            </Select.Option>
                           </Select>:""
                          }
                          {this.state.Convalue==4? 
                            <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            allowClear
                            treeDefaultExpandAll
                            onChange={this.onChange}
                            style={{marginLeft:"30px"}}
                       
                            treeData={treeData}
                            >
                            </TreeSelect>:""
                           }
                          {this.state.Convalue==5? 
                          <Select
                          placeholder="请选择类型"
                          // onChange={(e) => this.changeEvent(e)}
                          style={{marginLeft:"30px"}}
                          >
                            {datalist&&datalist.map(item => (
                                <Option key={item.id}  onClick={(item,e) => this.CuisineSource(item)}>{item.label}</Option>
                            ))}
                           
                         </Select>:""}
                      </div>   
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item  {...formAllItemLayout} className={styles.inputItem}>
                    {getFieldDecorator('warnEvent666', {
                      rules: [
                        {
                          whitespace: true,
                          message: '不能输入空格',
                        }
                      ],
                    })(
                        <Select
                        placeholder="请选择类型"
                        // onChange={(e) => this.changeEvent(e)}
                        style={{marginLeft:"30px"}}


                      >
                          {compare&&compare.map(item => (
                             <Option key={item.id} >{item.label}</Option>
                          ))}
                         
                       </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6} offset={2}>
              
                     
                   <Form.Item  {...formAllItemLayout} className={styles.inputItem}>
                    {getFieldDecorator('warnEvent555', {
                      rules: [
                        {
                          whitespace: true,
                          message: '不能输入空格',
                        }
                      ],
                    })(
                        <Select
                        placeholder="请选择类型"
                        // onChange={(e) => this.changeEvent(e)}
                        style={{marginLeft:"30px"}}


                      >
                          {channellist&&channellist.map(item => (
                              <Option key={item.id}  onClick={(item,e) => this.CuisineSources(item)}>{item.label}</Option>
                          ))}
                         
                       </Select>
                    )}
                  </Form.Item>
     
                </Col>
                <Col span={6}>
                    
                  <Form.Item  {...formAllItemLayout} className={styles.inputItem}>
                    {getFieldDecorator('warnEvent555', {
                      rules: [
                        {
                          whitespace: true,
                          message: '不能输入空格',
                        }
                      ],
                    })(
                        <div>
                            {this.state.Convalues==1?
                             <Input/>:""}
                        {this.state.Convalues==2?
                         <Select placeholder="客户等级" style={{marginLeft:"30px"}}>
                          <Select.Option key={0} value={0}  >
                            客户等级
                          </Select.Option>
                          <Select.Option key={1} value={1}>
                            客户年龄
                          </Select.Option>
                      </Select>:""}
                        {this.state.Convalues==3?
                          <Select placeholder="参数1"  style={{marginLeft:"30px"}}  >
                          <Select.Option key={0} value={0}>
                            参数1
                          </Select.Option>
                          <Select.Option key={1} value={1}>
                            参数2
                          </Select.Option>
                         </Select>:""
                        }
                        {this.state.Convalues==4?
                         <Select placeholder="性别" style={{marginLeft:"30px"}}>
                          <Select.Option key={0} value={0}  >
                            性别
                          </Select.Option>
                          <Select.Option key={1} value={1}>
                            业务类型
                          </Select.Option>
                      </Select>:""}
                    
                        {this.state.Convalues==5? 
                          <TreeSelect
                          showSearch
                          style={{ width: '100%' }}
                          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                          allowClear
                          treeDefaultExpandAll
                          onChange={this.onChange}
                          style={{marginLeft:"30px"}}
                     
                          treeData={treeData}
                          >
                          </TreeSelect>:""
                         }
                        {this.state.Convalues==6? 
                        <Select
                        placeholder="请选择类型"
                        // onChange={(e) => this.changeEvent(e)}
                        style={{marginLeft:"30px"}}
                        >
                          {datalist&&datalist.map(item => (
                              <Option key={item.id}  onClick={(item,e) => this.CuisineSource(item)}>{item.label}</Option>
                          ))}      
                       </Select>:""}
                    </div>   
                    )}
                  </Form.Item>
                  
                </Col>
                <Col span={6}>
                  <div style={{display:"flex",marginLeft:"30px"}}>
                    <Icon type="plus"  style={{fontSize:"30px"}} onClick={()=>{this.Addproper()}}/>
                    <Icon type="close"  style={{fontSize:"30px"}} onClick={()=>{this.Delproper()}}/>
                  </div>
                 
                </Col>
                   
                </Form>
              </Row>   
                 
            </div>
        )
    }
}
export default EditingConditions
