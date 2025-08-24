ALTER TABLE "vacancy" DROP CONSTRAINT "vacancy_category_id_category_job_id_fk";
--> statement-breakpoint
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_category_id_category_job_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category_job"("category_id") ON DELETE no action ON UPDATE no action;