import React from "react";
import baseFace from "@/app/images/face.png";
import Image from "next/image";

interface FacePreviewProps {
  eyes?: string | null;
  nose?: string | null;
  mouth?: string | null;
}

const FacePreview: React.FC<FacePreviewProps> = ({ eyes, nose, mouth }) => {
  return (
    <div className="relative w-full h-full bg-transparent">
      {/* Base Face */}
      <Image
        src={baseFace}
        alt="Base Face"
        className="w-full h-full object-contain grayscale"
        layout="responsive"
        width={900}
        height={900}
      />

      {/* Eyes */}
      {eyes && (
        <Image
          src={eyes}
          alt="Eyes"
          className={`absolute grayscale 
            top-[40%] left-[37.5%] w-[24%] h-auto 
            sm:top-[40%] sm:left-[37.5%] sm:w-[24%]
            md:top-[40%] md:left-[37.5%] md:w-[25%]
            lg:top-[40%] lg:left-[37.5%] lg:w-[25.5%]
            xl:top-[40%] xl:left-[37.5%] xl:w-[25%]`}
          layout="fixed"
          width={400}
          height={100}
        />
      )}

      {/* Nose */}
      {nose && (
        <Image
          src={nose}
          alt="Nose"
          className={`absolute grayscale 
            top-[52%] left-[39%] w-[23%] h-auto 
            sm:top-[52%] sm:left-[39%] sm:w-[23%]
            md:top-[52%] md:left-[39%] md:w-[23%]
            lg:top-[52%] lg:left-[39%] lg:w-[23.2%]
            xl:top-[52%] xl:left-[39%] xl:w-[22%]`}
          layout="fixed"
          width={400}
          height={100}
        />
      )}

      {/* Mouth */}
      {mouth && (
        <Image
          src={mouth}
          alt="Mouth"
          className={`absolute grayscale
            top-[62%] left-[41%] w-[20%] h-auto 
            sm:top-[62%] sm:left-[41%] sm:w-[20%]
            md:top-[63%] md:left-[40%] md:w-[21%]
            lg:top-[63%] lg:left-[41%] lg:w-[21%]
            xl:top-[63%] xl:left-[41%] xl:w-[20%]`}
          layout="fixed"
          width={400}
          height={100}
        />
      )}
    </div>
  );
};

export default FacePreview;
