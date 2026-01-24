/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAKE_WEBHOOK_URL?: string;
  readonly VITE_CLARITY_PROJECT_ID?: string;
  readonly VITE_CALENDLY_CUSTOMER_URL?: string;
  readonly VITE_CALENDLY_PARTNER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
