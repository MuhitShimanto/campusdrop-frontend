Project Features
===============

This document summarizes the primary features implemented in this codebase.

- **Authentication & session handling:** Server-side session retrieval using Next.js headers and a backend auth API; client-side login and registration flows.
- **Store model & public storefront:** Public store pages with store fetching utilities and robust not-found handling for storefronts.
- **Listings (Drops):** Endpoints and client APIs for creating, fetching, and managing listings, including pre-order and always-on listing types.
- **Listing creation UX:** Multi-step listing wizard with `react-hook-form`, `zod` validation, and a stepper-based modal for availability, details, pricing, fulfillment, and ordering.
- **Image upload & CDN integration:** Cloudinary integration with a reusable `useCloudinaryUpload` hook and upload components supporting progress and error states.
- **Media & gallery:** Drop gallery and client-side preview handling for listing images and media presentation.
- **Seller dashboard & management:** Seller-specific pages and routes for dashboard, drops, inventory, store settings, orders, customers, and no-show reports.
- **Buyer discovery & listing pages:** Buyer-facing pages for explore, store listing pages, per-listing detail views, and discoverability features.
- **API client layer & environment-driven calls:** Frontend wrappers that call a BACKEND_URL, keeping environment configuration and network logic centralized.
- **Reusable UI primitives:** Shared component library (dialogs, inputs, buttons, cards, stepper, sidebar) for consistent styling and accessible UI patterns.
- **Form UX & feedback:** Client-side validation, toast notifications, loading states, and graceful error handling across forms and uploads.
- **TypeScript-first architecture:** Strong typing, typed API responses, and modern Next.js App Router usage with server/client component separation.
- **Utilities & hooks:** Centralized helpers and hooks (auth, store fetching, mobile detection, Cloudinary upload) for reusability and separation of concerns.

If you want this exported as a README section, portfolio blurb, or resume bullet list, I can format it accordingly.
