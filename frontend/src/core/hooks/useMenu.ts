import { useEffect, useState } from 'react';
import { obtenerMenu } from '../../services/menu.service';
import type  { MenuItem } from '../../models/Menu';

export const useMenu = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerMenu()
      .then(setMenu)
      .finally(() => setLoading(false));
  }, []);

  return { menu, loading };
};