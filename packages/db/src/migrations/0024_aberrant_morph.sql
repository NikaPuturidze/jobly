ALTER TABLE "vacancy" RENAME COLUMN "dedupe_key" TO "job_identity_key";--> statement-breakpoint

ALTER TABLE "vacancy" ADD COLUMN "domain" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_unique" UNIQUE("job_identity_key","domain");