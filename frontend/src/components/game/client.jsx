import React from 'react';

class Client extends React.Component {
  componentDidMount() {
    const { fetchGame } = this.props;
    // set up sockets
    // fetchGame();
  }

  render() {
    return (
      <div>
        This is the Client
      </div>
    );
  }
}

export default Client;
