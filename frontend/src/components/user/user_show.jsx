import React from 'react';
import styles from './user_show.module.scss';

// eslint-disable-next-line react/prefer-stateless-function
class UserShow extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.contentContainer}>
            <div className={styles.profile}>
              <img className={styles.profileImg} src="https://via.placeholder.com/150/000000" alt="" />
              <div>
                <h1>Username</h1>
                <span>Level 7 Novice</span>
              </div>
              <div className={styles.stats}>
                <div>
                  <h1>2</h1>
                  Created Games
                </div>
                <div>
                  <h1>5</h1>
                  Joined Games
                </div>
              </div>
            </div>
            <div className={styles.content}>
              <section className={styles.main}>
                <h2>Created Games</h2>
              </section>
              <aside className={styles.sidebar}>
                <ul>
                  <li>friend-1</li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserShow;
