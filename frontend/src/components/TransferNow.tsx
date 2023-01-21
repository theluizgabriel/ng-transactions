import * as React from 'react';
import { Box, Typography, TextField, Button, AlertTitle,
  Alert, InputAdornment } from "@mui/material";
import MyContext from '../Context';
import { requestData, requestT } from '../services/requests';

export default function TransferNow() {
    const [transfer, setTransfer] = React.useState({ user: '', value: 0 })
    const { 
        errorRegister, 
        setErrorRegister,
        setBalance
    }: any = React.useContext(MyContext)

    const GetBalanceAndUser = async () => {
        const balance = await requestData('/balance')
        setBalance(balance.balance)
    }

    const handleTransfer = async () => {
        const body = {
            creditedAccountUser: transfer.user,
            value: Number(transfer.value)
        }
        try {
            await requestT('/transactions', body)
            setErrorRegister([true, false, 'Perfeito!', `Você transferiu R$${transfer.value} para ${transfer.user}`])
            GetBalanceAndUser()
        } catch (error: any) {
            setErrorRegister([true, true, 'Tem algo errado...', error.response.data.message])
          }
    }
    return (
        <>
            {
            errorRegister[0] && 
            <Alert sx={{mt: 2, mb: 4}} severity={errorRegister[1] ? "error" : "success"}>
                <AlertTitle>{errorRegister[2]}</AlertTitle>
                {errorRegister[3]}
            </Alert>
            }
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt: 2 }}>
            <TextField
            type="text"
            margin="normal"
            label="Quantia"
            name="value"
            autoFocus
            value={transfer.value}
            sx={{mr: 2}}
            fullWidth
            helperText="Coloque apenas números inteiros"
            InputProps={{ 
                startAdornment: <InputAdornment position="start">R$</InputAdornment> ,
                inputMode: "numeric"
            }}
            onChange={(e: any) => setTransfer({ 
                user: transfer.user, 
                value: e.target.value 
            })}
            />
            <TextField
            type="text"
            margin="normal"
            fullWidth
            label="Nome do usuário"
            helperText="Nome exato para quem quer transferir"
            name="value"
            autoFocus
            value={transfer.user}
            sx={{ml: 2}}
            onChange={(e: any) => {
                setTransfer({ user: (e.target.value).toLowerCase(), value: transfer.value })
            }}
            />
        </Box>
            <Button
            
            variant="contained"
            onClick={() => handleTransfer()}
            sx={{ mb: 2, bgcolor: '#000000' }}
            >
            Transferir
            </Button>
            </>
    )
}