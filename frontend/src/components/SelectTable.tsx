import { Select, MenuItem } from "@mui/material"
import { useContext } from "react"
import MyContext from "../Context"


export default function SelectTable() {
    const {table, setTable}: any = useContext(MyContext)
    return (
        <Select
        sx={{boxDecorationBreak: "slice", mb: 2 }}
        labelId="select-label"
        id="simple-select"
        defaultValue="all"
        value={table}
        onChange={(e) => setTable(e.target.value)}
        >
            <MenuItem value="all">Todas</MenuItem>
            <MenuItem value="foryou">Para você</MenuItem>
            <MenuItem value="byyou">De você</MenuItem>
        </Select>
    )
}