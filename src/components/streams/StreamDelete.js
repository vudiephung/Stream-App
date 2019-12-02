import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { deleteStream } from "../../actions";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
  renderContent = () => {
    if (!this.props.streamToDelete) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete the stream with title "${this.props.streamToDelete.title}"`;
  };

  render() {
    //console.log(this.props);
    const { id } = this.props.match.params;
    const actions = (
      <>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui negative button"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
    return (
      <div>
        Delete Your Stream
        <Modal
          title="Delete Your Stream"
          content={this.renderContent()}
          actions={actions}
          onDismiss={() => {
            history.push("/");
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const streamId = ownProps.match.params.id;
  return {
    streamToDelete: state.streams[streamId]
  };
};

export default connect(mapStateToProps, { deleteStream })(StreamDelete);
