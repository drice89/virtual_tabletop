import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-dom";
import { logout } from "../../actions/session_action";
const mapStateToProps = (state) => ({
  loggedIn: Boolean(state.session.isAuthenticated),
  displayName: state.session.isAuthenticated ? state.session.user.displayName : "",
  userId: state.session.userId
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout)
});

const Header = (props) => {
  const launchAndLogout = (
    <>
      <div>
        <Link to={`/user/${userId}`}>
          <button>
            {props.displayName}
          </button>
        </Link>
      </div>
      <div>
        <button onClick={this.props.logout.bind(this)}>Logout</button>
      </div>
    </>
  )
  
  const loginAndSignUp = (
    <>
      <div>
        <Link to={`/signup`}>
          <button>Sign Up</button>
        </Link>
      </div>
      <div>
        <Link to={`/Login`}>
          <button>Login</button>
        </Link>
      </div>
    </>
  );
    


  return(
    <div>
      <nav>
        <div>
          <Logo />
        </div>
        <div>
          <ul>
            <li>
              <button>
                About Us
              </button>
            </li>
            <li>
              <button>
                Docs
              </button>
            </li>
          </ul>
            {
              props.loggedIn ? launchAndLogout : loginAndSignUp
            }
        </div>
      </nav>
    </div>
  )};

export default connect(mapStateToProps, mapDispatchToProps)(Header)