import { Logout } from "@mui/icons-material"
import { Button } from "@mui/material"
import { Box } from "@mui/system"
import { useNavigate } from 'react-router-dom';



export default function LogoutAccount () {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.setItem('token', '')
        navigate('/');
    }
    
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            maxWidth: 30,
            mt: 4,
        }}>
        <Button onClick={() => logout()}>
            <Logout 
            color="primary" 
            fontSize="large"
            />
        </Button>
        </Box>
    )
}