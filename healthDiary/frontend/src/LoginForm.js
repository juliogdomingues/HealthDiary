import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from "axios";

const Login = () => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [userError, setUserError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    // Busca pelo token no LocalStorage antes de toda request, será colocado no header se houver
    axios.interceptors.request.use(
        config => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers['Authorization'] = 'Token ' + token;
            }
            return config;
        },
        error => {
            Promise.reject(error)
        });


    const loginSubmit = (event) => {
        event.preventDefault()
        console.log("Submitted")

        setUserError(false)
        setPasswordError(false)

        if (user === '') {
            setUserError(true)
        }
        if (password === '') {
            setPasswordError(true)
        }

        if (user && password) {
            console.log(user, password)
            axios.postForm("http://localhost:8000/dev/login/", {
                username: user,
                password: password
            })
            .then(res => {
                localStorage.setItem("accessToken", res.data.token);
                alert("Login realizado com sucesso")
            })
            .catch( error => {
                console.log(error)
            })
        }
    }

    const AuthRequest = (event) => {
        event.preventDefault()
        console.log("Teste de auth")

        axios.get("http://localhost:8000/dev/auth_test/")
        .then(res => {
            console.log(res.data.success)
            alert(res.data.success)
        })
        .catch( error => {
            console.log(error)
            alert(error)
        })
    }

    const LogoutRequest = (event) => {
        event.preventDefault()
        
        //TODO: IMPLEMENTAR REQUEST DE LOGOUT PARA DESCONECTAR USER NO BACKEND
        
        localStorage.clear()
    }

    return (
        <React.Fragment>
            <Card className="LoginCard" elevation={6}>
                <div className="child">
                <form autoComplete="off" onSubmit={loginSubmit}>
                    <h2>Login</h2>
                    <TextField
                        label="Username"
                        onChange={e => setUser(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="user"
                        sx={{ mb: 3 }}
                        fullWidth
                        value={user}
                        error={userError}
                    />
                    <TextField
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="password"
                        value={password}
                        error={passwordError}
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <Button variant="outlined" color="secondary" type="submit">Login</Button>
                </form>
                </div>

                <div className="child">  
                <h2> Opções Adicionais: </h2>
                <Button variant="outlined" color="primary" onClick={AuthRequest}>Testar autenticação</Button>
                </div>  

                <div className="child">  
                <Button variant="outlined" color="primary" onClick={LogoutRequest}>Logout</Button>
                </div>  
            </Card>
        </React.Fragment>
    );
}

export default Login;