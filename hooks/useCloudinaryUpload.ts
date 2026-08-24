'use client'

import {
  useCallback,
  useState,
} from 'react'

import {
  uploadToCloudinary,
  type CloudinaryUploadResult,
} from '@/lib/cloudinary'

export type UploadStatus =
  | 'idle'
  | 'uploading'
  | 'done'
  | 'error'

export function useCloudinaryUpload() {
  const [status, setStatus] =
    useState<UploadStatus>('idle')

  const [progress, setProgress] =
    useState(0)

  const [error, setError] =
    useState<string | null>(null)

  const [result, setResult] =
    useState<CloudinaryUploadResult | null>(null)

  const upload = useCallback(
    async (file: File) => {
      setStatus('uploading')
      setProgress(0)
      setError(null)
      setResult(null)

      try {
        const uploaded =
          await uploadToCloudinary(
            file,
            setProgress
          )

        setProgress(100)
        setResult(uploaded)
        setStatus('done')

        return uploaded
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Upload failed. Try again.'

        setError(message)
        setStatus('error')

        throw error
      }
    },
    []
  )

  const reset = useCallback(() => {
    setStatus('idle')
    setProgress(0)
    setError(null)
    setResult(null)
  }, [])

  return {
    upload,

    reset,

    status,

    uploading: status === 'uploading',

    progress,

    error,

    result,

    url: result?.secure_url ?? null,

    publicId: result?.public_id ?? null,
  }
}


/** Response Object from Cloudinary API for a successful image upload
 * {
    "asset_id": "1cc2c7de7e1e8ba90a5e661189ee1b7c",
    "public_id": "pexels-diva-30558326_xcs0yc",
    "version": 1787561315,
    "version_id": "48c28edf40d411ec2e6395b87e3a2f94",
    "signature": "bd0cb3060496b640c4c783160d66095bc4ea0dad",
    "width": 2000,
    "height": 1333,
    "format": "jpg",
    "resource_type": "image",
    "created_at": "2026-08-24T08:48:35Z",
    "tags": [],
    "bytes": 353770,
    "type": "upload",
    "etag": "bd13345cef4e6277c5908dd2c190f8e1",
    "placeholder": false,
    "url": "http://res.cloudinary.com/djnomkrig/image/upload/v1787561315/pexels-diva-30558326_xcs0yc.jpg",
    "secure_url": "https://res.cloudinary.com/djnomkrig/image/upload/v1787561315/pexels-diva-30558326_xcs0yc.jpg",
    "asset_folder": "campusdrop",
    "display_name": "pexels-diva-30558326",
    "existing": false,
    "original_filename": "pexels-diva-30558326",
    "eager": [
        {
            "transformation": "f_auto,q_auto",
            "width": 2000,
            "height": 1333,
            "bytes": 352620,
            "format": "jpg",
            "url": "http://res.cloudinary.com/djnomkrig/image/upload/f_auto,q_auto/v1787561315/pexels-diva-30558326_xcs0yc.jpg",
            "secure_url": "https://res.cloudinary.com/djnomkrig/image/upload/f_auto,q_auto/v1787561315/pexels-diva-30558326_xcs0yc.jpg"
        }
    ]
}
 * 
 */