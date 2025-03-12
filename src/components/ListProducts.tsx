import React, { useState } from "react";
import { Products, Product } from "../data";
import CardProduct from "./CardProduct";
import Modal from "./Modal"; // Nuevo componente para el modal

const ListProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = Products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col relative items-center mt-11 w-full">
      <input
        type="text"
        placeholder="Buscar productos..."
        className="mx-auto w-full text-center sticky top-4 z-10 max-w-56 sm:max-w-sm m-4 p-3 border rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:max-w-md gap-4 p-3 w-full">
        {filteredProducts.map((product) => (
          <div key={product.id} onClick={() => setSelectedProduct(product)}>
            <CardProduct
              description={product.name}
              imageUrl={product.image}
              price={product.price}
              title={product.name}
            />
          </div>
        ))}
      </div>
      {selectedProduct && (
        <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default ListProducts;
