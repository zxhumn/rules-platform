import React, { Component } from 'react'
import {  Col,
    Row,
    Select,
    Card,
    Form,
    Input,
    Icon,
    DatePicker
}from "antd"
import styles from "../../../layouts/Sword.less"
import {RuleAttrs} from "../../src/services/addRule"

const {RangePicker } = DatePicker;
let {Option}=Select;
// const channellist=[
//   { value:"1",label:"优先级",id:1},
//   { value:"2",label:"生效日期",id:2},
//   { value:"3",label:"失效日期",id:3},
//   { value:"4",label:"允许调试信息输出",id:4},
//   { value:"5",label:"互斥组",id:5},
//   { value:"6",label:"执行组",id:6},
//   { value:"7",label:"允许循环触发",id:7},

// ]
// console.log(RuleAttrs)
@Form.create()
 class Editpropertie extends Component {
     constructor(props) {
        super(props);
        this.state = {
          Convalue:1
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
      Addproper(){

      }
      Delproper(){
        
      }
      componentDidMount(){
        this.getAttras()
      }
      getAttras(){
        RuleAttrs().then(res=>{
         console.log(res)
        })
      }
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
          // console.log(this.state.Convalue)
        return (
            <div>
           <Row gutter={24}>
              <Form>
                <Col span={8}>
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
                        placeholder="更多操作"
                        // onChange={(e) => this.changeEvent(e)}
                        style={{marginLeft:"30px"}}
      
                      >
                          {/* {channellist&&channellist.map(item => (
                              <Option key={item.id}  onClick={(item,e) => this.CuisineSource(item)}>{item.label}</Option>
                          ))} */}
                         
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                 <Col span={2}style={{margin:"10px"}}>=</Col>
                <Col span={8}>
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
                          {this.state.Convalue==1?<Input/>:""}
                          {this.state.Convalue==2?<RangePicker/>:""}
                          {this.state.Convalue==3?<RangePicker/>:""}
                          {this.state.Convalue==4? 
                          <Select placeholder="是">
                            <Select.Option key={0} value={0}>
                              是
                            </Select.Option>
                            <Select.Option key={1} value={1}>
                              否
                            </Select.Option>
                        </Select>:""}
                          {this.state.Convalue==5?<Input/>:""}
                          {this.state.Convalue==6?<Input/>:""}
                          {this.state.Convalue==7? 
                          <Select placeholder="是">
                            <Select.Option key={0} value={0}>
                              是
                            </Select.Option>
                            <Select.Option key={1} value={1}>
                              否
                            </Select.Option>
                        </Select>:""}
                      </div>   
                    )}
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <div style={{display:"flex"}}>
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
export default Editpropertie;
