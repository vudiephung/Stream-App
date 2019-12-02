import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import flv from "flv.js";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  buildPlayer = id => {
    if (this.flvPlayer || !this.props.streamToShow) return;
    this.flvPlayer = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.flvPlayer.attachMediaElement(this.videoRef.current);
    this.flvPlayer.load();
    //this.flvPlayer.play();
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);

    this.buildPlayer(id);
  }

  componentDidUpdate() {
    const { id } = this.props.match.params;
    console.log(id);
    this.buildPlayer(id);
  }

  componentWillUnmount() {
    this.flvPlayer.destroy();
  }

  render() {
    if (!this.props.streamToShow) return <div>Loading...</div>;
    const { title, description } = this.props.streamToShow;
    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls={true} />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    streamToShow: state.streams[id]
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
