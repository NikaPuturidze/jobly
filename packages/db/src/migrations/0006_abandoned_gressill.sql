ALTER TABLE "vacancy" RENAME COLUMN "inserted_at" TO "posted_at";--> statement-breakpoint
ALTER TABLE "vacancy" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "vacancy" ALTER COLUMN "created_at" SET DEFAULT now();