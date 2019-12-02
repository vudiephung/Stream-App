import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions/index";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmit = formValue => {
    this.props.createStream(formValue);
  };

  render() {
    //console.log(this.props);
    return (
      <div>
        <h3>Create Your Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
