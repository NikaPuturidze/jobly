CREATE TABLE "period_salary" (
	"id" serial PRIMARY KEY NOT NULL,
	"type_id" integer NOT NULL,
	"name" text,
	CONSTRAINT "period_salary_type_id_unique" UNIQUE("type_id")
);
