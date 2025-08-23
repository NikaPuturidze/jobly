CREATE TABLE "experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"experience_Id" integer NOT NULL,
	"level" text
);
--> statement-breakpoint
CREATE TABLE "experience_vacancy" (
	"vacancy_id" integer NOT NULL,
	"experience_id" integer NOT NULL,
	CONSTRAINT "experience_vacancy_experience_id_vacancy_id_pk" PRIMARY KEY("experience_id","vacancy_id")
);
--> statement-breakpoint
CREATE TABLE "vacancy" (
	"id" serial PRIMARY KEY NOT NULL,
	"source_url" text NOT NULL,
	"title" text NOT NULL,
	"created_at" date NOT NULL,
	"job_type_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"category_name" text NOT NULL,
	"salary_from" integer,
	"salary_to" integer,
	"salary_period" text,
	"salary_type_id" integer NOT NULL,
	"country" text,
	"city" text,
	"company_name" text,
	"company_has_logo" boolean DEFAULT false,
	"company_country" text,
	"company_city" text,
	"company_logo" text,
	"company_description" text,
	"inserted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "experience_vacancy" ADD CONSTRAINT "experience_vacancy_vacancy_id_vacancy_id_fk" FOREIGN KEY ("vacancy_id") REFERENCES "public"."vacancy"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_vacancy" ADD CONSTRAINT "experience_vacancy_experience_id_experience_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experience"("id") ON DELETE no action ON UPDATE no action;