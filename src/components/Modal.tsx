import React from "react";
import { motion } from "framer-motion";
import Carousel from "./Carousel";
import { X } from "lucide-react";

interface ModalProps {
  product: {
    name: string;
    image: string;
    price: number;
    more_images: string[];
  };
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ product, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full md:max-w-lg sm:max-w-md max-w-xs relative"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center p-4">
          <Carousel images={[product.image, ...product.more_images]} />
          <h2 className="text-xl font-bold mt-4">{product.name}</h2>
          <p className="mt-2 text-lg font-semibold text-gray-700">
            Precio: ${product.price}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
