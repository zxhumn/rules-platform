import React, { Component } from 'react';
import { Input, Form, Select, Row, Col, Icon, Button, Modal, message, Spin } from 'antd';
import {
  datatypeGet,
  newConstants,
  getEditConstants,
  suerEditConstants,
} from '../../../../../services/rule';

const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// @Form.create()
class EditAndNewForm extends Component {
  constructor() {
    super();
    this.state = {
      confirmLoading: false,
      typeData: [],
      constantsFormData: {
        contents: [],
      },
      constantsFormLoading: false, // 加载表单
      deleteList: [], // 删除的实际值显示值数组
    };
  }

  componentDidMount() {
    const { title } = this.props;
    if (title === '修改常量') {
      this.getEditConstants();
    } else if (title === '新增常量') {
      this.add();
    }
    this.getTypeData();
  }

  // 获取修改表单
  async getEditConstants() {
    const { category } = this.props;
    this.setState({
      constantsFormLoading: true,
    });
    const response = await getEditConstants(category);
    if (response.success) {
      this.setState({
        constantsFormData: response.data,
        constantsFormLoading: false,
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

  // 删除实际值/显示值
  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
    const { deleteList } = this.state;
    deleteList.push(k.name);
    this.setState({
      deleteList,
    });
    // if (keys.length === 1) {
    //   return;
    // }
  };

  // 新增实际值/显示值
  add() {
    const {
      constantsFormData: { contents },
    } = this.state;
    const { form } = this.props;
    form.getFieldDecorator('keys', {
      initialValue:
        contents ||
        [].map(item => {
          return item;
        }),
    });
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat({ oc: false, name: '', type: '', value: '' });
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  // 点击取消关闭弹窗
  handleCancel() {
    const { handleCancel } = this.props;
    handleCancel();
  }

  // 确认添加
  handleOk() {
    const {
      title,
      category,
      handleOk,
      form: { validateFields },
    } = this.props;
    this.setState({
      confirmLoading: true,
    });
    const { deleteList } = this.state;
    // 根据弹框title名来判断请求不同的提交接口
    validateFields((err, values) => {
      // eslint-disable-next-line no-param-reassign
      delete values.keys;
      if (!err) {
        if (title === '新增常量') {
          newConstants(values).then(response => {
            if (response.success) {
              this.setState({
                confirmLoading: false,
              });
              message.success('添加成功');
              handleOk(); // 执行父组件里面handleOk的方法
            } else {
              this.setState({
                confirmLoading: false,
              });
              message.error(response.msg);
            }
          });
        } else if (title === '修改常量') {
          const toModify = { constant: values, deleteList };

          suerEditConstants(category, toModify).then(response => {
            if (response.success) {
              this.setState({
                confirmLoading: false,
              });
              message.success('修改成功');
              handleOk(); // 执行父组件里面handleOk的方法
            } else {
              this.setState({
                confirmLoading: false,
              });
              message.error(response.msg);
            }
          });
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
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { typeData, constantsFormData, confirmLoading, constantsFormLoading } = this.state;
    getFieldDecorator('keys', {
      initialValue:
        constantsFormData.contents ||
        [].map(item => {
          return item;
        }),
    });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <Row gutter="12" type="flex">
          <Col span={7}>
            <Form.Item {...formItemLayout} label={`实际值${index + 1}`} required={false} key={k}>
              {getFieldDecorator(`contents[${index}].value`, {
                validateTrigger: ['onChange', 'onBlur'],
                // rules: [
                //   { required: true, message: `请输入${name}代码` },
                //   {
                //     max: 50,
                //     message: '字符不能大于50个字符',
                //   },
                //   {
                //     validator: (rule, value, callback) => {
                //       // eslint-disable-next-line no-useless-escape
                //       const reg = new RegExp(/[^\a-\z\A-\Z0-9]/g);
                //       if (reg.test(value)) {
                //         return callback('请输入英文或者数字');
                //       }
                //       return callback();
                //     },
                //   },
                // ],
                initialValue: k.value,
              })(<Input placeholder="请输入实际值" />)}
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item {...formItemLayout} label={`显示值${index + 1}`} required={false} key={k}>
              {getFieldDecorator(`contents[${index}].name`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  { required: true, message: `请输入${name}代码` },
                  {
                    max: 50,
                    message: '字符不能大于50个字符',
                  },
                ],
                initialValue: k.name,
              })(<Input placeholder="请输入显示值" />)}
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item {...formItemLayout} label={`类型${index + 1}`} required={false} key={k}>
              {getFieldDecorator(`contents[${index}].type`, {
                rules: [
                  {
                    // type: 'array',
                    required: true,
                    message: `请输入选择${name}类型`,
                  },
                ],
                initialValue: k.type,
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
          <Col span={2}>
            {k.oc === false ? (
              <Icon
                className="dynamic-delete-button"
                style={{ lineHeight: 3 }}
                type="minus-circle-o"
                onClick={() => this.remove(k)}
              />
            ) : null}
          </Col>
        </Row>
      );
    });
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
          <Spin spinning={constantsFormLoading}>
            <Form form={constantsFormData}>
              <Row gutter={12}>
                <Col span={7}>
                  <Form.Item label={`${name}代码`} {...formItemLayout}>
                    {getFieldDecorator('category', {
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
                      initialValue: constantsFormData ? constantsFormData.category : '',
                      // getFieldDecorator的initialValue,
                    })(<Input placeholder={`请输入${name}名称`} />)}
                  </Form.Item>
                </Col>
                <Col span={7}>
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
                      initialValue: constantsFormData ? constantsFormData.label : '',
                    })(<Input placeholder={`请输入${name}名称`} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col span={24}>
                  <Form.Item label="备注">
                    {getFieldDecorator('comment', {
                      rules: [
                        {
                          max: 500,
                          message: '字符不能大于500个字符',
                        },
                      ],
                      initialValue: constantsFormData ? constantsFormData.comment : '',
                    })(<TextArea rows={4} />)}
                  </Form.Item>
                </Col>
              </Row>
              <div>
                <div
                  style={{
                    padding: '5px 5px 5px 10px',
                    borderLeft: '3px solid #e3e3e3',
                    marginBottom: 20,
                  }}
                >
                  编辑实际值/显示值
                </div>
                {formItems}
                <Form.Item style={{ textAlign: 'center' }}>
                  <Button
                    type="dashed"
                    onClick={() => {
                      this.add();
                    }}
                    style={{ width: '40%' }}
                  >
                    <Icon type="plus" /> 新增实际/显示值
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Spin>
        </Modal>
      </div>
    );
  }
}

export default EditAndNewForm;
