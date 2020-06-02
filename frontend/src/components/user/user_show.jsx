import React from 'react';
import map from '../../images/battlemap.jpg';
import snow from '../../images/snow_landscape.jpg';
import noThumb from '../../images/noThumb.webp';
import styles from './user_show.module.scss';
import buttons from '../buttons.module.scss';
import GameCard from './game_card';
import CreateGameContainer from './create_game_container';
import Piece from "./piece"

// eslint-disable-next-line react/prefer-stateless-function
class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { createForm: false };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleDelete(gameId) {
    const { deleteGame } = this.props;
    return (e) => { deleteGame(gameId); };
  }

  handleClickOutside(event) {
    if (this.wrapperRef
      && !this.wrapperRef.contains(event.target)) {
      this.setState({ createForm: false });
    }
  }

  render() {
    const { createForm } = this.state;
    const { user, createdGames, subscribedGames } = this.props;
    const hrsOld = Math.floor((Date.now() - new Date(user.createdAt)) / 3600000);
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
                  <span>
                    Level
                    {' '}
                    {hrsOld}
                    {' '}
                    Novice
                  </span>
                </div>
                <div className={styles.stats}>
                  <div>
                    <h1>{createdGames.length}</h1>
                    Created Games
                  </div>
                  <div>
                    <h1>{subscribedGames.length}</h1>
                    Subscribed Games
                  </div>
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.topBar}>
                  <h2>Created Games</h2>
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
                  {createdGames.map((game) => (
                    <GameCard game={game} handleDelete={this.handleDelete} />
                  ))}
                  {createdGames.length ? '' : (
                    <div className={styles.noGames} onClick={this.toggleCreate}>
                      Glory awaits for
                      {' '}
                      {user.displayName}
                      {', '}
                      <u>Create a Game</u>
                    </div>
                  )}

                </section>

                <div className={styles.topBar}>
                  <h2>Subscribed Games</h2>
                </div>

                <section className={styles.main}>
                  {subscribedGames.map((game) => (
                    <GameCard game={game} />
                  ))}
                  {subscribedGames.length ? '' : (
                    <div className={styles.noSubs}>
                      &quot;I&apos;m Going on an Adventure!&quot;
                    </div>
                  )}
                </section>
{/*                   
                <section className={styles.main}> 
                    {this.props.pieces.map((piece) => (
                      <Piece />
                    ))}
                </section> */}


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
