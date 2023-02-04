import React, { useContext, useState } from 'react';
import MyContext from '../contexts/MyContext';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

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
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'reserve', headerName: 'Reserva', width: 80 },
  { field: 'type', headerName: 'Tipo', width: 120 },
  { field: 'property', headerName: 'Propriedade', width: 120, type: 'number' },
  {
    field: 'dueDate',
    headerName: 'Vencimento',
    type: 'date',
    width: 120,
  },
  { field: 'price', headerName: 'Valor', width: 120, ...brPrice },
];

export default function DataTable() {
  const { contas } = useContext(MyContext);
  const [selectedRows, setSelectedRows] = useState([]);
  const classes = useStyles();

  const handleRowSelection = (rows) => {
    setSelectedRows(rows);
  };

  const handleExport = () => {
    const selectedData = contas.filter((row, index) => selectedRows.includes(index));
  
    const csvData = selectedData.map(row => Object.values(row).join(",")).join("\n");
  
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "selected-data.csv";
    link.click();
  };

  return (
      <div style={{ width: '70%', margin: 'auto', maxWidth: '720px' }}>
        <DataGrid
          rows={contas}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[25]}
          checkboxSelection
          autoHeight
          rowHeight={70}
          onRowClick={handleRowSelection}
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
        <Stack spacing={2} direction="row">
          <Link to='/dashboard'>
            <Button variant="contained" disableElevation>
              VOLTAR ao Dashboard
            </Button>
          </Link>
          <Tooltip title="Clique aqui para exportar as linhas selecionadas em .csv">
            <Button className={classes.button} variant="outlined" onClick={handleExport}>Gerar Relatório</Button>
          </Tooltip>
        </Stack>
      </div>
  );
}