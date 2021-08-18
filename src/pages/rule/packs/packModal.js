import React, { PureComponent } from 'react';
import { Modal, Card, Table, Button, Row, Col, Form, Input, Select, Radio, message, Tooltip,Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { PACKS_ADD_LIST, RULE_LIST, PACKS_PUT_LIST } from '../../../actions/rule';
import { knowledgePackage,getAllRule,putKnowledgePackage} from "../../../services/rule"
import style from './index.less';
const { TextArea } = Input;

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
export default class packModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            visible: false,

            pieData: ['受理类', '审核类', '复核类', '录入类', '授权类', '综合类'],
            perState: ['柜员相关业务风险', '储蓄与卡业务风险', '对公重点业务风险', '会计核算业务风险', '账户管理业务风险'],
            taskData: ['对公开户业务', '对私开户业务', '补卡业务'],
            selectedRowKeys: [],
            selectedRowKeys1: [],
            ModalColumns: [],
            ModalData: [],
            ModalColumns1: [],
            ModalData1: [],
            ruleList: [],//选择规则集
            modalKey:1,//控制modal每次都重新调用接口
            table: {
                current: 1,
                pageSize: 10,
                pageTotal: 0,
                pages: 1
            },
            editObj:{},
            rulesNameList:[],
            ruleGroup:[],
            parentObj:{},
            itemsList:[],
            allRuleList:[],
            rullListObj:{}
        }
        // console.log('constructor')

        // this.handleChange = this.handleChange.bind(this)
        this.onReset = this.onReset.bind(this)
        this.onTableChange = this.onTableChange.bind(this)

        // this.onTableChange = this.onTableChange.bind(this)
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.getProps()
        this.getModalTable(this.state.table.current, this.state.table.pageSize)
        this.getAllRulesName( {pageIdx: 1, pageSize: 100})
        this.getAllRulesList( {pageIdx: 1, pageSize: 5})
        
        // console.log('componentDidMount-1')   
    }
    componentWillReceiveProps(){
        // console.log('componentWillReceiveProps-2')   
        // this.getProps()
    }
    componentDidUpdate(){
        // console.log('componentDidUpdate-3')   
        
    }
    async getDetailById(params){
        const response = await knowledgePackage(params);   
        if(response.success){
        let obj=response.data&&response.data.data[0]
         let itemsArr=obj&&obj.items?obj.items:[]
         let arr=[]
         itemsArr.forEach((item,index)=>{
            let arrObj={
                rsCategory:item.category?item.category:'',
                rsLabel:item.ruleLabel?item.ruleLabel:'',
                rsRemark:item.remark?item.remark:'',
                rsName:item.ruleName?item.ruleName:'',

            }
            arr.push(arrObj)
        })
        console.log('getDetailById',arr,this.state.itemsList)
         this.setState({
                parentObj:obj,
                itemsList:arr,
                loading:false
            })
        }
      }
      async getAllRulesName(params){
        const response = await getAllRule(params);   
        if(response.success){
        let  arr=response.data.data.map((item) => { return item.rsCategory })
        
       let arr1 = this.uniqueArr(arr)
        this.setState({
            rulesNameList:arr,
            ruleGroup:arr1
        })
    }
      }
      async getAllRulesList(params){
        const response = await getAllRule(params);   
        if(response.success){
        this.setState({
            rullListObj:response.data,
            allRuleList: response.data.data
        },()=>{

            // this.getProps()
        })
    }
      }
      //修改提交
      async getPutKnowledgePackage(id,params){
        const response = await putKnowledgePackage(id,params);   
        if(response.success){
        success('更新成功')
        // console.log('修改提交',response)
        // this.setState({
        //     rulesNameList:arr
        // })
        }
      }

    getProps() {
        const {
            form: { getFieldDecorator, setFieldsValue, getFieldsValue },
            modalVisible,

        } = this.props;
        // const {rullListObj} = this.state
        // console.log('getProps',modalVisible,rullListObj)
        // this.setState({
        //     allRuleList: rullListObj.data
        // })
        //修改
        if (modalVisible.modalButton == 1) {
            let id = modalVisible.editRow ? modalVisible.editRow :''
            this.getDetailById({code:id})
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        const {
            dispatch,
            form: { getFieldsValue, validateFields },
            modalVisible
        } = this.props;
        // 请求数据
        const formData = getFieldsValue(); // 获取所有输入框的值
        if (!formData.name) {
            message.warning('请输入知识包名称')
            return
        }
        if (!formData.id) {
            message.warning('请输入ID编码')
            return
        }
        // 校验输入框的值是否符合验证规则
        validateFields((err, values) => {
            // console.log("提交验证:", err, values);
            if (!err) {
                //新增 
                if (modalVisible.modalButton == 0) {
                    if (this.state.ruleList.length <= 0) {
                        error('请先选择至少一个规则集')
                    } else {
                        // console.log('ruleList', this.state.ruleList)
                        let ruleData = this.state.ruleList

                        // 筛选值不为空的属性
                        Object.keys(formData).forEach(i => {
                            if (!formData[i]) delete formData[i];
                            return formData;
                        });
                        this.setState({
                            visible: false,
                            modalKey:Math.random(),
                        },
                            () => {
                                let arr =[]
                                ruleData.forEach((item,index)=>{
                                    let arrObj={
                                        category:item.rsCategory,
                                        ruleName:item.rsName,
                                        // type:'ts'
                                    }
                                    arr.push(arrObj)
                                })
                                
                                // console.log("新增提交--obj---1:", formData,ruleData,arr);
                               
                                let formObj ={
                                    name:formData.name,
                                    id:formData.id,
                                    comment:formData.comment,
                                    items:JSON.parse(JSON.stringify(arr))
                                }
                                let obj = {
                                    visible: this.state.visible,
                                    addData: formObj
                                }
                                // Object.assign(formData, {
                                //     items: JSON.parse(JSON.stringify(ruleData))
                                // });
                                // console.log("新增提交--obj:", formData,formObj);
                                dispatch(PACKS_ADD_LIST(formObj));
                                this.props.childClick({
                                    ...obj
                                })
                            });

                    }
                } else {
                    const { itemsList}= this.state
                    //修改
                        if (itemsList.length==0) {
                            message.warning('请选择规则集')
                            return
                        }
                        let arr =[]
                        itemsList.forEach((item,index)=>{
                            // console.log("编辑提交--item:", item);
                            let arrObj={
                                category:item.rsCategory,
                                ruleName:item.rsName?item.rsName:'',
                                remark:item.rsRemark,
                                // type:'ts'
                            }
                            arr.push(arrObj)
                        })
                        
                        Object.assign(formData, {
                            items:JSON.parse(JSON.stringify(arr))
                        });
                        
                        // console.log("编辑提交--obj--1:", formData,itemsList);
                        // 筛选值不为空的属性
                        Object.keys(formData).forEach(item => {
                            if (!formData[item]) delete formData[item];
                            return formData;
                        });
                        let obj = {
                            visible: this.state.visible,
                            addData: formData
                        }
                        // console.log("编辑提交--obj:", obj,formData);
        this.getPutKnowledgePackage(formData.id,formData)
                        // dispatch(PACKS_PUT_LIST(formData.id,formData));
                        this.props.childClick({
                            obj
                        })
                   
                }



                // success('提交成功');

            } else {
                error('提交失败，请重试！');
            }
        });

    };
    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false, 
            modalKey:Math.random(),
        }, () => {
            let obj = {
                visible: this.state.visible,
            }
            this.props.childClick({...obj})
        });
    };
    handleFormChange(value) {
        // console.log(`Selected: ${value}`);
    }
   // 查询
   handleSubmit() {
    const {
        form: { getFieldsValue, validateFields },
        dispatch
    } = this.props;
   
            // 请求数据
            const formData = getFieldsValue(); // 获取所有输入框的值
            // 筛选值不为空的属性
            Object.keys(formData).forEach(item => {
                if (!formData[item]) delete formData[item];
                return formData;
            });
            let obj ={
                category:formData.category,
                name:formData.rulesName
            }
            // console.log('查询',obj)
            this.getAllRulesList(obj)
            // dispatch(RULE_LIST(obj))
            this.setState({
                current: 1
            },()=>{
                this.getModalTable(this.state.table.current, this.state.table.pageSize)
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
        // console.log('onTableChange',page)
        this.setState(
            {
                current: page.current,
                pageSize: page.pageSize,
            },
            () => {
                let { current, pageSize } = this.state
                
                let obj = {
                    pageIdx: current,
                    pageSize: pageSize
                }
                
                let obj1 ={
                    category:formData.category,
                    code:formData.rulesName
                }
                Object.assign(obj1, obj)
                console.log('onTableChange--查询',this.state.itemsList)
                this.getAllRulesList(obj1)
                // dispatch(RULE_LIST(formData))
                this.getModalTable(current, pageSize)
            }
        );
    }

    onReset = () => {
        const {
            form: { resetFields,setFieldsValue },
        } = this.props;
        // resetFields();
        setFieldsValue({
            category:'',
            rulesName:''
        })
        success('重置成功');

        // this.getPersonnelMonitorList({})
    };
    onFinish = values => {
        // console.log(values);
    }
    //增加删除
    addRules() {
        const {itemsList,selectedRowKeys,selectedRowKeys1,allRuleList }=this.state
        let arr =[]
        let data = itemsList
        selectedRowKeys.forEach(item=>{
            arr.push(allRuleList[item])
        })
        // let arr1=data.concat(arr)
        
        console.log('增加删除',arr,data,selectedRowKeys1,selectedRowKeys,allRuleList)
        let arr2=[]
        arr2=arr2.concat(data,arr)
        arr2=this.uniqueArrObj(arr2)
        console.log('arr2',arr,data,arr2)
        this.setState({
            itemsList: arr2,
            selectedRowKeys1: [],
            selectedRowKeys: [],
        })

        // console.log('增加删除', itemsList,selectedRowKeys,allRuleList,arr,data, )

    }

    delRules() {
        const {itemsList,selectedRowKeys,selectedRowKeys1,allRuleList }=this.state
        let data = itemsList
        let dataKeys=selectedRowKeys1
        for (let  i=selectedRowKeys1.length-1;i>=0;i--) {
            data.splice(i,1)
        }
        this.setState({
            itemsList: data,
            selectedRowKeys1: [],
            selectedRowKeys: [],
        })


    }
    getModalTable(current, size) {
        const {
            modalVisible,
        } = this.props;
        const columns = [
            {
                title: '序号',
                width: 80,
                dataIndex: 'packNum',
                align: 'center',
                render: (text, record, index) => {
                    //生成序号
                    return (
                        <span>{(current - 1) * size + index + 1}</span>
                    )

                },
            },
            {
                title: '规则分组',
                dataIndex: 'rsCategory',
                align: 'center',
            },
            {
                title: '规则集名称',
                dataIndex: 'rsLabel',
                align: 'center',
                ellipsis: {
                    showTitle: false,
                },
                render: fullName => (
                    <Tooltip placement="topLeft" title={fullName}>
                        {fullName}
                    </Tooltip>
                ),
            },

            {
                title: '描述',
                dataIndex: 'rsRemark',
                align: 'center',
                ellipsis: {
                    showTitle: false,
                },
                render: fullName => (
                    <Tooltip placement="topLeft" title={fullName}>
                        {fullName}
                    </Tooltip>
                ),
            },

        ];

        const columns1 = [
            {
                title: '序号',
                width: 80,
                dataIndex: 'packNum',
                align: 'center',
                render: (text, record, index) => {
                    //生成序号
                    return (
                        <span>{index + 1}</span>
                    )

                },
            },
            {
                title: '规则分组',
                dataIndex: 'rsCategory',
                align: 'center',
            },
            {
                title: '规则集名称',
                dataIndex: 'rsLabel',
                align: 'center',
                ellipsis: {
                    showTitle: false,
                },
                render: fullName => (
                    <Tooltip placement="topLeft" title={fullName}>
                        {fullName}
                    </Tooltip>
                ),
            },

            {
                title: '描述',
                dataIndex: 'rsRemark',
                align: 'center',
                ellipsis: {
                    showTitle: false,
                },
                render: fullName => (
                    <Tooltip placement="topLeft" title={fullName}>
                        {fullName}
                    </Tooltip>
                ),
            },

        ];


      
        this.setState({
            ModalColumns: columns,
        })

        this.setState({
            ModalColumns1: columns1,
        })
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        // let {ruleList,ModalData}=this.state
        // for (let i = 0; i < array.length; i++) {
        //     const hh = busData.map((item) => { return item.hh + ':00' })
        // }
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        // console.log('onSelectChange', selectedRowKeys, selectedRows)

        this.setState({
            selectedRowKeys,
            ruleList: selectedRows
        });
    };
    onSelectChange1 = selectedRowKeys1 => {
        // let {ruleList,ModalData}=this.state
        // for (let i = 0; i < array.length; i++) {
        //     const hh = busData.map((item) => { return item.hh + ':00' })
        // }
        // console.log('selectedRowKeys changed: ', selectedRowKeys);

        this.setState({
            selectedRowKeys1,
            ruleList1: selectedRowKeys1
        });
    };
//数组去重
uniqueArr(array){ 
    //一个新的数组 
    let arrs = []; 
    //遍历当前数组 
    for(let i = 0; i < array.length; i++){ 
        //如果临时数组里没有当前数组的当前值，则把当前值push到新数组里面 
        if (arrs.indexOf(array[i]) == -1){ 
            arrs.push(array[i])
        }; 
    } 
    return arrs; 
}
//数组对象去重
uniqueArrObj(arr){
    let newArr = [];
    let obj = {};
    for (var i = 0; i < arr.length; i++) {
        console.log('newArr----111',obj[arr[i].rsCategory]);
      if (!obj[arr[i].rsCategory]||!obj[arr[i].rsName]||!obj[arr[i].rsLabel]) {
        newArr.push(arr[i]);
        obj[arr[i].rsCategory] = true;
        obj[arr[i].rsName] = true;
        obj[arr[i].rsLabel] = true;
      }
    }
    console.log('newArr',newArr);
      return newArr; 
}
// uniqueArrObj(,arr2){ 
//     let arrs = []; 
//     //遍历当前数组 
//     arr1.forEach((item1,index1)=>{
//         arr2.forEach((item2,index2)=>{
//            console.log('数组对象去重',item1,index1,item2,index2,)
//            if(item1.rsCategory==item2.rsCategory&&item1.rsName==item2.rsName){
//             success('规则集已存在，请选择其他规则集！')
//            }else{
//             arrs.push(item1)
//             arrs.push(item2)
//            }
//         })
//     })
//     // console.log('数组对象去重--1',arrs)
//     return arrs; 
// }


    render() {
        // console.log('render')   
        
        const layout = {
            labelCol: {
                span: 2,
            },
            wrapperCol: {
                span: 22,
            },
        };
        const layout1 = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };

        const {
            form: { getFieldDecorator, setFieldsValue, getFieldsValue },
            modalVisible,
        } = this.props;
        const { loading,pieData, perState, taskData, ModalColumns, ModalData, selectedRowKeys, selectedRowKeys1, ModalColumns1, ModalData1,
            modalKey,editObj,rulesNameList,ruleGroup,allRuleList,parentObj,itemsList,rullListObj} = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const rowSelection1 = {
            selectedRowKeys1,
            onChange: this.onSelectChange1,
        };
       
        let list = rullListObj
        let table = {
            current: list.pageProperty && list.pageProperty.pageIdx,
            // ageSize:list.pageProperty&&list.pageProperty.pageSize,
            pageSize: 5,
            pageTotal: list.totalCount,
            pages: list.pageProperty && list.pageProperty.pageIdx
        }

        // console.log('allRuleList-接收',parentObj)
        // if (allRuleList && allRuleList.length > 0) {
        //     ruleGroup = allRuleList.map((item) => { return item.name })
        // }
        return (
            <Spin spinning={this.state.loading} >
            <div >
                <Modal
                    title={modalVisible.modalButton == 0 ? "知识包新增" : "知识包修改"}
                    visible={modalVisible.getVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={1000}
                    onFinish={this.onFinish}
                    destroyOnClose={true}
                    key={modalKey} //每次打开都初始化
                >
                    <Form  {...layout1}
                        preserve="false"
                        name="basic">

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="知识包名称"
                                    name="name"
                                    rules={[{ required: true }]}
                                >
                                    {getFieldDecorator('name', {
                                        rules: [
                                            { required: true, message: '请输入知识包名称' },
                                            {
                                                whitespace: true,
                                                message: '不能输入空格',
                                            },
                                            {
                                                validator: (rule, value, callback) => {
                                                    // eslint-disable-next-line no-useless-escape
                                                    const reg = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g);
                                                    if (reg.test(value)) {
                                                        return callback('请输入中文英文或数字');
                                                    }
                                                    return callback();
                                                },
                                            },
                                        ],
                                        initialValue: parentObj.name ? parentObj.name : '',
                                    })(<Input placeholder="请输入知识包名称" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="ID编码"
                                    name="id"
                                    rules={[{ required: true }]}
                                >
                                    {getFieldDecorator('id', {
                                        rules: [
                                            { required: true, message: '请输入ID编码' },
                                            {
                                                validator: (rule, value, callback) => {
                                                    // eslint-disable-next-line no-useless-escape
                                                    const reg = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g);
                                                    if (reg.test(value)) {
                                                        return callback('请输入中文英文或数字');
                                                    }
                                                    return callback();
                                                },
                                            },
                                        ],
                                        initialValue: parentObj.id ? parentObj.id : '',

                                    })(<Input placeholder="请输入ID编码"  disabled={modalVisible.modalButton == 1 ?true:false} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>

                            <Col span={24}>
                                <Form.Item
                                    {...layout}
                                    label="备注"
                                    name="comment"
                                >
                                    {getFieldDecorator('comment', {
                                        rules: [
                                            { required: false, message: '请输入备注' }
                                        ],
                                        initialValue: parentObj.comment ? parentObj.comment : '',

                                    })(<TextArea rows={4} />)}
                                </Form.Item>


                            </Col>
                        </Row>
                        <div>
                            <p style={{ paddingLeft: '8px', borderLeft: '3px solid #000000', fontSize: '20px' }}>{modalVisible.modalButton == 0 ? "选择规则集" : "添加规则集"}</p>

                            <Row>
                                <Col span={8} offset={4}>
                                    <Form.Item

                                        label="规则分组"
                                        name="category"
                                    >
                                        {getFieldDecorator('category')(
                                            <Select
                                                placeholder="请选择规则分组" onChange={this.handleFormChange}>

                                                {ruleGroup && ruleGroup.map(d => (
                                                    <Select.Option key={d} value={d}>
                                                        {d}
                                                    </Select.Option>
                                                ))}
                                            </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={6} offset={2}>

                                    <Form.Item
                                        label="规则集名称"
                                        name="rulesName"
                                    >
                                        {getFieldDecorator('rulesName', {
                                            rules: [
                                                {
                                                    whitespace: true,
                                                    message: '不能输入空格',
                                                }
                                            ],
                                        })(<Input allowClear placeholder="请输入规则集名称" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={2} offset={10}>
                                    <Form.Item>
                                        <Button
                                            style={{ background: '#3377FF', color: '#ffffff', marginRight: '50px' }}
                                            onClick={() => {
                                                this.handleSubmit();
                                            }}
                                            type="primary" htmlType="submit"
                                        >
                                            查询
                  </Button>
                                    </Form.Item>
                                </Col>
                                <Col span={2} offset={1}>
                                    <Form.Item>
                                        <Button
                                            // style={{ background: '#FDAD4E', color: '#ffffff' }}
                                            onClick={() => {
                                                this.onReset();
                                            }}
                                        >
                                            重置
                  </Button>

                                    </Form.Item>
                                </Col>
                                {modalVisible.modalButton == 1 &&
                                    <Col span={2} offset={6}>
                                        <Form.Item>
                                            <Button
                                                style={{ background: '#333333', color: '#ffffff' }}
                                                onClick={() => {
                                                    this.addRules();
                                                }}
                                            >
                                                添加
                  </Button>

                                        </Form.Item>
                                    </Col>
                                }
                            </Row>

                            <Table rowSelection={rowSelection} columns={ModalColumns} dataSource={allRuleList}
                                // pagination={{ pageSize: 5 }}//自定义每页显示的数据条数
                                rowKey={row => row.id}
                                onChange={page => {
                                    this.onTableChange(page);
                                }}
                                pagination={{
                                    total: table.pageTotal,
                                    pageSize: table.pageSize,
                                    pages: table.pages,
                                    current: table.current,
                                    showQuickJumper: true,
                                }}
                            />
                        </div>
                        {modalVisible.modalButton == 1 &&
                            <div>
                                <p style={{ paddingLeft: '8px', borderLeft: '3px solid #000000', fontSize: '20px' }}>已选规则集</p>
                                <Row gutter={24}>
                                    <Col span={2} offset={21}>
                                        <Form.Item>
                                            <Button
                                                style={{ background: '#333333', color: '#ffffff' }}
                                                onClick={() => {
                                                    this.delRules();
                                                }}
                                            >
                                                删除
</Button>

                                        </Form.Item>
                                    </Col>
                                </Row>
                                {getFieldDecorator('rule', {
                                    rules: [
                                        { required: false, message: '已选规则集' },
                                    ],
                                    initialValue: parentObj.ruleList ? parentObj.ruleList : '',

                                })(              
                                <Table rowSelection={rowSelection1} columns={ModalColumns1} dataSource={itemsList}
                                rowKey={row => row.id}
                                pagination={false}
                                size="small"
                                scroll={{ y: 300 }}
                                />
                                )}
                            </div>
                        }
                    </Form>


                </Modal>
            </div>
                        </Spin>
        );
    }
}
