import React from 'react';
import map from '../../images/battlemap.jpg';
import snow from '../../images/snow_landscape.jpg';
import noThumb from '../../images/noThumb.webp';
import styles from './user_show.module.scss';
import buttons from '../buttons.module.scss';
import GameCard from './game_card';
import CreateGameContainer from './create_game_container';
import EditGameContainer from './edit_game_container';
import CreatePieceContainer from './create_piece_container';
import Piece from "./piece"
import piecesStyle from './pieces_styles.module.scss';
import Pieces from './pieces'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";



// eslint-disable-next-line react/prefer-stateless-function
class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createForm: false,
      createPieceForm: false,
      editGameId: null,
      joinGameId: '',
      active: true,
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleCreatePiece = this.toggleCreatePiece.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.setEditForm = this.setEditForm.bind(this);
    this.joinGame = this.joinGame.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    const { fetchUserGames } = this.props;
    fetchUserGames();
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
  toggleCreatePiece() {
    const { createPieceForm } = this.state;
    this.setState({ createPieceForm: !createPieceForm });
  }

  setEditForm(editGameId) {
    this.setState({ editGameId });
  }

  handleDelete(gameId) {
    const { deleteGame } = this.props;
    return (e) => { deleteGame(gameId); };
  }

  handleClickOutside(event) {
    if (this.wrapperRef
      && !this.wrapperRef.contains(event.target)) {
      this.setState({ createForm: false, createPieceForm: false });
    }
  }

  update(value){
    return (e) => {
      this.setState({[value]: e.currentTarget.value});
    }

  }

  joinGame(){
    this.props.joinGame({userId: this.props.user._id, gameId: this.state.joinGameId})
      .then(() => this.props.history.push(`/client/${this.state.joinGameId}`))
  }

  render() {
    const { createPieceForm, createForm, editGameId, active } = this.state;
    const { user, createdGames, subscribedGames, pieces, deletePiece } = this.props;
    const hrsOld = Math.floor((Date.now() - new Date(user.createdAt)) / 3600000);
    if (!user) return null;
    return (
      <>
        <div className={createForm || editGameId ? `${styles.container} ${styles.blurred}` : styles.container}>
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
                  {createdGames.map((game, i) => (
                    <GameCard index={i} sessionId={user._id} key={game._id} game={game} handleDelete={this.handleDelete} setEditForm={this.setEditForm} />
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

                <hr />

                <div className={styles.topBar}>
                  <h2>Subscribed Games</h2>

                  <div className={styles.joinGameBar}>
                    <p>Enter Game ID:</p>
                    <input type="text" onChange={this.update('joinGameId')} value={this.state.joinGameId} />
                    <button type="button" className={`${buttons.secondary} ${buttons.btnIcon}`} onClick={this.joinGame}>
                      <i className="ra ra-key ra-lg" />
                      <span>
                        Join Game
                      </span>
                    </button>
                  </div>
                </div>

                

                <section className={styles.main}>
                  
                  {subscribedGames.map((game) => (
                    <GameCard key={game._id} game={game} handleDelete={this.handleDelete} setEditForm={this.setEditForm}/>
                  ))}
                  {subscribedGames.length ? '' : (
                    <div className={styles.noSubs}>
                      &quot;I&apos;m Going on an Adventure!&quot;
                    </div>
                  )}
                </section>

                <hr />
                
                <div className={styles.topBar}>
                  <h2 className={piecesStyle.title}>My Pieces <button onClick={() => this.setState({ active: !this.state.active })} className={piecesStyle.chevron}>{active ? <FiChevronDown  /> : <FiChevronUp />}</button></h2>
                  <div>
                    <button type="button" className={`${buttons.secondary} ${buttons.btnIcon}`} onClick={this.toggleCreatePiece}>
                      <i className="ra ra-queen-crown ra-lg" />
                      <span>
                        Create New Piece
                      </span>
                    </button>
                  </div>
                </div>
                <section className={styles.main}>
                  <Pieces creatorId={user._id} pieces={pieces} deletePiece={deletePiece} active={active} />
                </section>

                <hr/>
              </div>
            </div>
          </div>
        </div>

        {createPieceForm ? (
          <div className={styles.modal}>
            <div ref={this.setWrapperRef}>
              <CreatePieceContainer toggleCreatePiece={this.toggleCreatePiece}/>
            </div>
          </div>
        ) : ''}

        {createForm ? (
          <div className={styles.modal}>
            <div ref={this.setWrapperRef}>
              <CreateGameContainer />
            </div>
          </div>
        ) : ''}
        <EditGameContainer active={editGameId} toggleModal={this.setEditForm} gameId={editGameId} />
      </>
    );
  }
}

export default UserShow;
