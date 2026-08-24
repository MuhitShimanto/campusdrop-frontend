"use client";

import * as React from "react";
import type { ProfileData } from "./profile-settings";
import Image from "next/image";

type ProfileFormProps = {
  initialProfile: ProfileData;
};

export function ProfileForm({ initialProfile }: ProfileFormProps) {
  const [profile, setProfile] = React.useState<ProfileData>(initialProfile);

  const updateField =
    (field: keyof ProfileData) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement
      >,
    ) => {
      setProfile((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Replace with a server action / API request.
    console.log(profile);
  };

  const handleUpload = () => {
    // Replace with your upload flow.
  };

  return (
    <form
      id="profile-settings"
      onSubmit={handleSubmit}
      className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-12"
    >
      {/* Avatar */}
      <section className="border border-ink-150 bg-paper-0 p-3 md:col-span-4">
        <div className="overflow-hidden border border-ink-150 bg-paper-50">
          <div className="aspect-square overflow-hidden">
            <Image
              src={profile.avatar || "/avatar.jpg"}
              alt={profile.name}
              width={500}
              height={500}
              className="size-full object-cover"
            />
          </div>
        </div>

        <div className="px-1 pt-4">
          <h2 className="font-sans text-body-s font-semibold text-ink-900">
            Public Avatar
          </h2>

          <p className="mt-1 text-body-s text-ink-500">
            This image will be visible to other students on the marketplace.
          </p>

          <button
            type="button"
            onClick={handleUpload}
            className="
              mt-4
              w-full
              rounded-sm
              border
              border-ink-300
              bg-paper-0
              px-4
              py-2
              font-sans
              text-caption
              font-medium
              uppercase
              tracking-caption
              text-ink-700
              transition-colors
              hover:bg-accent
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-ring
            "
          >
            Upload new
          </button>
        </div>
      </section>

      {/* Profile information */}
      <section className="border border-ink-150 bg-paper-0 p-5 md:col-span-8">
        <div className="border-b border-ink-150 pb-3">
          <h2 className="font-sans text-heading text-ink-900">
            Personal Information
          </h2>
        </div>

        <div className="mt-5 space-y-4">
          {/* Name */}
          <Field label="Full Name">
            <input
              type="text"
              value={profile.name}
              onChange={updateField("name")}
              className="profile-input"
            />
          </Field>

          {/* Username */}
          <Field label="Username">
            <input
              type="text"
              value={profile.username}
              onChange={updateField("username")}
              className="profile-input"
            />
          </Field>

          {/* University Email */}
          <Field
            label="University Email"
            trailing={
              profile.is_verified ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-moss-600 px-2 py-0.5 font-sans text-caption font-semibold uppercase tracking-caption text-paper-0">
                  <span
                    aria-hidden="true"
                    className="size-1 rounded-full bg-paper-0"
                  />
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-md bg-ink-200 px-2 py-0.5 font-sans text-caption font-semibold uppercase tracking-caption text-ink-700">
                  Unverified
                </span>
              )
            }
          >
            <input
              type="email"
              value={profile.university_email}
              onChange={updateField("university_email")}
              className="profile-input border-ink-150 bg-paper-50"
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Account Status */}
            <Field label="Account Status">
              <select
                value={profile.account_status}
                onChange={updateField("account_status")}
                className="profile-input"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </Field>

            {/* Email Verification */}
            <Field label="Email Verification">
              <div className="flex h-10 items-center gap-2 border border-ink-150 bg-paper-50 px-3">
                <span
                  aria-hidden="true"
                  className={`size-2 rounded-full ${
                    profile.is_verified
                      ? "bg-moss-600"
                      : "bg-ink-400"
                  }`}
                />

                <span className="font-sans text-body-s text-ink-700">
                  {profile.is_verified ? "Verified" : "Not verified"}
                </span>
              </div>
            </Field>
          </div>
        </div>
      </section>
    </form>
  );
}

type FieldProps = {
  label: string;
  children: React.ReactNode;
  trailing?: React.ReactNode;
};

function Field({ label, children, trailing }: FieldProps) {
  return (
    <label className="block">
      <span
        className="
          mb-1.5
          flex
          items-center
          justify-between
          gap-3
          font-sans
          text-caption
          font-medium
          uppercase
          tracking-caption
          text-ink-700
        "
      >
        <span>{label}</span>
        {trailing}
      </span>

      {children}
    </label>
  );
}