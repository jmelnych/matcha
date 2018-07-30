import React, { Component } from 'react'
import { Form, Input, Icon, Button, message } from 'antd'
import {addTags} from '../../actions/tagsActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


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
                const existingTags = this.props.tags;
                /* transform all new tags to lowercase  */
                let newTagsLower = values.names.map(name => name.toLowerCase());
                /* check if a user duplicated some with existing  */
                let duplicatesWithExisting = [];
                existingTags.map(existing => {
                    newTagsLower.map(newTag => {
                        if (existing === newTag) {
                            duplicatesWithExisting.push(newTag);
                        }
                    })
                });
                /* if there's something duplicated, show message about it */
                if (duplicatesWithExisting.length){
                    duplicatesWithExisting.map(duplicate => {
                        message.error(`Tag ${duplicate} already exists`);
                    });
                    return;
                };
                /* find duplicates in a list */
                const assArray = newTagsLower.map(tag => {
                    return {tagname: tag, count: 1}
                });
                const reducer = (a, b) => {
                    a[b.tagname] = (a[b.tagname] || 0) + 1;
                    return a;
                };
                const reducedObj = assArray.reduce(reducer, {});
                const duplicates = Object.keys(reducedObj).filter(a => reducedObj[a] > 1);
                if (duplicates.length) {
                    duplicates.map(duplicate => {
                        message.error(`You have duplicated tag ${duplicate}`);
                    });
                    return;
                }
                /* if no duplicates, submit array to save in db */
                const newTags = {names: newTagsLower};
                this.props.addTags(newTags);
                message.success(`Tags successfully uploaded`);
                this.setInitialValues();
                this.props.closeOnSubmit();
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
                        <Icon type="plus"/> Add
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

function mapStateToProps({tags}) {
    return {
        tags: tags.map((tag) => tag.tag)
    }
};

function mapDispatchToProps(dispatch){
    return {
        addTags: (tags) => dispatch(addTags(tags))
    }
};

ProfileUserAddTag.propTypes = {
    tags: PropTypes.array.isRequired,
    addTags: PropTypes.func.isRequired,
    closeOnSubmit: PropTypes.func.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ProfileUserAddTag));