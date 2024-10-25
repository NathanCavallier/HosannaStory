import React from "react";
import { useState } from "react";
import "./carousel.css";
import Image from "next/image";

interface CarouselProps {
    images: string[];
}

const Images = [
    "https://via.placeholder.com/800x400",
    "https://via.placeholder.com/800x400",
    "https://via.placeholder.com/800x400",
    "https://via.placeholder.com/800x400",
];

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="carousel">
            <button onClick={handlePrev}>Previous</button>
            <Image src={Images[currentIndex]} alt={`Slide ${currentIndex}`} />
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default Carousel;