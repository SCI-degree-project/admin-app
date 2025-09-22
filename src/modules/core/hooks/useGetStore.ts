import { useState } from 'react';
import { StoreService, StoreDto } from '../services/profileService';

const storeService = new StoreService();

export const useGetStore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetStore = async (id: string): Promise<StoreDto | null> => {
    setLoading(true);
    setError(null);
    try {
      const store = await storeService.findById(id);
      return store;
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getStore: handleGetStore,
    loading,
    error,
  };
};
