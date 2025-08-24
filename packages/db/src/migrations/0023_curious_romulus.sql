ALTER TABLE "vacancy" DROP CONSTRAINT "vacancy_job_type_id_type_job_id_fk";
--> statement-breakpoint
ALTER TABLE "vacancy" DROP CONSTRAINT "vacancy_salary_type_id_type_salary_id_fk";
--> statement-breakpoint
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_job_type_id_type_job_type_id_fk" FOREIGN KEY ("job_type_id") REFERENCES "public"."type_job"("type_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_salary_type_id_type_salary_type_id_fk" FOREIGN KEY ("salary_type_id") REFERENCES "public"."type_salary"("type_id") ON DELETE no action ON UPDATE no action;