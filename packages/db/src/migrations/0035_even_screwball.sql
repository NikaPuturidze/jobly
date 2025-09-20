ALTER TABLE "vacancy" RENAME COLUMN "employement_type_id" TO "employment_type_id";--> statement-breakpoint
ALTER TABLE "vacancy" DROP CONSTRAINT "vacancy_employement_type_id_type_employment_type_id_fk";
--> statement-breakpoint
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_employment_type_id_type_employment_type_id_fk" FOREIGN KEY ("employment_type_id") REFERENCES "public"."type_employment"("type_id") ON DELETE no action ON UPDATE no action;