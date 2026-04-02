import { useEffect } from 'react';
import { getTest } from '../services/test.service';

export default function Test() {
  useEffect(() => {
    getTest()
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }, []);

  return <h1>Probando conexión...</h1>;
}