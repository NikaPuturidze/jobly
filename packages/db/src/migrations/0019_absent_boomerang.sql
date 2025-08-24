ALTER TABLE "vacancy" DROP CONSTRAINT "vacancy_category_id_unique";--> statement-breakpoint
ALTER TABLE "category_job" ADD CONSTRAINT "category_job_category_id_unique" UNIQUE("category_id");--> statement-breakpoint
ALTER TABLE "experience" ADD CONSTRAINT "experience_experience_id_unique" UNIQUE("experience_id");--> statement-breakpoint
ALTER TABLE "type_job" ADD CONSTRAINT "type_job_type_id_unique" UNIQUE("type_id");--> statement-breakpoint
ALTER TABLE "type_salary" ADD CONSTRAINT "type_salary_type_id_unique" UNIQUE("type_id");