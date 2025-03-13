import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = () => {
    setIsFullscreen(true); // Expande la imagen en pantalla completa al hacer clic
  };

  return (
    <div>
      <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-lg bg-white">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt="Carousel Slide"
            className="w-full h-72 object-cover rounded-2xl cursor-pointer"
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 100 }}
            transition={{ duration: 0.5 }}
            onClick={handleImageClick}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              className="absolute top-1/2 left-2 p-3 bg-white-900 text-white rounded-full shadow-md hover:bg-white-700 transition"
              onClick={prevSlide}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute top-1/2 right-2 p-3 bg-white-900 text-white rounded-full shadow-md hover:bg-white-700 transition"
              onClick={nextSlide}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        <div className="flex justify-center gap-2 mt-3">
          {images.map((img, index) => (
            <button
              key={index}
              className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex ? "border-blue-500 scale-110" : "border-gray-300"
              }`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
            >
              <img
                src={img}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button className="absolute top-4 right-4 text-white p-3" onClick={() => setIsFullscreen(false)}>
            <X size={32} />
          </button>
          <motion.img
            src={images[currentIndex]}
            alt="Fullscreen Image"
            className="max-w-full max-h-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </div>
      )}
    </div>
  );
};

export default Carousel;
