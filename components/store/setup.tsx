"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, ImagePlus, Loader2, X } from "lucide-react";
import { useCloudinaryUpload, type UploadStatus } from "@/hooks/useCloudinaryUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ReactConfetti from "react-confetti";
import Image from "next/image";

const SUCCESS_SCREEN_DELAY_MS = 2000;

type UsernameStatus =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "invalid"
  | "error";

interface CreateStorePayload {
  name: string;
  slug: string;
  description: string;
  avatar: string | null;
  cover: string | null;
}

// Creation Response
interface StoreData {
  store_id: string;
  user_id: string;
  name: string;
  slug: string;
  avatar: string | null;
  cover: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface CreateStoreApiResponse {
  status: string;
  message: string;
  data: StoreData;
}

interface StoreSetupProps {
  onSuccess?: (store: StoreData) => void;
}

const STEPS = ["Name & handle", "Description", "Photo", "Cover"] as const;
const DESCRIPTION_MAX = 500;
const USERNAME_MIN = 3;
const USERNAME_MAX = 30;
const USERNAME_RE = /^[a-z0-9_]+$/;
const CONFETTI_DURATION_MS = 5000;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_\s-]/g, "")
    .replace(/\s+/g, "")
    .replace(/-+/g, "_")
    .slice(0, USERNAME_MAX);
}

export default function StoreSetup({ onSuccess }: StoreSetupProps) {
  const [step, setStep] = useState(0);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle");

  const [description, setDescription] = useState("");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [createdStore, setCreatedStore] = useState<StoreData | null>(null);

  const checkAbortRef = useRef<AbortController | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const avatarUpload = useCloudinaryUpload();
  const coverUpload = useCloudinaryUpload();

  // Derive the handle from the name until the seller edits it directly.
  useEffect(() => {
    if (!usernameTouched) setUsername(slugify(name));
  }, [name, usernameTouched]);

  // Debounced handle availability check.
  useEffect(() => {
    checkAbortRef.current?.abort();

    if (username.length === 0) {
      setUsernameStatus("idle");
      return;
    }
    if (username.length < USERNAME_MIN || !USERNAME_RE.test(username)) {
      setUsernameStatus("invalid");
      return;
    }

    setUsernameStatus("checking");
    const controller = new AbortController();
    checkAbortRef.current = controller;

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stores/check-store-slug?slug=${encodeURIComponent(username)}`,
          { signal: controller.signal, credentials: "include" },
        );
        if (!res.ok) throw new Error();
        const json = await res.json();
        setUsernameStatus(json.data.isAvailable ? "available" : "taken");
      } catch (err) {
        if ((err as Error).name !== "AbortError") setUsernameStatus("error");
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [username]);

  // Release object URLs when previews change or the component unmounts.
  useEffect(
    () => () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    },
    [avatarPreview],
  );
  useEffect(
    () => () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    },
    [coverPreview],
  );

  // Auto-dismiss the confetti burst so it doesn't linger on screen forever.
  useEffect(() => {
    if (!showConfetti) return;
    const timer = setTimeout(() => setShowConfetti(false), CONFETTI_DURATION_MS);
    return () => clearTimeout(timer);
  }, [showConfetti]);

  async function startUpload(kind: "avatar" | "cover", file: File) {
    const uploader = kind === "avatar" ? avatarUpload : coverUpload;
    try {
      await uploader.upload(file);
    } catch {
      // The hook already stores the error.
    }
  }

  function handleImageSelect(kind: "avatar" | "cover", e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const setFile = kind === "avatar" ? setAvatarFile : setCoverFile;
    const setPreview = kind === "avatar" ? setAvatarPreview : setCoverPreview;
    const uploader = kind === "avatar" ? avatarUpload : coverUpload;

    uploader.reset();
    setFile(file);
    setPreview(URL.createObjectURL(file));
    void startUpload(kind, file);
  }

  async function handleCreateStore(overrides?: Partial<CreateStorePayload>) {
    setSubmitting(true);
    setSubmitError(null);

    const payload: CreateStorePayload = {
      name: name.trim(),
      slug: username,
      description: description.trim(),
      avatar: avatarUpload.result?.eager[0].secure_url ?? avatarUpload.result?.secure_url ?? null,
      cover: coverUpload.result?.eager[0].secure_url ?? coverUpload.result?.secure_url ?? null,
      ...overrides,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/stores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(body?.message ?? "Could not create your store. Try again.");
      }

      const store = (body as CreateStoreApiResponse).data;

      setCreatedStore(store);
      onSuccess?.(store);
      setShowConfetti(true);
      toast.success("Store created successfully!");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Could not create your store. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const canContinueStep0 = name.trim().length > 0 && usernameStatus === "available";
  const canContinueStep1 = description.trim().length > 0;

  return (
    <div className="flex h-[89vh] items-center justify-center bg-background px-4 py-12 sm:px-6">
      {showConfetti && (
        <ReactConfetti
        recycle={false}
          width={window.innerWidth}
          height={window.innerHeight}
          tweenDuration={SUCCESS_SCREEN_DELAY_MS}
          gravity={0.35}
        />
      )}

      <div className="w-full max-w-md">
        {createdStore ? (
          <SuccessCard store={createdStore} />
        ) : (
          <div className="rounded-sm border border-border bg-card p-6 sm:p-8">
            <StepIndicator step={step} />

            {step === 0 && (
              <div className="space-y-6">
                <StepHeading title="Name your store" subtitle="This is what shoppers will see first." />

                <div className="space-y-2">
                  <Label htmlFor="store-name">Store name</Label>
                  <Input
                    id="store-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Wildflower Ceramics"
                    maxLength={60}
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store-username">Handle</Label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-mono text-muted-foreground">
                      @
                    </span>
                    <Input
                      id="store-username"
                      value={username}
                      onChange={(e) => {
                        setUsernameTouched(true);
                        setUsername(slugify(e.target.value));
                      }}
                      placeholder="wildflower-ceramics"
                      className="pl-7 pr-9 font-mono text-mono"
                      maxLength={USERNAME_MAX}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      {usernameStatus === "checking" && (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      )}
                      {usernameStatus === "available" && <Check className="h-4 w-4 text-moss-600" />}
                      {(usernameStatus === "taken" || usernameStatus === "invalid") && (
                        <X className="h-4 w-4 text-rust-600" />
                      )}
                    </span>
                  </div>
                  <UsernameHint status={usernameStatus} username={username} />
                </div>

                <Button className="w-full" disabled={!canContinueStep0} onClick={() => setStep(1)}>
                  Continue
                </Button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <StepHeading
                  title="Describe your store"
                  subtitle="A couple of sentences shoppers will read before they browse."
                />

                <div className="space-y-2">
                  <Label htmlFor="store-description">Description</Label>
                  <Textarea
                    id="store-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, DESCRIPTION_MAX))}
                    placeholder="Small-batch stoneware, thrown and glazed in our Bristol studio."
                    rows={5}
                    autoFocus
                  />
                  <p className="text-right text-caption text-muted-foreground">
                    {description.length}/{DESCRIPTION_MAX}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="icon" onClick={() => setStep(0)} aria-label="Back">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button className="flex-1" disabled={!canContinueStep1} onClick={() => setStep(2)}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <ImageStep
                kind="avatar"
                title="Add a photo"
                subtitle="A square photo or logo shoppers will see next to your store name."
                preview={avatarPreview}
                uploadState={avatarUpload.status}
                progress={avatarUpload.progress}
                error={avatarUpload.error}
                onSelect={(e) => handleImageSelect("avatar", e)}
                onRetry={() => {
                  if (avatarFile) void avatarUpload.upload(avatarFile);
                }}
                onBack={() => setStep(1)}
                onSkip={() => {
                  setAvatarFile(null);
                  setAvatarPreview(null);
                  avatarUpload.reset();
                  setStep(3);
                }}
                onContinue={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <ImageStep
                kind="cover"
                title="Add a cover image"
                subtitle="A wide banner for the top of your store page."
                preview={coverPreview}
                uploadState={coverUpload.status}
                progress={coverUpload.progress}
                error={coverUpload.error}
                onSelect={(e) => handleImageSelect("cover", e)}
                onRetry={() => {
                  if (coverFile) void coverUpload.upload(coverFile);
                }}
                onBack={() => setStep(2)}
                onSkip={() => {
                  setCoverFile(null);
                  setCoverPreview(null);
                  coverUpload.reset();
                  void handleCreateStore({ cover: null });
                }}
                onContinue={() => {
                  void handleCreateStore();
                }}
                finalLabel="Create store"
                submitting={submitting}
                submitError={submitError}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="flex gap-1.5">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i <= step ? "bg-primary" : "bg-ink-150",
            )}
          />
        ))}
      </div>
      <p className="mt-3 text-caption uppercase tracking-caption text-muted-foreground">
        Step {step + 1} of {STEPS.length} — {STEPS[step]}
      </p>
    </div>
  );
}

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1 className="font-heading text-display-m text-foreground">{title}</h1>
      <p className="mt-1 text-body-m text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function UsernameHint({ status, username }: { status: UsernameStatus; username: string }) {
  if (status === "idle") return null;

  if (status === "checking")
    return <p className="text-body-s text-muted-foreground">Checking availability…</p>;

  if (status === "available") return null;

  if (status === "taken")
    return <p className="text-body-s text-rust-600">That handle is taken.</p>;

  if (status === "invalid")
    return (
      <p className="text-body-s text-rust-600">
        {USERNAME_MIN}–{USERNAME_MAX} lowercase letters, numbers, and underscores.
      </p>
    );

  return <p className="text-body-s text-rust-600">Couldn&apos;t check availability. Try again.</p>;
}

interface ImageStepProps {
  kind: "avatar" | "cover";
  title: string;
  subtitle: string;
  preview: string | null;
  uploadState: UploadStatus;
  progress: number;
  error: string | null;
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  onRetry: () => void;
  onBack: () => void;
  onSkip: () => void;
  onContinue: () => void;
  finalLabel?: string;
  submitting?: boolean;
  submitError?: string | null;
}

function ImageStep({
  kind,
  title,
  subtitle,
  preview,
  uploadState,
  progress,
  error,
  onSelect,
  onRetry,
  onBack,
  onSkip,
  onContinue,
  finalLabel,
  submitting,
  submitError,
}: ImageStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isAvatar = kind === "avatar";
  const uploaded = uploadState === "done";
  const busy = uploadState === "uploading" || Boolean(submitting);
  const canContinue = !preview || uploadState === "done";

  return (
    <div className="space-y-6">
      <StepHeading title={title} subtitle={subtitle} />

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onSelect} />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className={cn(
          "group relative flex items-center justify-center overflow-hidden border border-dashed border-input bg-paper-50 transition-colors hover:border-primary disabled:cursor-not-allowed",
          isAvatar ? "mx-auto h-32 w-32 rounded-full" : "aspect-21/9 w-full rounded-sm",
        )}
      >
        {preview ? (
          <Image src={preview} alt="" className="h-full w-full object-cover" width={128} height={128} />
        ) : (
          <span className="flex flex-col items-center gap-2 px-4 text-center text-caption uppercase tracking-caption text-muted-foreground">
            <ImagePlus className="h-5 w-5" />
            Choose image
          </span>
        )}

        {uploadState === "uploading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-900/50 text-paper-0">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-mono text-caption">{progress}%</span>
          </div>
        )}

        {uploaded && (
          <span className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-moss-600 text-paper-0">
            <Check className="h-3.5 w-3.5" />
          </span>
        )}
      </button>

      {error && (
        <div className="flex items-center justify-between rounded-sm bg-rust-200 px-3 py-2 text-body-s text-rust-600">
          <span>{error}</span>
          <button type="button" onClick={onRetry} className="font-medium underline underline-offset-2">
            Retry
          </button>
        </div>
      )}

      {submitError && (
        <div className="rounded-sm bg-rust-200 px-3 py-2 text-body-s text-rust-600">{submitError}</div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" size="icon" onClick={onBack} disabled={busy} aria-label="Back">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="flex-1" onClick={onSkip} disabled={busy}>
          Skip for now
        </Button>
        <Button className="flex-1" onClick={onContinue} disabled={busy || uploadState === "error" || !canContinue}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (finalLabel ?? "Continue")}
        </Button>
      </div>
    </div>
  );
}


function SuccessCard({ store }: { store: StoreData }) {
  const router = useRouter();
  const time = SUCCESS_SCREEN_DELAY_MS+(SUCCESS_SCREEN_DELAY_MS*0.5);
  setInterval(() => {
    router.refresh();
  }, time);
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-card">
      {store.cover && (
        <Image src={store.cover} alt="" width={128} height={72} className="aspect-21/9 w-full object-cover" />
      )}

      <div className="p-6 text-center sm:p-8">
        <AnimatedCheck />

        <h1 className="mt-6 font-heading text-display-m text-foreground">Your store is live</h1>
        <p className="mt-1 text-body-m text-muted-foreground">{store.name} is ready for shoppers.</p>

        <div className="mt-6 flex flex-col items-center gap-3">
          {store.avatar && (
            <Image
              src={store.avatar}
              alt=""
              className="h-16 w-16 rounded-full border border-border object-cover"
              width={64}
              height={64}
            />
          )}

          <dl className="w-full space-y-3 rounded-sm bg-paper-50 p-4 text-left">
            <SummaryRow label="Store name" value={store.name} />
            <SummaryRow label="Handle" value={`@${store.slug}`} />
            {store.description && <SummaryRow label="Description" value={store.description} />}
          </dl>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-caption uppercase tracking-caption text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 wrap-break-word text-body-s text-foreground">{value}</dd>
    </div>
  );
}

function AnimatedCheck() {
  const [drawn, setDrawn] = useState(false);

  // Delay by a tick so the initial (undrawn) styles paint first — otherwise
  // the browser may collapse the state change into the first paint and the
  // transition never has anything to animate from.
  useEffect(() => {
    const timer = setTimeout(() => setDrawn(true), 30);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-moss-100 transition-transform duration-500 ease-out",
        drawn ? "scale-100" : "scale-50",
      )}
    >
      <svg viewBox="0 0 52 52" className="h-10 w-10" fill="none">
        <circle
          cx="26"
          cy="26"
          r="24"
          strokeWidth="2"
          strokeDasharray={151}
          strokeDashoffset={drawn ? 0 : 151}
          className="stroke-moss-600 transition-[stroke-dashoffset] duration-700 ease-out"
        />
        <path
          d="M15 27l7 7 16-16"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={36}
          strokeDashoffset={drawn ? 0 : 36}
          className="stroke-moss-600 transition-[stroke-dashoffset] delay-500 duration-500 ease-out"
        />
      </svg>
    </div>
  );
}