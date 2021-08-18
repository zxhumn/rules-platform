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
  { value:"1",label:"输入值",id:1},
  { value:"2",label:"选择变量",id:2},
  { value:"3",label:"选择常量",id:3},
  { value:"4",label:"选择参数",id:4},
  { value:"5",label:"选择方法",id:5},
  { value:"6",label:"选择函数",id:6},
  { value:"7",label:"选择常用字符",id:7},

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
 class EditAction extends Component {
     constructor(props) {
        super(props);
        this.state = {
          Convalue:"",
          value: undefined,
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
          // console.log(this.state.Convalue)
        return (
            <div>
           <Row gutter={24}>
              <Form>
                <Col span={6}>
                <Form.Item  {...formAllItemLayout} className={styles.inputItem}>
                    {getFieldDecorator('warnEvent444', {
                      rules: [
                        {
                          whitespace: true,
                          message: '不能输入空格',
                        }
                      ],
                    })(
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            allowClear
                            treeDefaultExpandAll
                            onChange={this.onChange}
                            style={{marginLeft:"30px"}}
                            placeholder="请选择动作类型"
                            treeData={treeData}
                        >
                        </TreeSelect>
                     
                    )}
                  </Form.Item>
                </Col>
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
                        <Input  style={{marginLeft:"30px"}}/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={2}>
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
export default EditAction
