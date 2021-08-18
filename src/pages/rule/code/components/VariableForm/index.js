import React, { Component } from 'react';
import { Input, Form, Select, Row, Col, Modal, message } from 'antd';
import {
  parameterSet,
  datatypeGet,
  parametersNew,
  parametersEdit,
} from '../../../../../services/rule';

const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

// @Form.create()
class VariableForm extends Component {
  constructor() {
    super();
    this.state = {
      confirmLoading: false,
      categoryData: [],
      typeData: [],
    };
  }

  componentDidMount() {
    this.getParameterCategory();
    this.getTypeData();
  }

  // 获取参数分类下拉
  async getParameterCategory() {
    const response = await parameterSet();
    if (response.success) {
      console.log(response.data);
      this.setState({
        categoryData: response.data,
      });
    }
  }

  // 获取参数类型下拉
  async getTypeData() {
    const response = await datatypeGet();
    if (response.success) {
      this.setState({
        typeData: response.data,
      });
    }
  }

  // 关闭弹窗
  handleCancel() {
    const { handleCancel } = this.props;
    handleCancel();
  }

  // 确认添加
  handleOk() {
    const {
      title,
      VariableFormData,
      handleOk,
      form: { validateFields },
    } = this.props;
    this.setState({
      confirmLoading: true,
    });
    // 根据弹框title名来判断请求不同的提交接口
    validateFields((err, values) => {
      if (!err) {
        if (title === '新增变量') {
          parametersNew(values).then(response => {
            if (response.success) {
              this.setState({
                confirmLoading: false,
              });
              message.success('添加成功');
              handleOk();
            } else {
              this.setState({
                confirmLoading: false,
              });
              message.error(response.msg);
            }
          });
        } else if (title === '修改变量') {
          parametersEdit(VariableFormData.category, VariableFormData.name, values).then(
            response => {
              if (response.success) {
                this.setState({
                  confirmLoading: false,
                });
                message.success('修改成功');
                handleOk();
              } else {
                this.setState({
                  confirmLoading: false,
                });
                message.error(response.msg);
              }
            }
          );
        }
      } else {
        message.error('请填写必填项');
        this.setState({
          confirmLoading: false,
        });
      }
    });
  }

  render() {
    const {
      visible,
      title,
      name,
      VariableFormData,
      form: { getFieldDecorator },
    } = this.props;
    const { typeData, categoryData, confirmLoading } = this.state;

    return (
      <div>
        <Modal
          onOk={() => {
            this.handleOk();
          }}
          destroyOnClose
          maskClosable={false}
          confirmLoading={confirmLoading}
          onCancel={() => {
            this.handleCancel();
          }}
          title={title}
          visible={visible}
          width={900}
        >
          <Form form={VariableFormData}>
            <Row gutter={12}>
              <Col span={10}>
                <Form.Item label={`${name}代码`} {...formItemLayout}>
                  {getFieldDecorator('name', {
                    rules: [
                      { required: true, message: `请输入${name}代码` },
                      {
                        max: 30,
                        message: '字符不能大于30个字符',
                      },
                      {
                        validator: (rule, value, callback) => {
                          // eslint-disable-next-line no-useless-escape
                          const reg = new RegExp(/[^\a-\z\A-\Z0-9]/g);
                          if (reg.test(value)) {
                            return callback('请输入英文或者数字');
                          }
                          return callback();
                        },
                      },
                    ],
                    initialValue: VariableFormData ? VariableFormData.name : '',
                    // getFieldDecorator的initialValue,
                  })(<Input placeholder={`请输入${name}名称`} />)}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label={`${name}名称`} {...formItemLayout}>
                  {getFieldDecorator('label', {
                    rules: [
                      { required: true, message: `请输入${name}名称` },
                      {
                        max: 30,
                        message: '字符不能大于30个字符',
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
                    initialValue: VariableFormData ? VariableFormData.label : '',
                  })(<Input placeholder={`请输入${name}名称`} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={10}>
                <Form.Item label={`${name}分类`} {...formItemLayout}>
                  {getFieldDecorator('category', {
                    rules: [
                      {
                        // type: 'array',
                        required: true,
                        message: `请输入选择${name}分类`,
                      },
                    ],
                    initialValue: VariableFormData ? VariableFormData.category : '',
                  })(
                    <Select
                      style={{ width: ' 100%' }}
                      placeholder={`请输入选择${name}分类`}
                      showSearch
                      allowClear
                      // onChange={(value, key) => this.selectProvin(value, key)}
                    >
                      {categoryData.map(item => (
                        <Option key={item.category} value={item.category}>
                          {item.category}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label={`${name}类型`} {...formItemLayout}>
                  {getFieldDecorator('type', {
                    rules: [
                      {
                        // type: 'array',
                        required: true,
                        message: `请输入选择${name}类型`,
                      },
                    ],
                    initialValue: VariableFormData ? VariableFormData.type : '',
                  })(
                    <Select
                      style={{ width: ' 100%' }}
                      placeholder={`请输入选择${name}类型`}
                      showSearch
                      allowClear
                      // onChange={(value, key) => this.selectProvin(value, key)}
                    >
                      {typeData.map(item => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={24} pull={4}>
                <Form.Item label="备注" {...formItemLayout}>
                  {getFieldDecorator('comment', {
                    rules: [
                      {
                        max: 500,
                        message: '字符不能大于500个字符',
                      },
                    ],
                    initialValue: VariableFormData ? VariableFormData.comment : '',
                  })(<TextArea rows={4} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default VariableForm;
