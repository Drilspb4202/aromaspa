import React, { createContext, useState, useContext, useEffect } from 'react';
import { Oil } from '@/data/oils';

interface WishlistContextType {
  wishlist: Oil[];
  addToWishlist: (oil: Oil) => void;
  removeFromWishlist: (oilId: string) => void;
  isInWishlist: (oilId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Oil[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (oil: Oil) => {
    setWishlist(prev => {
      if (!prev.some(item => item.id === oil.id)) {
        return [...prev, oil];
      }
      return prev;
    });
  };

  const removeFromWishlist = (oilId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== oilId));
  };

  const isInWishlist = (oilId: string) => {
    return wishlist.some(item => item.id === oilId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
