import React from "react";
import { connect } from "react-redux";
import { editStream, fetchStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onEditSubmit = formValue => {
    // console.log(formValue);
    const streamId = this.props.match.params.id;
    this.props.editStream(streamId, formValue);
  };

  render() {
    if (!this.props.streamEdit) return <div>Loading...</div>;
    return (
      <div>
        <h3>Edit Your Stream</h3>
        <StreamForm
          onSubmit={this.onEditSubmit}
          initialValues={_.pick(this.props.streamEdit, "title", "description")}
        />
      </div>
      // initialvalues take the obj, find corresponding Field that its name match obj keys and change it value
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const streamId = ownProps.match.params.id;
  return {
    streamEdit: state.streams[streamId]
  };
};

export default connect(mapStateToProps, { editStream, fetchStream })(
  StreamEdit
);
