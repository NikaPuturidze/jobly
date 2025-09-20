CREATE TABLE "type_employment" (
	"id" serial PRIMARY KEY NOT NULL,
	"type_id" integer NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "type_employment_type_id_unique" UNIQUE("type_id")
);
