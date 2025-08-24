ALTER TABLE "vacancy" RENAME COLUMN "job_identity_key" TO "dedupe_key";--> statement-breakpoint
ALTER TABLE "vacancy" DROP COLUMN "domain";--> statement-breakpoint
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_dedupe_key_unique" UNIQUE("dedupe_key");--> statement-breakpoint
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_unique" UNIQUE("dedupe_key");