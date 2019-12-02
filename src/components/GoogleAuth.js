import React from "react";
import { signIn, signOut } from "../actions";
import { connect } from "react-redux";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "749118201305-mtl1bvoueouhlhsq46in02delftd9ce9.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          // initially get login status
          this.onAuthChange(this.auth.isSignedIn.get());
          // update status when user signin/signout
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      const userId = this.auth.currentUser.get().getId();
      // call action creators
      this.props.signIn(userId);
    } else this.props.signOut();
  };

  onSignInClick = () => {
    console.log(this.auth);
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn === true)
      return (
        <div>
          <button
            className="ui red google button"
            onClick={this.onSignOutClick}
          >
            <i className="icon google" />
            Sign Out
          </button>
        </div>
      );
    else
      return (
        <div>
          <button className="ui red google button" onClick={this.onSignInClick}>
            <i className="icon google" />
            Sign In With Google
          </button>
        </div>
      );
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn }; // become this.props
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
