ALTER TABLE "category_job" ALTER COLUMN "icon" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "category_job" ADD COLUMN "color" text DEFAULT '#0a66c2' NOT NULL;