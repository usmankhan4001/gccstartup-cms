import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'ar', 'zh', 'de', 'fr', 'nl', 'es', 'it');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'viewer');
  CREATE TYPE "public"."enum_media_category" AS ENUM('image', 'video', 'document', 'other');
  CREATE TYPE "public"."enum_documents_category" AS ENUM('guide', 'contract', 'legal', 'brochure');
  CREATE TYPE "public"."enum_countries_region" AS ENUM('gulf', 'asia', 'europe', 'offshore');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('building', 'bank', 'shield', 'box', 'id', 'refresh');
  CREATE TYPE "public"."enum_posts_category" AS ENUM('news', 'guide', 'update');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_category" AS ENUM('news', 'guide', 'update');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'ar', 'zh', 'de', 'fr', 'nl', 'es', 'it');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'contacted', 'qualified', 'won', 'lost');
  CREATE TYPE "public"."enum_leads_integration_status_twenty" AS ENUM('pending', 'success', 'skipped', 'failed');
  CREATE TYPE "public"."enum_leads_integration_status_meta_capi" AS ENUM('pending', 'success', 'skipped', 'failed');
  CREATE TYPE "public"."enum_leads_integration_status_n8n" AS ENUM('pending', 'success', 'skipped', 'failed');
  CREATE TYPE "public"."enum_leads_integration_status_waha" AS ENUM('pending', 'success', 'skipped', 'failed');
  CREATE TYPE "public"."enum_partner_applications_status" AS ENUM('new', 'reviewing', 'contacted', 'approved', 'rejected', 'matched', 'paid');
  CREATE TYPE "public"."enum_pages_blocks_subhero_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_lead_form_form_type" AS ENUM('lead', 'partner', 'contact');
  CREATE TYPE "public"."enum_pages_page_type" AS ENUM('generic', 'landing', 'campaign', 'thank-you');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_subhero_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_lead_form_form_type" AS ENUM('lead', 'partner', 'contact');
  CREATE TYPE "public"."enum__pages_v_version_page_type" AS ENUM('generic', 'landing', 'campaign', 'thank-you');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'ar', 'zh', 'de', 'fr', 'nl', 'es', 'it');
  CREATE TYPE "public"."enum_landing_pages_blocks_subhero_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum_landing_pages_blocks_lead_form_form_type" AS ENUM('lead', 'partner', 'contact');
  CREATE TYPE "public"."enum_landing_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__landing_pages_v_blocks_subhero_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum__landing_pages_v_blocks_lead_form_form_type" AS ENUM('lead', 'partner', 'contact');
  CREATE TYPE "public"."enum__landing_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__landing_pages_v_published_locale" AS ENUM('en', 'ar', 'zh', 'de', 'fr', 'nl', 'es', 'it');
  CREATE TYPE "public"."enum_form_submissions_status" AS ENUM('new', 'processed');
  CREATE TYPE "public"."enum_homepage_blocks_lead_form_form_type" AS ENUM('lead', 'partner', 'contact');
  CREATE TYPE "public"."enum_site_settings_social_platform" AS ENUM('linkedin', 'x', 'whatsapp', 'telegram');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'editor',
  	"avatar_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"credit" varchar,
  	"category" "enum_media_category",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"category" "enum_documents_category",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "countries_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "countries_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "countries_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "countries_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "countries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"flag" varchar,
  	"region" "enum_countries_region",
  	"from_price" varchar,
  	"work_days" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "countries_locales" (
  	"name" varchar NOT NULL,
  	"tax" varchar,
  	"timeline" varchar,
  	"headline" varchar,
  	"intro" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_stat_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "services_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "services_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "services_related_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"icon" "enum_services_icon",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"name" varchar NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pricing_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "pricing_tiers_who_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "pricing_tiers_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "pricing_tiers_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "pricing_tiers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"tier_label" varchar,
  	"featured" boolean,
  	"price" varchar,
  	"price_note" varchar,
  	"intro" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pricing_tiers_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"cover_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"author_id" integer,
  	"category" "enum_posts_category",
  	"reading_time" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_cover_image_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_author_id" integer,
  	"version_category" "enum__posts_v_version_category",
  	"version_reading_time" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"phone_digits" varchar,
  	"country" varchar,
  	"interest" varchar,
  	"message" varchar,
  	"source" varchar,
  	"page" varchar,
  	"status" "enum_leads_status" DEFAULT 'new',
  	"fbclid" varchar,
  	"client_ip" varchar,
  	"user_agent" varchar,
  	"event_id" varchar,
  	"utm_source" varchar,
  	"utm_medium" varchar,
  	"utm_campaign" varchar,
  	"utm_content" varchar,
  	"utm_term" varchar,
  	"referrer" varchar,
  	"assigned_to_id" integer,
  	"is_duplicate" boolean DEFAULT false,
  	"duplicate_of_id" integer,
  	"duplicate_reason" varchar,
  	"integration_status_twenty" "enum_leads_integration_status_twenty" DEFAULT 'pending',
  	"integration_status_twenty_id" varchar,
  	"integration_status_meta_capi" "enum_leads_integration_status_meta_capi" DEFAULT 'pending',
  	"integration_status_n8n" "enum_leads_integration_status_n8n" DEFAULT 'pending',
  	"integration_status_waha" "enum_leads_integration_status_waha" DEFAULT 'pending',
  	"integration_status_last_error" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leads_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "partner_applications_notes_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"note" varchar
  );
  
  CREATE TABLE "partner_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"whatsapp" varchar NOT NULL,
  	"city" varchar,
  	"has_passport" boolean DEFAULT false,
  	"has_bank_account" boolean DEFAULT false,
  	"page" varchar,
  	"status" "enum_partner_applications_status" DEFAULT 'new',
  	"notes" varchar,
  	"email" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partner_applications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "pages_blocks_hero_proof_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_cta" varchar,
  	"primary_cta_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ticker_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_ticker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_subhero_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_subhero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum_pages_blocks_subhero_buttons_style"
  );
  
  CREATE TABLE "pages_blocks_subhero_meta_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_subhero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"watermark" varchar,
  	"flag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_benefit_grid_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_benefit_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Common questions',
  	"contact_box_title" varchar DEFAULT 'Still have questions?',
  	"contact_box_description" varchar DEFAULT 'WhatsApp us for a direct, honest answer.',
  	"contact_box_button_text" varchar DEFAULT 'WhatsApp us now',
  	"contact_box_button_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_detail_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_detail_who_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"price" varchar,
  	"price_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_cards_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_cards_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"name" varchar,
  	"description" varchar,
  	"price" varchar,
  	"price_note" varchar,
  	"featured" boolean DEFAULT false,
  	"badge" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_tool_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"tax" varchar,
  	"timeline" varchar,
  	"banking" varchar,
  	"ownership" varchar,
  	"price" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_tool" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_jurisdiction_quiz_questions_answers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_jurisdiction_quiz_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar
  );
  
  CREATE TABLE "pages_blocks_jurisdiction_quiz_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"flag" varchar,
  	"name" varchar,
  	"rate" varchar,
  	"description" varchar,
  	"match_value" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar
  );
  
  CREATE TABLE "pages_blocks_jurisdiction_quiz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"callout" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lead_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"form_type" "enum_pages_blocks_lead_form_form_type" DEFAULT 'lead',
  	"submit_button_text" varchar,
  	"success_message" varchar,
  	"redirect_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_interactive_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_doc_checker" boolean DEFAULT true,
  	"show_timeline_calculator" boolean DEFAULT true,
  	"working_days" numeric DEFAULT 18,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_requirements_list_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "pages_blocks_requirements_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_row_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"unit" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_text" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_jurisdictions_grid_jurisdictions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region" varchar,
  	"flag" varchar,
  	"name" varchar,
  	"rate" varchar,
  	"description" varchar,
  	"timeline" varchar,
  	"price" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_jurisdictions_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"initials" varchar,
  	"name" varchar,
  	"role" varchar,
  	"rating" numeric DEFAULT 5
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_global_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"subhead" varchar,
  	"primary_btn" varchar,
  	"primary_link" varchar,
  	"secondary_btn" varchar,
  	"secondary_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lead_magnets_magnets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_lead_magnets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"page_type" "enum_pages_page_type" DEFAULT 'generic',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_proof_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_cta" varchar,
  	"primary_cta_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ticker_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ticker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_subhero_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_subhero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum__pages_v_blocks_subhero_buttons_style",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_subhero_meta_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_subhero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"watermark" varchar,
  	"flag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_benefit_grid_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_benefit_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Common questions',
  	"contact_box_title" varchar DEFAULT 'Still have questions?',
  	"contact_box_description" varchar DEFAULT 'WhatsApp us for a direct, honest answer.',
  	"contact_box_button_text" varchar DEFAULT 'WhatsApp us now',
  	"contact_box_button_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_detail_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_detail_who_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"price" varchar,
  	"price_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_cards_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_cards_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"name" varchar,
  	"description" varchar,
  	"price" varchar,
  	"price_note" varchar,
  	"featured" boolean DEFAULT false,
  	"badge" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_tool_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"tax" varchar,
  	"timeline" varchar,
  	"banking" varchar,
  	"ownership" varchar,
  	"price" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_tool" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_jurisdiction_quiz_questions_answers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_jurisdiction_quiz_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_jurisdiction_quiz_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"flag" varchar,
  	"name" varchar,
  	"rate" varchar,
  	"description" varchar,
  	"match_value" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_jurisdiction_quiz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"callout" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lead_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"form_type" "enum__pages_v_blocks_lead_form_form_type" DEFAULT 'lead',
  	"submit_button_text" varchar,
  	"success_message" varchar,
  	"redirect_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_interactive_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_doc_checker" boolean DEFAULT true,
  	"show_timeline_calculator" boolean DEFAULT true,
  	"working_days" numeric DEFAULT 18,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_requirements_list_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_requirements_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_row_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"unit" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_text" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_jurisdictions_grid_jurisdictions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"region" varchar,
  	"flag" varchar,
  	"name" varchar,
  	"rate" varchar,
  	"description" varchar,
  	"timeline" varchar,
  	"price" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_jurisdictions_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"initials" varchar,
  	"name" varchar,
  	"role" varchar,
  	"rating" numeric DEFAULT 5,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_global_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"subhead" varchar,
  	"primary_btn" varchar,
  	"primary_link" varchar,
  	"secondary_btn" varchar,
  	"secondary_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lead_magnets_magnets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lead_magnets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_page_type" "enum__pages_v_version_page_type" DEFAULT 'generic',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_canonical_url" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "landing_pages_blocks_hero_proof_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_cta" varchar,
  	"primary_cta_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_ticker_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_ticker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_subhero_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_subhero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum_landing_pages_blocks_subhero_buttons_style"
  );
  
  CREATE TABLE "landing_pages_blocks_subhero_meta_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_subhero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"watermark" varchar,
  	"flag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_benefit_grid_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_benefit_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Common questions',
  	"contact_box_title" varchar DEFAULT 'Still have questions?',
  	"contact_box_description" varchar DEFAULT 'WhatsApp us for a direct, honest answer.',
  	"contact_box_button_text" varchar DEFAULT 'WhatsApp us now',
  	"contact_box_button_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_pricing_detail_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_pricing_detail_who_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_pricing_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"price" varchar,
  	"price_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_pricing_cards_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_pricing_cards_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"name" varchar,
  	"description" varchar,
  	"price" varchar,
  	"price_note" varchar,
  	"featured" boolean DEFAULT false,
  	"badge" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_comparison_tool_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"tax" varchar,
  	"timeline" varchar,
  	"banking" varchar,
  	"ownership" varchar,
  	"price" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_comparison_tool" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_jurisdiction_quiz_questions_answers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_jurisdiction_quiz_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_jurisdiction_quiz_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"flag" varchar,
  	"name" varchar,
  	"rate" varchar,
  	"description" varchar,
  	"match_value" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_jurisdiction_quiz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"callout" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_lead_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"form_type" "enum_landing_pages_blocks_lead_form_form_type" DEFAULT 'lead',
  	"submit_button_text" varchar,
  	"success_message" varchar,
  	"redirect_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_interactive_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_doc_checker" boolean DEFAULT true,
  	"show_timeline_calculator" boolean DEFAULT true,
  	"working_days" numeric DEFAULT 18,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_requirements_list_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_requirements_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_landing_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "landing_pages_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_landing_pages_v_blocks_hero_proof_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_cta" varchar,
  	"primary_cta_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_ticker_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_ticker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_subhero_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_subhero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum__landing_pages_v_blocks_subhero_buttons_style",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_subhero_meta_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_subhero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"watermark" varchar,
  	"flag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_benefit_grid_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_benefit_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Common questions',
  	"contact_box_title" varchar DEFAULT 'Still have questions?',
  	"contact_box_description" varchar DEFAULT 'WhatsApp us for a direct, honest answer.',
  	"contact_box_button_text" varchar DEFAULT 'WhatsApp us now',
  	"contact_box_button_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_pricing_detail_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_pricing_detail_who_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_pricing_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"price" varchar,
  	"price_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_pricing_cards_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_pricing_cards_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"name" varchar,
  	"description" varchar,
  	"price" varchar,
  	"price_note" varchar,
  	"featured" boolean DEFAULT false,
  	"badge" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_comparison_tool_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"tax" varchar,
  	"timeline" varchar,
  	"banking" varchar,
  	"ownership" varchar,
  	"price" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_comparison_tool" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_jurisdiction_quiz_questions_answers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_jurisdiction_quiz_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_jurisdiction_quiz_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"flag" varchar,
  	"name" varchar,
  	"rate" varchar,
  	"description" varchar,
  	"match_value" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_jurisdiction_quiz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"callout" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_lead_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"form_type" "enum__landing_pages_v_blocks_lead_form_form_type" DEFAULT 'lead',
  	"submit_button_text" varchar,
  	"success_message" varchar,
  	"redirect_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_interactive_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_doc_checker" boolean DEFAULT true,
  	"show_timeline_calculator" boolean DEFAULT true,
  	"working_days" numeric DEFAULT 18,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_requirements_list_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_requirements_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__landing_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__landing_pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_landing_pages_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_name" varchar,
  	"data" jsonb,
  	"page" varchar,
  	"status" "enum_form_submissions_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"documents_id" integer,
  	"countries_id" integer,
  	"services_id" integer,
  	"pricing_tiers_id" integer,
  	"posts_id" integer,
  	"leads_id" integer,
  	"partner_applications_id" integer,
  	"pages_id" integer,
  	"landing_pages_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_hero_proof_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_cta" varchar,
  	"primary_cta_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_ticker_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_ticker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_stats_row_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"unit" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_stats_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_services_grid_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"link_text" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "homepage_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_jurisdictions_grid_jurisdictions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region" varchar,
  	"flag" varchar,
  	"name" varchar NOT NULL,
  	"rate" varchar,
  	"description" varchar,
  	"timeline" varchar,
  	"price" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "homepage_blocks_jurisdictions_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_pricing_cards_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_pricing_cards_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"price" varchar,
  	"price_note" varchar,
  	"featured" boolean DEFAULT false,
  	"badge" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "homepage_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_comparison_tool_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"tax" varchar,
  	"timeline" varchar,
  	"banking" varchar,
  	"ownership" varchar,
  	"price" varchar
  );
  
  CREATE TABLE "homepage_blocks_comparison_tool" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_jurisdiction_quiz_questions_answers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_jurisdiction_quiz_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_jurisdiction_quiz_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"flag" varchar,
  	"name" varchar NOT NULL,
  	"rate" varchar,
  	"description" varchar,
  	"match_value" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar
  );
  
  CREATE TABLE "homepage_blocks_jurisdiction_quiz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"callout" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_lead_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"form_type" "enum_homepage_blocks_lead_form_form_type" DEFAULT 'lead',
  	"submit_button_text" varchar,
  	"success_message" varchar,
  	"redirect_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_pricing_detail_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_pricing_detail_who_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_pricing_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"price" varchar NOT NULL,
  	"price_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Common questions' NOT NULL,
  	"contact_box_title" varchar DEFAULT 'Still have questions?',
  	"contact_box_description" varchar DEFAULT 'WhatsApp us for a direct, honest answer.',
  	"contact_box_button_text" varchar DEFAULT 'WhatsApp us now',
  	"contact_box_button_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"initials" varchar,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"rating" numeric DEFAULT 5
  );
  
  CREATE TABLE "homepage_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_global_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar NOT NULL,
  	"subhead" varchar,
  	"primary_btn" varchar,
  	"primary_link" varchar,
  	"secondary_btn" varchar,
  	"secondary_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_lead_magnets_magnets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "homepage_blocks_lead_magnets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_locales" (
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_platform",
  	"url" varchar
  );
  
  CREATE TABLE "site_settings_nav_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "site_settings_nav_menu_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"site_url" varchar,
  	"contact_email" varchar DEFAULT 'info@gccstartup.com',
  	"contact_whatsapp_number" varchar,
  	"announcement_bar_enabled" boolean,
  	"announcement_bar_link" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"brand_name" varchar DEFAULT 'GCC Startup',
  	"footer_about" varchar,
  	"footer_legal" varchar,
  	"announcement_bar_text" varchar,
  	"default_seo_title" varchar,
  	"default_seo_description" varchar,
  	"default_seo_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partner_page_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "partner_page_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL
  );
  
  CREATE TABLE "partner_page_faq_section_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "partner_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_desc" varchar,
  	"seo_meta_image_id" integer,
  	"urgency_bar" varchar,
  	"hero_badge" varchar,
  	"hero_hero_headline" varchar,
  	"hero_hero_subhead" varchar,
  	"hero_hero_cta" varchar,
  	"hero_hero_fine" varchar,
  	"how_it_works_how_label" varchar DEFAULT 'How It Works',
  	"how_it_works_how_headline" varchar,
  	"how_it_works_how_intro" varchar,
  	"apply_section_apply_label" varchar DEFAULT 'Secure Application',
  	"apply_section_apply_headline" varchar DEFAULT 'Apply for the Network',
  	"apply_section_apply_subhead" varchar,
  	"faq_section_faq_label" varchar DEFAULT 'Common Questions',
  	"faq_section_faq_headline" varchar DEFAULT 'Everything You Need to Know',
  	"faq_section_faq_intro" varchar,
  	"success_state_success_title" varchar DEFAULT 'Application Received!',
  	"success_state_success_body" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "partner_page_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "waha_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"waha_base_url" varchar,
  	"waha_session" varchar DEFAULT 'default',
  	"waha_api_key" varchar,
  	"admin_whatsapp_number" varchar,
  	"notify_lead" boolean DEFAULT true,
  	"n8n_webhook_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "countries_benefits" ADD CONSTRAINT "countries_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_documents" ADD CONSTRAINT "countries_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_process" ADD CONSTRAINT "countries_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_faq" ADD CONSTRAINT "countries_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_locales" ADD CONSTRAINT "countries_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "countries_locales" ADD CONSTRAINT "countries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_stat_chips" ADD CONSTRAINT "services_stat_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_process" ADD CONSTRAINT "services_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_faq" ADD CONSTRAINT "services_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_related_links" ADD CONSTRAINT "services_related_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_tiers_features" ADD CONSTRAINT "pricing_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_tiers_who_for" ADD CONSTRAINT "pricing_tiers_who_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_tiers_process" ADD CONSTRAINT "pricing_tiers_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_tiers_faq" ADD CONSTRAINT "pricing_tiers_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_tiers_locales" ADD CONSTRAINT "pricing_tiers_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pricing_tiers_locales" ADD CONSTRAINT "pricing_tiers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_tags" ADD CONSTRAINT "_posts_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_duplicate_of_id_leads_id_fk" FOREIGN KEY ("duplicate_of_id") REFERENCES "public"."leads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads_rels" ADD CONSTRAINT "leads_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads_rels" ADD CONSTRAINT "leads_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partner_applications_notes_timeline" ADD CONSTRAINT "partner_applications_notes_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partner_applications_rels" ADD CONSTRAINT "partner_applications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partner_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partner_applications_rels" ADD CONSTRAINT "partner_applications_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_proof_points" ADD CONSTRAINT "pages_blocks_hero_proof_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ticker_items" ADD CONSTRAINT "pages_blocks_ticker_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ticker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ticker" ADD CONSTRAINT "pages_blocks_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subhero_breadcrumbs" ADD CONSTRAINT "pages_blocks_subhero_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subhero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subhero_buttons" ADD CONSTRAINT "pages_blocks_subhero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subhero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subhero_meta_points" ADD CONSTRAINT "pages_blocks_subhero_meta_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subhero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subhero" ADD CONSTRAINT "pages_blocks_subhero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefit_grid_benefits" ADD CONSTRAINT "pages_blocks_benefit_grid_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_benefit_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefit_grid" ADD CONSTRAINT "pages_blocks_benefit_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_steps" ADD CONSTRAINT "pages_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_faqs" ADD CONSTRAINT "pages_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_detail_features" ADD CONSTRAINT "pages_blocks_pricing_detail_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_detail_who_for" ADD CONSTRAINT "pages_blocks_pricing_detail_who_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_detail" ADD CONSTRAINT "pages_blocks_pricing_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_cards_tiers_features" ADD CONSTRAINT "pages_blocks_pricing_cards_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_cards_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_cards_tiers" ADD CONSTRAINT "pages_blocks_pricing_cards_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_cards" ADD CONSTRAINT "pages_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_tool_options" ADD CONSTRAINT "pages_blocks_comparison_tool_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_tool"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_tool" ADD CONSTRAINT "pages_blocks_comparison_tool_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_jurisdiction_quiz_questions_answers" ADD CONSTRAINT "pages_blocks_jurisdiction_quiz_questions_answers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_jurisdiction_quiz_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_jurisdiction_quiz_questions" ADD CONSTRAINT "pages_blocks_jurisdiction_quiz_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_jurisdiction_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_jurisdiction_quiz_results" ADD CONSTRAINT "pages_blocks_jurisdiction_quiz_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_jurisdiction_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_jurisdiction_quiz" ADD CONSTRAINT "pages_blocks_jurisdiction_quiz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_form" ADD CONSTRAINT "pages_blocks_lead_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_interactive_tools" ADD CONSTRAINT "pages_blocks_interactive_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_requirements_list_requirements" ADD CONSTRAINT "pages_blocks_requirements_list_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_requirements_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_requirements_list" ADD CONSTRAINT "pages_blocks_requirements_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_row_stats" ADD CONSTRAINT "pages_blocks_stats_row_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_row" ADD CONSTRAINT "pages_blocks_stats_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_services" ADD CONSTRAINT "pages_blocks_services_grid_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid" ADD CONSTRAINT "pages_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_jurisdictions_grid_jurisdictions" ADD CONSTRAINT "pages_blocks_jurisdictions_grid_jurisdictions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_jurisdictions_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_jurisdictions_grid" ADD CONSTRAINT "pages_blocks_jurisdictions_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_global_cta" ADD CONSTRAINT "pages_blocks_global_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_magnets_magnets" ADD CONSTRAINT "pages_blocks_lead_magnets_magnets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_magnets" ADD CONSTRAINT "pages_blocks_lead_magnets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_proof_points" ADD CONSTRAINT "_pages_v_blocks_hero_proof_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ticker_items" ADD CONSTRAINT "_pages_v_blocks_ticker_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ticker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ticker" ADD CONSTRAINT "_pages_v_blocks_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_subhero_breadcrumbs" ADD CONSTRAINT "_pages_v_blocks_subhero_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_subhero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_subhero_buttons" ADD CONSTRAINT "_pages_v_blocks_subhero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_subhero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_subhero_meta_points" ADD CONSTRAINT "_pages_v_blocks_subhero_meta_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_subhero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_subhero" ADD CONSTRAINT "_pages_v_blocks_subhero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefit_grid_benefits" ADD CONSTRAINT "_pages_v_blocks_benefit_grid_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_benefit_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefit_grid" ADD CONSTRAINT "_pages_v_blocks_benefit_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_faqs" ADD CONSTRAINT "_pages_v_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_detail_features" ADD CONSTRAINT "_pages_v_blocks_pricing_detail_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_detail_who_for" ADD CONSTRAINT "_pages_v_blocks_pricing_detail_who_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_detail" ADD CONSTRAINT "_pages_v_blocks_pricing_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_cards_tiers_features" ADD CONSTRAINT "_pages_v_blocks_pricing_cards_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_cards_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_cards_tiers" ADD CONSTRAINT "_pages_v_blocks_pricing_cards_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_cards" ADD CONSTRAINT "_pages_v_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_tool_options" ADD CONSTRAINT "_pages_v_blocks_comparison_tool_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_tool"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_tool" ADD CONSTRAINT "_pages_v_blocks_comparison_tool_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_jurisdiction_quiz_questions_answers" ADD CONSTRAINT "_pages_v_blocks_jurisdiction_quiz_questions_answers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_jurisdiction_quiz_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_jurisdiction_quiz_questions" ADD CONSTRAINT "_pages_v_blocks_jurisdiction_quiz_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_jurisdiction_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_jurisdiction_quiz_results" ADD CONSTRAINT "_pages_v_blocks_jurisdiction_quiz_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_jurisdiction_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_jurisdiction_quiz" ADD CONSTRAINT "_pages_v_blocks_jurisdiction_quiz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_form" ADD CONSTRAINT "_pages_v_blocks_lead_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_interactive_tools" ADD CONSTRAINT "_pages_v_blocks_interactive_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_requirements_list_requirements" ADD CONSTRAINT "_pages_v_blocks_requirements_list_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_requirements_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_requirements_list" ADD CONSTRAINT "_pages_v_blocks_requirements_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_row_stats" ADD CONSTRAINT "_pages_v_blocks_stats_row_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_row" ADD CONSTRAINT "_pages_v_blocks_stats_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid_services" ADD CONSTRAINT "_pages_v_blocks_services_grid_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid" ADD CONSTRAINT "_pages_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_jurisdictions_grid_jurisdictions" ADD CONSTRAINT "_pages_v_blocks_jurisdictions_grid_jurisdictions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_jurisdictions_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_jurisdictions_grid" ADD CONSTRAINT "_pages_v_blocks_jurisdictions_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_global_cta" ADD CONSTRAINT "_pages_v_blocks_global_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_magnets_magnets" ADD CONSTRAINT "_pages_v_blocks_lead_magnets_magnets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_magnets" ADD CONSTRAINT "_pages_v_blocks_lead_magnets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_hero_proof_points" ADD CONSTRAINT "landing_pages_blocks_hero_proof_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_hero" ADD CONSTRAINT "landing_pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_ticker_items" ADD CONSTRAINT "landing_pages_blocks_ticker_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_ticker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_ticker" ADD CONSTRAINT "landing_pages_blocks_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_subhero_breadcrumbs" ADD CONSTRAINT "landing_pages_blocks_subhero_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_subhero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_subhero_buttons" ADD CONSTRAINT "landing_pages_blocks_subhero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_subhero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_subhero_meta_points" ADD CONSTRAINT "landing_pages_blocks_subhero_meta_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_subhero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_subhero" ADD CONSTRAINT "landing_pages_blocks_subhero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_benefit_grid_benefits" ADD CONSTRAINT "landing_pages_blocks_benefit_grid_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_benefit_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_benefit_grid" ADD CONSTRAINT "landing_pages_blocks_benefit_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_process_steps_steps" ADD CONSTRAINT "landing_pages_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_process_steps" ADD CONSTRAINT "landing_pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_faq_faqs" ADD CONSTRAINT "landing_pages_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_faq" ADD CONSTRAINT "landing_pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_pricing_detail_features" ADD CONSTRAINT "landing_pages_blocks_pricing_detail_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_pricing_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_pricing_detail_who_for" ADD CONSTRAINT "landing_pages_blocks_pricing_detail_who_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_pricing_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_pricing_detail" ADD CONSTRAINT "landing_pages_blocks_pricing_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_pricing_cards_tiers_features" ADD CONSTRAINT "landing_pages_blocks_pricing_cards_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_pricing_cards_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_pricing_cards_tiers" ADD CONSTRAINT "landing_pages_blocks_pricing_cards_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_pricing_cards" ADD CONSTRAINT "landing_pages_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_comparison_tool_options" ADD CONSTRAINT "landing_pages_blocks_comparison_tool_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_comparison_tool"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_comparison_tool" ADD CONSTRAINT "landing_pages_blocks_comparison_tool_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_jurisdiction_quiz_questions_answers" ADD CONSTRAINT "landing_pages_blocks_jurisdiction_quiz_questions_answers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_jurisdiction_quiz_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_jurisdiction_quiz_questions" ADD CONSTRAINT "landing_pages_blocks_jurisdiction_quiz_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_jurisdiction_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_jurisdiction_quiz_results" ADD CONSTRAINT "landing_pages_blocks_jurisdiction_quiz_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_jurisdiction_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_jurisdiction_quiz" ADD CONSTRAINT "landing_pages_blocks_jurisdiction_quiz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_lead_form" ADD CONSTRAINT "landing_pages_blocks_lead_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_interactive_tools" ADD CONSTRAINT "landing_pages_blocks_interactive_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_requirements_list_requirements" ADD CONSTRAINT "landing_pages_blocks_requirements_list_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_requirements_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_requirements_list" ADD CONSTRAINT "landing_pages_blocks_requirements_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_locales" ADD CONSTRAINT "landing_pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_pages_locales" ADD CONSTRAINT "landing_pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_hero_proof_points" ADD CONSTRAINT "_landing_pages_v_blocks_hero_proof_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_hero" ADD CONSTRAINT "_landing_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_ticker_items" ADD CONSTRAINT "_landing_pages_v_blocks_ticker_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_ticker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_ticker" ADD CONSTRAINT "_landing_pages_v_blocks_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_subhero_breadcrumbs" ADD CONSTRAINT "_landing_pages_v_blocks_subhero_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_subhero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_subhero_buttons" ADD CONSTRAINT "_landing_pages_v_blocks_subhero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_subhero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_subhero_meta_points" ADD CONSTRAINT "_landing_pages_v_blocks_subhero_meta_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_subhero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_subhero" ADD CONSTRAINT "_landing_pages_v_blocks_subhero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_benefit_grid_benefits" ADD CONSTRAINT "_landing_pages_v_blocks_benefit_grid_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_benefit_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_benefit_grid" ADD CONSTRAINT "_landing_pages_v_blocks_benefit_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_process_steps_steps" ADD CONSTRAINT "_landing_pages_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_process_steps" ADD CONSTRAINT "_landing_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_faq_faqs" ADD CONSTRAINT "_landing_pages_v_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_faq" ADD CONSTRAINT "_landing_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_pricing_detail_features" ADD CONSTRAINT "_landing_pages_v_blocks_pricing_detail_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_pricing_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_pricing_detail_who_for" ADD CONSTRAINT "_landing_pages_v_blocks_pricing_detail_who_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_pricing_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_pricing_detail" ADD CONSTRAINT "_landing_pages_v_blocks_pricing_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_pricing_cards_tiers_features" ADD CONSTRAINT "_landing_pages_v_blocks_pricing_cards_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_pricing_cards_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_pricing_cards_tiers" ADD CONSTRAINT "_landing_pages_v_blocks_pricing_cards_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_pricing_cards" ADD CONSTRAINT "_landing_pages_v_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_comparison_tool_options" ADD CONSTRAINT "_landing_pages_v_blocks_comparison_tool_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_comparison_tool"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_comparison_tool" ADD CONSTRAINT "_landing_pages_v_blocks_comparison_tool_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_jurisdiction_quiz_questions_answers" ADD CONSTRAINT "_landing_pages_v_blocks_jurisdiction_quiz_questions_answers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_jurisdiction_quiz_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_jurisdiction_quiz_questions" ADD CONSTRAINT "_landing_pages_v_blocks_jurisdiction_quiz_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_jurisdiction_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_jurisdiction_quiz_results" ADD CONSTRAINT "_landing_pages_v_blocks_jurisdiction_quiz_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_jurisdiction_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_jurisdiction_quiz" ADD CONSTRAINT "_landing_pages_v_blocks_jurisdiction_quiz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_lead_form" ADD CONSTRAINT "_landing_pages_v_blocks_lead_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_interactive_tools" ADD CONSTRAINT "_landing_pages_v_blocks_interactive_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_requirements_list_requirements" ADD CONSTRAINT "_landing_pages_v_blocks_requirements_list_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_requirements_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_requirements_list" ADD CONSTRAINT "_landing_pages_v_blocks_requirements_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v" ADD CONSTRAINT "_landing_pages_v_parent_id_landing_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_locales" ADD CONSTRAINT "_landing_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_locales" ADD CONSTRAINT "_landing_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pricing_tiers_fk" FOREIGN KEY ("pricing_tiers_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partner_applications_fk" FOREIGN KEY ("partner_applications_id") REFERENCES "public"."partner_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_landing_pages_fk" FOREIGN KEY ("landing_pages_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_hero_proof_points" ADD CONSTRAINT "homepage_blocks_hero_proof_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_hero" ADD CONSTRAINT "homepage_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_ticker_items" ADD CONSTRAINT "homepage_blocks_ticker_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_ticker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_ticker" ADD CONSTRAINT "homepage_blocks_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_stats_row_stats" ADD CONSTRAINT "homepage_blocks_stats_row_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_stats_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_stats_row" ADD CONSTRAINT "homepage_blocks_stats_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_services_grid_services" ADD CONSTRAINT "homepage_blocks_services_grid_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_services_grid" ADD CONSTRAINT "homepage_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_jurisdictions_grid_jurisdictions" ADD CONSTRAINT "homepage_blocks_jurisdictions_grid_jurisdictions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_jurisdictions_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_jurisdictions_grid" ADD CONSTRAINT "homepage_blocks_jurisdictions_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pricing_cards_tiers_features" ADD CONSTRAINT "homepage_blocks_pricing_cards_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_pricing_cards_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pricing_cards_tiers" ADD CONSTRAINT "homepage_blocks_pricing_cards_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pricing_cards" ADD CONSTRAINT "homepage_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_comparison_tool_options" ADD CONSTRAINT "homepage_blocks_comparison_tool_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_comparison_tool"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_comparison_tool" ADD CONSTRAINT "homepage_blocks_comparison_tool_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_jurisdiction_quiz_questions_answers" ADD CONSTRAINT "homepage_blocks_jurisdiction_quiz_questions_answers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_jurisdiction_quiz_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_jurisdiction_quiz_questions" ADD CONSTRAINT "homepage_blocks_jurisdiction_quiz_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_jurisdiction_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_jurisdiction_quiz_results" ADD CONSTRAINT "homepage_blocks_jurisdiction_quiz_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_jurisdiction_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_jurisdiction_quiz" ADD CONSTRAINT "homepage_blocks_jurisdiction_quiz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_lead_form" ADD CONSTRAINT "homepage_blocks_lead_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pricing_detail_features" ADD CONSTRAINT "homepage_blocks_pricing_detail_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_pricing_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pricing_detail_who_for" ADD CONSTRAINT "homepage_blocks_pricing_detail_who_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_pricing_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pricing_detail" ADD CONSTRAINT "homepage_blocks_pricing_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_process_steps_steps" ADD CONSTRAINT "homepage_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_process_steps" ADD CONSTRAINT "homepage_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faq_faqs" ADD CONSTRAINT "homepage_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faq" ADD CONSTRAINT "homepage_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_testimonials_testimonials" ADD CONSTRAINT "homepage_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_testimonials" ADD CONSTRAINT "homepage_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_global_cta" ADD CONSTRAINT "homepage_blocks_global_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_lead_magnets_magnets" ADD CONSTRAINT "homepage_blocks_lead_magnets_magnets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_lead_magnets" ADD CONSTRAINT "homepage_blocks_lead_magnets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav_menu" ADD CONSTRAINT "site_settings_nav_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav_menu_locales" ADD CONSTRAINT "site_settings_nav_menu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_nav_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_default_seo_image_id_media_id_fk" FOREIGN KEY ("default_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partner_page_stats" ADD CONSTRAINT "partner_page_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partner_page_how_it_works_steps" ADD CONSTRAINT "partner_page_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partner_page_faq_section_faq" ADD CONSTRAINT "partner_page_faq_section_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partner_page" ADD CONSTRAINT "partner_page_seo_meta_image_id_media_id_fk" FOREIGN KEY ("seo_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partner_page_locales" ADD CONSTRAINT "partner_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partner_page_locales" ADD CONSTRAINT "partner_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE INDEX "countries_benefits_order_idx" ON "countries_benefits" USING btree ("_order");
  CREATE INDEX "countries_benefits_parent_id_idx" ON "countries_benefits" USING btree ("_parent_id");
  CREATE INDEX "countries_documents_order_idx" ON "countries_documents" USING btree ("_order");
  CREATE INDEX "countries_documents_parent_id_idx" ON "countries_documents" USING btree ("_parent_id");
  CREATE INDEX "countries_process_order_idx" ON "countries_process" USING btree ("_order");
  CREATE INDEX "countries_process_parent_id_idx" ON "countries_process" USING btree ("_parent_id");
  CREATE INDEX "countries_faq_order_idx" ON "countries_faq" USING btree ("_order");
  CREATE INDEX "countries_faq_parent_id_idx" ON "countries_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "countries_slug_idx" ON "countries" USING btree ("slug");
  CREATE INDEX "countries_updated_at_idx" ON "countries" USING btree ("updated_at");
  CREATE INDEX "countries_created_at_idx" ON "countries" USING btree ("created_at");
  CREATE INDEX "countries_meta_meta_image_idx" ON "countries_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "countries_locales_locale_parent_id_unique" ON "countries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_stat_chips_order_idx" ON "services_stat_chips" USING btree ("_order");
  CREATE INDEX "services_stat_chips_parent_id_idx" ON "services_stat_chips" USING btree ("_parent_id");
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE INDEX "services_process_order_idx" ON "services_process" USING btree ("_order");
  CREATE INDEX "services_process_parent_id_idx" ON "services_process" USING btree ("_parent_id");
  CREATE INDEX "services_faq_order_idx" ON "services_faq" USING btree ("_order");
  CREATE INDEX "services_faq_parent_id_idx" ON "services_faq" USING btree ("_parent_id");
  CREATE INDEX "services_related_links_order_idx" ON "services_related_links" USING btree ("_order");
  CREATE INDEX "services_related_links_parent_id_idx" ON "services_related_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services_meta_meta_image_idx" ON "services_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pricing_tiers_features_order_idx" ON "pricing_tiers_features" USING btree ("_order");
  CREATE INDEX "pricing_tiers_features_parent_id_idx" ON "pricing_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "pricing_tiers_who_for_order_idx" ON "pricing_tiers_who_for" USING btree ("_order");
  CREATE INDEX "pricing_tiers_who_for_parent_id_idx" ON "pricing_tiers_who_for" USING btree ("_parent_id");
  CREATE INDEX "pricing_tiers_process_order_idx" ON "pricing_tiers_process" USING btree ("_order");
  CREATE INDEX "pricing_tiers_process_parent_id_idx" ON "pricing_tiers_process" USING btree ("_parent_id");
  CREATE INDEX "pricing_tiers_faq_order_idx" ON "pricing_tiers_faq" USING btree ("_order");
  CREATE INDEX "pricing_tiers_faq_parent_id_idx" ON "pricing_tiers_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pricing_tiers_slug_idx" ON "pricing_tiers" USING btree ("slug");
  CREATE INDEX "pricing_tiers_updated_at_idx" ON "pricing_tiers" USING btree ("updated_at");
  CREATE INDEX "pricing_tiers_created_at_idx" ON "pricing_tiers" USING btree ("created_at");
  CREATE INDEX "pricing_tiers_meta_meta_image_idx" ON "pricing_tiers_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pricing_tiers_locales_locale_parent_id_unique" ON "pricing_tiers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_tags_order_idx" ON "posts_tags" USING btree ("_order");
  CREATE INDEX "posts_tags_parent_id_idx" ON "posts_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_cover_image_idx" ON "posts" USING btree ("cover_image_id");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_version_tags_order_idx" ON "_posts_v_version_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_version_tags_parent_id_idx" ON "_posts_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_cover_image_idx" ON "_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "leads_assigned_to_idx" ON "leads" USING btree ("assigned_to_id");
  CREATE INDEX "leads_duplicate_of_idx" ON "leads" USING btree ("duplicate_of_id");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "leads_rels_order_idx" ON "leads_rels" USING btree ("order");
  CREATE INDEX "leads_rels_parent_idx" ON "leads_rels" USING btree ("parent_id");
  CREATE INDEX "leads_rels_path_idx" ON "leads_rels" USING btree ("path");
  CREATE INDEX "leads_rels_media_id_idx" ON "leads_rels" USING btree ("media_id");
  CREATE INDEX "partner_applications_notes_timeline_order_idx" ON "partner_applications_notes_timeline" USING btree ("_order");
  CREATE INDEX "partner_applications_notes_timeline_parent_id_idx" ON "partner_applications_notes_timeline" USING btree ("_parent_id");
  CREATE INDEX "partner_applications_updated_at_idx" ON "partner_applications" USING btree ("updated_at");
  CREATE INDEX "partner_applications_created_at_idx" ON "partner_applications" USING btree ("created_at");
  CREATE INDEX "partner_applications_rels_order_idx" ON "partner_applications_rels" USING btree ("order");
  CREATE INDEX "partner_applications_rels_parent_idx" ON "partner_applications_rels" USING btree ("parent_id");
  CREATE INDEX "partner_applications_rels_path_idx" ON "partner_applications_rels" USING btree ("path");
  CREATE INDEX "partner_applications_rels_media_id_idx" ON "partner_applications_rels" USING btree ("media_id");
  CREATE INDEX "pages_blocks_hero_proof_points_order_idx" ON "pages_blocks_hero_proof_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_proof_points_parent_id_idx" ON "pages_blocks_hero_proof_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_proof_points_locale_idx" ON "pages_blocks_hero_proof_points" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_ticker_items_order_idx" ON "pages_blocks_ticker_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_ticker_items_parent_id_idx" ON "pages_blocks_ticker_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ticker_items_locale_idx" ON "pages_blocks_ticker_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_ticker_order_idx" ON "pages_blocks_ticker" USING btree ("_order");
  CREATE INDEX "pages_blocks_ticker_parent_id_idx" ON "pages_blocks_ticker" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ticker_path_idx" ON "pages_blocks_ticker" USING btree ("_path");
  CREATE INDEX "pages_blocks_ticker_locale_idx" ON "pages_blocks_ticker" USING btree ("_locale");
  CREATE INDEX "pages_blocks_subhero_breadcrumbs_order_idx" ON "pages_blocks_subhero_breadcrumbs" USING btree ("_order");
  CREATE INDEX "pages_blocks_subhero_breadcrumbs_parent_id_idx" ON "pages_blocks_subhero_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_subhero_breadcrumbs_locale_idx" ON "pages_blocks_subhero_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_subhero_buttons_order_idx" ON "pages_blocks_subhero_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_subhero_buttons_parent_id_idx" ON "pages_blocks_subhero_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_subhero_buttons_locale_idx" ON "pages_blocks_subhero_buttons" USING btree ("_locale");
  CREATE INDEX "pages_blocks_subhero_meta_points_order_idx" ON "pages_blocks_subhero_meta_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_subhero_meta_points_parent_id_idx" ON "pages_blocks_subhero_meta_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_subhero_meta_points_locale_idx" ON "pages_blocks_subhero_meta_points" USING btree ("_locale");
  CREATE INDEX "pages_blocks_subhero_order_idx" ON "pages_blocks_subhero" USING btree ("_order");
  CREATE INDEX "pages_blocks_subhero_parent_id_idx" ON "pages_blocks_subhero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_subhero_path_idx" ON "pages_blocks_subhero" USING btree ("_path");
  CREATE INDEX "pages_blocks_subhero_locale_idx" ON "pages_blocks_subhero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_benefit_grid_benefits_order_idx" ON "pages_blocks_benefit_grid_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefit_grid_benefits_parent_id_idx" ON "pages_blocks_benefit_grid_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefit_grid_benefits_locale_idx" ON "pages_blocks_benefit_grid_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_benefit_grid_order_idx" ON "pages_blocks_benefit_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefit_grid_parent_id_idx" ON "pages_blocks_benefit_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefit_grid_path_idx" ON "pages_blocks_benefit_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_benefit_grid_locale_idx" ON "pages_blocks_benefit_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_process_steps_steps_order_idx" ON "pages_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_steps_parent_id_idx" ON "pages_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_steps_locale_idx" ON "pages_blocks_process_steps_steps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_path_idx" ON "pages_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_steps_locale_idx" ON "pages_blocks_process_steps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_faqs_order_idx" ON "pages_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_faqs_parent_id_idx" ON "pages_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_faqs_locale_idx" ON "pages_blocks_faq_faqs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_locale_idx" ON "pages_blocks_faq" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_detail_features_order_idx" ON "pages_blocks_pricing_detail_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_detail_features_parent_id_idx" ON "pages_blocks_pricing_detail_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_detail_features_locale_idx" ON "pages_blocks_pricing_detail_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_detail_who_for_order_idx" ON "pages_blocks_pricing_detail_who_for" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_detail_who_for_parent_id_idx" ON "pages_blocks_pricing_detail_who_for" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_detail_who_for_locale_idx" ON "pages_blocks_pricing_detail_who_for" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_detail_order_idx" ON "pages_blocks_pricing_detail" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_detail_parent_id_idx" ON "pages_blocks_pricing_detail" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_detail_path_idx" ON "pages_blocks_pricing_detail" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_detail_locale_idx" ON "pages_blocks_pricing_detail" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_cards_tiers_features_order_idx" ON "pages_blocks_pricing_cards_tiers_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_cards_tiers_features_parent_id_idx" ON "pages_blocks_pricing_cards_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_cards_tiers_features_locale_idx" ON "pages_blocks_pricing_cards_tiers_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_cards_tiers_order_idx" ON "pages_blocks_pricing_cards_tiers" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_cards_tiers_parent_id_idx" ON "pages_blocks_pricing_cards_tiers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_cards_tiers_locale_idx" ON "pages_blocks_pricing_cards_tiers" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_cards_order_idx" ON "pages_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_cards_parent_id_idx" ON "pages_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_cards_path_idx" ON "pages_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_cards_locale_idx" ON "pages_blocks_pricing_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_comparison_tool_options_order_idx" ON "pages_blocks_comparison_tool_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_tool_options_parent_id_idx" ON "pages_blocks_comparison_tool_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_tool_options_locale_idx" ON "pages_blocks_comparison_tool_options" USING btree ("_locale");
  CREATE INDEX "pages_blocks_comparison_tool_order_idx" ON "pages_blocks_comparison_tool" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_tool_parent_id_idx" ON "pages_blocks_comparison_tool" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_tool_path_idx" ON "pages_blocks_comparison_tool" USING btree ("_path");
  CREATE INDEX "pages_blocks_comparison_tool_locale_idx" ON "pages_blocks_comparison_tool" USING btree ("_locale");
  CREATE INDEX "pages_blocks_jurisdiction_quiz_questions_answers_order_idx" ON "pages_blocks_jurisdiction_quiz_questions_answers" USING btree ("_order");
  CREATE INDEX "pages_blocks_jurisdiction_quiz_questions_answers_parent_id_idx" ON "pages_blocks_jurisdiction_quiz_questions_answers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_jurisdiction_quiz_questions_answers_locale_idx" ON "pages_blocks_jurisdiction_quiz_questions_answers" USING btree ("_locale");
  CREATE INDEX "pages_blocks_jurisdiction_quiz_questions_order_idx" ON "pages_blocks_jurisdiction_quiz_questions" USING btree ("_order");
  CREATE INDEX "pages_blocks_jurisdiction_quiz_questions_parent_id_idx" ON "pages_blocks_jurisdiction_quiz_questions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_jurisdiction_quiz_questions_locale_idx" ON "pages_blocks_jurisdiction_quiz_questions" USING btree ("_locale");
  CREATE INDEX "pages_blocks_jurisdiction_quiz_results_order_idx" ON "pages_blocks_jurisdiction_quiz_results" USING btree ("_order");
  CREATE INDEX "pages_blocks_jurisdiction_quiz_results_parent_id_idx" ON "pages_blocks_jurisdiction_quiz_results" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_jurisdiction_quiz_results_locale_idx" ON "pages_blocks_jurisdiction_quiz_results" USING btree ("_locale");
  CREATE INDEX "pages_blocks_jurisdiction_quiz_order_idx" ON "pages_blocks_jurisdiction_quiz" USING btree ("_order");
  CREATE INDEX "pages_blocks_jurisdiction_quiz_parent_id_idx" ON "pages_blocks_jurisdiction_quiz" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_jurisdiction_quiz_path_idx" ON "pages_blocks_jurisdiction_quiz" USING btree ("_path");
  CREATE INDEX "pages_blocks_jurisdiction_quiz_locale_idx" ON "pages_blocks_jurisdiction_quiz" USING btree ("_locale");
  CREATE INDEX "pages_blocks_lead_form_order_idx" ON "pages_blocks_lead_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_form_parent_id_idx" ON "pages_blocks_lead_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lead_form_path_idx" ON "pages_blocks_lead_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_lead_form_locale_idx" ON "pages_blocks_lead_form" USING btree ("_locale");
  CREATE INDEX "pages_blocks_interactive_tools_order_idx" ON "pages_blocks_interactive_tools" USING btree ("_order");
  CREATE INDEX "pages_blocks_interactive_tools_parent_id_idx" ON "pages_blocks_interactive_tools" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_interactive_tools_path_idx" ON "pages_blocks_interactive_tools" USING btree ("_path");
  CREATE INDEX "pages_blocks_interactive_tools_locale_idx" ON "pages_blocks_interactive_tools" USING btree ("_locale");
  CREATE INDEX "pages_blocks_requirements_list_requirements_order_idx" ON "pages_blocks_requirements_list_requirements" USING btree ("_order");
  CREATE INDEX "pages_blocks_requirements_list_requirements_parent_id_idx" ON "pages_blocks_requirements_list_requirements" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_requirements_list_requirements_locale_idx" ON "pages_blocks_requirements_list_requirements" USING btree ("_locale");
  CREATE INDEX "pages_blocks_requirements_list_order_idx" ON "pages_blocks_requirements_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_requirements_list_parent_id_idx" ON "pages_blocks_requirements_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_requirements_list_path_idx" ON "pages_blocks_requirements_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_requirements_list_locale_idx" ON "pages_blocks_requirements_list" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_row_stats_order_idx" ON "pages_blocks_stats_row_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_row_stats_parent_id_idx" ON "pages_blocks_stats_row_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_row_stats_locale_idx" ON "pages_blocks_stats_row_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_row_order_idx" ON "pages_blocks_stats_row" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_row_parent_id_idx" ON "pages_blocks_stats_row" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_row_path_idx" ON "pages_blocks_stats_row" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_row_locale_idx" ON "pages_blocks_stats_row" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_grid_services_order_idx" ON "pages_blocks_services_grid_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_services_parent_id_idx" ON "pages_blocks_services_grid_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_services_locale_idx" ON "pages_blocks_services_grid_services" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_grid_order_idx" ON "pages_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_parent_id_idx" ON "pages_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_path_idx" ON "pages_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_grid_locale_idx" ON "pages_blocks_services_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_jurisdictions_grid_jurisdictions_order_idx" ON "pages_blocks_jurisdictions_grid_jurisdictions" USING btree ("_order");
  CREATE INDEX "pages_blocks_jurisdictions_grid_jurisdictions_parent_id_idx" ON "pages_blocks_jurisdictions_grid_jurisdictions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_jurisdictions_grid_jurisdictions_locale_idx" ON "pages_blocks_jurisdictions_grid_jurisdictions" USING btree ("_locale");
  CREATE INDEX "pages_blocks_jurisdictions_grid_order_idx" ON "pages_blocks_jurisdictions_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_jurisdictions_grid_parent_id_idx" ON "pages_blocks_jurisdictions_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_jurisdictions_grid_path_idx" ON "pages_blocks_jurisdictions_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_jurisdictions_grid_locale_idx" ON "pages_blocks_jurisdictions_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_testimonials_order_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_testimonials_parent_id_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_testimonials_locale_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_locale_idx" ON "pages_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "pages_blocks_global_cta_order_idx" ON "pages_blocks_global_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_global_cta_parent_id_idx" ON "pages_blocks_global_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_global_cta_path_idx" ON "pages_blocks_global_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_global_cta_locale_idx" ON "pages_blocks_global_cta" USING btree ("_locale");
  CREATE INDEX "pages_blocks_lead_magnets_magnets_order_idx" ON "pages_blocks_lead_magnets_magnets" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_magnets_magnets_parent_id_idx" ON "pages_blocks_lead_magnets_magnets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lead_magnets_magnets_locale_idx" ON "pages_blocks_lead_magnets_magnets" USING btree ("_locale");
  CREATE INDEX "pages_blocks_lead_magnets_order_idx" ON "pages_blocks_lead_magnets" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_magnets_parent_id_idx" ON "pages_blocks_lead_magnets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lead_magnets_path_idx" ON "pages_blocks_lead_magnets" USING btree ("_path");
  CREATE INDEX "pages_blocks_lead_magnets_locale_idx" ON "pages_blocks_lead_magnets" USING btree ("_locale");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_proof_points_order_idx" ON "_pages_v_blocks_hero_proof_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_proof_points_parent_id_idx" ON "_pages_v_blocks_hero_proof_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_proof_points_locale_idx" ON "_pages_v_blocks_hero_proof_points" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_locale_idx" ON "_pages_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_ticker_items_order_idx" ON "_pages_v_blocks_ticker_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ticker_items_parent_id_idx" ON "_pages_v_blocks_ticker_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ticker_items_locale_idx" ON "_pages_v_blocks_ticker_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_ticker_order_idx" ON "_pages_v_blocks_ticker" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ticker_parent_id_idx" ON "_pages_v_blocks_ticker" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ticker_path_idx" ON "_pages_v_blocks_ticker" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ticker_locale_idx" ON "_pages_v_blocks_ticker" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_subhero_breadcrumbs_order_idx" ON "_pages_v_blocks_subhero_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_subhero_breadcrumbs_parent_id_idx" ON "_pages_v_blocks_subhero_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_subhero_breadcrumbs_locale_idx" ON "_pages_v_blocks_subhero_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_subhero_buttons_order_idx" ON "_pages_v_blocks_subhero_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_subhero_buttons_parent_id_idx" ON "_pages_v_blocks_subhero_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_subhero_buttons_locale_idx" ON "_pages_v_blocks_subhero_buttons" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_subhero_meta_points_order_idx" ON "_pages_v_blocks_subhero_meta_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_subhero_meta_points_parent_id_idx" ON "_pages_v_blocks_subhero_meta_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_subhero_meta_points_locale_idx" ON "_pages_v_blocks_subhero_meta_points" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_subhero_order_idx" ON "_pages_v_blocks_subhero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_subhero_parent_id_idx" ON "_pages_v_blocks_subhero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_subhero_path_idx" ON "_pages_v_blocks_subhero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_subhero_locale_idx" ON "_pages_v_blocks_subhero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_benefit_grid_benefits_order_idx" ON "_pages_v_blocks_benefit_grid_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefit_grid_benefits_parent_id_idx" ON "_pages_v_blocks_benefit_grid_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefit_grid_benefits_locale_idx" ON "_pages_v_blocks_benefit_grid_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_benefit_grid_order_idx" ON "_pages_v_blocks_benefit_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefit_grid_parent_id_idx" ON "_pages_v_blocks_benefit_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefit_grid_path_idx" ON "_pages_v_blocks_benefit_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_benefit_grid_locale_idx" ON "_pages_v_blocks_benefit_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_order_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_parent_id_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_locale_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_path_idx" ON "_pages_v_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_steps_locale_idx" ON "_pages_v_blocks_process_steps" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_faqs_order_idx" ON "_pages_v_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_faqs_parent_id_idx" ON "_pages_v_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_faqs_locale_idx" ON "_pages_v_blocks_faq_faqs" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_locale_idx" ON "_pages_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_detail_features_order_idx" ON "_pages_v_blocks_pricing_detail_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_detail_features_parent_id_idx" ON "_pages_v_blocks_pricing_detail_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_detail_features_locale_idx" ON "_pages_v_blocks_pricing_detail_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_detail_who_for_order_idx" ON "_pages_v_blocks_pricing_detail_who_for" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_detail_who_for_parent_id_idx" ON "_pages_v_blocks_pricing_detail_who_for" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_detail_who_for_locale_idx" ON "_pages_v_blocks_pricing_detail_who_for" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_detail_order_idx" ON "_pages_v_blocks_pricing_detail" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_detail_parent_id_idx" ON "_pages_v_blocks_pricing_detail" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_detail_path_idx" ON "_pages_v_blocks_pricing_detail" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_detail_locale_idx" ON "_pages_v_blocks_pricing_detail" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_cards_tiers_features_order_idx" ON "_pages_v_blocks_pricing_cards_tiers_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_cards_tiers_features_parent_id_idx" ON "_pages_v_blocks_pricing_cards_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_cards_tiers_features_locale_idx" ON "_pages_v_blocks_pricing_cards_tiers_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_cards_tiers_order_idx" ON "_pages_v_blocks_pricing_cards_tiers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_cards_tiers_parent_id_idx" ON "_pages_v_blocks_pricing_cards_tiers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_cards_tiers_locale_idx" ON "_pages_v_blocks_pricing_cards_tiers" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_cards_order_idx" ON "_pages_v_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_cards_parent_id_idx" ON "_pages_v_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_cards_path_idx" ON "_pages_v_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_cards_locale_idx" ON "_pages_v_blocks_pricing_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_comparison_tool_options_order_idx" ON "_pages_v_blocks_comparison_tool_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_tool_options_parent_id_idx" ON "_pages_v_blocks_comparison_tool_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_tool_options_locale_idx" ON "_pages_v_blocks_comparison_tool_options" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_comparison_tool_order_idx" ON "_pages_v_blocks_comparison_tool" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_tool_parent_id_idx" ON "_pages_v_blocks_comparison_tool" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_tool_path_idx" ON "_pages_v_blocks_comparison_tool" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_comparison_tool_locale_idx" ON "_pages_v_blocks_comparison_tool" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_jurisdiction_quiz_questions_answers_order_idx" ON "_pages_v_blocks_jurisdiction_quiz_questions_answers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_jurisdiction_quiz_questions_answers_parent_id_idx" ON "_pages_v_blocks_jurisdiction_quiz_questions_answers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_jurisdiction_quiz_questions_answers_locale_idx" ON "_pages_v_blocks_jurisdiction_quiz_questions_answers" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_jurisdiction_quiz_questions_order_idx" ON "_pages_v_blocks_jurisdiction_quiz_questions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_jurisdiction_quiz_questions_parent_id_idx" ON "_pages_v_blocks_jurisdiction_quiz_questions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_jurisdiction_quiz_questions_locale_idx" ON "_pages_v_blocks_jurisdiction_quiz_questions" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_jurisdiction_quiz_results_order_idx" ON "_pages_v_blocks_jurisdiction_quiz_results" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_jurisdiction_quiz_results_parent_id_idx" ON "_pages_v_blocks_jurisdiction_quiz_results" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_jurisdiction_quiz_results_locale_idx" ON "_pages_v_blocks_jurisdiction_quiz_results" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_jurisdiction_quiz_order_idx" ON "_pages_v_blocks_jurisdiction_quiz" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_jurisdiction_quiz_parent_id_idx" ON "_pages_v_blocks_jurisdiction_quiz" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_jurisdiction_quiz_path_idx" ON "_pages_v_blocks_jurisdiction_quiz" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_jurisdiction_quiz_locale_idx" ON "_pages_v_blocks_jurisdiction_quiz" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_lead_form_order_idx" ON "_pages_v_blocks_lead_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_form_parent_id_idx" ON "_pages_v_blocks_lead_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lead_form_path_idx" ON "_pages_v_blocks_lead_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_lead_form_locale_idx" ON "_pages_v_blocks_lead_form" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_interactive_tools_order_idx" ON "_pages_v_blocks_interactive_tools" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_interactive_tools_parent_id_idx" ON "_pages_v_blocks_interactive_tools" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_interactive_tools_path_idx" ON "_pages_v_blocks_interactive_tools" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_interactive_tools_locale_idx" ON "_pages_v_blocks_interactive_tools" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_requirements_list_requirements_order_idx" ON "_pages_v_blocks_requirements_list_requirements" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_requirements_list_requirements_parent_id_idx" ON "_pages_v_blocks_requirements_list_requirements" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_requirements_list_requirements_locale_idx" ON "_pages_v_blocks_requirements_list_requirements" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_requirements_list_order_idx" ON "_pages_v_blocks_requirements_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_requirements_list_parent_id_idx" ON "_pages_v_blocks_requirements_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_requirements_list_path_idx" ON "_pages_v_blocks_requirements_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_requirements_list_locale_idx" ON "_pages_v_blocks_requirements_list" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_row_stats_order_idx" ON "_pages_v_blocks_stats_row_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_row_stats_parent_id_idx" ON "_pages_v_blocks_stats_row_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_row_stats_locale_idx" ON "_pages_v_blocks_stats_row_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_row_order_idx" ON "_pages_v_blocks_stats_row" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_row_parent_id_idx" ON "_pages_v_blocks_stats_row" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_row_path_idx" ON "_pages_v_blocks_stats_row" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_row_locale_idx" ON "_pages_v_blocks_stats_row" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_grid_services_order_idx" ON "_pages_v_blocks_services_grid_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_services_parent_id_idx" ON "_pages_v_blocks_services_grid_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_services_locale_idx" ON "_pages_v_blocks_services_grid_services" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_grid_order_idx" ON "_pages_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_parent_id_idx" ON "_pages_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_path_idx" ON "_pages_v_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_grid_locale_idx" ON "_pages_v_blocks_services_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_jurisdictions_grid_jurisdictions_order_idx" ON "_pages_v_blocks_jurisdictions_grid_jurisdictions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_jurisdictions_grid_jurisdictions_parent_id_idx" ON "_pages_v_blocks_jurisdictions_grid_jurisdictions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_jurisdictions_grid_jurisdictions_locale_idx" ON "_pages_v_blocks_jurisdictions_grid_jurisdictions" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_jurisdictions_grid_order_idx" ON "_pages_v_blocks_jurisdictions_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_jurisdictions_grid_parent_id_idx" ON "_pages_v_blocks_jurisdictions_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_jurisdictions_grid_path_idx" ON "_pages_v_blocks_jurisdictions_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_jurisdictions_grid_locale_idx" ON "_pages_v_blocks_jurisdictions_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_order_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_locale_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_locale_idx" ON "_pages_v_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_global_cta_order_idx" ON "_pages_v_blocks_global_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_global_cta_parent_id_idx" ON "_pages_v_blocks_global_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_global_cta_path_idx" ON "_pages_v_blocks_global_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_global_cta_locale_idx" ON "_pages_v_blocks_global_cta" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_lead_magnets_magnets_order_idx" ON "_pages_v_blocks_lead_magnets_magnets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_magnets_magnets_parent_id_idx" ON "_pages_v_blocks_lead_magnets_magnets" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lead_magnets_magnets_locale_idx" ON "_pages_v_blocks_lead_magnets_magnets" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_lead_magnets_order_idx" ON "_pages_v_blocks_lead_magnets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_magnets_parent_id_idx" ON "_pages_v_blocks_lead_magnets" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lead_magnets_path_idx" ON "_pages_v_blocks_lead_magnets" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_lead_magnets_locale_idx" ON "_pages_v_blocks_lead_magnets" USING btree ("_locale");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "landing_pages_blocks_hero_proof_points_order_idx" ON "landing_pages_blocks_hero_proof_points" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_hero_proof_points_parent_id_idx" ON "landing_pages_blocks_hero_proof_points" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_hero_order_idx" ON "landing_pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_hero_parent_id_idx" ON "landing_pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_hero_path_idx" ON "landing_pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_ticker_items_order_idx" ON "landing_pages_blocks_ticker_items" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_ticker_items_parent_id_idx" ON "landing_pages_blocks_ticker_items" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_ticker_order_idx" ON "landing_pages_blocks_ticker" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_ticker_parent_id_idx" ON "landing_pages_blocks_ticker" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_ticker_path_idx" ON "landing_pages_blocks_ticker" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_subhero_breadcrumbs_order_idx" ON "landing_pages_blocks_subhero_breadcrumbs" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_subhero_breadcrumbs_parent_id_idx" ON "landing_pages_blocks_subhero_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_subhero_buttons_order_idx" ON "landing_pages_blocks_subhero_buttons" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_subhero_buttons_parent_id_idx" ON "landing_pages_blocks_subhero_buttons" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_subhero_meta_points_order_idx" ON "landing_pages_blocks_subhero_meta_points" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_subhero_meta_points_parent_id_idx" ON "landing_pages_blocks_subhero_meta_points" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_subhero_order_idx" ON "landing_pages_blocks_subhero" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_subhero_parent_id_idx" ON "landing_pages_blocks_subhero" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_subhero_path_idx" ON "landing_pages_blocks_subhero" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_benefit_grid_benefits_order_idx" ON "landing_pages_blocks_benefit_grid_benefits" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_benefit_grid_benefits_parent_id_idx" ON "landing_pages_blocks_benefit_grid_benefits" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_benefit_grid_order_idx" ON "landing_pages_blocks_benefit_grid" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_benefit_grid_parent_id_idx" ON "landing_pages_blocks_benefit_grid" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_benefit_grid_path_idx" ON "landing_pages_blocks_benefit_grid" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_process_steps_steps_order_idx" ON "landing_pages_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_process_steps_steps_parent_id_idx" ON "landing_pages_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_process_steps_order_idx" ON "landing_pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_process_steps_parent_id_idx" ON "landing_pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_process_steps_path_idx" ON "landing_pages_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_faq_faqs_order_idx" ON "landing_pages_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_faq_faqs_parent_id_idx" ON "landing_pages_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_faq_order_idx" ON "landing_pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_faq_parent_id_idx" ON "landing_pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_faq_path_idx" ON "landing_pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_pricing_detail_features_order_idx" ON "landing_pages_blocks_pricing_detail_features" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_pricing_detail_features_parent_id_idx" ON "landing_pages_blocks_pricing_detail_features" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_pricing_detail_who_for_order_idx" ON "landing_pages_blocks_pricing_detail_who_for" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_pricing_detail_who_for_parent_id_idx" ON "landing_pages_blocks_pricing_detail_who_for" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_pricing_detail_order_idx" ON "landing_pages_blocks_pricing_detail" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_pricing_detail_parent_id_idx" ON "landing_pages_blocks_pricing_detail" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_pricing_detail_path_idx" ON "landing_pages_blocks_pricing_detail" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_pricing_cards_tiers_features_order_idx" ON "landing_pages_blocks_pricing_cards_tiers_features" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_pricing_cards_tiers_features_parent_id_idx" ON "landing_pages_blocks_pricing_cards_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_pricing_cards_tiers_order_idx" ON "landing_pages_blocks_pricing_cards_tiers" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_pricing_cards_tiers_parent_id_idx" ON "landing_pages_blocks_pricing_cards_tiers" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_pricing_cards_order_idx" ON "landing_pages_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_pricing_cards_parent_id_idx" ON "landing_pages_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_pricing_cards_path_idx" ON "landing_pages_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_comparison_tool_options_order_idx" ON "landing_pages_blocks_comparison_tool_options" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_comparison_tool_options_parent_id_idx" ON "landing_pages_blocks_comparison_tool_options" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_comparison_tool_order_idx" ON "landing_pages_blocks_comparison_tool" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_comparison_tool_parent_id_idx" ON "landing_pages_blocks_comparison_tool" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_comparison_tool_path_idx" ON "landing_pages_blocks_comparison_tool" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_jurisdiction_quiz_questions_answers_order_idx" ON "landing_pages_blocks_jurisdiction_quiz_questions_answers" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_jurisdiction_quiz_questions_answers_parent_id_idx" ON "landing_pages_blocks_jurisdiction_quiz_questions_answers" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_jurisdiction_quiz_questions_order_idx" ON "landing_pages_blocks_jurisdiction_quiz_questions" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_jurisdiction_quiz_questions_parent_id_idx" ON "landing_pages_blocks_jurisdiction_quiz_questions" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_jurisdiction_quiz_results_order_idx" ON "landing_pages_blocks_jurisdiction_quiz_results" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_jurisdiction_quiz_results_parent_id_idx" ON "landing_pages_blocks_jurisdiction_quiz_results" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_jurisdiction_quiz_order_idx" ON "landing_pages_blocks_jurisdiction_quiz" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_jurisdiction_quiz_parent_id_idx" ON "landing_pages_blocks_jurisdiction_quiz" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_jurisdiction_quiz_path_idx" ON "landing_pages_blocks_jurisdiction_quiz" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_lead_form_order_idx" ON "landing_pages_blocks_lead_form" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_lead_form_parent_id_idx" ON "landing_pages_blocks_lead_form" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_lead_form_path_idx" ON "landing_pages_blocks_lead_form" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_interactive_tools_order_idx" ON "landing_pages_blocks_interactive_tools" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_interactive_tools_parent_id_idx" ON "landing_pages_blocks_interactive_tools" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_interactive_tools_path_idx" ON "landing_pages_blocks_interactive_tools" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_requirements_list_requirements_order_idx" ON "landing_pages_blocks_requirements_list_requirements" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_requirements_list_requirements_parent_id_idx" ON "landing_pages_blocks_requirements_list_requirements" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_requirements_list_order_idx" ON "landing_pages_blocks_requirements_list" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_requirements_list_parent_id_idx" ON "landing_pages_blocks_requirements_list" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_requirements_list_path_idx" ON "landing_pages_blocks_requirements_list" USING btree ("_path");
  CREATE UNIQUE INDEX "landing_pages_slug_idx" ON "landing_pages" USING btree ("slug");
  CREATE INDEX "landing_pages_updated_at_idx" ON "landing_pages" USING btree ("updated_at");
  CREATE INDEX "landing_pages_created_at_idx" ON "landing_pages" USING btree ("created_at");
  CREATE INDEX "landing_pages__status_idx" ON "landing_pages" USING btree ("_status");
  CREATE INDEX "landing_pages_meta_meta_image_idx" ON "landing_pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "landing_pages_locales_locale_parent_id_unique" ON "landing_pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_hero_proof_points_order_idx" ON "_landing_pages_v_blocks_hero_proof_points" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_hero_proof_points_parent_id_idx" ON "_landing_pages_v_blocks_hero_proof_points" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_hero_order_idx" ON "_landing_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_hero_parent_id_idx" ON "_landing_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_hero_path_idx" ON "_landing_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_ticker_items_order_idx" ON "_landing_pages_v_blocks_ticker_items" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_ticker_items_parent_id_idx" ON "_landing_pages_v_blocks_ticker_items" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_ticker_order_idx" ON "_landing_pages_v_blocks_ticker" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_ticker_parent_id_idx" ON "_landing_pages_v_blocks_ticker" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_ticker_path_idx" ON "_landing_pages_v_blocks_ticker" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_subhero_breadcrumbs_order_idx" ON "_landing_pages_v_blocks_subhero_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_subhero_breadcrumbs_parent_id_idx" ON "_landing_pages_v_blocks_subhero_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_subhero_buttons_order_idx" ON "_landing_pages_v_blocks_subhero_buttons" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_subhero_buttons_parent_id_idx" ON "_landing_pages_v_blocks_subhero_buttons" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_subhero_meta_points_order_idx" ON "_landing_pages_v_blocks_subhero_meta_points" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_subhero_meta_points_parent_id_idx" ON "_landing_pages_v_blocks_subhero_meta_points" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_subhero_order_idx" ON "_landing_pages_v_blocks_subhero" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_subhero_parent_id_idx" ON "_landing_pages_v_blocks_subhero" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_subhero_path_idx" ON "_landing_pages_v_blocks_subhero" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_benefit_grid_benefits_order_idx" ON "_landing_pages_v_blocks_benefit_grid_benefits" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_benefit_grid_benefits_parent_id_idx" ON "_landing_pages_v_blocks_benefit_grid_benefits" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_benefit_grid_order_idx" ON "_landing_pages_v_blocks_benefit_grid" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_benefit_grid_parent_id_idx" ON "_landing_pages_v_blocks_benefit_grid" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_benefit_grid_path_idx" ON "_landing_pages_v_blocks_benefit_grid" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_process_steps_steps_order_idx" ON "_landing_pages_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_process_steps_steps_parent_id_idx" ON "_landing_pages_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_process_steps_order_idx" ON "_landing_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_process_steps_parent_id_idx" ON "_landing_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_process_steps_path_idx" ON "_landing_pages_v_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_faq_faqs_order_idx" ON "_landing_pages_v_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_faq_faqs_parent_id_idx" ON "_landing_pages_v_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_faq_order_idx" ON "_landing_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_faq_parent_id_idx" ON "_landing_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_faq_path_idx" ON "_landing_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_pricing_detail_features_order_idx" ON "_landing_pages_v_blocks_pricing_detail_features" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_pricing_detail_features_parent_id_idx" ON "_landing_pages_v_blocks_pricing_detail_features" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_pricing_detail_who_for_order_idx" ON "_landing_pages_v_blocks_pricing_detail_who_for" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_pricing_detail_who_for_parent_id_idx" ON "_landing_pages_v_blocks_pricing_detail_who_for" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_pricing_detail_order_idx" ON "_landing_pages_v_blocks_pricing_detail" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_pricing_detail_parent_id_idx" ON "_landing_pages_v_blocks_pricing_detail" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_pricing_detail_path_idx" ON "_landing_pages_v_blocks_pricing_detail" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_pricing_cards_tiers_features_order_idx" ON "_landing_pages_v_blocks_pricing_cards_tiers_features" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_pricing_cards_tiers_features_parent_id_idx" ON "_landing_pages_v_blocks_pricing_cards_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_pricing_cards_tiers_order_idx" ON "_landing_pages_v_blocks_pricing_cards_tiers" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_pricing_cards_tiers_parent_id_idx" ON "_landing_pages_v_blocks_pricing_cards_tiers" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_pricing_cards_order_idx" ON "_landing_pages_v_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_pricing_cards_parent_id_idx" ON "_landing_pages_v_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_pricing_cards_path_idx" ON "_landing_pages_v_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_comparison_tool_options_order_idx" ON "_landing_pages_v_blocks_comparison_tool_options" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_comparison_tool_options_parent_id_idx" ON "_landing_pages_v_blocks_comparison_tool_options" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_comparison_tool_order_idx" ON "_landing_pages_v_blocks_comparison_tool" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_comparison_tool_parent_id_idx" ON "_landing_pages_v_blocks_comparison_tool" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_comparison_tool_path_idx" ON "_landing_pages_v_blocks_comparison_tool" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_jurisdiction_quiz_questions_answers_order_idx" ON "_landing_pages_v_blocks_jurisdiction_quiz_questions_answers" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_jurisdiction_quiz_questions_answers_parent_id_idx" ON "_landing_pages_v_blocks_jurisdiction_quiz_questions_answers" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_jurisdiction_quiz_questions_order_idx" ON "_landing_pages_v_blocks_jurisdiction_quiz_questions" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_jurisdiction_quiz_questions_parent_id_idx" ON "_landing_pages_v_blocks_jurisdiction_quiz_questions" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_jurisdiction_quiz_results_order_idx" ON "_landing_pages_v_blocks_jurisdiction_quiz_results" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_jurisdiction_quiz_results_parent_id_idx" ON "_landing_pages_v_blocks_jurisdiction_quiz_results" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_jurisdiction_quiz_order_idx" ON "_landing_pages_v_blocks_jurisdiction_quiz" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_jurisdiction_quiz_parent_id_idx" ON "_landing_pages_v_blocks_jurisdiction_quiz" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_jurisdiction_quiz_path_idx" ON "_landing_pages_v_blocks_jurisdiction_quiz" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_lead_form_order_idx" ON "_landing_pages_v_blocks_lead_form" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_lead_form_parent_id_idx" ON "_landing_pages_v_blocks_lead_form" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_lead_form_path_idx" ON "_landing_pages_v_blocks_lead_form" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_interactive_tools_order_idx" ON "_landing_pages_v_blocks_interactive_tools" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_interactive_tools_parent_id_idx" ON "_landing_pages_v_blocks_interactive_tools" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_interactive_tools_path_idx" ON "_landing_pages_v_blocks_interactive_tools" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_requirements_list_requirements_order_idx" ON "_landing_pages_v_blocks_requirements_list_requirements" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_requirements_list_requirements_parent_id_idx" ON "_landing_pages_v_blocks_requirements_list_requirements" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_requirements_list_order_idx" ON "_landing_pages_v_blocks_requirements_list" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_requirements_list_parent_id_idx" ON "_landing_pages_v_blocks_requirements_list" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_requirements_list_path_idx" ON "_landing_pages_v_blocks_requirements_list" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_parent_idx" ON "_landing_pages_v" USING btree ("parent_id");
  CREATE INDEX "_landing_pages_v_version_version_slug_idx" ON "_landing_pages_v" USING btree ("version_slug");
  CREATE INDEX "_landing_pages_v_version_version_updated_at_idx" ON "_landing_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_landing_pages_v_version_version_created_at_idx" ON "_landing_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_landing_pages_v_version_version__status_idx" ON "_landing_pages_v" USING btree ("version__status");
  CREATE INDEX "_landing_pages_v_created_at_idx" ON "_landing_pages_v" USING btree ("created_at");
  CREATE INDEX "_landing_pages_v_updated_at_idx" ON "_landing_pages_v" USING btree ("updated_at");
  CREATE INDEX "_landing_pages_v_snapshot_idx" ON "_landing_pages_v" USING btree ("snapshot");
  CREATE INDEX "_landing_pages_v_published_locale_idx" ON "_landing_pages_v" USING btree ("published_locale");
  CREATE INDEX "_landing_pages_v_latest_idx" ON "_landing_pages_v" USING btree ("latest");
  CREATE INDEX "_landing_pages_v_version_meta_version_meta_image_idx" ON "_landing_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_landing_pages_v_locales_locale_parent_id_unique" ON "_landing_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "form_submissions_rels_order_idx" ON "form_submissions_rels" USING btree ("order");
  CREATE INDEX "form_submissions_rels_parent_idx" ON "form_submissions_rels" USING btree ("parent_id");
  CREATE INDEX "form_submissions_rels_path_idx" ON "form_submissions_rels" USING btree ("path");
  CREATE INDEX "form_submissions_rels_media_id_idx" ON "form_submissions_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_countries_id_idx" ON "payload_locked_documents_rels" USING btree ("countries_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_pricing_tiers_id_idx" ON "payload_locked_documents_rels" USING btree ("pricing_tiers_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_partner_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("partner_applications_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_landing_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("landing_pages_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "homepage_blocks_hero_proof_points_order_idx" ON "homepage_blocks_hero_proof_points" USING btree ("_order");
  CREATE INDEX "homepage_blocks_hero_proof_points_parent_id_idx" ON "homepage_blocks_hero_proof_points" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_hero_proof_points_locale_idx" ON "homepage_blocks_hero_proof_points" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_hero_order_idx" ON "homepage_blocks_hero" USING btree ("_order");
  CREATE INDEX "homepage_blocks_hero_parent_id_idx" ON "homepage_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_hero_path_idx" ON "homepage_blocks_hero" USING btree ("_path");
  CREATE INDEX "homepage_blocks_hero_locale_idx" ON "homepage_blocks_hero" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_ticker_items_order_idx" ON "homepage_blocks_ticker_items" USING btree ("_order");
  CREATE INDEX "homepage_blocks_ticker_items_parent_id_idx" ON "homepage_blocks_ticker_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_ticker_items_locale_idx" ON "homepage_blocks_ticker_items" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_ticker_order_idx" ON "homepage_blocks_ticker" USING btree ("_order");
  CREATE INDEX "homepage_blocks_ticker_parent_id_idx" ON "homepage_blocks_ticker" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_ticker_path_idx" ON "homepage_blocks_ticker" USING btree ("_path");
  CREATE INDEX "homepage_blocks_ticker_locale_idx" ON "homepage_blocks_ticker" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_stats_row_stats_order_idx" ON "homepage_blocks_stats_row_stats" USING btree ("_order");
  CREATE INDEX "homepage_blocks_stats_row_stats_parent_id_idx" ON "homepage_blocks_stats_row_stats" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_stats_row_stats_locale_idx" ON "homepage_blocks_stats_row_stats" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_stats_row_order_idx" ON "homepage_blocks_stats_row" USING btree ("_order");
  CREATE INDEX "homepage_blocks_stats_row_parent_id_idx" ON "homepage_blocks_stats_row" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_stats_row_path_idx" ON "homepage_blocks_stats_row" USING btree ("_path");
  CREATE INDEX "homepage_blocks_stats_row_locale_idx" ON "homepage_blocks_stats_row" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_services_grid_services_order_idx" ON "homepage_blocks_services_grid_services" USING btree ("_order");
  CREATE INDEX "homepage_blocks_services_grid_services_parent_id_idx" ON "homepage_blocks_services_grid_services" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_services_grid_services_locale_idx" ON "homepage_blocks_services_grid_services" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_services_grid_order_idx" ON "homepage_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "homepage_blocks_services_grid_parent_id_idx" ON "homepage_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_services_grid_path_idx" ON "homepage_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "homepage_blocks_services_grid_locale_idx" ON "homepage_blocks_services_grid" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_jurisdictions_grid_jurisdictions_order_idx" ON "homepage_blocks_jurisdictions_grid_jurisdictions" USING btree ("_order");
  CREATE INDEX "homepage_blocks_jurisdictions_grid_jurisdictions_parent_id_idx" ON "homepage_blocks_jurisdictions_grid_jurisdictions" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_jurisdictions_grid_jurisdictions_locale_idx" ON "homepage_blocks_jurisdictions_grid_jurisdictions" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_jurisdictions_grid_order_idx" ON "homepage_blocks_jurisdictions_grid" USING btree ("_order");
  CREATE INDEX "homepage_blocks_jurisdictions_grid_parent_id_idx" ON "homepage_blocks_jurisdictions_grid" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_jurisdictions_grid_path_idx" ON "homepage_blocks_jurisdictions_grid" USING btree ("_path");
  CREATE INDEX "homepage_blocks_jurisdictions_grid_locale_idx" ON "homepage_blocks_jurisdictions_grid" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_pricing_cards_tiers_features_order_idx" ON "homepage_blocks_pricing_cards_tiers_features" USING btree ("_order");
  CREATE INDEX "homepage_blocks_pricing_cards_tiers_features_parent_id_idx" ON "homepage_blocks_pricing_cards_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_pricing_cards_tiers_features_locale_idx" ON "homepage_blocks_pricing_cards_tiers_features" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_pricing_cards_tiers_order_idx" ON "homepage_blocks_pricing_cards_tiers" USING btree ("_order");
  CREATE INDEX "homepage_blocks_pricing_cards_tiers_parent_id_idx" ON "homepage_blocks_pricing_cards_tiers" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_pricing_cards_tiers_locale_idx" ON "homepage_blocks_pricing_cards_tiers" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_pricing_cards_order_idx" ON "homepage_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "homepage_blocks_pricing_cards_parent_id_idx" ON "homepage_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_pricing_cards_path_idx" ON "homepage_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "homepage_blocks_pricing_cards_locale_idx" ON "homepage_blocks_pricing_cards" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_comparison_tool_options_order_idx" ON "homepage_blocks_comparison_tool_options" USING btree ("_order");
  CREATE INDEX "homepage_blocks_comparison_tool_options_parent_id_idx" ON "homepage_blocks_comparison_tool_options" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_comparison_tool_options_locale_idx" ON "homepage_blocks_comparison_tool_options" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_comparison_tool_order_idx" ON "homepage_blocks_comparison_tool" USING btree ("_order");
  CREATE INDEX "homepage_blocks_comparison_tool_parent_id_idx" ON "homepage_blocks_comparison_tool" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_comparison_tool_path_idx" ON "homepage_blocks_comparison_tool" USING btree ("_path");
  CREATE INDEX "homepage_blocks_comparison_tool_locale_idx" ON "homepage_blocks_comparison_tool" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_jurisdiction_quiz_questions_answers_order_idx" ON "homepage_blocks_jurisdiction_quiz_questions_answers" USING btree ("_order");
  CREATE INDEX "homepage_blocks_jurisdiction_quiz_questions_answers_parent_id_idx" ON "homepage_blocks_jurisdiction_quiz_questions_answers" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_jurisdiction_quiz_questions_answers_locale_idx" ON "homepage_blocks_jurisdiction_quiz_questions_answers" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_jurisdiction_quiz_questions_order_idx" ON "homepage_blocks_jurisdiction_quiz_questions" USING btree ("_order");
  CREATE INDEX "homepage_blocks_jurisdiction_quiz_questions_parent_id_idx" ON "homepage_blocks_jurisdiction_quiz_questions" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_jurisdiction_quiz_questions_locale_idx" ON "homepage_blocks_jurisdiction_quiz_questions" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_jurisdiction_quiz_results_order_idx" ON "homepage_blocks_jurisdiction_quiz_results" USING btree ("_order");
  CREATE INDEX "homepage_blocks_jurisdiction_quiz_results_parent_id_idx" ON "homepage_blocks_jurisdiction_quiz_results" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_jurisdiction_quiz_results_locale_idx" ON "homepage_blocks_jurisdiction_quiz_results" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_jurisdiction_quiz_order_idx" ON "homepage_blocks_jurisdiction_quiz" USING btree ("_order");
  CREATE INDEX "homepage_blocks_jurisdiction_quiz_parent_id_idx" ON "homepage_blocks_jurisdiction_quiz" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_jurisdiction_quiz_path_idx" ON "homepage_blocks_jurisdiction_quiz" USING btree ("_path");
  CREATE INDEX "homepage_blocks_jurisdiction_quiz_locale_idx" ON "homepage_blocks_jurisdiction_quiz" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_lead_form_order_idx" ON "homepage_blocks_lead_form" USING btree ("_order");
  CREATE INDEX "homepage_blocks_lead_form_parent_id_idx" ON "homepage_blocks_lead_form" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_lead_form_path_idx" ON "homepage_blocks_lead_form" USING btree ("_path");
  CREATE INDEX "homepage_blocks_lead_form_locale_idx" ON "homepage_blocks_lead_form" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_pricing_detail_features_order_idx" ON "homepage_blocks_pricing_detail_features" USING btree ("_order");
  CREATE INDEX "homepage_blocks_pricing_detail_features_parent_id_idx" ON "homepage_blocks_pricing_detail_features" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_pricing_detail_features_locale_idx" ON "homepage_blocks_pricing_detail_features" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_pricing_detail_who_for_order_idx" ON "homepage_blocks_pricing_detail_who_for" USING btree ("_order");
  CREATE INDEX "homepage_blocks_pricing_detail_who_for_parent_id_idx" ON "homepage_blocks_pricing_detail_who_for" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_pricing_detail_who_for_locale_idx" ON "homepage_blocks_pricing_detail_who_for" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_pricing_detail_order_idx" ON "homepage_blocks_pricing_detail" USING btree ("_order");
  CREATE INDEX "homepage_blocks_pricing_detail_parent_id_idx" ON "homepage_blocks_pricing_detail" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_pricing_detail_path_idx" ON "homepage_blocks_pricing_detail" USING btree ("_path");
  CREATE INDEX "homepage_blocks_pricing_detail_locale_idx" ON "homepage_blocks_pricing_detail" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_process_steps_steps_order_idx" ON "homepage_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "homepage_blocks_process_steps_steps_parent_id_idx" ON "homepage_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_process_steps_steps_locale_idx" ON "homepage_blocks_process_steps_steps" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_process_steps_order_idx" ON "homepage_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "homepage_blocks_process_steps_parent_id_idx" ON "homepage_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_process_steps_path_idx" ON "homepage_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "homepage_blocks_process_steps_locale_idx" ON "homepage_blocks_process_steps" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_faq_faqs_order_idx" ON "homepage_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX "homepage_blocks_faq_faqs_parent_id_idx" ON "homepage_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_faq_faqs_locale_idx" ON "homepage_blocks_faq_faqs" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_faq_order_idx" ON "homepage_blocks_faq" USING btree ("_order");
  CREATE INDEX "homepage_blocks_faq_parent_id_idx" ON "homepage_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_faq_path_idx" ON "homepage_blocks_faq" USING btree ("_path");
  CREATE INDEX "homepage_blocks_faq_locale_idx" ON "homepage_blocks_faq" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_testimonials_testimonials_order_idx" ON "homepage_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "homepage_blocks_testimonials_testimonials_parent_id_idx" ON "homepage_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_testimonials_testimonials_locale_idx" ON "homepage_blocks_testimonials_testimonials" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_testimonials_order_idx" ON "homepage_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "homepage_blocks_testimonials_parent_id_idx" ON "homepage_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_testimonials_path_idx" ON "homepage_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "homepage_blocks_testimonials_locale_idx" ON "homepage_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_global_cta_order_idx" ON "homepage_blocks_global_cta" USING btree ("_order");
  CREATE INDEX "homepage_blocks_global_cta_parent_id_idx" ON "homepage_blocks_global_cta" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_global_cta_path_idx" ON "homepage_blocks_global_cta" USING btree ("_path");
  CREATE INDEX "homepage_blocks_global_cta_locale_idx" ON "homepage_blocks_global_cta" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_lead_magnets_magnets_order_idx" ON "homepage_blocks_lead_magnets_magnets" USING btree ("_order");
  CREATE INDEX "homepage_blocks_lead_magnets_magnets_parent_id_idx" ON "homepage_blocks_lead_magnets_magnets" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_lead_magnets_magnets_locale_idx" ON "homepage_blocks_lead_magnets_magnets" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_lead_magnets_order_idx" ON "homepage_blocks_lead_magnets" USING btree ("_order");
  CREATE INDEX "homepage_blocks_lead_magnets_parent_id_idx" ON "homepage_blocks_lead_magnets" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_lead_magnets_path_idx" ON "homepage_blocks_lead_magnets" USING btree ("_path");
  CREATE INDEX "homepage_blocks_lead_magnets_locale_idx" ON "homepage_blocks_lead_magnets" USING btree ("_locale");
  CREATE INDEX "homepage_meta_meta_image_idx" ON "homepage_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "homepage_locales_locale_parent_id_unique" ON "homepage_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_nav_menu_order_idx" ON "site_settings_nav_menu" USING btree ("_order");
  CREATE INDEX "site_settings_nav_menu_parent_id_idx" ON "site_settings_nav_menu" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_nav_menu_locales_locale_parent_id_unique" ON "site_settings_nav_menu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_default_seo_default_seo_image_idx" ON "site_settings_locales" USING btree ("default_seo_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partner_page_stats_order_idx" ON "partner_page_stats" USING btree ("_order");
  CREATE INDEX "partner_page_stats_parent_id_idx" ON "partner_page_stats" USING btree ("_parent_id");
  CREATE INDEX "partner_page_how_it_works_steps_order_idx" ON "partner_page_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "partner_page_how_it_works_steps_parent_id_idx" ON "partner_page_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "partner_page_faq_section_faq_order_idx" ON "partner_page_faq_section_faq" USING btree ("_order");
  CREATE INDEX "partner_page_faq_section_faq_parent_id_idx" ON "partner_page_faq_section_faq" USING btree ("_parent_id");
  CREATE INDEX "partner_page_seo_seo_meta_image_idx" ON "partner_page" USING btree ("seo_meta_image_id");
  CREATE INDEX "partner_page_meta_meta_image_idx" ON "partner_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "partner_page_locales_locale_parent_id_unique" ON "partner_page_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "countries_benefits" CASCADE;
  DROP TABLE "countries_documents" CASCADE;
  DROP TABLE "countries_process" CASCADE;
  DROP TABLE "countries_faq" CASCADE;
  DROP TABLE "countries" CASCADE;
  DROP TABLE "countries_locales" CASCADE;
  DROP TABLE "services_stat_chips" CASCADE;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services_process" CASCADE;
  DROP TABLE "services_faq" CASCADE;
  DROP TABLE "services_related_links" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "pricing_tiers_features" CASCADE;
  DROP TABLE "pricing_tiers_who_for" CASCADE;
  DROP TABLE "pricing_tiers_process" CASCADE;
  DROP TABLE "pricing_tiers_faq" CASCADE;
  DROP TABLE "pricing_tiers" CASCADE;
  DROP TABLE "pricing_tiers_locales" CASCADE;
  DROP TABLE "posts_tags" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "_posts_v_version_tags" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "leads_rels" CASCADE;
  DROP TABLE "partner_applications_notes_timeline" CASCADE;
  DROP TABLE "partner_applications" CASCADE;
  DROP TABLE "partner_applications_rels" CASCADE;
  DROP TABLE "pages_blocks_hero_proof_points" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_ticker_items" CASCADE;
  DROP TABLE "pages_blocks_ticker" CASCADE;
  DROP TABLE "pages_blocks_subhero_breadcrumbs" CASCADE;
  DROP TABLE "pages_blocks_subhero_buttons" CASCADE;
  DROP TABLE "pages_blocks_subhero_meta_points" CASCADE;
  DROP TABLE "pages_blocks_subhero" CASCADE;
  DROP TABLE "pages_blocks_benefit_grid_benefits" CASCADE;
  DROP TABLE "pages_blocks_benefit_grid" CASCADE;
  DROP TABLE "pages_blocks_process_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_process_steps" CASCADE;
  DROP TABLE "pages_blocks_faq_faqs" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_pricing_detail_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_detail_who_for" CASCADE;
  DROP TABLE "pages_blocks_pricing_detail" CASCADE;
  DROP TABLE "pages_blocks_pricing_cards_tiers_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_cards_tiers" CASCADE;
  DROP TABLE "pages_blocks_pricing_cards" CASCADE;
  DROP TABLE "pages_blocks_comparison_tool_options" CASCADE;
  DROP TABLE "pages_blocks_comparison_tool" CASCADE;
  DROP TABLE "pages_blocks_jurisdiction_quiz_questions_answers" CASCADE;
  DROP TABLE "pages_blocks_jurisdiction_quiz_questions" CASCADE;
  DROP TABLE "pages_blocks_jurisdiction_quiz_results" CASCADE;
  DROP TABLE "pages_blocks_jurisdiction_quiz" CASCADE;
  DROP TABLE "pages_blocks_lead_form" CASCADE;
  DROP TABLE "pages_blocks_interactive_tools" CASCADE;
  DROP TABLE "pages_blocks_requirements_list_requirements" CASCADE;
  DROP TABLE "pages_blocks_requirements_list" CASCADE;
  DROP TABLE "pages_blocks_stats_row_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_row" CASCADE;
  DROP TABLE "pages_blocks_services_grid_services" CASCADE;
  DROP TABLE "pages_blocks_services_grid" CASCADE;
  DROP TABLE "pages_blocks_jurisdictions_grid_jurisdictions" CASCADE;
  DROP TABLE "pages_blocks_jurisdictions_grid" CASCADE;
  DROP TABLE "pages_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_global_cta" CASCADE;
  DROP TABLE "pages_blocks_lead_magnets_magnets" CASCADE;
  DROP TABLE "pages_blocks_lead_magnets" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_proof_points" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_ticker_items" CASCADE;
  DROP TABLE "_pages_v_blocks_ticker" CASCADE;
  DROP TABLE "_pages_v_blocks_subhero_breadcrumbs" CASCADE;
  DROP TABLE "_pages_v_blocks_subhero_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_subhero_meta_points" CASCADE;
  DROP TABLE "_pages_v_blocks_subhero" CASCADE;
  DROP TABLE "_pages_v_blocks_benefit_grid_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_benefit_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_detail_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_detail_who_for" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_detail" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_cards_tiers_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_cards_tiers" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_tool_options" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_tool" CASCADE;
  DROP TABLE "_pages_v_blocks_jurisdiction_quiz_questions_answers" CASCADE;
  DROP TABLE "_pages_v_blocks_jurisdiction_quiz_questions" CASCADE;
  DROP TABLE "_pages_v_blocks_jurisdiction_quiz_results" CASCADE;
  DROP TABLE "_pages_v_blocks_jurisdiction_quiz" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_form" CASCADE;
  DROP TABLE "_pages_v_blocks_interactive_tools" CASCADE;
  DROP TABLE "_pages_v_blocks_requirements_list_requirements" CASCADE;
  DROP TABLE "_pages_v_blocks_requirements_list" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_row_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_row" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid_services" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_jurisdictions_grid_jurisdictions" CASCADE;
  DROP TABLE "_pages_v_blocks_jurisdictions_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_global_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_magnets_magnets" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_magnets" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "landing_pages_blocks_hero_proof_points" CASCADE;
  DROP TABLE "landing_pages_blocks_hero" CASCADE;
  DROP TABLE "landing_pages_blocks_ticker_items" CASCADE;
  DROP TABLE "landing_pages_blocks_ticker" CASCADE;
  DROP TABLE "landing_pages_blocks_subhero_breadcrumbs" CASCADE;
  DROP TABLE "landing_pages_blocks_subhero_buttons" CASCADE;
  DROP TABLE "landing_pages_blocks_subhero_meta_points" CASCADE;
  DROP TABLE "landing_pages_blocks_subhero" CASCADE;
  DROP TABLE "landing_pages_blocks_benefit_grid_benefits" CASCADE;
  DROP TABLE "landing_pages_blocks_benefit_grid" CASCADE;
  DROP TABLE "landing_pages_blocks_process_steps_steps" CASCADE;
  DROP TABLE "landing_pages_blocks_process_steps" CASCADE;
  DROP TABLE "landing_pages_blocks_faq_faqs" CASCADE;
  DROP TABLE "landing_pages_blocks_faq" CASCADE;
  DROP TABLE "landing_pages_blocks_pricing_detail_features" CASCADE;
  DROP TABLE "landing_pages_blocks_pricing_detail_who_for" CASCADE;
  DROP TABLE "landing_pages_blocks_pricing_detail" CASCADE;
  DROP TABLE "landing_pages_blocks_pricing_cards_tiers_features" CASCADE;
  DROP TABLE "landing_pages_blocks_pricing_cards_tiers" CASCADE;
  DROP TABLE "landing_pages_blocks_pricing_cards" CASCADE;
  DROP TABLE "landing_pages_blocks_comparison_tool_options" CASCADE;
  DROP TABLE "landing_pages_blocks_comparison_tool" CASCADE;
  DROP TABLE "landing_pages_blocks_jurisdiction_quiz_questions_answers" CASCADE;
  DROP TABLE "landing_pages_blocks_jurisdiction_quiz_questions" CASCADE;
  DROP TABLE "landing_pages_blocks_jurisdiction_quiz_results" CASCADE;
  DROP TABLE "landing_pages_blocks_jurisdiction_quiz" CASCADE;
  DROP TABLE "landing_pages_blocks_lead_form" CASCADE;
  DROP TABLE "landing_pages_blocks_interactive_tools" CASCADE;
  DROP TABLE "landing_pages_blocks_requirements_list_requirements" CASCADE;
  DROP TABLE "landing_pages_blocks_requirements_list" CASCADE;
  DROP TABLE "landing_pages" CASCADE;
  DROP TABLE "landing_pages_locales" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_hero_proof_points" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_ticker_items" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_ticker" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_subhero_breadcrumbs" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_subhero_buttons" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_subhero_meta_points" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_subhero" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_benefit_grid_benefits" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_benefit_grid" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_faq_faqs" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_pricing_detail_features" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_pricing_detail_who_for" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_pricing_detail" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_pricing_cards_tiers_features" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_pricing_cards_tiers" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_pricing_cards" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_comparison_tool_options" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_comparison_tool" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_jurisdiction_quiz_questions_answers" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_jurisdiction_quiz_questions" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_jurisdiction_quiz_results" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_jurisdiction_quiz" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_lead_form" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_interactive_tools" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_requirements_list_requirements" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_requirements_list" CASCADE;
  DROP TABLE "_landing_pages_v" CASCADE;
  DROP TABLE "_landing_pages_v_locales" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "form_submissions_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "homepage_blocks_hero_proof_points" CASCADE;
  DROP TABLE "homepage_blocks_hero" CASCADE;
  DROP TABLE "homepage_blocks_ticker_items" CASCADE;
  DROP TABLE "homepage_blocks_ticker" CASCADE;
  DROP TABLE "homepage_blocks_stats_row_stats" CASCADE;
  DROP TABLE "homepage_blocks_stats_row" CASCADE;
  DROP TABLE "homepage_blocks_services_grid_services" CASCADE;
  DROP TABLE "homepage_blocks_services_grid" CASCADE;
  DROP TABLE "homepage_blocks_jurisdictions_grid_jurisdictions" CASCADE;
  DROP TABLE "homepage_blocks_jurisdictions_grid" CASCADE;
  DROP TABLE "homepage_blocks_pricing_cards_tiers_features" CASCADE;
  DROP TABLE "homepage_blocks_pricing_cards_tiers" CASCADE;
  DROP TABLE "homepage_blocks_pricing_cards" CASCADE;
  DROP TABLE "homepage_blocks_comparison_tool_options" CASCADE;
  DROP TABLE "homepage_blocks_comparison_tool" CASCADE;
  DROP TABLE "homepage_blocks_jurisdiction_quiz_questions_answers" CASCADE;
  DROP TABLE "homepage_blocks_jurisdiction_quiz_questions" CASCADE;
  DROP TABLE "homepage_blocks_jurisdiction_quiz_results" CASCADE;
  DROP TABLE "homepage_blocks_jurisdiction_quiz" CASCADE;
  DROP TABLE "homepage_blocks_lead_form" CASCADE;
  DROP TABLE "homepage_blocks_pricing_detail_features" CASCADE;
  DROP TABLE "homepage_blocks_pricing_detail_who_for" CASCADE;
  DROP TABLE "homepage_blocks_pricing_detail" CASCADE;
  DROP TABLE "homepage_blocks_process_steps_steps" CASCADE;
  DROP TABLE "homepage_blocks_process_steps" CASCADE;
  DROP TABLE "homepage_blocks_faq_faqs" CASCADE;
  DROP TABLE "homepage_blocks_faq" CASCADE;
  DROP TABLE "homepage_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "homepage_blocks_testimonials" CASCADE;
  DROP TABLE "homepage_blocks_global_cta" CASCADE;
  DROP TABLE "homepage_blocks_lead_magnets_magnets" CASCADE;
  DROP TABLE "homepage_blocks_lead_magnets" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_locales" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings_nav_menu" CASCADE;
  DROP TABLE "site_settings_nav_menu_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "partner_page_stats" CASCADE;
  DROP TABLE "partner_page_how_it_works_steps" CASCADE;
  DROP TABLE "partner_page_faq_section_faq" CASCADE;
  DROP TABLE "partner_page" CASCADE;
  DROP TABLE "partner_page_locales" CASCADE;
  DROP TABLE "waha_settings" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_media_category";
  DROP TYPE "public"."enum_documents_category";
  DROP TYPE "public"."enum_countries_region";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_posts_category";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_category";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum_leads_integration_status_twenty";
  DROP TYPE "public"."enum_leads_integration_status_meta_capi";
  DROP TYPE "public"."enum_leads_integration_status_n8n";
  DROP TYPE "public"."enum_leads_integration_status_waha";
  DROP TYPE "public"."enum_partner_applications_status";
  DROP TYPE "public"."enum_pages_blocks_subhero_buttons_style";
  DROP TYPE "public"."enum_pages_blocks_lead_form_form_type";
  DROP TYPE "public"."enum_pages_page_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_subhero_buttons_style";
  DROP TYPE "public"."enum__pages_v_blocks_lead_form_form_type";
  DROP TYPE "public"."enum__pages_v_version_page_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_landing_pages_blocks_subhero_buttons_style";
  DROP TYPE "public"."enum_landing_pages_blocks_lead_form_form_type";
  DROP TYPE "public"."enum_landing_pages_status";
  DROP TYPE "public"."enum__landing_pages_v_blocks_subhero_buttons_style";
  DROP TYPE "public"."enum__landing_pages_v_blocks_lead_form_form_type";
  DROP TYPE "public"."enum__landing_pages_v_version_status";
  DROP TYPE "public"."enum__landing_pages_v_published_locale";
  DROP TYPE "public"."enum_form_submissions_status";
  DROP TYPE "public"."enum_homepage_blocks_lead_form_form_type";
  DROP TYPE "public"."enum_site_settings_social_platform";`)
}
