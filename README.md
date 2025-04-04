# Sanity Studio

## Documentation

📌 **Important:** Check out the [documentation for doctypes, custom fields, and scripts](docs/index.md) to see sample GROQ queries and more.

---

## Working Locally

To run the studio locally, follow these steps:

1. Install dependencies:
   ```sh
   yarn install
   ```
2. Create an `.env` file with the following values:
   ```sh
   SANITY_STUDIO_PROJECT_ID=<your_project_id>
   SANITY_STUDIO_DATASET_PROD=<your_production_dataset>
   SANITY_STUDIO_DATASET_DEV=<your_development_dataset>
   SANITY_STUDIO_API_VERSION=<your_api_version>
   ```
3. Start the Sanity development server:
   ```sh
   yarn dev
   ```

📌 **Note:** All environment variables are consumed by and re-exported from [`lib/api.ts`](lib/api.ts).

---

## Deploying

This repository is integrated with a project on Webstacks' Vercel instance. There are two primary domains.

📌 **Important:** When running locally or on a Vercel preview deployment, the studio defaults to using the `development` dataset. You can verify or switch datasets using the [dataset menu](/docs/assets/dataset-menu.png) in the upper left-hand corner of the studio window.

---
