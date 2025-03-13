import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import OptimizedImage from './OptimizedImage';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
          variant="ghost"
        >
          <X className="h-6 w-6" />
        </Button>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute -top-12 right-0 text-white hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="relative aspect-square">
          <OptimizedImage
            src={src}
            alt={alt}
            width={800}
            height={800}
            className="w-full h-full object-contain rounded-lg"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
}

