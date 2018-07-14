import React, { Component } from 'react'
import { Form, Input, Icon, Button, message } from 'antd'
import {addTags} from '../actions/tagsActions'
import {connect} from 'react-redux'


const FormItem = Form.Item;

let uuid = 0;
class ProfileUserAddTag extends Component {
    componentDidMount() {
        this.setInitialValues();
    };

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one tag
        if (keys.length === 1) {
            return;
        }
        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    setInitialValues = () => {
        const { form } = this.props;
        form.setFieldsValue({
            keys: [],

        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // const newTags = {names: values.names};
                // this.props.addTags(newTags)
                //     .then((res) => {
                //     if (res.data === 'Tags added') {
                //         message.success(`Tags uploaded successfully`);
                //         //TODO: update tags in store
                //     } else {
                //         message.error(`Tag already exists. Please, choose from the list`);
                //     }
                // });
                // this.setInitialValues();
                // this.props.closeOnSubmit();
            }
        });
    };


    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys');
        let keys = getFieldValue('keys') || [];
        const formItems = keys.map((k) => {
            return (
                <FormItem
                    required={false}
                    key={k}>
                    {getFieldDecorator(`names[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Please input interest name or delete this field.",
                        }],
                    })(
                        <Input placeholder="interest"/>
                    )}
                    {keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                    ) : null}
                </FormItem>
            );
        });
        return (
            <div>
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <FormItem>
                    <Button className="center-button" type="dashed" onClick={this.add} >
                        <Icon type="plus" /> Add
                    </Button>
                </FormItem>
                <FormItem>
                    <Button className="center-button" type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
            </div>
        );
    }
};

function mapDispatchToProps(dispatch){
    return {
        addTags: (tags) => dispatch(addTags(tags))
    }
}


export default connect(null, mapDispatchToProps)(Form.create()(ProfileUserAddTag));