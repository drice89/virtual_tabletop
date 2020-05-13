import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_action';
import buttonStyles from '../buttons.module.scss';
import styles from './header.module.scss';

const mapStateToProps = (state) => ({
  loggedIn: Boolean(state.session.isAuthenticated),
  displayName: state.session.isAuthenticated ? state.entities.users[state.session.userId].displayName : '',
  userId: state.session.userId,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

const Header = (props) => {
  const launchAndLogout = (
    <>
      <div>
        <Link to={`/user/${props.userId}`}>
          <button className={buttonStyles.signUp}>
            {props.displayName}
          </button>
        </Link>
      </div>
      <div>
        <button onClick={props.logout}>Logout</button>
      </div>
    </>
  );

  const loginAndSignUp = (
    <>
      <div>
        <Link to="/signup">
          <button className={buttonStyles.signUp}>Sign Up</button>
        </Link>
      </div>
      <div>
        <Link to="/Login">
          <button className={buttonStyles.signIn}>Login</button>
        </Link>
      </div>
    </>
  );


  return (
    <div className={styles.background}>
      <nav className={styles.headerContainer}>
        <div className={styles.logo}>
          <i className="ra ra-hood" />
        </div>
        <div className={styles.navRight}>
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
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
