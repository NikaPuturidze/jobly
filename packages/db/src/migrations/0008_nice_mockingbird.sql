ALTER TABLE "vacancy" ALTER COLUMN "category_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_category_id_category_job_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category_job"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vacancy" DROP COLUMN "category_name";