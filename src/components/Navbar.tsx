import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className=" p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold">Pistacho</div>

        <div className="flex space-x-4">
          <a
            href="https://wa.me/+584246960639?text=¡Hola!%20Estoy%20interesado%20en%20alguno%20de%20tus%20productos" // Reemplaza 'tu_numero_de_telefono' por tu número de WhatsApp
            className="text-black hover:text-green-500"
            target="_blank" // Abre en una nueva pestaña
            rel="noopener noreferrer" // Mejora la seguridad al abrir en una nueva pestaña
          >
            <FaWhatsapp className="w-7 h-7" />
          </a>
          <a
            href="https://www.instagram.com/pistacho.ven/"
            className="text-black hover:text-red-300"
            target="_blank" // Abre en una nueva pestaña
            rel="noopener noreferrer" // Mejora la seguridad al abrir en una nueva pestaña
          >
            <FaInstagram className="w-7 h-7" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
