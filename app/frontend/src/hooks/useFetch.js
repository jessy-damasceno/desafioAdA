import { useEffect, useState } from 'react';
import { requestData } from '../services/requests';

// fetch API
const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [contas, setContas] = useState([]);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchContas = await requestData('/contas');
      const fetchReservas = await requestData('/reservas');

      console.log('conta', fetchContas[0]);
      console.log('reserva', fetchReservas[0]);

      setContas(fetchContas);
      setReservas(fetchReservas);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { isLoading, contas, reservas };
};

export default useFetch;
