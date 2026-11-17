/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORM_MODE?: 'demo' | 'live'
  readonly VITE_FORM_ENDPOINT?: string
  readonly VITE_RECAPTCHA_SITE_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
