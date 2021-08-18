import React, { PureComponent } from 'react';

import { Modal, Row, Col,message,Button } from 'antd';

import {packsTest  } from "../../../services/rule"
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css';
// 主题风格
import 'codemirror/theme/solarized.css';
// 代码模式，clike是包含java,c++等模式的
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/css/css';
//ctrl+空格代码提示补全
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/anyword-hint.js';
//代码高亮
import 'codemirror/addon/selection/active-line';
//折叠代码
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';

let str = [{ "name": "顾客", "fields": { "birthday": "2020-01-01 12:12:12", "gender": false, "car": false, "level": 0, "mobile": "", "name": "", "testField": "", "house": false, "married": false, "age": 0 }, "class": "com.bstek.urule.springboot.Consumer" }, { "name": "借记卡账户", "fields": { "cancelDate": "2020-01-01 12:12:12", "balance": 0, "debitAccountNumber": "", "createDate": "2020-01-01 12:12:12" }, "class": "com.bstek.urule.springboot.entity.DebitAccount" }]


export default class Index extends PureComponent {
  constructor() {
    super();
    this.state = {
      outputData: {},
      inputData: {},
      inputEdit:''
    }
    this.instance = null;
    this.codeOnChange = this.codeOnChange.bind(this)
    this.submitData = this.submitData.bind(this)

  }
  componentDidMount() {
    const {inputCode} = this.props
    if(inputCode){
      this.setState({
        inputData:inputCode.inputData,
        inputEdit:JSON.stringify(inputCode.inputData)
      },()=>{
        
    // console.log('测试接收',this.state.inputEdit)
      })
    }
  }
  isJsonString(str) {
    try {
    JSON.parse(str);
    } catch (e) {
    return false;
    }
    return true;
    }

//开始测试
submitData() {
  const {inputCode} = this.props
   const {inputEdit }= this.state
   if(this.isJsonString(inputEdit)){

   let str = JSON.parse(inputEdit)
  this.getPacksTest(inputCode.id,str)  
   }else{
    message.error('请输入正确的代码格式！')
   }
}
//测试
async getPacksTest(id,params){
  const response = await packsTest(id,params); 
  if(response&&response.success){
  let data=response.data
    this.setState({
      outputData:data
    })
    // console.log('obj',data)
  }else{
    message.error('请输入正确的代码格式！')
  }
}
  codeOnChange(value) {
    if (value.state.activeLines) {

      let str = value.state.activeLines[0].parent.lines
      let str1 = ''
      str.forEach(item=>{
        
        str1+=item.text
      })
      this.setState({
        inputEdit:str1
      })

      // console.log('codeOnChange---2',str,str1)
    }
  }
  
  handleTestCancel = e => {
   this.props.childClick({
    testVisible:false
   })
  };
  render() {
    const { inputData, outputData } = this.state
    const { inputCode } = this.props
    let that = this
    // let jsonData = JSON.stringify(data);//data是请求的后台数据
    // let result = ''
    // if (data) {
    //   result = JSON.stringify(JSON.parse(data), null, 4);//格式化后的json字符串形式
    // }
    let inputJsonData = JSON.stringify(inputData);//data是请求的后台数据
    let inputResult = JSON.stringify(JSON.parse(inputJsonData), null, 4);//格式化后的json字符串形式
    let outputJsonData = JSON.stringify(outputData);//data是请求的后台数据
    let outputResult = JSON.stringify(JSON.parse(outputJsonData), null, 4);//格式化后的json字符串形式
    // console.log('hh',  outputResult)
    return (
      <div>
         {inputData&&<Modal
          title="Restful服务调用配置"
          visible={inputCode.testVisible}
          onCancel={this.handleTestCancel}
          footer={null}
          width={1000}
        >
          <Button  type="primary" key="submit" style={{marginBottom:'15px'}} onClick={this.submitData} >开始测试</Button>
          <Row gutter={24}>
            <Col span={11}>
              <p style={{ paddingLeft: '8px', borderLeft: '3px solid #000000', fontSize: '20px', marginBottom: "10px" }}>输入数据</p>
              
              <CodeMirror
            editorDidMount={editor => { this.instance = editor }}
            value={inputResult}
            options={{
              mode: { name: 'text/css' },
              //   theme: 'solarized dark',
              autofocus: true,//自动获取焦点
              readOnly: false,//是否只可读
              styleActiveLine: true,//光标代码高亮
              lineNumbers: true, //显示行号
              smartIndent: true,  //自动缩进
              //start-设置支持代码折叠
              lineWrapping: true,
              foldGutter: true,
              gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],//end
              extraKeys: {
                "Ctrl": "autocomplete",
                "Ctrl-S": function (editor) {
                  that.codeSave(editor)
                },
                "Ctrl-Z": function (editor) {
                  editor.undo();
                },//undo
                "F8": function (editor) {
                  editor.redo();
                },//Redo
              },
              matchBrackets: true,  //括号匹配，光标旁边的括号都高亮显示
              autoCloseBrackets: true //键入时将自动关闭()[]{}''""
            }}
            // onChange={this.codeOnChange}

            // 在失去焦点的时候触发，这个时候放数据最好
            onBlur={this.codeOnChange}

          // // 这个必须加上，否则在一些情况下，第二次打开就会有问题
          // //     onBeforeChange={(editor, data, value) => {
          // //       console.log("onBeforeChange fresh")
          // //       console.log(JSON.stringify(data));
          // //     }}
          //     /* HERE: pick out only the value. and might as well get name. */
          />
            </Col>
            <Col span={11} offset={2}>
              <p style={{ paddingLeft: '8px', borderLeft: '3px solid #000000', fontSize: '20px', marginBottom: "10px" }}>输出数据</p>
              <CodeMirror
            editorDidMount={editor => { this.instance = editor }}
            value={outputResult}
            options={{
              mode: { name: 'text/css' },
              //   theme: 'solarized dark',
              autofocus: false,//自动获取焦点
              readOnly: true,//是否只可读
              styleActiveLine: false,//光标代码高亮
              lineNumbers: true, //显示行号
              smartIndent: true,  //自动缩进
              //start-设置支持代码折叠
              lineWrapping: false,
              foldGutter: false,
              gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],//end
              extraKeys: {
                "Ctrl": "autocomplete",
                "Ctrl-S": function (editor) {
                  that.codeSave(editor)
                },
                "Ctrl-Z": function (editor) {
                  editor.undo();
                },//undo
                "F8": function (editor) {
                  editor.redo();
                },//Redo
              },
              matchBrackets: false,  //括号匹配，光标旁边的括号都高亮显示
              autoCloseBrackets: false //键入时将自动关闭()[]{}''""
            }}
          />
            </Col>
          </Row>
        </Modal>
        } 
      </div>
      )
  }
}