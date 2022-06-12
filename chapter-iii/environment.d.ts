declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STRIPE_PUBLISHABLE_KEY: string;
      STRIPE_SECRET_KEY: string;
      STRIPE_PRICE_API_ID: string;
    }
  }
}

export {}