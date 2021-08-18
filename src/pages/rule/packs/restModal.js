import React, { PureComponent} from 'react';
import { Modal, Card, Table, Button, Row, Col, Form, Input, Select, Radio, Checkbox ,Transfer, Switch, Tree,message } from 'antd';
import { connect } from 'dva';
import style from './index.less';
// import CodeMirronr  from './codeMirronr'
import CodeMirronrModal from './codeMirronr'
import CodeMirronrOnlyCheckModal from './codeMirronrOnlyCheck'

import {  PACKS_LIST,PACKS_REST_LIST } from '../../../actions/rule';

import { packsRest,knowledgePackage,putKnowledgePackage  } from "../../../services/rule"
const { TreeNode } = Tree;
let childNum=[]
let checkedArr=[]
@connect(({ rule }) => ({
  rule
}))
@Form.create()

export default class restModal extends PureComponent {
  constructor() {
    super();
    this.state = {
      visible: false,
      rowSelection: [],
      rowSelection1: [],
      selectedRowKeys: [], // Check here to configure the default column
      packColumns: [],
      packData: [],
      packData1: [],
      testVisible: false,
      checkVisible: false,
      outputCode: {},
      showModalButton: false,//点击保存后显示另两个按钮
      expandedKeys: ["/"], //加了1表示输出,否则为输入
      autoExpandParent: true,
      selectedKeys: [],
      checkedKeys:[],
      expandedKeys1: ["/"],
      autoExpandParent1: true,
      selectedKeys1: [],
      
      checkedKeys1:[],
      checkedTotal:0,
      checkedTotal1:0,
      checkedArr1:[],
      inputCheckedTree:[],
      outputCheckedTree:[],
      detailById:{},
      treeDataTest: [],
    inputData:[],//测试输入输出数据
    resultData:{},//查看配置


    };
    this.checkRest = this.checkRest.bind(this)
    this.showRestTest = this.showRestTest.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onExpend = this.onExpend.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.childClickFn = this.childClickFn.bind(this)
    this.childClickCheckFn = this.childClickCheckFn.bind(this)
    
  }

  componentDidMount() {    
    
    const { dispatch,
      restmodalVisible:{getVisible,restDetailValue},
     } = this.props;
                      
    //  dispatch(PACKS_REST_LIST(restDetailValue.id)) 
     let id =restDetailValue.id
     this.getList(id)
  }
  
  async getDetailById(params){
    const response = await knowledgePackage(params);   
    if(response&&response.success){
    let obj=response.data&&response.data.data[0]
    this.setState({
      inputCheckedTree:obj.input,
      outputCheckedTree:obj.output,
      detailById:obj
     },()=>{
      const {treeDataTest,inputCheckedTree,outputCheckedTree} = this.state
    let defaultInput =[]
    if(inputCheckedTree&&inputCheckedTree.length>0){      
    defaultInput=inputCheckedTree.map((item) => { return item.name })
    }
    let defaultOutput = []
    if(outputCheckedTree&&outputCheckedTree.length>0){      
      defaultOutput=outputCheckedTree.map((item) => { return item.name })
      }
    let inputCheck=[]
    let outputCheck=[]
    treeDataTest.forEach((item,index)=>{
      defaultInput.length>0&&
      defaultInput.forEach((inputItem)=>{
        if(inputItem&&item.name==inputItem){
          inputCheck.push(inputItem)
        }
      })
      defaultOutput.length>0&&
      defaultOutput.forEach((outputItem)=>{
        
        if(outputItem&&item.name==outputItem){
          outputCheck.push(outputItem)
        }
      })
    })
    let buttonShow=false
    if(inputCheck&&outputCheck&&inputCheck.length>0&&outputCheck.length>0){
      buttonShow=true
      const {detailById}= this.state
      let input = detailById.input  
      let inputObj = {}
      input.forEach((item)=>{
       inputObj[item.name]=""
      })
      let output = detailById.output
      let outputObj = {}
      output.forEach((item)=>{
        outputObj[item.name]=""
      })
      let result ={
        input:inputCheckedTree,
        output:outputCheckedTree,
      }
      this.setState({
        inputData:input ,
        resultData:result 
      });
  
      // console.log('componentDidMount--查看rest',result,inputCheckedTree)
    }
    
    // console.log('inputCheckedTree',inputCheck,outputCheck)
      this.setState({
        checkedKeys:inputCheck,
        checkedKeys1:outputCheck,
        checkedTotal:inputCheck.length,
        checkedTotal1:outputCheck.length,
        showModalButton:buttonShow
      })
      // console.log('获取某个知识包下的所有变量',defaultInput,defaultOutput,inputCheck,outputCheck)
     })
    }else{
      message.error('获取失败');
    }
  }
   //获取某个知识包下的所有变量
   async getList(params) {
    const response = await packsRest(params);
    if(response&&response.success){
      let data = response.data
    let arr1 = data&&data['if']?data['if']:[]
    let arr2 = data&&data['then-else']?data['then-else']:[]
    let arr=arr1.concat(arr2)
    let arrAll=this.objUnique(arr,'name')
    this.setState({
      treeDataTest:arrAll
    },()=>{      
    // let arr=this.getChild(this.state.treeDataTest)    
    this.getDetailById({code:params})
    })
  }else{
    message.error('获取失败');
  }
    
    // console.log('packsRest', data,arr2,arr1,arrAll);
  }
   //修改提交
   async getPutKnowledgePackage(id,params){
    const response = await putKnowledgePackage(id,params);   
    if(response&&response.success){
    message.success('保存成功')
    this.getDetailById({code:id})
    // console.log('修改提交',response)
    // this.setState({
    //     rulesNameList:arr
    // })
    }else{
      message.error('保存失败');
    }
  }
  
  onCheck = checkedKeys => {
    // console.log('onCheck', childNum);
    
    let difArr=this.getTheSame(checkedKeys,childNum)
    let num = checkedKeys.length-difArr.length
    // let num = checkedKeys.length-childNum.length
    // console.log('onCheck--1', selectedKeys, childNum,difArr,num)
    this.setState({
      checkedTotal:num,
    })
    this.setState({ checkedKeys });
  };
  
  onCheck1 = checkedKeys1 => {
    // console.log('onCheck1', checkedKeys1);
    let num = checkedKeys1.length
    // let num = checkedKeys.length-childNum.length
    // console.log('onCheck--1', selectedKeys, childNum,difArr,num)
    this.setState({
      checkedTotal1:num,
    })
    this.setState({ checkedKeys1 });
  };
  onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  onSelectChange1 = selectedRowKeys1 => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys1 });
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    const {checkedKeys,checkedKeys1,detailById,treeDataTest}= this.state
    // console.log('点击保存',checkedKeys)    
    
    if(!checkedKeys||checkedKeys.length==0){
      message.warning('请选择输入数据！')
      return
    }
    if(!checkedKeys1||checkedKeys1.length==0){
      message.warning('请选择输出数据！')
      return
    }
    let result1=[]
    let result2=[]
    treeDataTest.forEach(item=>{
    checkedKeys.forEach(item1=>{
      if(item.name == item1){
        result1.push(item)
      }
     })
     checkedKeys1.forEach(item1=>{
    if(item.name == item1){
      result2.push(item)
    }
   })
  });
    let data ={}
    // console.log('保存更新',detailById,result1,result2)
      data.id=detailById.id;
      data.comment=detailById.comment;
      data.name=detailById.name;
      data.items=detailById.items;
      data.input=result1;
      data.output=result2;
    
    // console.log('保存更新--1',data)
        this.getPutKnowledgePackage(data.id,data)
    this.setState({
      showModalButton: true

    }, () => {
      // this.props.childClick(this.state.visible)
    });
  };
  childClickFn(value){
   this.setState({
    testVisible:value.testVisible
   })
  }
  childClickCheckFn(value){
    this.setState({
     checkVisible:value.checkVisible
    })
   }
  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
      showModalButton: false,      
      expandedKeys: ["/"],
      autoExpandParent: true,
      expandedKeys1: ["/"],
      autoExpandParent1: true,
      selectedKeys: []
    }, () => {
      this.props.childClick(this.state.visible)
    });
  };

  //查看rest
  showRestTest() {
   
    const {detailById }= this.state
    let input = detailById.input
    let inputObj = {}
    input.forEach((item)=>{
     inputObj[item.name]=""
    })
    let output = detailById.output
    let outputObj = {}
    output.forEach((item)=>{
      outputObj[item.name]=""
    })
    let result ={
      input:input,
      output:output,
    }
    this.setState({
      testVisible: true,
      inputData:inputObj,      
      resultData:result
    });

    // console.log('查看rest',result)
  }
//查看描述
  checkRest() {

    this.setState({
      checkVisible: true,
    });

  }

  handleCheckCancel = e => {
    this.setState({
      checkVisible: false,
    });
  };
  preventBubble(e) {
    e.preventDefault();
    // console.log('回车查询', e)
  }
  //输入输出树形图
  //展开的回调
  onExpend = (expandedKey, obj) => {
    // console.log('展开的回调', expandedKey, obj)
    let { expandedKeys } = this.state
    //展开的状态
    if (obj.expanded) {
      this.setState({
        expandedKeys: expandedKey,
        // selectedKeys: []
      })
    } else {
      //expandedKey 返回的是当前已经展开的元素 expandedKeys 是上次展开的元素
      //比较两个数组中缺少的元素得出当前被收起的是哪个元素
      let removeArray = this.diffArray(expandedKey, expandedKeys)
      //收起的时候需要把里面展开的元素一并移除，不然会造成收起动作无效
      expandedKeys = expandedKeys.filter((ele) => {
        return !ele.includes(removeArray[0])
      })
      this.setState({
        expandedKeys: expandedKeys,
        // selectedKeys: []
      })
    }
  }
  //输出展开回调
   onExpend1 = (expandedKey, obj) => {
    // console.log('展开的回调', expandedKey, obj)
    let { expandedKeys1 } = this.state
    //展开的状态
    if (obj.expanded) {
      this.setState({
        expandedKeys1: expandedKey,
        selectedKeys1: []
      })
    } else {
      //expandedKey 返回的是当前已经展开的元素 expandedKeys1 是上次展开的元素
      //比较两个数组中缺少的元素得出当前被收起的是哪个元素
      let removeArray = this.diffArray(expandedKey, expandedKeys1)
      //收起的时候需要把里面展开的元素一并移除，不然会造成收起动作无效
      expandedKeys1 = expandedKeys1.filter((ele) => {
        return !ele.includes(removeArray[0])
      })
      this.setState({
        expandedKeys1: expandedKeys1,
        selectedKeys1: []
      })
    }
  }
  //选中的回调
  onSelect = (selectedKeys, obj) => {
    let { expandedKeys } = this.state
    let selectedKey = this.state.selectedKeys
    let difArr=this.getTheSame(selectedKeys,childNum)
    let num = selectedKeys.length-difArr.length
    // console.log('选中的回调', selectedKeys, childNum,difArr,num)
    this.setState({
      checkedTotal:num,
    })
    //选中的状态
    // if (obj.selected) {
    //   //判断是否已经展开，未展开就添加到 expandedKeys 中
    //   //已经展开就不用管
    //   let index = expandedKeys.indexOf(selectedKeys[0])
    //   checkedArr=selectedKey
    // // console.log('选中的回调--1', selectedKeys, expandedKeys,index,checkedArr)
    //   if (index === -1) {
    //     expandedKeys.push(selectedKeys[0])
    //     this.setState({
    //       expandedKeys: expandedKeys,
    //       selectedKeys: selectedKeys
    //     })
    //   } else {
    //     this.setState({
    //       selectedKeys: selectedKeys
    //     })
    //   }

    //   // 没有 children 代表当前已没有下一级目录
    //   if (obj.event && obj.selectedNodes.length === 1 && !obj.selectedNodes[0].props.children) {
    //     //do something
    //   }
    // } else {
    //   //selectedKey 是上次选中的元素 在 expandedKeys 肯定是存在的 
    //   //找到下标后需要过滤掉子类目录 例如上次选中的元素为 /a ,
    //   //子类 /a/a_1 已经展开就需要从 expandedKeys 中移除这个元素
     
    //   checkedArr=selectedKey
    //   let index = expandedKeys.indexOf(selectedKey[0])
      
    //   // console.log('选中的回调--2', selectedKeys, expandedKeys,index,checkedArr)
    //   if (index !== -1) {
    //     //过渡掉子类元素
    //     expandedKeys = expandedKeys.filter((ele) => {
    //       return !ele.includes(selectedKey[0])
    //     })
    //     this.setState({
    //       expandedKeys: expandedKeys,
    //       // selectedKeys: []
    //     })
    //   } else {
    //     this.setState({
    //       // selectedKeys: []
    //     })
    //   }
    // }
  }
   //输出选中的回调
   onSelect1 = (selectedKeys1, obj) => {
    let { expandedKeys1 } = this.state
    let selectedKey = this.state.selectedKeys1
    let difArr=this.getTheSame(selectedKeys1,childNum)
    let num = selectedKeys1.length-difArr.length
    this.setState({
      checkedTotal1:num
    })
    //选中的状态
    if (obj.selected) {
      //判断是否已经展开，未展开就添加到 expandedKeys1 中
      //已经展开就不用管
      let index = expandedKeys1.indexOf(selectedKeys1[0])
      
    // console.log('选中的回调--1', selectedKeys1, expandedKeys1)
      if (index === -1) {
        expandedKeys1.push(selectedKeys1[0])
        this.setState({
          expandedKeys1: expandedKeys1,
          selectedKeys1: selectedKeys
        })
      } else {
        this.setState({
          selectedKeys1: selectedKeys
        })
      }

      // 没有 children 代表当前已没有下一级目录
      if (obj.event && obj.selectedNodes.length === 1 && !obj.selectedNodes[0].props.children) {
        //do something
      }
    } else {
      // console.log('选中的回调--2', selectedKeys, expandedKeys1)
      //selectedKey 是上次选中的元素 在 expandedKeys1 肯定是存在的 
      //找到下标后需要过滤掉子类目录 例如上次选中的元素为 /a ,
      //子类 /a/a_1 已经展开就需要从 expandedKeys1 中移除这个元素
      let index = expandedKeys1.indexOf(selectedKey[0])
      if (index !== -1) {
        //过渡掉子类元素
        expandedKeys1 = expandedKeys1.filter((ele) => {
          return !ele.includes(selectedKey[0])
        })
        this.setState({
          expandedKeys1: expandedKeys1,
          selectedKeys: []
        })
      } else {
        this.setState({
          selectedKeys1: []
        })
      }
    }
  }
   //比较出2个数组中不一样的元素
   diffArray = (arr1, arr2) => {
    let arr3 = [];
    for (let i = 0; i < arr1.length; i++) {
        if (arr2.indexOf(arr1[i]) === -1)
            arr3.push(arr1[i]);
    }
    for (let j = 0; j < arr2.length; j++) {
        if (arr1.indexOf(arr2[j]) === -1)
            arr3.push(arr2[j]);
    }
    return arr3;
}
//取两个数组相同元素
getTheSame(arr1,arr2) {
  let result = new Array();
  let c = arr2.toString();
  for (let i = 0; i < arr1.length; i++) {
      if (c.indexOf(arr1[i].toString()) > -1) {
          for (let j = 0; j < arr2.length; j++) {
              if (arr1[i] == arr2[j]) {
                  result.push(arr1[i]);
                  break;
              }
          }
      }
  }
  return result;
}
//数组对象去重
objUnique(arr,key){
  let result = [];
      let obj = {};
      for(let i =0; i<arr.length; i++){
         if(!obj[arr[i][key]]){
            result.push(arr[i]);
            obj[arr[i][key]] = true;
         }
      }
      
      return  result
}

getChild=(arr)=>{
  let newArr = []
  let childNodeNum=[]
  if(!arr||arr.length==0){
    return
  }
  // console.log('子节点--1',arr,arr.length)
  for(let item = 0;item <arr.length;item++){
    // console.log('item',arr[item])
    if(!arr[item].key) return
      newArr.push(arr[item].key)
      if(arr[item].children&&arr[item].children.length>0){
        childNodeNum.push(arr[item].key)
          newArr.push(...this.getChild(arr[item].children))
      }
  }
  // console.log('子节点',newArr,childNum)
  childNum=childNodeNum
 
  return newArr
}
onChange=(e)=>{
  let data =this.state.treeDataTest
  let arr=[]
if(e.target.checked){
      arr = this.getChild(data)
      // console.log('全选--2',arr,childNum)
      let obj = {
        checked: true,
      }
  this.setState({
    selectedKeys:arr,
    checkedTotal:arr&&arr.length-childNum.length
  },()=>{
    
    this.onSelect(arr,obj)
  })
  
}else{
  this.setState({
    selectedKeys:[],
    checkedTotal:0
  })
}
}
renderTreeNodes = data =>
data.map(item => {
  if (item.children) {
    return (
      <TreeNode title={item.name} key={item.name} dataRef={item}>
        {this.renderTreeNodes(item.children)}
      </TreeNode>
    );
  }
  // console.log('renderTreeNodes',item)
  return <TreeNode title={item.name}  key={item.name}  />;
});
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
      restmodalVisible:{getVisible,restDetailValue},
      rule: { list }

    } = this.props;

    const { selectedRowKeys, packColumns, packData, packData1, outputCode, selectedRowKeys1,
      selectedKeys,expandedKeys,selectedKeys1,expandedKeys1,
      checkedKeys,checkedKeys1,inputCheckedTree,outputCheckedTree,treeDataTest,detailById,inputData
    } = this.state;
    
    let testData={
      testVisible:this.state.testVisible,
      id:detailById.id,
      inputData
    }
    let checkData = {
      resultData:this.state.resultData,
      checkVisible:this.state.checkVisible

    }
      //  console.log('render',checkData)
    return (
      <div>
        <Modal
          title="REST服务调用配置"
          width={800}
          visible={getVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        // destroyOnClose={false}
        >

          <Row gutter={24}>
            <Col span={11}>
              <p style={{ paddingLeft: '8px', borderLeft: '3px solid #000000', fontSize: '20px' }}>输入数据</p>
              {/* <span style={{marginLeft:'230px'}}>变量名称:</span> <Input placeholder="模糊查询" style={{width:120}} /> */}
              <span>请选择对应变量分类下的变量作为输入！</span>
             
             <div className={style.treeBorder}>
               <div className={style.treeHeader}>
               {/* <Checkbox onChange={this.onChange}>全选</Checkbox> */}
    <span>已选{this.state.checkedTotal}项</span>
               </div>
             <Tree
              checkable
                onExpand={this.onExpend}
                expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
                selectedKeys={this.state.selectedKeys}
                checkedKeys={this.state.checkedKeys}
                defaultExpandedKeys={this.state.expandedKeys}
                // treeData={inputTreeData}
                defaultSelectedKeys={this.state.selectedKeys}
                >
                   {this.renderTreeNodes(treeDataTest)}
              </Tree>
             </div>
            </Col>
            <Col span={11} offset={2}>
              <p style={{ paddingLeft: '8px', borderLeft: '3px solid #000000', fontSize: '20px' }}>输出数据</p>
              <span>请选择对应变量分类下的变量作为输出！</span>
             
              <div className={style.treeBorder}>
               <div className={style.treeHeader}>
    <span>已选{this.state.checkedTotal1}项</span>
               </div>
             <Tree
              checkable
                onExpand={this.onExpend1}
                expandedKeys={this.state.expandedKeys1}
                autoExpandParent={this.state.autoExpandParent1}
                onSelect={this.onSelect1}
                onCheck={this.onCheck1}
                selectedKeys={this.state.selectedKeys1}
                checkedKeys={this.state.checkedKeys1}
                defaultExpandedKeys={this.state.expandedKey1}
                // treeData={outputTreeData}
                defaultSelectedKeys={this.state.selectedKeys1}
                >
                   {this.renderTreeNodes(treeDataTest)}
              </Tree>
             </div>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={2} offset={10}>
              <Button key="back" onClick={this.handleCancel}>取消</Button>
            </Col>
            <Col span={2} offset={1}>
              <Button key="submit" type="primary" onClick={this.handleOk} style={{ background: '#a30014', color: '#fff' }}>
                保存
                </Button>
            </Col>

              <Col span={2} offset={1}>
                <Button key="submit" type="primary" onClick={this.showRestTest}  disabled={!this.state.showModalButton} style={{ padding: '0px 2px'}}>
                  Restful服务调用测试
                </Button>
              </Col>

           
              <Col span={2} offset={3}>
                <Button key="submit" type="primary" onClick={this.checkRest} disabled={!this.state.showModalButton}   style={{ padding: '0px 2px'}}>
                  查看Restful描述
                </Button>
              </Col>
           
          </Row>
        </Modal>
        {this.state.testVisible&&<CodeMirronrModal inputCode={testData} childClick={this.childClickFn}/>}
        {this.state.checkVisible&&<CodeMirronrOnlyCheckModal resultCode={checkData} childClick={this.childClickCheckFn}/>}
      
      </div>
    );
  }
}