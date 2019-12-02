import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamFom extends React.Component {
  renderErrors = ({ touched, error }) => {
    if (touched && error)
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
  };

  renderInput = ({ input, label, meta }) => {
    // return (
    //   <input
    //     onChange={formProps.input.onChange}
    //     value={formProps.input.value}
    //   />
    // );
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderErrors(meta)}
      </div>
    );
  };

  onSubmit = formValue => {
    this.props.onSubmit(formValue);
  };

  render() {
    //console.log(this.props);
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title:" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description:"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValue => {
  const errors = {};
  if (!formValue.title) {
    errors.title = "Title is required!";
  }
  if (!formValue.description) {
    errors.description = "Description is required!";
  }
  return errors;
};

export default reduxForm({
  form: "StreamFom",
  validate: validate
})(StreamFom);
