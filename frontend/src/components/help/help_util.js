import React from "react"
import styles from "./help.module.scss"

export const howToPlayHelp = (
  <div className={styles.helpText}>
    <h1>How to Play</h1>
    <p>
      Welcome to virtual tabletop, the ultimate table top board game simulator
    </p>
    <p>
      The is the game client. From here you will be able to create and add boards to your game, 
      edit boards, add pieces to the board, and chat with fellow players. \n
      To set your game up, create a board and align the grid to your desired size. \n
      After you have set up the board you can add pieces and being playing. The client will not enforce rules
      for you, thats up to you. Virtual tabletop is a "sandbox" enviornment which means we give you the tools to
      create the game, but its up to you and your players to enforce the rules. This allows for any number of different 
      kinds of games to be played.
    </p>
  </div>
)

export const createBoardHelp = (
  <div className={styles.helpText}>
    <h1>How to Create or Edit a Board</h1>
    <p>
      To create a new board click on the "Add new board" button in the board widget. 
    </p>
    <p>
      Add the name of the board you want to create. 
    </p>
    <p>
      Input the number of rows and colums you want. HINT: If the background image you 
      are uploading has a grid built into it, you should input the number of rows and columns you see 
      on the image.
    </p>
    <p>
      You can click the lock button next to the width and height to manually override the grid calculation
    </p>
    <p>
      Next, you can select the color and opacity of the grid lines.
    </p>
    <p>
      You can click the lock button under background settings to unlock the background and increase or 
      decrease the width and height.
    </p>
    <p>
      Click on "Create Board" to save the board.
    </p>
    <p>
      You can open the settings widget if you want to change this configuration after saving.
    </p>
  </div>
)

export const piecesHelp = (
  <div className={styles.helpText}>
    <h1>How to Add, Edit, Delete, and Use Tokens and Pieces</h1>
    <p>
      When you add a piece to the game it becomes a "Token". Pieces can be uploaded at the top of your homepage.
    </p>
    <p>
      To add a token to the game bring your cursor to the bottom of the screen. You will see the token bar appear.
      You can click on one of the pieces and drag it onto the board. Once you drag and drop it onto the board it will 
      become visible to all players.
    </p>
    <p>
      You can move the token by clicking it on the board and dragging it to a new square on the grid. Once you drop it 
      the move will be visible to all players.
    </p>
    <p>
      You can delete or edit the token by clicking on the guillotine icon in the token bar.
    </p>
  </div>
)

export const chatHelp = (
  <div className={styles.helpText}>
    <h1>How to use Chat</h1>
    <p>
      When you add a piece to the game it becomes a "Token". Pieces can be uploaded at the top of your homepage.
    </p>
    <p>
      To add a token to the game bring your cursor to the bottom of the screen. You will see the token bar appear.
      You can click on one of the pieces and drag it onto the board. Once you drag and drop it onto the board it will 
      become visible to all players.
    </p>
    <p>
      You can move the token by clicking it on the board and dragging it to a new square on the grid. Once you drop it 
      the move will be visible to all players.
    </p>
    <p>
      You can delete or edit the token by clicking on the guillotine icon in the token bar.
    </p>
  </div>
)
