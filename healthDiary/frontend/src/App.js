import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get("http://localhost:8000/dev/")
      .then((res) => {
        this.setState({
          users: res.data  // Define os dados dos usuários no estado
        });
      })
      .catch((err) => {
        console.error("Erro ao comunicar com o servidor!", err);
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.users.map(user => (
            <li>{user.userName}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
