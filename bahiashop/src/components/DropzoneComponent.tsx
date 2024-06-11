import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzoneComponentProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const DropzoneComponent: React.FC<DropzoneComponentProps> = ({ onDrop }) => {
  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropAccepted,
    accept: { image: ['.webp'] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      <p>Arrastra y suelta tus imágenes aquí, o haz clic para seleccionar imágenes (SOLO FORMATO .WEBP)</p>
    </div>
  );
};

export default DropzoneComponent;
