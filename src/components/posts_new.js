import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import {Link } from 'react-router';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post'
   },
  categories: {
    type: 'input',
    label: 'Enter some cattegories for this post'
  },
  content: {
    type: 'textarea',
    label: 'Post Contents'
  }
}
//['title', 'categories', 'content'];

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : '' }`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    )
  }
  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        //blog post has been created, navigate the user to the indext
        //We navigate by calling this.context.router.push with the
        //new path to navigate to.
        this.context.router.push('/');
      });
  }

  render(){
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        {_.map(FIELDS, this.renderField.bind(this))}
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
    );
  }
}

function validate(values) {
  const errors = {};
  _.each(FIELDS, (type, field) =>{
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  } )
  // if(!values.title) {
  //   errors.title = 'Enter a username';
  // }
  // if(!values.categories) {
  //   errors.categories = 'Enter a Category'
  // }
  // if(!values.content) {
  //   errors.content = 'Enter some things!'
  // }

  return errors;
}
export default reduxForm({
  form: 'PostsNewForm',
  fields: _.keys(FIELDS),
  validate
}, null, { createPost })(PostsNew);
