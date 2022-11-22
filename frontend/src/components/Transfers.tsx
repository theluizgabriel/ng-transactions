import { Box, FormControl } from "@mui/material";
import TableTransfers from '../components/TableTransfers';

export default function Transfers() {
    return (
        <>
        <Box sx={{ display: "flex", mb: 3, mt: 2 }}>
            <FormControl fullWidth>
                <TableTransfers />
            </FormControl>
        </Box>
            </>
    )
}