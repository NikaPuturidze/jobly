CREATE TABLE "company" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"has_logo" boolean DEFAULT false,
	"logo" text,
	"country" text,
	"city" text
);
--> statement-breakpoint
ALTER TABLE "vacancy" ADD COLUMN "company_id" integer;--> statement-breakpoint
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_job_type_id_type_job_id_fk" FOREIGN KEY ("job_type_id") REFERENCES "public"."type_job"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_salary_type_id_type_salary_id_fk" FOREIGN KEY ("salary_type_id") REFERENCES "public"."type_salary"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vacancy" DROP COLUMN "company_name";--> statement-breakpoint
ALTER TABLE "vacancy" DROP COLUMN "company_has_logo";--> statement-breakpoint
ALTER TABLE "vacancy" DROP COLUMN "company_country";--> statement-breakpoint
ALTER TABLE "vacancy" DROP COLUMN "company_city";--> statement-breakpoint
ALTER TABLE "vacancy" DROP COLUMN "company_logo";--> statement-breakpoint
ALTER TABLE "vacancy" DROP COLUMN "company_description";