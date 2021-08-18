import React, { Component } from 'react';
import { Table, Modal, Form, Input, Popconfirm, Button, message, Spin } from 'antd';
import {
  parameterSet,
  editSelectType,
  newSelectType,
  deleteSelectType,
} from '../../../../../services/rule';
import {
  Category,
  addCategory,
  deleteCategory,
  editCategory,
} from '../../../../../services/addRule';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

// const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing }, () => {
      if (!editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave,fromPage } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      let baseUrl=''
      if(fromPage&&fromPage==1){
        baseUrl = editCategory(record.category, values.category);
      }else{
        baseUrl = editSelectType(record.category, values.category);
      }
      baseUrl.then(response => {
        if (response.success) {
          message.success('修改成功');
          this.toggleEdit();
          handleSave({ ...record, ...values });
        } else {
          message.error(response.msg);
        }
      });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
          // eslint-disable-next-line no-return-assign
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      loading,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class SelectType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      count: '',
      loading: false,

    };
    this.columns = [
      {
        title: '序号',
        width: 80,
        ellipsis: true,
        render: (text, record, index) => {
          return <span>{index + 1}</span>;
        },
      },
      {
        title: '类别',
        dataIndex: 'category',
        editable: true,
      },
      {
        title: '操作',
        width: 80,
        dataIndex: 'action',
        render: (text, record) => {
          const { dataSource } = this.state;
          return dataSource.length >= 1 ? (
            <Popconfirm title="确定要删除么?" onConfirm={() => this.handleDelete(record.category)}>
              <a>删除</a>
            </Popconfirm>
          ) : null;
        },
      },
    ];
  }

  componentDidMount() {
   
    this.setState({
      fromPage:this.props.fromPage
    },()=>{      
    this.getSelectTypeData();
    })
  }

  // 获取参数分类下拉
  async getSelectTypeData() {
    this.setState({
      loading: true,
    });
    let response={}
    if(this.props.fromPage&&this.props.fromPage==1){
      response = await Category();
      let arr=[]
      response&&response.data&&response.data.forEach((item,index)=>{
        arr.push({
          category:item
        })
      })
      response.data=arr
    }else{
      response = await parameterSet();
    }
    if (response.success) {
      this.setState({
        dataSource: response.data,
        count: response.data.length,
        loading: false,
      });
    }
  }

  handleDelete = key => {
    this.setState({
      loading: true,
    });
    let baseUrl=''
    if(this.props.fromPage&&this.props.fromPage==1){
      baseUrl = deleteCategory(key);
    }else{
      baseUrl = deleteSelectType(key);
    }
    baseUrl.then(response => {
      if (response.success) {
        const { dataSource } = this.state;
        this.setState({
          dataSource: dataSource.filter(item => item.category !== key),
          loading: false,
        });
        message.success('删除成功');
      } else {
        message.error(response.msg);
      }
    });
  };

  handleAdd = () => {
    this.setState({
      loading: true,
    });
    const { count, dataSource } = this.state;
    const newData = {
      index: count + 1,
      category: `未命名分类${count + 1}`,
    };
    let baseUrl=''
    if(this.props.fromPage&&this.props.fromPage==1){
      baseUrl = addCategory(newData.category);
    }else{
      baseUrl = newSelectType(newData.category);
    }
    baseUrl.then(response => {
      if (response.success) {
        message.success('请添加新增类名');
        this.setState({
          dataSource: [...dataSource, newData],
          count: count + 1,
          loading: false,
        });
      } else {
        message.error(response.msg);
      }
    });
  };

  handleSave = row => {
    const { dataSource } = this.state;
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.category === item.category);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  // 关闭弹窗
  handleCancel() {
    const { handleCancel } = this.props;
    handleCancel();
  }

  render() {
    const { visible } = this.props;
    const { dataSource, loading,fromPage } = this.state;
    // const components = {
    //   body: {
    //     row: EditableFormRow,
    //     cell: EditableCell,
    //   },
    // };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          fromPage,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Modal
          footer={false}
          destroyOnClose
          maskClosable={false}
          title="编辑分类"
          visible={visible}
          onCancel={() => {
            this.handleCancel();
          }}
          width={500}
        >
          <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
            新增类型
          </Button>
          <Spin spinning={loading}>
            <Table
              // components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              rowKey={row => row.category}
            />
          </Spin>
        </Modal>
      </div>
    );
  }
}
export default SelectType;
