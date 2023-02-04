/* eslint-disable no-undef */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import useFetch from '../hooks/useFetch';

export default function Provider({ children }) {
  const { isLoading, contas, reservas } = useFetch();

  const [contasFiltradas, setContasFiltradas] = useState(contas);
  const [reservasFiltradas, setReservasFiltradas] = useState(reservas);

  const contextValue = {
    // states
    contasFiltradas,
    contas,
    reservas,
    reservasFiltradas,
    isLoading,
    setContasFiltradas,
    setReservasFiltradas,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
