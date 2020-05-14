import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_action';
import buttonStyles from '../buttons.module.scss';
import styles from './header.module.scss';
import userStyles from '../auth/user_nav.module.scss';

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
      <Link to="/signup">
        <button type="button" className={buttonStyles.none}>
          <div className={userStyles.btn}>
            <i className="ra ra-scroll-unfurled" />
            <span>Sign Up</span>
          </div>
        </button>
      </Link>
      <Link to="/login">
        <button type="button" className={buttonStyles.none}>
          <div className={userStyles.btn}>
            <i className="ra ra-key" />
            <span>Login</span>
          </div>
        </button>
      </Link>
    </>
  );


  return (
    <div className={styles.background}>
      <div className={styles.logo}>
        <i className="ra ra-hood" />
      </div>
      <nav className={styles.headerContainer}>
        <div className={styles.navRight}>
          <ul className={styles.aboutUs}>
            <li className={userStyles.btn}>  
              <a href="#footer">
                <button type="button" className={buttonStyles.none}>
                  <i className="ra ra-double-team" />
                  About Us
                </button>
              </a>
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
