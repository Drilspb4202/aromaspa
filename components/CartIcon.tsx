import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CartIconProps {
  itemCount: number;
  onClick: () => void;
}

export default function CartIcon({ itemCount, onClick }: CartIconProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-full p-3 shadow-lg"
      variant="default"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {itemCount}
        </span>
      )}
    </Button>
  );
}
