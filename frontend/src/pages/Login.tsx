import { requestLR, setToken } from '../services/requests';
import * as React from 'react';
import { Button, CssBaseline, TextField, Box, Typography, Container, Grid,
  Alert, AlertTitle } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Navigate } from 'react-router-dom';
import MyContext from '../Context';

export function Copyright(props: any) {
  return (
    <Typography variant="body2" color="secondary.main" align="center" {...props}>
      {'Copyright © Luiz Gabriel '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const { username, setUsername, password, setPassword }: any = React.useContext(MyContext)
  const [errorRegister, setErrorRegister] = React.useState([false, true, '', ''])
  const [isLogged, setIsLogged] = React.useState(false)

  React.useEffect(() => {
    (async () => {
        const token = localStorage.getItem('token') || '';
        if (token) setIsLogged(true)
    })();
    }, []);

  const handleSubmitRegister = async () => {
    try { 
      await requestLR('/register', { username, password });
      setErrorRegister([true, false, 'Perfeito!', 'O usuário foi registrado com sucesso!'])
    } catch (error: any) {
      setErrorRegister([true, true, 'Tem algo errado...', error.response.data.message])
    }
  };

  const handleSubmitLogin = async () => {
    try { 
      const { token } = await requestLR('/login', { username, password });

      setToken(token);

      localStorage.setItem('token',  token);
      setIsLogged(true)
    } catch (error: any) {
      setErrorRegister([true, true, 'Tem algo errado...', error.response.data.message])
    }
  };

  if (isLogged) {
    return <Navigate to="/dashboard" />} ;

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={true}
        >
          <Box sx={{
            color: "secondary.main",
            my: "25%",
            mx: "25%",
            }}>
          <Typography variant="h5">Seja bem-vindo a</Typography>
          <Typography variant="h1" sx={{fontFamily: 'Bebas Neue', mt: -1}}>Nova</Typography>
          <Typography variant="h1" sx={{fontFamily: 'Bebas Neue', mt: -3, mb: 4}}>Geração</Typography>
          {/* <Typography variant="h4" sx={{ textAlign: 'center'}}>Segurança --- Conectividade --- Rapidez</Typography> */}
          </Box>
          </Grid>
        <Grid item md={5} sx={{backgroundColor: 'secondary.main'}} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: '15%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Container component="main" maxWidth="xs">
        <CssBaseline />
          {errorRegister[0] && <Alert sx={{mb: 4}} severity={errorRegister[1] ? "error" : "success"}>
          <AlertTitle>{errorRegister[2]}</AlertTitle>
            {errorRegister[3]}
            </Alert>}
        <Box
          sx={{
            borderRadius: 3,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img 
          src='https://i.imgur.com/J7cF6QS.png' 
          alt='Logo da NG Cash' 
          width='120px'
          style={{borderRadius: 4}}
          />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ mt: 5 }}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => handleSubmitLogin()}
              sx={{ mt: 5, mb: 2 }}
            >
              Logar
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleSubmitRegister()}
              sx={{ mb: 2, bgcolor: '#000000' }}
            >
              Registrar
            </Button>
        </Box>
        <Copyright sx={{ mt: 5, mb: 4, color: '#000000' }} />
      </Container>
            </Box>
        </Grid>
      </Grid>
  );
}