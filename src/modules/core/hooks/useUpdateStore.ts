import { useState } from 'react';
import { StoreService, StoreDto } from '../services/profileService';

const storeService = new StoreService();

export const useUpdateStore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateStore = async (
    id: string,
    data: Partial<StoreDto>
  ): Promise<StoreDto | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedStore = await storeService.update(id, data);
      return updatedStore;
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateStore: handleUpdateStore,
    loading,
    error,
  };
};
