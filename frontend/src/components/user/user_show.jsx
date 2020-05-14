import React from 'react';
import map from '../../images/battlemap.jpg';
import snow from '../../images/snow_landscape.jpg';
import noThumb from '../../images/noThumb.webp';
import styles from './user_show.module.scss';
import buttons from '../buttons.module.scss';
import GameCard from './game_card';
import CreateGameContainer from './create_game_container';

// eslint-disable-next-line react/prefer-stateless-function
class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { createForm: false };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    const { fetchUser } = this.props;
    fetchUser();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  toggleCreate() {
    const { createForm } = this.state;
    this.setState({ createForm: !createForm });
  }

  handleClickOutside(event) {
    if (this.wrapperRef
      && !this.wrapperRef.contains(event.target)) {
      this.setState({ createForm: false });
    }
  }

  render() {
    const { createForm } = this.state;
    const { user } = this.props;
    if (!user) return null;
    return (
      <>
        <div className={createForm ? `${styles.container} ${styles.blurred}` : styles.container}>
          <div className={styles.background}>
            <div className={styles.contentContainer}>
              <div className={styles.profile}>
                <div className={styles.profileImg}>
                  <img src={user.profilePicture} alt="" />
                </div>
                <div>
                  <h1>{user.displayName}</h1>
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
                <div className={styles.topBar}>
                  <h2>My Games</h2>
                  <div>
                    <button type="button" className={`${buttons.secondary} ${buttons.btnIcon}`} onClick={this.toggleCreate}>
                      <i className="ra ra-anvil ra-lg" />
                      <span>
                        Create New Game
                      </span>
                    </button>
                  </div>
                </div>
                <section className={styles.main}>
                  <GameCard
                    game={{
                      title: 'Wayne\'s World',
                      description: 'The example description of Wayne\'s World',
                      thumb: noThumb,
                      online: 4,
                    }}
                  />
                  <GameCard
                    game={{
                      title: 'Dillon\'s World',
                      description: 'The example description of Dillon\'s World',
                      thumb: map,
                      online: 0,
                    }}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
        {createForm ? (
          <div className={styles.modal}>
            <div ref={this.setWrapperRef}>
              <CreateGameContainer />
            </div>
          </div>
        ) : ''}

      </>
    );
  }
}

export default UserShow;
