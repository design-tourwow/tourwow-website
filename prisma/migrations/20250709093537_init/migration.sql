-- CreateTable
CREATE TABLE "product_pools" (
    "id" SERIAL NOT NULL,
    "supplier_id" INTEGER NOT NULL,
    "product_running_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "period_id" INTEGER NOT NULL,
    "product_sub_category_id" INTEGER NOT NULL,
    "product_tour_code" TEXT NOT NULL,
    "product_tourwow_code" TEXT NOT NULL,
    "product_tw_url_path" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_start_at" TIMESTAMP(3) NOT NULL,
    "product_price" DECIMAL(65,30) NOT NULL,
    "product_price_compare" DECIMAL(65,30),
    "product_has_one_country" INTEGER NOT NULL,
    "product_main_country_id" INTEGER NOT NULL,
    "product_main_country_name_th" TEXT NOT NULL,
    "product_main_country_name_en" TEXT NOT NULL,
    "product_countries" TEXT NOT NULL,
    "product_country_sub_units" TEXT NOT NULL,
    "product_tags" TEXT NOT NULL,
    "product_tags_json" TEXT NOT NULL,
    "product_duration_day" INTEGER NOT NULL,
    "product_duration_night" INTEGER NOT NULL,
    "product_duration_day_and_night" TEXT NOT NULL,
    "product_free_day" INTEGER,
    "product_meal_amount" INTEGER NOT NULL,
    "product_hotel_star" INTEGER NOT NULL,
    "product_has_visa" INTEGER NOT NULL,
    "product_visa_price" DECIMAL(65,30),
    "product_hilight_description" TEXT NOT NULL,
    "product_sub_category_label" TEXT NOT NULL,
    "product_banner_url" TEXT NOT NULL,
    "product_has_active_periods" INTEGER NOT NULL,
    "product_is_recommended" INTEGER NOT NULL,
    "period_group_code" TEXT,
    "period_start_at" TIMESTAMP(3) NOT NULL,
    "period_end_at" TIMESTAMP(3) NOT NULL,
    "period_is_channel_twp_online_booking" INTEGER NOT NULL,
    "period_price_adult_double" DECIMAL(65,30) NOT NULL,
    "period_price_adult_single" DECIMAL(65,30),
    "period_price_adult_tripple" DECIMAL(65,30),
    "period_price_child_no_bed" DECIMAL(65,30),
    "period_price_child_bed" DECIMAL(65,30),
    "period_price_infant" DECIMAL(65,30),
    "period_price_join_land" DECIMAL(65,30),
    "period_price_adult_double_compare" DECIMAL(65,30),
    "period_price_adult_single_compare" DECIMAL(65,30),
    "period_price_adult_tripple_compare" DECIMAL(65,30),
    "period_price_child_no_bed_compare" DECIMAL(65,30),
    "period_price_child_bed_compare" DECIMAL(65,30),
    "period_price_infant_compare" DECIMAL(65,30),
    "period_price_join_land_compare" DECIMAL(65,30),
    "period_deposit" DECIMAL(65,30),
    "period_commission" DECIMAL(65,30) NOT NULL,
    "period_commission_company" DECIMAL(65,30) NOT NULL,
    "period_commission_seller" DECIMAL(65,30) NOT NULL,
    "period_quantity" INTEGER NOT NULL,
    "period_quantity_remaining" INTEGER NOT NULL,
    "period_sell_status_code" INTEGER NOT NULL,
    "period_is_active" INTEGER NOT NULL,
    "period_deal" INTEGER NOT NULL,
    "period_config" INTEGER NOT NULL,
    "period_installment_count" INTEGER NOT NULL,
    "period_transportation_category_id" INTEGER NOT NULL,
    "period_transportation_category_name" TEXT NOT NULL,
    "period_go_transportation_id" INTEGER NOT NULL,
    "period_go_transportation_name_en" TEXT NOT NULL,
    "period_go_transportation_code" TEXT NOT NULL,
    "period_go_airport_arrival" TEXT,
    "period_go_airport_departure" TEXT,
    "period_go_flight_number_arrival" TEXT,
    "period_go_flight_number_departure" TEXT,
    "period_go_flight_time_arrival" TEXT,
    "period_go_flight_time_departure" TEXT,
    "period_back_transportation_id" INTEGER NOT NULL,
    "period_back_transportation_name_en" TEXT NOT NULL,
    "period_back_transportation_code" TEXT NOT NULL,
    "period_back_airport_arrival" TEXT,
    "period_back_airport_departure" TEXT,
    "period_back_flight_number_arrival" TEXT,
    "period_back_flight_number_departure" TEXT,
    "period_back_flight_time_arrival" TEXT,
    "period_back_flight_time_departure" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agcy_blogs" (
    "id" SERIAL NOT NULL,
    "agcy_agencies_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by_agency_member_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by_agency_member_id" INTEGER NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "deleted_by_agency_member_id" INTEGER,

    CONSTRAINT "agcy_blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agcy_seo_articles" (
    "id" SERIAL NOT NULL,
    "agcy_agency_id" INTEGER NOT NULL,
    "parent_article_id" INTEGER,
    "is_child_of_home_page" INTEGER NOT NULL,
    "is_active" INTEGER NOT NULL,
    "agcy_seo_article_type_id" INTEGER NOT NULL,
    "agcy_seo_target_page_type_id" INTEGER,
    "agcy_seo_special_page_id" INTEGER,
    "country_id" INTEGER,
    "province_id" INTEGER,
    "country_sub_unit_id" INTEGER,
    "pro_category_sub_product_id" INTEGER,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url_path" TEXT NOT NULL,
    "trimmed_url_path" TEXT NOT NULL,
    "real_url_path" TEXT NOT NULL,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "primary_keyword" TEXT,
    "secondary_keyword" TEXT,
    "related_keyword" TEXT,
    "note" TEXT,
    "desktop_cover_image_file_name" TEXT,
    "desktop_cover_image_file_size" INTEGER,
    "desktop_cover_image_content_type" TEXT,
    "desktop_cover_image_updated_at" TIMESTAMP(3),
    "mobile_cover_image_file_name" TEXT,
    "mobile_cover_image_file_size" INTEGER,
    "mobile_cover_image_content_type" TEXT,
    "mobile_cover_image_updated_at" TIMESTAMP(3),
    "cover_image_alt_text" TEXT,
    "content" TEXT,
    "has_content" INTEGER NOT NULL,
    "tags" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by_agency_member_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by_agency_member_id" INTEGER NOT NULL,

    CONSTRAINT "agcy_seo_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tw_pages" (
    "id" SERIAL NOT NULL,
    "agcy_agency_id" INTEGER,
    "url_path" TEXT NOT NULL,
    "redirect_to_url_path" TEXT,
    "tw_page_type_id" INTEGER NOT NULL,
    "tw_page_argument" TEXT NOT NULL,
    "lastmod" TEXT NOT NULL,
    "priority" DOUBLE PRECISION NOT NULL,
    "visited_count" INTEGER NOT NULL,
    "is_active" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "visited_at" TIMESTAMP(3),

    CONSTRAINT "tw_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tw_page_types" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "priority" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tw_page_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agcy_seo_article_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "agcy_seo_article_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agcy_blog_descriptions" (
    "id" SERIAL NOT NULL,
    "blog_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'th',

    CONSTRAINT "agcy_blog_descriptions_pkey" PRIMARY KEY ("id")
);
