import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const FileInput = () => {
  const classes = useStyles();
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <>
      <Input
        accept="*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Selecionar arquivo
        </Button>
      </label>
      {file && <p>Arquivo selecionado: {file.name}</p>}
    </>
  );
};

export default FileInput;
