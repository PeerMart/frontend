import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useIpfs, useToast } from '../context';

interface ImageUploadProps {
  onUpload: (ipfsHash: string | null) => void;
  maxSize?: number; // in MB
}

export interface ImageUploadRef {
  clearImage: () => void;
}

interface UploadedImage {
  file: File;
  ipfsHash?: string;
  preview: string;
  uploading: boolean;
  error?: string;
}

export const ImageUpload = forwardRef<ImageUploadRef, ImageUploadProps>(({ onUpload, maxSize = 10 }, ref) => {
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { upload } = useIpfs();

  const clearImage = () => {
    if (image) {
      URL.revokeObjectURL(image.preview);
      setImage(null);
      onUpload(null);
    }
  };

  useImperativeHandle(ref, () => ({
    clearImage
  }));

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Only image files are allowed';
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }
    return null;
  };

  const handleFile = async (file: File) => {
    const error = validateFile(file);

    if (error) {
      toast.show({ severity: 'error', summary: 'Invalid file', detail: error });
      return;
    }

    // Clear any existing image
    if (image) {
      URL.revokeObjectURL(image.preview);
    }

    const preview = URL.createObjectURL(file);
    const newImage: UploadedImage = {
      file,
      preview,
      uploading: true
    };

    setImage(newImage);

    // Start uploading to IPFS
    try {
      const ipfsHash = await upload(file);

      setImage((prev) => (prev ? { ...prev, ipfsHash, uploading: false } : null));

      // Notify parent component
      onUpload(ipfsHash);
    } catch (error) {
      setImage((prev) => (prev ? { ...prev, uploading: false, error: 'Upload failed' } : null));

      toast.show({
        severity: 'error',
        summary: 'Upload failed',
        detail: `Failed to upload ${file.name}`
      });

      // Notify parent of failure
      onUpload(null);
    }
  };

  const handleFiles = async (files: FileList) => {
    if (files.length > 0) {
      await handleFile(files[0]); // Only handle first file
    }
  };

  const removeImage = () => {
    clearImage();
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragging ? 'border-primary bg-primary/5' : 'border-border bg-muted/20 hover:border-primary/50'
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <i className={`pi pi-cloud-upload text-4xl mb-4 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
        <p className="text-muted-foreground">
          {isDragging ? 'Drop image here' : 'Drop product image here or click to browse'}
        </p>
        <p className="text-sm text-muted-foreground mt-2">Supports: JPG, PNG (Max {maxSize}MB)</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />

      {/* Uploaded Image */}
      {image && (
        <div className="relative group max-w-xs">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img src={image.preview} alt="Upload" className="w-full h-full object-cover" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                icon="pi pi-times"
                className="p-button-rounded p-button-danger p-button-text"
                onClick={removeImage}
                disabled={image.uploading}
              />
            </div>

            {/* Upload Progress */}
            {image.uploading && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-white text-center">
                  <i className="pi pi-spin pi-spinner text-2xl mb-2" />
                  <p className="text-sm">Uploading to IPFS...</p>
                </div>
              </div>
            )}

            {/* Success Indicator */}
            {image.ipfsHash && !image.uploading && (
              <div className="absolute top-2 right-2">
                <i className="pi pi-check-circle text-green-500 bg-white rounded-full" />
              </div>
            )}

            {/* Error Indicator */}
            {image.error && (
              <div className="absolute top-2 right-2">
                <i className="pi pi-times-circle text-red-500 bg-white rounded-full" />
              </div>
            )}
          </div>

          {/* File Name */}
          <p className="text-sm text-muted-foreground mt-1 truncate">{image.file.name}</p>

          {/* IPFS Hash */}
          {image.ipfsHash && <p className="text-xs text-green-600 font-mono truncate">{image.ipfsHash}</p>}

          {/* Error Message */}
          {image.error && <Message severity="error" text={image.error} className="mt-1 p-1 text-xs" />}
        </div>
      )}
    </div>
  );
});
