"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Camera, Check, Copy, Globe, Loader2, X } from "lucide-react";
import {
  useCloudinaryUpload,
  type UploadStatus,
} from "@/hooks/useCloudinaryUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Store = {
  name: string;
  slug: string;
  description: string;
  avatar: string;
  cover: string;
};

type HandleStatus =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "invalid"
  | "error";

const SLUG_PATTERN = /^[a-z0-9_]+$/;
const DESCRIPTION_LIMIT = 500;

const StoreProfileForm = ({ store }: { store: Store }) => {
  const [name, setName] = useState(store.name);
  const [slug, setSlug] = useState(store.slug);
  const [description, setDescription] = useState(store.description ?? "");

  const [avatarPreview, setAvatarPreview] = useState(store.avatar);
  const [coverPreview, setCoverPreview] = useState(store.cover);

  // Actual files. These are uploaded ONLY when Save is clicked.
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const [handleStatus, setHandleStatus] = useState<HandleStatus>("idle");

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const handleCheckAbortRef = useRef<AbortController | null>(null);

  const router = useRouter();

  const avatarUpload = useCloudinaryUpload();
  const coverUpload = useCloudinaryUpload();

  const slugError = useMemo(() => {
    if (!slug) return "Store username is required.";

    if (!SLUG_PATTERN.test(slug)) {
      return "Only lowercase letters, numbers, and underscores.";
    }

    return null;
  }, [slug]);

  const nameError = name.trim().length === 0 ? "Store name is required." : null;

  const isHandleChanged = slug !== store.slug;

  const isDirty =
    name !== store.name ||
    slug !== store.slug ||
    description !== (store.description ?? "") ||
    avatarFile !== null ||
    coverFile !== null;
  useEffect(() => {
    handleCheckAbortRef.current?.abort();

    if (!isHandleChanged) {
      setHandleStatus("idle");
      return;
    }

    if (!slug || slugError) {
      setHandleStatus("invalid");
      return;
    }

    setHandleStatus("checking");

    const controller = new AbortController();
    handleCheckAbortRef.current = controller;

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stores/check-store-slug?slug=${encodeURIComponent(slug)}`,
          {
            signal: controller.signal,
            credentials: "include",
          },
        );

        if (!res.ok) {
          throw new Error("Failed to check handle availability.");
        }

        const body = await res.json();

        setHandleStatus(body?.data?.isAvailable ? "available" : "taken");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setHandleStatus("error");
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [slug, slugError, isHandleChanged]);

  /*
   * Clean up object URLs when component unmounts or a local preview
   * is replaced.
   */
  useEffect(() => {
    return () => {
      if (avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  useEffect(() => {
    return () => {
      if (coverPreview.startsWith("blob:")) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [coverPreview]);

  const handleImageChange = (
  kind: "avatar" | "cover",
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  const file = e.target.files?.[0];

  // Allow selecting the same file again.
  e.target.value = "";

  if (!file) return;

  if (kind === "avatar") {
    if (avatarPreview.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));

    // Don't upload here.
    avatarUpload.reset();
  } else {
    if (coverPreview.startsWith("blob:")) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));

    // Don't upload here.
    coverUpload.reset();
  }
};


  const handleDiscard = () => {
    if (avatarPreview.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }

    if (coverPreview.startsWith("blob:")) {
      URL.revokeObjectURL(coverPreview);
    }

    setName(store.name);
    setSlug(store.slug);
    setDescription(store.description ?? "");

    setAvatarFile(null);
    setCoverFile(null);

    setAvatarPreview(store.avatar);
    setCoverPreview(store.cover);

    avatarUpload.reset();
    coverUpload.reset();

    setHandleStatus("idle");
  };

  const getCloudinaryUrl = (
    uploadResult: ReturnType<typeof useCloudinaryUpload>,
  ) => {
    return (
      uploadResult.result?.eager?.[0]?.secure_url ??
      uploadResult.result?.secure_url ??
      null
    );
  };
  const uploadImage = async (
    file: File,
    uploader: ReturnType<typeof useCloudinaryUpload>,
  ) => {
    await uploader.upload(file);
  };

  const handleSave = async () => {
    if (!isDirty || saving) return;

    if (nameError || slugError) {
      return;
    }

    // If the handle changed, it must be confirmed available.
    if (isHandleChanged && handleStatus !== "available") {
      return;
    }

    setSaving(true);

    try {
      let avatarUrl = store.avatar;
      let coverUrl = store.cover;

      if (avatarFile) {
        const uploadedAvatar = await avatarUpload.upload(avatarFile);

        avatarUrl =
          uploadedAvatar.eager?.[0]?.secure_url ??
          uploadedAvatar.secure_url ??
          "";

        if (!avatarUrl) {
          throw new Error("Avatar upload completed without returning a URL.");
        }
      }

      if (coverFile) {
        const uploadedCover = await coverUpload.upload(coverFile);

        coverUrl =
          uploadedCover.eager?.[0]?.secure_url ??
          uploadedCover.secure_url ??
          "";

        if (!coverUrl) {
          throw new Error("Cover upload completed without returning a URL.");
        }
      }

      const payload = {
        name: name.trim(),
        slug,
        description: description.trim(),
        avatar: avatarUrl,
        cover: coverUrl,
      };

      console.log("Updating store:", payload);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stores`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      const body = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          body?.message ?? "Could not update your store. Try again.",
        );
      }

      /*
       * Save succeeded.
       *
       * Clear the selected files because they're now persisted.
       */
      setAvatarFile(null);
      setCoverFile(null);

      avatarUpload.reset();
      coverUpload.reset();

      toast.success("Store updated successfully.");
      router.push(`/dashboard`);
      

    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Could not update your store. Try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/stores/${slug}`;

    await navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const handleCheckBusy = handleStatus === "checking";

  const canSave =
    isDirty &&
    !nameError &&
    !slugError &&
    !saving &&
    !handleCheckBusy &&
    (!isHandleChanged || handleStatus === "available");

  return (
    <div className="space-y-6">
      {/* Live store preview */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <div
          className="relative h-40 bg-cover bg-center bg-muted"
          style={
            coverPreview
              ? {
                  backgroundImage: `url(${coverPreview})`,
                }
              : undefined
          }
        >
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            disabled={saving}
            className="absolute right-4 top-4 inline-flex h-9 items-center gap-2 rounded-md border bg-background/90 px-3 text-sm font-medium backdrop-blur hover:bg-background disabled:opacity-50"
          >
            <Camera className="size-4" />
            Change cover
          </button>

          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange("cover", e)}
          />
        </div>

        <div className="relative px-4 pb-6">
          <div className="-mt-5 flex flex-col gap-4 rounded-md border bg-background/10 p-2 backdrop-blur-xs sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="group relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-4 border-card bg-primary text-primary-foreground shadow-sm">
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt={name || "Store avatar"}
                    width={80}
                    height={80}
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-semibold">
                    {name.trim().charAt(0).toUpperCase() || "S"}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={saving}
                  aria-label="Change avatar"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 disabled:cursor-not-allowed"
                >
                  <Camera className="size-5 text-white" />
                </button>

                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange("avatar", e)}
                />
              </div>

              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">
                    {name || "Untitled store"}
                  </h2>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-600">
                    <Check className="size-3" />
                    Active
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  @{slug || "your-handle"}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium hover:bg-muted"
              >
                <Copy className="size-4" />
                {copied ? "Copied" : "Copy link"}
              </button>

              <a
                href={`/stores/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium hover:bg-muted"
              >
                <Globe className="size-4" />
                View store
              </a>
            </div>
          </div>

          {description ? (
            <p className="mt-4 text-sm text-muted-foreground">{description}</p>
          ) : (
            <p className="mt-4 text-sm italic text-muted-foreground">
              No description yet — customers will see this space blank.
            </p>
          )}
        </div>
      </div>

      {/* Edit form */}
      <div className="rounded-xl border bg-card">
        <div className="border-b px-6 py-4">
          <h2 className="font-semibold">Store Information</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Changes here update the preview above immediately, but aren&apos;t
            live until you save.
          </p>
        </div>

        <div className="space-y-5 p-6">
          {/* Store name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Store Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            />

            {nameError && <p className="text-xs text-red-500">{nameError}</p>}
          </div>

          {/* Store username */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Store Username</label>

            <div className="relative flex">
              <span className="flex h-10 items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                @
              </span>

              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
                className="h-10 min-w-0 flex-1 rounded-r-md border bg-background px-3 pr-10 text-sm outline-none focus:border-primary"
              />

              {isHandleChanged && handleStatus === "checking" && (
                <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
              )}

              {isHandleChanged && handleStatus === "available" && (
                <Check className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-emerald-600" />
              )}

              {isHandleChanged &&
                (handleStatus === "taken" || handleStatus === "error") && (
                  <X className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-red-500" />
                )}
            </div>

            {slugError && <p className="text-xs text-red-500">{slugError}</p>}

            {isHandleChanged && handleStatus === "checking" && (
              <p className="text-xs text-muted-foreground">
                Checking handle availability...
              </p>
            )}

            {isHandleChanged && handleStatus === "available" && (
              <p className="text-xs text-emerald-600">
                This handle is available.
              </p>
            )}

            {isHandleChanged && handleStatus === "taken" && (
              <p className="text-xs text-red-500">
                This handle is already taken.
              </p>
            )}

            {isHandleChanged && handleStatus === "error" && (
              <p className="text-xs text-red-500">
                Couldn&apos;t check handle availability. Try again.
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Store Description</label>

              <span
                className={`text-xs ${
                  description.length > DESCRIPTION_LIMIT
                    ? "text-red-500"
                    : "text-muted-foreground"
                }`}
              >
                {description.length}/{DESCRIPTION_LIMIT}
              </span>
            </div>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value.slice(0, DESCRIPTION_LIMIT))
              }
              placeholder="Tell customers what you sell and when you're online."
              className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Upload errors */}
      {(avatarUpload.status === "error" || coverUpload.status === "error") && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {avatarUpload.error && <p>Avatar upload: {avatarUpload.error}</p>}

          {coverUpload.error && <p>Cover upload: {coverUpload.error}</p>}
        </div>
      )}

      {/* Save bar */}
      {isDirty && (
        <div className="fixed inset-x-0 bottom-3 z-40 flex justify-center px-3 sm:bottom-4 sm:px-4">
          <div className="flex w-full max-w-3xl flex-col gap-3 rounded-lg border bg-card px-3 py-3 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:px-4">
            <p className="text-sm text-muted-foreground">
              {handleCheckBusy
                ? "Checking handle availability..."
                : "You have unsaved changes."}
            </p>

            <div className="flex w-full gap-2 sm:w-auto">
              <button
                type="button"
                onClick={handleDiscard}
                disabled={saving}
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium hover:bg-muted disabled:opacity-50 sm:h-9 sm:flex-none"
              >
                <X className="size-4" />
                Discard
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={!canSave}
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 sm:h-9 sm:flex-none"
              >
                {saving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Check className="size-4" />
                )}

                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreProfileForm;
