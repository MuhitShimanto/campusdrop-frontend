"use client";

import { useEffect, useState } from "react";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import Image from "next/image";

type Props = {
  onUpload?: (url: string, publicId: string) => void;
};

export default function CloudinaryImageUpload({
  onUpload,
}: Props) {
  const {
    upload,
    uploading,
    progress,
    error,
    result,
    reset,
  } = useCloudinaryUpload();

  const [preview, setPreview] = useState<string | null>(
    null
  );

  async function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    try {
      const uploaded = await upload(file);

      onUpload?.(
        uploaded.eager[0].secure_url,
        uploaded.public_id
      );
    } catch {
      // Error is already handled by the hook.
    }
  }

  function handleReset() {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    reset();
  }

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        disabled={uploading}
      />

      {preview && (
        <div className="relative">
          <Image
            src={preview}
            alt="Preview"
            className="h-64 w-64 rounded-lg object-cover"
          />
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="text-sm">
            Uploading... {progress}%
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {result && !uploading && (
        <div className="space-y-2">
          <p className="text-sm text-green-600">
            Upload complete!
          </p>

          <p className="break-all text-xs text-gray-500">
            {result.secure_url}
          </p>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white"
          >
            Change image
          </button>
        </div>
      )}
    </div>
  );
}
