export type CloudinaryUploadResult = {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  asset_folder: string
  display_name: string
  existing: boolean
  original_filename: string
  eager: CloudinaryEagerResult[]
}

export type CloudinaryEagerResult = {
  transformation: string
  width: number
  height: number
  bytes: number
  format: string
  url: string
  secure_url: string
}

const cloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

const uploadPreset =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

export async function uploadToCloudinary(
  file: File,
  onProgress: (progress: number) => void
): Promise<CloudinaryUploadResult> {
  if (!cloudName) {
    throw new Error(
      'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is missing.'
    )
  }

  if (!uploadPreset) {
    throw new Error(
      'NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is missing.'
    )
  }

  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ]

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      'Only JPG, PNG, and WebP images are allowed.'
    )
  }

  const maxSize = 5 * 1024 * 1024

  if (file.size > maxSize) {
    throw new Error('Image must be under 5MB.')
  }

  const formData = new FormData()

  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  return new Promise<CloudinaryUploadResult>(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open(
        'POST',
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
      )

      xhr.upload.onprogress = (event) => {
        if (!event.lengthComputable) return

        onProgress(
          Math.round(
            (event.loaded / event.total) * 100
          )
        )
      }

      xhr.onload = () => {
        let data: CloudinaryUploadResult & {
          error?: {
            message?: string
          }
        }

        try {
          data = JSON.parse(xhr.responseText)
        } catch {
          reject(
            new Error(
              'Invalid response from Cloudinary.'
            )
          )
          return
        }

        if (
          xhr.status >= 200 &&
          xhr.status < 300
        ) {
          resolve(data)
          return
        }

        reject(
          new Error(
            data.error?.message ||
              'Cloudinary upload failed.'
          )
        )
      }

      xhr.onerror = () => {
        reject(
          new Error(
            'Upload failed. Check your internet connection.'
          )
        )
      }

      xhr.onabort = () => {
        reject(
          new Error('Upload was cancelled.')
        )
      }

      xhr.send(formData)
    }
  )
}