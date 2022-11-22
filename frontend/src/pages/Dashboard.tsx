import * as React from 'react';
import { Box, CssBaseline, Grid, Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";
 import { useNavigate } from 'react-router-dom';
 import { Copyright } from "./Login";
 import { setToken } from '../services/requests';
import TransferNow from '../components/TransferNow';
import MyContext from '../Context';
import { requestData } from '../services/requests';
import Transfers from '../components/Transfers';
import LogoutAccount from '../components/LogoutAccount';

export default function Dashboard() {
    const [page, setPage] = React.useState('agora')
    const {
        username, 
        setUsername, 
        setErrorRegister,
        balance, 
        setBalance
    }: any = React.useContext(MyContext)

    const navigate = useNavigate()

    const GetBalanceAndUser = async () => {
        const balance = await requestData('/balance')
        setBalance(balance.balance)
        setUsername(balance.username)
    }

    React.useEffect(() => {
    (async () => {
        const token = localStorage.getItem('token') || '';
        if (!token) return navigate('/');
        setToken(token);
        GetBalanceAndUser()
    })();
    }, [navigate]);

    return (
        
    <Grid container component="main" sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
        }}>
        <CssBaseline />
        <Typography variant="h2" sx={{ fontFamily: 'Bebas Neue', display: "flex", mt: 10, color: "secondary.main" }}>Dashboard</Typography>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "secondary.main", 
            width: '70%',
            height: '70%',
            borderRadius: 5,
            pb: 7,
        }}>
            <LogoutAccount />
            <Typography sx={{ fontFamily: 'Alfa Slab One', fontSize: 28, mt: 3 }}>
                Olá {username.toUpperCase()}, você tem R$ {balance},00
            </Typography>
            <ToggleButtonGroup
            sx={{ mt: 3, mb: 2, display: 'flex', alignContent: 'center' }}
            color="primary"
            value={ page }
            exclusive
            onChange={ (e: any) => {
                setPage(e.target.value)
                setErrorRegister([false])
            } }
            aria-label="Platform"
            >
            <ToggleButton value="agora">Transferir agora</ToggleButton>
            <ToggleButton value="feitas">Transferências feitas</ToggleButton>
            </ToggleButtonGroup>
            {(page === 'agora') ? <TransferNow /> : <Transfers />}
        </Box>
        <Copyright sx={{ mt: 5, mb: 4, color: '#ffffff' }} />
    </Grid>
    );
  }