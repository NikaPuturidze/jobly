ALTER TABLE "company" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "vacancy" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "vacancy" ALTER COLUMN "salary_type_id" DROP NOT NULL;