// import React, { Component } from "react";
// import axios from "axios";

// class App extends Component {
//   state = {
//     users: []
//   };

//   componentDidMount() {
//     axios.get("http://localhost:8000/dev/")
//       .then((res) => {
//         this.setState({
//           users: res.data  // Define os dados dos usuários no estado
//         });
//       })
//       .catch((err) => {
//         console.error("Erro ao comunicar com o servidor!", err);
//       });
//   }

//   render() {
//     return (
//       <div>
//         <ul>
//           {this.state.users.map(user => (
//             <li>{user.userName}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default App;

// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Rota de teste */}
        <Route path="/test" element={<h1>Teste de Rota</h1>} />
        {/* Rota padrão */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;