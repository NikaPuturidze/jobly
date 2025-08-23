ALTER TABLE "vacancy" ADD COLUMN "dedupe_key" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_dedupe_key_unique" UNIQUE("dedupe_key");--> statement-breakpoint
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_unique" UNIQUE("dedupe_key");