import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_action';
import buttonStyles from '../buttons.module.scss';
import styles from './header.module.scss';
import userStyles from '../user/nav/nav.module.scss';

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
            <span>{props.displayName}</span>
          </button>
        </Link>
      </div>
      <div>
        <button onClick={props.logout}><span>Logout</span></button>
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
        <div className={styles.logoBack}>
          <i className="ra ra-shield" />
        </div>
        <div className={styles.logoFront}>
          <i className="ra ra-hood" />
        </div>
      </div>
      <nav>
        <div className={styles.navLeft}>
          <ul className={styles.aboutUs}>
            <li className={userStyles.btn}>
              <Link to="/#about">
                <button type="button" className={buttonStyles.none}>
                  <div className={userStyles.btn}>
                    <i className="ra ra-double-team" />
                    <span>About Us</span>
                  </div>
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.navRight}>
          {props.loggedIn ? launchAndLogout : loginAndSignUp}
        </div>
      </nav>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
