import React, { PureComponent } from 'react';
import {
  Form,
  Input,
} from 'antd';
import AutoSizeDialog from 'components/Dialog';
import MultiTags from 'components/Helper/MultiTags';
import FormItemEx from 'components/Helper/FormItem';
import { createSubmitHandler } from 'utils/form';
import { showErrorMessage } from 'utils/utils';

const FormItem = Form.Item;
const formName = 'books';

@Form.create()
export default class BooksDialog extends PureComponent {

  onOk = (err, fields, resetFields) => {
    if (err) {
      showErrorMessage(err);
      return;
    }
    if (this.props.isEdit) {
      fields.id = this.props.values.id;
    }
    if (this.state && this.state.tags) {
      fields.f.tags = this.state && this.state.tags;
    } else if (this.props.values && this.props.values.tags) {
      fields.f.tags = this.props.values.tags;
    }
    this.props.dispatch({
      type: `books/${this.props.isEdit ? 'edit' : 'create'}`,
      payload: fields,
      callback: () => {
        resetFields();
        this.props.handleModalVisible(false);
      },
    });
  };

  saveTags (tags) {
    this.setState({
      tags,
    });
  }

  render() {
    const { modalVisible, form, settings, loading, values, handleModalVisible, isEdit } = this.props;
    const tagPattern = "^\\w+$";

    if (!this.submitHandler) {
      this.submitHandler = createSubmitHandler({
        form,
        onSubmit: this.onOk.bind(this),
        formName,
        formRules: settings.formRules,
      })
    }

    const formItemProps = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
      form,
      settings,
      formName,
      values,
    };
    return (
      <AutoSizeDialog 
        title={isEdit ? '编辑对象' : '创建对象'}
        visible={modalVisible}
        loading={loading}
        height={300}
        onOk={this.submitHandler} 
        onCancel={() => handleModalVisible(false)}
      >
        {!isEdit && (
        <FormItemEx {...formItemProps} fieldName="name">
          <Input placeholder="请输入" disabled={isEdit} />
        </FormItemEx>)}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标签">
          <MultiTags color="blue" pattern={tagPattern} saveTags={this.saveTags.bind(this)} maxLength={20} tags={values && values.tags ? values.tags : []} />
        </FormItem>
        <FormItemEx {...formItemProps} fieldName="description">
          <Input placeholder="请输入" />
        </FormItemEx>
      </AutoSizeDialog>
    );
  }
}
