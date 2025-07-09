
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useFavorites = (userId?: string) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [userId]);

  const fetchFavorites = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('favorites')
        .select('product_id')
        .eq('user_id', userId);

      if (error) throw error;
      setFavorites(data?.map(fav => fav.product_id) || []);
    } catch (err) {
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (productId: string) => {
    if (!userId) {
      toast.error('Faça login para gerenciar favoritos');
      return;
    }

    try {
      const isFavorited = favorites.includes(productId);

      if (isFavorited) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', userId)
          .eq('product_id', productId);

        if (error) throw error;
        setFavorites(prev => prev.filter(id => id !== productId));
        toast.success('Removido dos favoritos');
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: userId, product_id: productId });

        if (error) throw error;
        setFavorites(prev => [...prev, productId]);
        toast.success('Adicionado aos favoritos');
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      toast.error('Erro ao atualizar favoritos');
    }
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    refetch: fetchFavorites
  };
};
