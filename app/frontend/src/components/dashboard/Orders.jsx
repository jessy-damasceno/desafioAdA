import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import MyContext from '../../contexts/MyContext';

export default function Orders() {
  const { reservas } = useContext(MyContext);

  const lastReservas = reservas.sort((a, b) => Date.parse(b.date) - Date.parse(b.date)).slice(0, 5);
  console.log(lastReservas);
  return (
    <React.Fragment>
      <Title>Reservas mais recentes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Check-in</TableCell>
            <TableCell>Check-out</TableCell>
            <TableCell>Portal</TableCell>
            <TableCell align="right">Preço</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lastReservas.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.checkIn}</TableCell>
              <TableCell>{row.checkOut}</TableCell>
              <TableCell>{row.portal}</TableCell>
              <TableCell align="right">{`R$ ${row.total}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}