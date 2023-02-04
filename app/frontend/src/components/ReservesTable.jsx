import React, { useContext, useState } from 'react';
import { createBrowserHistory } from 'history';
import MyContext from '../contexts/MyContext';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import api from '../services/requests';
import Papa from 'papaparse';


const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const brPrice = {
  type: 'number',
  width: 120,
  valueFormatter: ({ value }) => currencyFormatter.format(value),
  cellClassName: 'font-tabular-nums',
};

const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  {
    field: 'checkIn', headerName: 'Check-in', width: 120
  },
  { field: 'checkOut', headerName: 'Check-out', width: 120 },
  { field: 'locality', headerName: 'Localidade', width: 180 },
  { field: 'property', headerName: 'Propriedade', width: 120 },
  { field: 'portal', headerName: 'Portal', width: 120 },
  { field: 'pending', headerName: 'Pendente', valueFormatter: (e) => e.pending ? 'Sim' : 'Não', width: 100 },
  { field: 'total', headerName: 'Total', ...brPrice },
  { field: 'payment', headerName: 'Pagamento', ...brPrice },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'
  },
  button: {
    margin: theme.spacing(2),
  },
}));

export default function DataTable() {
  const { reservas } = useContext(MyContext);
  const classes = useStyles();

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const history = createBrowserHistory();

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async () => {
    if (!file) {
      setError('Selecione um arquivo antes de continuar');
      return;
    }

    try {
      const csvData = await Papa.parse(file, { header: true });
      const jsonData = csvData.data;

      await api.post('/reservas', jsonData).then((response) => {
        if (response.status === 201) {
          history.push('/');
        }
      });
    } catch (err) {
      setError(err.message);
    }
  }

console.log(reservas[0]);
return (
  <>
    <div style={{ width: '100%', margin: 'auto' }}>
      <DataGrid
        rows={reservas}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[25]}
        checkboxSelection
        autoHeight
        rowHeight={70}
        autoSize
        density='compact'
        rowSpacingType='border'
        sx={{
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '&.MuiDataGrid-root': {
            border: 'none',
          },
        }}
      />
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Link to='/dashboard' className={classes.button}>
            <Button variant="contained">
              voltar ao Dashboard
            </Button>
          </Link>
          <Input
            accept="*"
            className={classes.button}
            id="contained-button-file"
            type="file"
            onChange={onChange}
          />
          <label className={classes.button}>
            <Button variant="contained" component="span" onClick={onSubmit}>
              ENVIAR ARQUIVO
            </Button>
          </label>
          {file && <p>Arquivo selecionado: {file.name}</p>}
          {error && <p>{error}</p>}
        </Grid>
      </Grid>
    </div>
  </>
)}