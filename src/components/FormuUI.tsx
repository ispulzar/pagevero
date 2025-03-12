import React, { useState } from "react";
import { Dropbox } from "dropbox";
import axios from "axios";

// Configura la instancia de Dropbox con tu accessToken
const dbx = new Dropbox({
  accessToken: "TU_ACCESS_TOKEN_AQUI",
});

const FormuUI: React.FC = () => {
  // Estados para los campos del formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [moreImages, setMoreImages] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 1. Subir imagen principal a Dropbox y obtener URL
      let mainImageUrl = "";
      if (image) {
        const uploadResponse = await dbx.filesUpload({
          path: `/Productos/${image.name}`,
          contents: image,
        });
        // Crear un enlace compartido para la imagen subida
        const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
          path: uploadResponse.result.path_display,
        });
        // Ajustamos el enlace para que muestre la imagen directamente
        mainImageUrl = sharedLinkResponse.result.url.replace("?dl=0", "?raw=1");
      }

      // 2. Subir imágenes adicionales a Dropbox y obtener sus URLs
      const moreImagesUrls: string[] = [];
      if (moreImages) {
        for (let i = 0; i < moreImages.length; i++) {
          const file = moreImages[i];
          const uploadResponse = await dbx.filesUpload({
            path: `/Productos/${file.name}`,
            contents: file,
          });
          const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
            path: uploadResponse.result.path_display,
          });
          moreImagesUrls.push(sharedLinkResponse.result.url.replace("?dl=0", "?raw=1"));
        }
      }

      // 3. Construir el objeto producto con la información del formulario
      const newProduct = {
        name,
        description,
        size,
        price: parseFloat(price),
        color,
        image: mainImageUrl,
        more_images: moreImagesUrls,
      };

      // 4. Enviar la información del producto a tu backend para guardarla en MongoDB
      await axios.post("http://localhost:4000/api/products", newProduct);

      alert("Producto creado correctamente");
      // Aquí podrías limpiar el formulario o actualizar el estado de la aplicación

    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Error al crear el producto. Revisa la consola para más detalles.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Talla"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        step="0.01"
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <label className="block">
        Imagen principal:
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImage(e.target.files[0]);
            }
          }}
          className="block mt-2"
          required
        />
      </label>
      <label className="block">
        Más imágenes:
        <input
          type="file"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              setMoreImages(e.target.files);
            }
          }}
          className="block mt-2"
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Crear Producto
      </button>
    </form>
  );
};

export default FormuUI;
