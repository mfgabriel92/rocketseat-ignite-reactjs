declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
      STRIPE_SECRET_KEY: string;
      STRIPE_PRICE_API_ID: string;
      STRIPE_SUCCESS_URL: string;
      STRIPE_CANCEL_URL: string;
      STRIPE_WEBHOOK_SIGNING_SECRET: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      FAUNADB_SECRET: string;
      JWT_SECRET_KEY: string;
      PRISMIC_ENDPOINT: string; 
      PRISMIC_PERMANENT_ACCESS_TOKEN: string; 
    }
  }
}

export { }
