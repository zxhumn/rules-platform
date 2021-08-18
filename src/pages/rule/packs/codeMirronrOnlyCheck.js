import React, { PureComponent } from 'react';
import { Modal, Row, Col,message } from 'antd';
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


export default class Index extends PureComponent {
  constructor() {
    super();
    this.state = {
    }
    this.instance = null;

  }
  componentDidMount() {
  }

    
  handleCheckCancel = e => {
    this.props.childClick({
      checkVisible:false
    })
   };
  render() {
    const { data, outputData } = this.state
    const { resultCode } = this.props
    let inputData=resultCode.resultData
    let inputJsonData = JSON.stringify(inputData);//data是请求的后台数据
    let inputResult = JSON.stringify(JSON.parse(inputJsonData), null, 4);//格式化后的json字符串形式
    // console.log('hh',  inputData,inputResult)
    return (
      <div>
         <Modal
          title="查看Restful描述"
          visible={resultCode.checkVisible}
          onCancel={this.handleCheckCancel}
          footer={null}
          width={800}
        >
           <CodeMirror
            editorDidMount={editor => { this.instance = editor }}
            value={inputResult}
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
        </Modal>
      </div>
    )
  }
}