import React, { useContext } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import MyContext from '../../contexts/MyContext';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const { isLoading, reservas } = useContext(MyContext);

  const lastReserve = reservas
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  return (
    isLoading ? (<Title>Carregando...</Title>) : (
    <React.Fragment>
      <Title>Última reserva</Title>
      <Typography component="p" variant="h4">
        {lastReserve.length ? `R$ ${lastReserve[0].payment}` : '0.00'}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {lastReserve.length ? `em ${lastReserve[0].date}` : '00-00-0000'}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver reserva
        </Link>
      </div>
    </React.Fragment>
    )
  );
}