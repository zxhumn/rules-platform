import React, { PureComponent } from 'react';
import { Card, Table, Button, Row, Col,Form,Input,message,Tooltip, 
    Modal,} from 'antd';
import { connect } from 'dva';
import {  PACKS_LIST,PACKS_DELETE_LIST } from '../../../actions/rule';
import PackModal from './packModal'
import RestModal from './restModal'
import RecentModal from './recentModal'
import moment from 'moment';
// import {param2Obj,deleteUser} from './packs'

import Test from './test'

import style from './index.less';

import { knowledgePackage,  } from "../../../services/rule"

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
export default class packs extends PureComponent {
    constructor() {
        super();
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            packData: [],
            columns: [],
            visible:false,
            modalButton:0,//0-新增  1-修改
            openRest:false,
            restVisible:false,
            getFormObj:{
                idValue:'',
                packNameValue:'',
            },
            value:'',
            editRow:'',
            recentVisible:false,
            listData:[],
            restDetailValue:'',
            table: {
                current: 1,
                pageSize: 10,
                pageTotal: 0,
                pages: 1
              },
            

        };
        
        this.onReset = this.onReset.bind(this)
        this.showModal = this.showModal.bind(this)
        this.restshowModal = this.restshowModal.bind(this)
        this.deleteTableRow = this.deleteTableRow.bind(this)
        this.childClickFunc = this.childClickFunc.bind(this)
        this.restchildClickFunc = this.restchildClickFunc.bind(this)
        this.showRecentModal=this.showRecentModal.bind(this)
        this.recentchildClickFunc=this.recentchildClickFunc.bind(this)
        
    this.onTableChange = this.onTableChange.bind(this)
    }
componentWillMount(){
    const { dispatch } = this.props;
    dispatch(PACKS_LIST({})) 

}
    componentDidMount() {
        this.getTableColumn(this.state.table.current,this.state.table.pageSize)
    }
    //查询列表
  async getList() {

    const data = await knowledgePackage();
    if (data) {
      this.setState({
        listData: data
      },()=>{
          console.log('table',listData)
        this.getTable()
      })



    }
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
                // 筛选值不为空的属性
                Object.keys(formData).forEach(item => {
                    if (!formData[item]) delete formData[item];
                    return formData;
                });
                // console.log('提交',formData)
                dispatch(PACKS_LIST(formData));
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
  
    onSelectChange = selectedRowKeys => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    onReset = () => {
        const {
            form: { resetFields },
        } = this.props;
        resetFields();
        success('重置成功');

        // this.getPersonnelMonitorList({})
    };
    showModal = (value,id) => {
        // console.log('showModal',value,id)
        this.setState({
          visible: true,
          modalButton:value,
        });
        if(value==1){
            this.setState({                
                editRow:id
            })
        }
      };
      deleteTableRow(id){
          
        const { dispatch } = this.props;
        Modal.confirm({
            title: '删除确认',
            content: '确定删除该条记录?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {             
        dispatch(PACKS_DELETE_LIST(id));
       setTimeout(()=>{
        dispatch(PACKS_LIST({})) 
       },1000)
            },
            onCancel() {},
          })
      }
      restshowModal = (value) => {
        // console.log('打开rest',value)
        this.setState({
            restVisible: true,
            restDetailValue:value
          });
      };
      childClickFunc(value){
        const { dispatch } = this.props;    
        // console.log('子传父--1',value)
        this.setState({
            visible: value.visible
                  },()=>{                      
        dispatch(PACKS_LIST({})) 

                  });
        // if(value.obj&&value.obj.addData){
        //     let data= this.state.packData
            
        //     let obj1=value.obj.addData
        //     let obj2=value.obj.addData.subdivision 
        //     let str=''
        //     let ver=obj1.idCode
        //     let dataL=data.length
            
        //     let dataObj={
        //       id:'id'+dataL,
        //       createDate:moment().format("YYYY-MM-DD"),
        //       state: '停用',
        //       version: ver  + '(v1.0)',
  
        //   }
            // console.log('子传父',data,obj1,obj2)
        //     for (let i = 0; i < obj2.length; i++) {
        //      if(i < obj2.length-1){
        //       str+=obj2[i]+'、'
        //      }else{
        //       str+=obj2[i]
        //      }
                
        //     }
        //     obj1.subdivision=str
        //     Object.assign(dataObj, obj1);
        //     let packD=this.state.packData
        //     if(this.setState.modalButton==0){
        //         data.push(dataObj)

        //     }else{
                
        //         packD.map((item,index)=>{
        //             if(item.key==packD.key){
        //                 packD[index]=dataObj
        //             }
        //         })
        //         data=packD

        //     }
        //     this.setState({
        //       visible: value.obj.visible,
        //       packData: data
        //     });
        //   }else{
        //     this.setState({
        //         visible: value
        //       });
        //   }

      }
      
      restchildClickFunc(value){
        // console.log('子传父',value)
        this.setState({
            restVisible: value,
        },()=>{
            const { dispatch } = this.props;
            dispatch(PACKS_LIST({})) 

        });

    }
    showRecentModal(){
        this.setState({
            recentVisible:true
        })
    }
    recentchildClickFunc(value){
        // console.log('子传父',value)
        this.setState({
            recentVisible:value
        })

    }
    getTableColumn(current,size) {
        const columns = [
            {
                title: '序号',
                width: 100,
                dataIndex: 'packNum',
                align: 'center',
                render: (text, record, index) => {
                    //生成序号
                    return (
                        <span>{(current-1)*size+index+1}</span>
                    )
                },
               
            },
            {
                title: 'ID编码',
                dataIndex: 'id',
                align: 'center',
            },
            {
                title: '知识包名称',
                dataIndex: 'name',
                align: 'center',
            },


            {
                title: '创建日期',
                // dataIndex: 'createDate',
                align: 'center',
                render: (text, record, index) => {
                    let str =moment(Number(text.createDate*1000)).format('YYYY-MM-DD HH:mm:ss')
                    console.log('hah',str,moment(text.createDate).format('YYYY-MM-DD HH:mm:ss'))
                    //生成序号
                    return (
                        <Tooltip placement="left" >
                            {str}
                      </Tooltip>
                    )
                },
            },

            {
                title: '状态',
                dataIndex: 'enable',
                align: 'center',
                render: (text, record, index) => {
                    //生成序号
                    return (
                        record.enable?'启用':'停用'
                    )
                },
            },

            {
                title: '备注',
                // dataIndex: 'comment',
                align: 'center',
                onCell: () => {
                    return {
                      style: {
                        maxWidth: 100,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow:'ellipsis',
                        cursor:'pointer'
                      }
                    }
                  },
                render: (text, record, index) => {
                    //生成序号
                    return (
                        <Tooltip placement="left"  title={text.comment}>
                        {text.comment}
                      </Tooltip>
                    )
                },
            },

            {
                title: '操作',
                dataIndex: 'actions',
                align: 'center',
                render: (text, record, index) => (
                    // console.log('编辑',record, index,list,list[index])
                    <p >
                        <a  onClick={this.showModal.bind(this,'1',record.id)} style={{marginRight:'8px'}}>编辑</a>
                        <a  onClick={this.deleteTableRow.bind(this,record.id)} style={{marginRight:'8px'}}>删除</a> 
                        <a onClick={this.restshowModal.bind(this,record)} style={{marginRight:'8px'}}>Rest服务调用配置</a>
                    </p>
                ),
            }
        ];
        this.setState({
            columns
        })

    }
    //搜索
    onFinish = values => {
        // console.log('onFinish',values);
      };
       //搜索
       onwarrantNumberChange = values => {
        // console.log('onwarrantNumberChange',values);
      };
       //搜索
    onBlur = values => {
        // console.log('onBlur',values);
      };
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
      Object.assign(formData,obj)
      dispatch(PACKS_LIST(formData)) 
      this.getTableColumn(current,pageSize)
      }
    );
  }
    render() {
        const { loading, selectedRowKeys, columns, packData,getFormObj,value,recentVisible } = this.state;
        const {
            form: { getFieldDecorator },
            rule: {list}
          } = this.props;
       
       
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const layout1 = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const modalObj={
            getVisible:this.state.visible,
            modalButton:this.state.modalButton,
            editRow:this.state.editRow
        }
        let arr = [23,40,50]
	let res = arr.find((val,index,arr)=>{
		return val >30
    })
    
   
   
  console.log('render',list,list.pageProperty) 
  let table={
    current:list.pageProperty&&list.pageProperty.pageIdx,
    // pageSize:list.pageProperty&&list.pageProperty.pageSize,
    pageSize:10,
    pageTotal:list.totalCount,
    pages:list.pageProperty&&list.pageProperty.pageIdx
}
        const restObj={
            getVisible:this.state.restVisible,
            restDetailValue:this.state.restDetailValue
        }
        return (
            <div >
                {/* <Test /> */}
                <Card>
                    <h2>知识包管理</h2>
                    <Row gutter={24}>
                        <Form 
                            name="basic"
                            >
                            <Col span={4}>
                                <Form.Item {...layout1}
                                    label="ID编码"
                                    name="code"
                                >
                                    {getFieldDecorator('code', {
                                            rules: [
                                                {
                                                    whitespace: true,
                                                    message: '不能输入空格',
                                                }
                                            ],
                                        })(<Input allowClear placeholder="请输入ID编码" />)}
                                </Form.Item>
                            </Col>
                            <Col span={6} offset={1}>
                                <Form.Item {...layout1}
                                    label="知识包名称"
                                    name="name"
                                >
                                      {getFieldDecorator('name', {
                                            rules: [
                                                {
                                                    whitespace: true,
                                                    message: '不能输入空格',
                                                }
                                            ],
                                        })(<Input allowClear placeholder="请输入知识包名称" />)}
                                </Form.Item>
                            </Col>
                            <Col span={6} offset={2}>
                                <Form.Item>
                                    <Button
                                    type="primary" htmlType="submit"
                                        style={{ background: '#3377FF', color: '#ffffff', marginRight: '50px' }}
                                        onClick={() => {
                                            this.handleSubmit();
                                        }}
                                    >
                                        查询
                  </Button>
                                    <Button
                                        style={{ background: '#ffffff', color: '#7f7f7f' }}
                                        onClick={() => {
                                            this.onReset();
                                        }}
                                    >
                                        重置
                  </Button>

                                </Form.Item>
                            </Col>
                        </Form>
                    </Row>
                </Card>
                <Card>
                    <Row gutter={24}>
                    <Col className="gutter-row" span={2} >
                            <Button onClick={this.showRecentModal}>查看操作记录</Button>
                        </Col>
                        <Col className="gutter-row" offset={20} span={2}>
                            <Button type="primary" onClick={this.showModal.bind(this,'0')}>新增</Button>
                        </Col>
                    </Row>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={list.data} style={{marginTop:'15px'}}
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
                    />


                </Card>
                {modalObj.getVisible&& <PackModal modalVisible={modalObj} childClick={this.childClickFunc}/>}
                
                {restObj.getVisible&&  <RestModal restmodalVisible={restObj} childClick={this.restchildClickFunc}/>}
                {recentVisible&&<RecentModal recentmodalVisible={recentVisible} childClick={this.recentchildClickFunc}/>}
            </div>
        );
    }
}