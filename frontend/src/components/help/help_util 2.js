import React from "react"
import styles from "./help.module.scss"

export const howToPlayHelp = (
  <div className={styles.helpText}>
    <h1>How to Play</h1>
    <p>
      Welcome to virtual tabletop, the ultimate table top board game simulator
    </p>
    <p>
      The is the game client. From here you can create and add boards, 
      edit boards, add pieces to the board, and chat with fellow players.
      To set your game up, create a board and align the grid to your desired size.
      After you have set up the board you can add pieces and begin playing. The client will not enforce rules
      for you, thats up to you. Virtual tabletop is a "sandbox" enviornment which means we give you the tools to
      create the game, and the freedom to play it how you want. This allows for any number of different 
      kinds of games to be played.
    </p>
  </div>
)

export const createBoardHelp = (
  <div className={styles.helpText}>
    <h1>How to Create or Edit a Board</h1>
    <p>
      To create a new board click on the <b>"Create A New Board"</b> button in the board widget. 
    </p>
    <p>
      Add the <b>name</b> of the board you want to create and upload your board image. 
    </p>
    <p>
      Input the number of <b>rows and colums</b> you want. <em>HINT: If the background image you 
      are uploading has a grid built into it, you should input the number of rows and columns you see 
      on the image.</em>
    </p>
    <p>
      You can click the <b>lock button</b> next to the width and height to manually override the grid size calculation.
    </p>
    <p>
      Next, you can select the color and opacity of the grid lines.
    </p>
    <p>
      You can click the lock button under background settings to unlock the background and increase or 
      decrease the width and height.
    </p>
    <p>
      Click on <b>"Create Board"</b> to save the board.
    </p>
    <p>
      You can open the <b>settings</b> widget if you want to change this configuration after saving.
    </p>
  </div>
)

export const piecesHelp = (
  <div className={styles.helpText}>
    <h1>How to Add, Edit, Delete, and Use Tokens and Pieces</h1>
    <p>
      When you add a piece to the game it becomes a "token". <em>Pieces can be uploaded at the top of your homepage.</em>
    </p>
    <p>
      To add a token to the game bring your cursor to the bottom of the screen. You will see the <b>token bar</b> appear.
      You can click on one of the pieces and <b>drag it onto the board</b>. Once you drop it onto the board it will 
      become visible to all players.
    </p>
    <p>
      You can move the token by clicking and dragging it to a new square on the grid. Once you drop it 
      the move will be visible to all players.
    </p>
    <p>
      You can <b>delete or edit</b> the token by clicking on the gear icon in the token bar.
    </p>
  </div>
)

export const chatHelp = (
  <div className={styles.helpText}>
    <h1>How to use Chat</h1>
    <p>
      You can send text messages to the other members of the group by opening the chat widget.
      Type your message and press "enter" to send it to your party.
    </p>
    <p>
      Currently, Virtual Tabletop does not support persistent messages so if you leave or refresh your page, you will lose the messages.
      It also does not support attachments at this time. If your game needs more robust messaging, feel free to use <a href="slockify.heroku.com">Slockify</a>.
    </p>
  </div>
)
