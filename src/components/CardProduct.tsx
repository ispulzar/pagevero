import React from "react";

interface CardProductProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  size: string[]; // Nueva propiedad para los tamaños
}

const CardProduct: React.FC<CardProductProps> = ({
  title,
  description,
  price,
  imageUrl,
  size, // Recibimos la propiedad size
}) => {
  return (
    <div className="rounded-md m-4 shadow-md overflow-hidden flex flex-row transition-transform duration-500 ease-out hover:scale-105 bg-white">
      <img
        src={imageUrl}
        alt={title}
        className="w-36 h-auto object-cover rounded-t-md"
      />
      <div className="p-4 flex flex-col justify-center">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {/* <p className="text-sm text-gray-600 mb-3">{description}</p> */}
        <div className="text-sm text-gray-500 mb-3">
          {/* Mostrar los tamaños disponibles */}
          <strong>Talla:</strong> {size.join(", ")}
        </div>
        <p className="text-lg font-semibold">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CardProduct;
