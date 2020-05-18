# Virtual Tabletop

Virtual Tabletop is a sandbox to simulate grid-based tabletop enviornments. A live version of the application can be found [here](https://virtualtabletop.herokuapp.com/). This app is still a work-in-progress but has working CRUD operations along with the use of websockets and image upload to AWS. This project was created by Dias Iskrayev, Dillon Rice, Steven Touba, and Wayne Su.

The project was built with the MERN stack and uses a combination of API calls and websockets to update the game players of changes to the game in real time. Examples of how user actions flow from the frontend to the backend are included below.

![Action Flow](https://i.imgur.com/Ov2BxIm.png)



## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install foobar.

```bash
npm install
```
You will need to add your own keys for the AWS and MongoDB integration. Please see the config folder.

This project uses:
  * aws-sdk
  * axios
  * bcryptjs
  * body-parser
  * concurrently
  * express
  * form-data
  * jsonwebtoken
  * jwt-decode
  * mongoose
  * multer
  * multer-s3
  * node-sass
  * passport
  * passport-jwt
  * react
  * react-dom
  * react-icons
  * react-redux
  * react-router-dom
  * react-scripts
  * redux
  * redux-logger
  * redux-thunk
  * rpg-awesome
  * socket.io
  * socket.io-client
  * validator

## Usage

To create an account use the "Sign up" button on the splash page. Upon successful account creation you will be redirected to your user page where you can create games and upload pieces. You may click "Create Game" to start a new game. You will be taken to the game view where you can create game boards and overlay a grid on top of them. You can adjust the size of the grid to match any gridlines that appear in the background image. After you create a board you will be able to place pieces on the board and change their position. The position changes (or any changes to the game for that matter) are then communicated through websockets to all other players. You can also change the current board.

Your game state will be posted to the server after every change.

## Contributing
Contributions to the project are currently closed, but we are considering opening them in the future. If you would like to make a contribution please email Dillon Rice - dillon.m.rice@gmail.com
