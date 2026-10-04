"use client";

import * as React from "react";
import { useDropzone, type DropzoneOptions, type FileRejection } from "react-dropzone";
import { cn } from "@/lib/utils";

export interface DropzoneProps extends Omit<DropzoneOptions, "onDrop"> {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onFilesSelected?: (files: File[]) => void;
  onFilesRejected?: (rejections: FileRejection[]) => void;
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  ({ className, style, children, onFilesSelected, onFilesRejected, ...props }, ref) => {
    const onDrop = React.useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (acceptedFiles.length > 0) {
          onFilesSelected?.(acceptedFiles);
        }
        if (rejectedFiles.length > 0) {
          onFilesRejected?.(rejectedFiles);
        }
      },
      [onFilesSelected, onFilesRejected]
    );

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
      onDrop,
      ...props,
    });

    return (
      <div
        ref={ref}
        {...getRootProps()}
        data-drag-active={isDragActive || undefined}
        data-drag-accept={isDragAccept || undefined}
        data-drag-reject={isDragReject || undefined}
        style={style}
        className={cn(
          "relative rounded-lg border-2 border-dashed transition-all duration-200 cursor-pointer",
          "border-muted-foreground/25 hover:border-muted-foreground/50",
          "data-[drag-active]:border-primary data-[drag-active]:bg-primary/5",
          "data-[drag-accept]:border-green-500 data-[drag-accept]:bg-green-500/5",
          "data-[drag-reject]:border-destructive data-[drag-reject]:bg-destructive/5",
          className
        )}
      >
        <input {...getInputProps()} />
        {children}
      </div>
    );
  }
);

Dropzone.displayName = "Dropzone";

// Utility hook for common dropzone state
function useDropzoneState() {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleFilesSelected = React.useCallback((files: File[]) => {
    const selectedFile = files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);

      // Generate base64 preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const handleFilesRejected = React.useCallback((rejections: FileRejection[]) => {
    const rejection = rejections[0];
    if (rejection) {
      const errorCode = rejection.errors[0]?.code;
      switch (errorCode) {
        case "file-too-large":
          setError("File is too large");
          break;
        case "file-invalid-type":
          setError("Invalid file type");
          break;
        default:
          setError("File rejected");
      }
    }
  }, []);

  const reset = React.useCallback(() => {
    setFile(null);
    setPreview(null);
    setError(null);
  }, []);

  return {
    file,
    preview,
    error,
    setError,
    handleFilesSelected,
    handleFilesRejected,
    reset,
  };
}

export { Dropzone, useDropzoneState };
