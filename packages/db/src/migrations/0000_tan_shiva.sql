CREATE TABLE "categories_job" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "type_salary" (
	"id" serial PRIMARY KEY NOT NULL,
	"type_id" integer NOT NULL,
	"fixed" boolean DEFAULT false,
	"name" text NOT NULL
);
