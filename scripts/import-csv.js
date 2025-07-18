const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const prisma = new PrismaClient();

async function importCSV() {
  try {
    console.log('🚀 Starting CSV import process...\n');

    // Import Product Pool
    await importProductPool();
    
    // Import Agency Blogs
    await importAgencyBlogs();
    
    // Import SEO Articles
    await importSeoArticles();
    
    // Import TW Pages
    await importTwPages();
    
    // Import TW Page Types
    await importTwPageTypes();

    console.log('✅ All CSV files imported successfully!');
    
  } catch (error) {
    console.error('❌ Error importing CSV:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function importProductPool() {
  console.log('📦 Importing Product Pool...');
  
  const results = [];
  const filePath = path.join(__dirname, '../data/Xqc7k7_product_pools.csv');
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          supplierId: parseInt(data.supplier_id),
          productRunningId: parseInt(data.product_running_id),
          productId: parseInt(data.product_id),
          periodId: parseInt(data.period_id),
          productSubCategoryId: parseInt(data.product_sub_category_id),
          productTourCode: data.product_tour_code,
          productTourwowCode: data.product_tourwow_code,
          productTwUrlPath: data.product_tw_url_path,
          productName: data.product_name,
          productStartAt: new Date(data.product_start_at),
          productPrice: parseFloat(data.product_price),
          productPriceCompare: data.product_price_compare && data.product_price_compare !== 'NULL' ? parseFloat(data.product_price_compare) : null,
          productHasOneCountry: parseInt(data.product_has_one_country),
          productMainCountryId: parseInt(data.product_main_country_id),
          productMainCountryNameTh: data.product_main_country_name_th,
          productMainCountryNameEn: data.product_main_country_name_en,
          productCountries: data.product_countries,
          productCountrySubUnits: data.product_country_sub_units,
          productTags: data.product_tags,
          productTagsJson: data.product_tags_json,
          productDurationDay: parseInt(data.product_duration_day),
          productDurationNight: parseInt(data.product_duration_night),
          productDurationDayAndNight: data.product_duration_day_and_night,
          productFreeDay: data.product_free_day ? parseInt(data.product_free_day) : null,
          productMealAmount: data.product_meal_amount && data.product_meal_amount !== 'NULL' ? parseInt(data.product_meal_amount) : 0,
          productHotelStar: parseInt(data.product_hotel_star),
          productHasVisa: parseInt(data.product_has_visa),
          productVisaPrice: data.product_visa_price ? parseFloat(data.product_visa_price) : null,
          productHilightDescription: data.product_hilight_description,
          productSubCategoryLabel: data.product_sub_category_label,
          productBannerUrl: data.product_banner_url,
          productHasActivePeriods: parseInt(data.product_has_active_periods),
          productIsRecommended: parseInt(data.product_is_recommended),
          periodGroupCode: data.period_group_code || null,
          periodStartAt: new Date(data.period_start_at),
          periodEndAt: new Date(data.period_end_at),
          periodIsChannelTwpOnlineBooking: parseInt(data.period_is_channel_twp_online_booking),
          periodPriceAdultDouble: parseFloat(data.period_price_adult_double),
          periodPriceAdultSingle: data.period_price_adult_single ? parseFloat(data.period_price_adult_single) : null,
          periodPriceAdultTripple: data.period_price_adult_tripple ? parseFloat(data.period_price_adult_tripple) : null,
          periodPriceChildNoBed: data.period_price_child_no_bed ? parseFloat(data.period_price_child_no_bed) : null,
          periodPriceChildBed: data.period_price_child_bed ? parseFloat(data.period_price_child_bed) : null,
          periodPriceInfant: data.period_price_infant ? parseFloat(data.period_price_infant) : null,
          periodPriceJoinLand: data.period_price_join_land ? parseFloat(data.period_price_join_land) : null,
          periodPriceAdultDoubleCompare: data.period_price_adult_double_compare ? parseFloat(data.period_price_adult_double_compare) : null,
          periodPriceAdultSingleCompare: data.period_price_adult_single_compare ? parseFloat(data.period_price_adult_single_compare) : null,
          periodPriceAdultTrippleCompare: data.period_price_adult_tripple_compare ? parseFloat(data.period_price_adult_tripple_compare) : null,
          periodPriceChildNoBedCompare: data.period_price_child_no_bed_compare ? parseFloat(data.period_price_child_no_bed_compare) : null,
          periodPriceChildBedCompare: data.period_price_child_bed_compare ? parseFloat(data.period_price_child_bed_compare) : null,
          periodPriceInfantCompare: data.period_price_infant_compare ? parseFloat(data.period_price_infant_compare) : null,
          periodPriceJoinLandCompare: data.period_price_join_land_compare ? parseFloat(data.period_price_join_land_compare) : null,
          periodDeposit: data.period_deposit ? parseFloat(data.period_deposit) : null,
          periodCommission: parseFloat(data.period_commission),
          periodCommissionCompany: parseFloat(data.period_commission_company),
          periodCommissionSeller: parseFloat(data.period_commission_seller),
          periodQuantity: parseInt(data.period_quantity),
          periodQuantityRemaining: parseInt(data.period_quantity_remaining),
          periodSellStatusCode: parseInt(data.period_sell_status_code),
          periodIsActive: parseInt(data.period_is_active),
          periodDeal: parseInt(data.period_deal),
          periodConfig: parseInt(data.period_config),
          periodInstallmentCount: parseInt(data.period_installment_count),
          periodTransportationCategoryId: parseInt(data.period_transportation_category_id),
          periodTransportationCategoryName: data.period_transportation_category_name,
          periodGoTransportationId: parseInt(data.period_go_transportation_id),
          periodGoTransportationNameEn: data.period_go_transportation_name_en,
          periodGoTransportationCode: data.period_go_transportation_code,
          periodGoAirportArrival: data.period_go_airport_arrival || null,
          periodGoAirportDeparture: data.period_go_airport_departure || null,
          periodGoFlightNumberArrival: data.period_go_flight_number_arrival || null,
          periodGoFlightNumberDeparture: data.period_go_flight_number_departure || null,
          periodGoFlightTimeArrival: data.period_go_flight_time_arrival || null,
          periodGoFlightTimeDeparture: data.period_go_flight_time_departure || null,
          periodBackTransportationId: parseInt(data.period_back_transportation_id),
          periodBackTransportationNameEn: data.period_back_transportation_name_en,
          periodBackTransportationCode: data.period_back_transportation_code,
          periodBackAirportArrival: data.period_back_airport_arrival || null,
          periodBackAirportDeparture: data.period_back_airport_departure || null,
          periodBackFlightNumberArrival: data.period_back_flight_number_arrival || null,
          periodBackFlightNumberDeparture: data.period_back_flight_number_departure || null,
          periodBackFlightTimeArrival: data.period_back_flight_time_arrival || null,
          periodBackFlightTimeDeparture: data.period_back_flight_time_departure || null,
          createdAt: new Date(data.created_at),
        });
      })
      .on('end', async () => {
        try {
          // Insert in batches to avoid memory issues
          const batchSize = 1000;
          for (let i = 0; i < results.length; i += batchSize) {
            const batch = results.slice(i, i + batchSize);
            await prisma.productPool.createMany({
              data: batch,
              skipDuplicates: true,
            });
            console.log(`   ⏳ Imported ${i + batch.length}/${results.length} product pool records`);
          }
          console.log(`   ✅ Imported ALL ${results.length} product pool records`);
          resolve();
        } catch (error) {
          console.error('   ❌ Error importing product pool:', error);
          reject(error);
        }
      });
  });
}

async function importAgencyBlogs() {
  console.log('📝 Importing Agency Blogs...');
  
  const results = [];
  const filePath = path.join(__dirname, '../data/6kMWFc_agcy_blogs.csv');
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          id: parseInt(data.id),
          agencyId: parseInt(data.agcy_agencies_id),
          title: data.title,
          tags: data.tags,
          createdAt: new Date(data.created_at),
          createdByAgencyMemberId: parseInt(data.created_by_agency_member_id),
          updatedAt: new Date(data.updated_at),
          updatedByAgencyMemberId: parseInt(data.updated_by_agency_member_id),
          deletedAt: data.deleted_at ? new Date(data.deleted_at) : null,
          deletedByAgencyMemberId: data.deleted_by_agency_member_id ? parseInt(data.deleted_by_agency_member_id) : null,
        });
      })
      .on('end', async () => {
        try {
          await prisma.agencyBlog.createMany({
            data: results,
            skipDuplicates: true,
          });
          console.log(`   ✅ Imported ${results.length} agency blog records`);
          resolve();
        } catch (error) {
          console.error('   ❌ Error importing agency blogs:', error);
          reject(error);
        }
      });
  });
}

async function importSeoArticles() {
  console.log('📄 Importing SEO Articles...');
  
  const results = [];
  const filePath = path.join(__dirname, '../data/6kMWFc_agcy_seo_articles.csv');
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          id: parseInt(data.id),
          agencyId: parseInt(data.agcy_agency_id),
          parentArticleId: data.parent_article_id ? parseInt(data.parent_article_id) : null,
          isChildOfHomePage: parseInt(data.is_child_of_home_page),
          isActive: parseInt(data.is_active),
          seoArticleTypeId: parseInt(data.agcy_seo_article_type_id),
          seoTargetPageTypeId: data.agcy_seo_target_page_type_id ? parseInt(data.agcy_seo_target_page_type_id) : null,
          seoSpecialPageId: data.agcy_seo_special_page_id ? parseInt(data.agcy_seo_special_page_id) : null,
          countryId: data.country_id ? parseInt(data.country_id) : null,
          provinceId: data.province_id ? parseInt(data.province_id) : null,
          countrySubUnitId: data.country_sub_unit_id ? parseInt(data.country_sub_unit_id) : null,
          proCategorySubProductId: data.pro_category_sub_product_id ? parseInt(data.pro_category_sub_product_id) : null,
          code: data.code,
          name: data.name,
          urlPath: data.url_path,
          trimmedUrlPath: data.trimmed_url_path,
          realUrlPath: data.real_url_path,
          metaTitle: data.meta_title || null,
          metaDescription: data.meta_description || null,
          primaryKeyword: data.primary_keyword || null,
          secondaryKeyword: data.secondary_keyword || null,
          relatedKeyword: data.related_keyword || null,
          note: data.note || null,
          desktopCoverImageFileName: data.desktop_cover_image_file_name || null,
          desktopCoverImageFileSize: data.desktop_cover_image_file_size ? parseInt(data.desktop_cover_image_file_size) : null,
          desktopCoverImageContentType: data.desktop_cover_image_content_type || null,
          desktopCoverImageUpdatedAt: data.desktop_cover_image_updated_at ? new Date(data.desktop_cover_image_updated_at) : null,
          mobileCoverImageFileName: data.mobile_cover_image_file_name || null,
          mobileCoverImageFileSize: data.mobile_cover_image_file_size ? parseInt(data.mobile_cover_image_file_size) : null,
          mobileCoverImageContentType: data.mobile_cover_image_content_type || null,
          mobileCoverImageUpdatedAt: data.mobile_cover_image_updated_at ? new Date(data.mobile_cover_image_updated_at) : null,
          coverImageAltText: data.cover_image_alt_text || null,
          content: data.content || null,
          hasContent: parseInt(data.has_content),
          tags: data.tags || null,
          createdAt: new Date(data.created_at),
          createdByAgencyMemberId: parseInt(data.created_by_agency_member_id),
          updatedAt: new Date(data.updated_at),
          updatedByAgencyMemberId: parseInt(data.updated_by_agency_member_id),
        });
      })
      .on('end', async () => {
        try {
          await prisma.seoArticle.createMany({
            data: results,
            skipDuplicates: true,
          });
          console.log(`   ✅ Imported ${results.length} SEO article records`);
          resolve();
        } catch (error) {
          console.error('   ❌ Error importing SEO articles:', error);
          reject(error);
        }
      });
  });
}

async function importTwPages() {
  console.log('📄 Importing TW Pages...');
  
  const results = [];
  const filePath = path.join(__dirname, '../data/6kMWFc_tw_pages.csv');
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          id: parseInt(data.id),
          agencyId: data.agcy_agency_id ? parseInt(data.agcy_agency_id) : null,
          urlPath: data.url_path,
          redirectToUrlPath: data.redirect_to_url_path || null,
          twPageTypeId: parseInt(data.tw_page_type_id),
          twPageArgument: data.tw_page_argument,
          lastmod: data.lastmod,
          priority: parseFloat(data.priority),
          visitedCount: parseInt(data.visited_count),
          isActive: parseInt(data.is_active),
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          visitedAt: data.visited_at ? new Date(data.visited_at) : null,
        });
      })
      .on('end', async () => {
        try {
          await prisma.twPage.createMany({
            data: results,
            skipDuplicates: true,
          });
          console.log(`   ✅ Imported ${results.length} TW page records`);
          resolve();
        } catch (error) {
          console.error('   ❌ Error importing TW pages:', error);
          reject(error);
        }
      });
  });
}

async function importTwPageTypes() {
  console.log('📄 Importing TW Page Types...');
  
  const results = [];
  const filePath = path.join(__dirname, '../data/6kMWFc_tw_page_types.csv');
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          id: parseInt(data.id),
          slug: data.slug,
          priority: parseFloat(data.priority),
        });
      })
      .on('end', async () => {
        try {
          await prisma.twPageType.createMany({
            data: results,
            skipDuplicates: true,
          });
          console.log(`   ✅ Imported ${results.length} TW page type records`);
          resolve();
        } catch (error) {
          console.error('   ❌ Error importing TW page types:', error);
          reject(error);
        }
      });
  });
}

// Run the import
importCSV();