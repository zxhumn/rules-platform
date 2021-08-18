import React, { PureComponent } from 'react';
import { Card, Table } from 'antd';

import {UnControlled as CodeMirror} from 'react-codemirror2'
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

let str =[{"name":"顾客","fields":{"birthday":"2020-01-01 12:12:12","gender":false,"car":false,"level":0,"mobile":"","name":"","testField":"","house":false,"married":false,"age":0},"class":"com.bstek.urule.springboot.Consumer"},{"name":"借记卡账户","fields":{"cancelDate":"2020-01-01 12:12:12","balance":0,"debitAccountNumber":"","createDate":"2020-01-01 12:12:12"},"class":"com.bstek.urule.springboot.entity.DebitAccount"}]
let str2=''
export default  class packs extends PureComponent {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
        
    // let str1 = '{"output": '+str+' , "input": '+str +', }'
  
    
    // let jsonData = JSON.stringify(str2);//data是请求的后台数据
// let result = JSON.stringify(JSON.parse(str2),null,4);//格式化后的json字符串形式
// let result = JSON.parse(str2);//格式化后的json字符串形式
        // console.log('test值',str2,result)
        
    // let jsonData = JSON.stringify(data);//data是请求的后台数据
    // let result = JSON.stringify(JSON.parse(jsonData),null,4);//格式化后的json字符串形式
    }
    render() {
        str2 = '{"output": '+JSON.stringify(str)+' , "input": '+JSON.stringify(str) +' }'
        
    let jsonData = JSON.stringify(str);//data是请求的后台数据
    let result1 = JSON.stringify(JSON.parse(str2),null,4);//格式化后的json字符串形式
    let result = JSON.stringify(JSON.parse(jsonData),null,4);//格式化后的json字符串形式
    console.log('test值-1',str2)
    console.log('test值-2',str)
    console.log('test值-3',jsonData)
    console.log('test值-4',result,result1)
        return (
            <div>
                 <CodeMirror
          editorDidMount={editor => { this.instance = editor }}
          value={result1}
          options={{
          mode: {name:'text/css'},
        //   theme: 'solarized dark',
          autofocus:true,//自动获取焦点
          readOnly:false,//是否只可读
          styleActiveLine:true,//光标代码高亮
          lineNumbers: true, //显示行号
          smartIndent:true,  //自动缩进
          //start-设置支持代码折叠
          lineWrapping:true,
          foldGutter:true,      
          gutters:['CodeMirror-linenumbers','CodeMirror-foldgutter'],//end
          extraKeys:{
              "Ctrl":"autocomplete",
              "Ctrl-S": function (editor) {
                      that.codeSave(editor)
                    },
              "Ctrl-Z":function (editor) {
                      editor.undo();
                    },//undo
              "F8":function (editor) {
                      editor.redo();
                    },//Redo
                  },
              matchBrackets: true,  //括号匹配，光标旁边的括号都高亮显示
              autoCloseBrackets: true //键入时将自动关闭()[]{}''""
                }}
                // onChange={this.codeOnChange}

                // 在失去焦点的时候触发，这个时候放数据最好
              

            // // 这个必须加上，否则在一些情况下，第二次打开就会有问题
            // //     onBeforeChange={(editor, data, value) => {
            // //       console.log("onBeforeChange fresh")
            // //       console.log(JSON.stringify(data));
            // //     }}
            //     /* HERE: pick out only the value. and might as well get name. */
           
           /> 
            </div>
        )
    }
}