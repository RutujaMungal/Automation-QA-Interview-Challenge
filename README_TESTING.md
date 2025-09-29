1. Install dependencies: `npm install`
2. Copy env file: `cp .env.example .env` and set:
- `MMS_SCHOOL_URL=https://your-school.mymusicstaff.com`
- optionally `MMS_API_URL` for cleanup endpoints
3. Run tests:
- `npx playwright test tests/e2e/student-onboarding.spec.ts`
- or run the whole folder: `npx playwright test tests/e2e`

Notes:
- Update selectors to match your instance.
- The data cleaner uses a hypothetical API endpoint; if your platform lacks it, implement cleanup via UI or admin endpoints.
