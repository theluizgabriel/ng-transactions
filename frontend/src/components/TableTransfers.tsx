import { TableContainer, Table, TableHead, TableRow,
    TableBody, styled, tableCellClasses, TableCell, Typography } from "@mui/material";
import * as React from "react";
import MyContext from "../Context";
import { requestData, requestUserById } from "../services/requests";
import Loading from "./Loading";
import SelectTable from "./SelectTable";


export default function TableTransfers() {
    const { table, isLoading, setIsLoading }: any = React.useContext(MyContext);
    const [arrayTable, setArrayTable] = React.useState([
        {
            creditedAId: 0,
            debitedAId: 0,
            value: 0,
            createdAt: "0"
        }
    ])

    const getAll = async () => {
        try {
            switch(table) {
                case 'all':
                    return await requestData('/transactions');
                case 'foryou':
                    return await requestData('/transactions/cred');
                case 'byyou':
                    return await requestData('/transactions/deb');
            }
        } catch (e: any) {
            console.log(e.error);
        } 
    }

    React.useEffect(() => {
        setIsLoading(true)
        rows()
        }, [table]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: "#ffffff",
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
      function createData(
        debitedAId: string,
        creditedAId: string,
        value: string,
        createdAt: string,
      ) {
        return { debitedAId, creditedAId, value, createdAt };
      }

      const rows = async () => {
        const data = await getAll()
        const array = await data.map(async (a: any) => createData(
            await requestUserById(a.creditedAId),
            await requestUserById(a.debitedAId),
            `R$${a.value}`,
            a.createdAt
        ))
        setArrayTable(await Promise.all(array));
        setIsLoading(false)
      }

    return (
        (arrayTable.length < 1) ? 
        <>
        <SelectTable />
        <Typography>Sem transferências por aqui</Typography>
        </> :
        isLoading ? <Loading /> : <>
        <Typography sx={{ display: "flex", mt: 2, mb: 2, color: "#000000", fontSize: 18 }}>Selecione as transferências que deseja ver</Typography>
        <SelectTable />
        <TableContainer sx={{maxWidth: 600}}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Quem enviou</StyledTableCell>
            <StyledTableCell align="center">Quem recebeu</StyledTableCell>
            <StyledTableCell align="center">Valor</StyledTableCell>
            <StyledTableCell align="center">Data e hora</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayTable.map((tr, ind) => (
            <StyledTableRow key={ind}>
            <StyledTableCell align="center">{tr.creditedAId}</StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {tr.debitedAId}
              </StyledTableCell>
              <StyledTableCell align="center">{tr.value}</StyledTableCell>
              <StyledTableCell align="center">{tr.createdAt}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    );
};