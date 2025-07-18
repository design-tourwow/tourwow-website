const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const prisma = new PrismaClient();

// Helper function to safely parse dates
function safeParseDate(dateString) {
  if (!dateString || dateString === 'NULL' || dateString === '') return null;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

// Helper function to safely parse numbers
function safeParseFloat(value) {
  if (!value || value === 'NULL' || value === '') return null;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
}

function safeParseInt(value) {
  if (!value || value === 'NULL' || value === '') return null;
  const parsed = parseInt(value);
  return isNaN(parsed) ? null : parsed;
}

function safeString(value) {
  if (!value || value === 'NULL') return null;
  return value;
}

async function importAllCSV() {
  try {
    console.log('🚀 Starting COMPLETE CSV import process...\n');

    // Clear existing data first
    console.log('🧹 Clearing existing data...');
    await prisma.agencyBlog.deleteMany({});
    await prisma.productPool.deleteMany({});
    await prisma.twPage.deleteMany({});
    await prisma.twPageType.deleteMany({});
    await prisma.seoArticle.deleteMany({});
    await prisma.seoArticleType.deleteMany({});
    await prisma.blogDescription.deleteMany({});
    console.log('   ✅ Cleared existing data\n');

    // Import all tables
    await importTwPageTypes();
    await importAllProductPool();
    await importAllAgencyBlogs();
    await importAllTwPages();
    await importAllSeoArticles();
    await importSeoArticleTypes();
    await importBlogDescriptions();

    console.log('🎉 ALL CSV files imported successfully!');
    
    // Show summary
    await showImportSummary();
    
  } catch (error) {
    console.error('❌ Error importing CSV:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function importTwPageTypes() {
  console.log('📄 Importing ALL TW Page Types...');
  
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

async function importAllProductPool() {
  console.log('📦 Importing ALL Product Pool...');
  
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
          productPriceCompare: safeParseFloat(data.product_price_compare),
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
          productFreeDay: safeParseInt(data.product_free_day),
          productMealAmount: safeParseInt(data.product_meal_amount) || 0,
          productHotelStar: safeParseInt(data.product_hotel_star) || 0,
          productHasVisa: parseInt(data.product_has_visa),
          productVisaPrice: safeParseFloat(data.product_visa_price),
          productHilightDescription: data.product_hilight_description,
          productSubCategoryLabel: data.product_sub_category_label,
          productBannerUrl: data.product_banner_url,
          productHasActivePeriods: parseInt(data.product_has_active_periods),
          productIsRecommended: parseInt(data.product_is_recommended),
          periodGroupCode: safeString(data.period_group_code),
          periodStartAt: new Date(data.period_start_at),
          periodEndAt: new Date(data.period_end_at),
          periodIsChannelTwpOnlineBooking: parseInt(data.period_is_channel_twp_online_booking),
          periodPriceAdultDouble: parseFloat(data.period_price_adult_double),
          periodPriceAdultSingle: safeParseFloat(data.period_price_adult_single),
          periodPriceAdultTripple: safeParseFloat(data.period_price_adult_tripple),
          periodPriceChildNoBed: safeParseFloat(data.period_price_child_no_bed),
          periodPriceChildBed: safeParseFloat(data.period_price_child_bed),
          periodPriceInfant: safeParseFloat(data.period_price_infant),
          periodPriceJoinLand: safeParseFloat(data.period_price_join_land),
          periodPriceAdultDoubleCompare: safeParseFloat(data.period_price_adult_double_compare),
          periodPriceAdultSingleCompare: safeParseFloat(data.period_price_adult_single_compare),
          periodPriceAdultTrippleCompare: safeParseFloat(data.period_price_adult_tripple_compare),
          periodPriceChildNoBedCompare: safeParseFloat(data.period_price_child_no_bed_compare),
          periodPriceChildBedCompare: safeParseFloat(data.period_price_child_bed_compare),
          periodPriceInfantCompare: safeParseFloat(data.period_price_infant_compare),
          periodPriceJoinLandCompare: safeParseFloat(data.period_price_join_land_compare),
          periodDeposit: safeParseFloat(data.period_deposit),
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
          periodTransportationCategoryId: safeParseInt(data.period_transportation_category_id) || 0,
          periodTransportationCategoryName: data.period_transportation_category_name,
          periodGoTransportationId: safeParseInt(data.period_go_transportation_id) || 0,
          periodGoTransportationNameEn: data.period_go_transportation_name_en,
          periodGoTransportationCode: data.period_go_transportation_code,
          periodGoAirportArrival: safeString(data.period_go_airport_arrival),
          periodGoAirportDeparture: safeString(data.period_go_airport_departure),
          periodGoFlightNumberArrival: safeString(data.period_go_flight_number_arrival),
          periodGoFlightNumberDeparture: safeString(data.period_go_flight_number_departure),
          periodGoFlightTimeArrival: safeString(data.period_go_flight_time_arrival),
          periodGoFlightTimeDeparture: safeString(data.period_go_flight_time_departure),
          periodBackTransportationId: safeParseInt(data.period_back_transportation_id) || 0,
          periodBackTransportationNameEn: data.period_back_transportation_name_en,
          periodBackTransportationCode: data.period_back_transportation_code,
          periodBackAirportArrival: safeString(data.period_back_airport_arrival),
          periodBackAirportDeparture: safeString(data.period_back_airport_departure),
          periodBackFlightNumberArrival: safeString(data.period_back_flight_number_arrival),
          periodBackFlightNumberDeparture: safeString(data.period_back_flight_number_departure),
          periodBackFlightTimeArrival: safeString(data.period_back_flight_time_arrival),
          periodBackFlightTimeDeparture: safeString(data.period_back_flight_time_departure),
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

async function importAllAgencyBlogs() {
  console.log('📝 Importing ALL Agency Blogs...');
  
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
          deletedAt: safeParseDate(data.deleted_at),
          deletedByAgencyMemberId: safeParseInt(data.deleted_by_agency_member_id),
        });
      })
      .on('end', async () => {
        try {
          await prisma.agencyBlog.createMany({
            data: results,
            skipDuplicates: true,
          });
          console.log(`   ✅ Imported ALL ${results.length} agency blog records`);
          resolve();
        } catch (error) {
          console.error('   ❌ Error importing agency blogs:', error);
          reject(error);
        }
      });
  });
}

async function importAllTwPages() {
  console.log('📄 Importing ALL TW Pages...');
  
  const results = [];
  const filePath = path.join(__dirname, '../data/6kMWFc_tw_pages.csv');
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          id: parseInt(data.id),
          agencyId: safeParseInt(data.agcy_agency_id),
          urlPath: data.url_path,
          redirectToUrlPath: safeString(data.redirect_to_url_path),
          twPageTypeId: parseInt(data.tw_page_type_id),
          twPageArgument: data.tw_page_argument,
          lastmod: data.lastmod,
          priority: parseFloat(data.priority),
          visitedCount: parseInt(data.visited_count),
          isActive: parseInt(data.is_active),
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          visitedAt: safeParseDate(data.visited_at),
        });
      })
      .on('end', async () => {
        try {
          // Insert in batches
          const batchSize = 1000;
          for (let i = 0; i < results.length; i += batchSize) {
            const batch = results.slice(i, i + batchSize);
            await prisma.twPage.createMany({
              data: batch,
              skipDuplicates: true,
            });
            console.log(`   ⏳ Imported ${i + batch.length}/${results.length} TW page records`);
          }
          console.log(`   ✅ Imported ALL ${results.length} TW page records`);
          resolve();
        } catch (error) {
          console.error('   ❌ Error importing TW pages:', error);
          reject(error);
        }
      });
  });
}

async function importAllSeoArticles() {
  console.log('📄 Importing ALL SEO Articles...');
  
  const results = [];
  const filePath = path.join(__dirname, '../data/6kMWFc_agcy_seo_articles.csv');
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          id: parseInt(data.id),
          agencyId: parseInt(data.agcy_agency_id),
          parentArticleId: safeParseInt(data.parent_article_id),
          isChildOfHomePage: parseInt(data.is_child_of_home_page),
          isActive: parseInt(data.is_active),
          seoArticleTypeId: parseInt(data.agcy_seo_article_type_id),
          seoTargetPageTypeId: safeParseInt(data.agcy_seo_target_page_type_id),
          seoSpecialPageId: safeParseInt(data.agcy_seo_special_page_id),
          countryId: safeParseInt(data.country_id),
          provinceId: safeParseInt(data.province_id),
          countrySubUnitId: safeParseInt(data.country_sub_unit_id),
          proCategorySubProductId: safeParseInt(data.pro_category_sub_product_id),
          code: data.code,
          name: data.name,
          urlPath: data.url_path,
          trimmedUrlPath: data.trimmed_url_path,
          realUrlPath: data.real_url_path,
          metaTitle: safeString(data.meta_title),
          metaDescription: safeString(data.meta_description),
          primaryKeyword: safeString(data.primary_keyword),
          secondaryKeyword: safeString(data.secondary_keyword),
          relatedKeyword: safeString(data.related_keyword),
          note: safeString(data.note),
          desktopCoverImageFileName: safeString(data.desktop_cover_image_file_name),
          desktopCoverImageFileSize: safeParseInt(data.desktop_cover_image_file_size),
          desktopCoverImageContentType: safeString(data.desktop_cover_image_content_type),
          desktopCoverImageUpdatedAt: safeParseDate(data.desktop_cover_image_updated_at),
          mobileCoverImageFileName: safeString(data.mobile_cover_image_file_name),
          mobileCoverImageFileSize: safeParseInt(data.mobile_cover_image_file_size),
          mobileCoverImageContentType: safeString(data.mobile_cover_image_content_type),
          mobileCoverImageUpdatedAt: safeParseDate(data.mobile_cover_image_updated_at),
          coverImageAltText: safeString(data.cover_image_alt_text),
          content: safeString(data.content),
          hasContent: parseInt(data.has_content),
          tags: safeString(data.tags),
          createdAt: new Date(data.created_at),
          createdByAgencyMemberId: parseInt(data.created_by_agency_member_id),
          updatedAt: new Date(data.updated_at),
          updatedByAgencyMemberId: parseInt(data.updated_by_agency_member_id),
        });
      })
      .on('end', async () => {
        try {
          // Insert in batches
          const batchSize = 500;
          for (let i = 0; i < results.length; i += batchSize) {
            const batch = results.slice(i, i + batchSize);
            await prisma.seoArticle.createMany({
              data: batch,
              skipDuplicates: true,
            });
            console.log(`   ⏳ Imported ${i + batch.length}/${results.length} SEO article records`);
          }
          console.log(`   ✅ Imported ALL ${results.length} SEO article records`);
          resolve();
        } catch (error) {
          console.error('   ❌ Error importing SEO articles:', error);
          reject(error);
        }
      });
  });
}

async function importSeoArticleTypes() {
  console.log('📄 Importing SEO Article Types...');
  
  const results = [];
  const filePath = path.join(__dirname, '../data/6kMWFc_agcy_seo_article_types.csv');
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          id: parseInt(data.id),
          name: data.name,
          slug: data.slug,
        });
      })
      .on('end', async () => {
        try {
          await prisma.seoArticleType.createMany({
            data: results,
            skipDuplicates: true,
          });
          console.log(`   ✅ Imported ALL ${results.length} SEO article type records`);
          resolve();
        } catch (error) {
          console.error('   ❌ Error importing SEO article types:', error);
          reject(error);
        }
      });
  });
}

async function importBlogDescriptions() {
  console.log('📄 Importing Blog Descriptions...');
  
  const results = [];
  const filePath = path.join(__dirname, '../data/6kMWFc_agcy_blog_descriptions.csv');
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          id: parseInt(data.id),
          blogId: parseInt(data.blog_id),
          description: data.description,
          language: data.language || 'th',
        });
      })
      .on('end', async () => {
        try {
          await prisma.blogDescription.createMany({
            data: results,
            skipDuplicates: true,
          });
          console.log(`   ✅ Imported ALL ${results.length} blog description records`);
          resolve();
        } catch (error) {
          console.error('   ❌ Error importing blog descriptions:', error);
          reject(error);
        }
      });
  });
}

async function showImportSummary() {
  console.log('\n📊 IMPORT SUMMARY:');
  console.log('==================');
  
  const counts = await Promise.all([
    prisma.twPageType.count(),
    prisma.productPool.count(),
    prisma.agencyBlog.count(),
    prisma.twPage.count(),
    prisma.seoArticle.count(),
    prisma.seoArticleType.count(),
    prisma.blogDescription.count(),
  ]);
  
  console.log(`📄 TW Page Types: ${counts[0].toLocaleString()} records`);
  console.log(`📦 Product Pool: ${counts[1].toLocaleString()} records`);
  console.log(`📝 Agency Blogs: ${counts[2].toLocaleString()} records`);
  console.log(`📄 TW Pages: ${counts[3].toLocaleString()} records`);
  console.log(`📄 SEO Articles: ${counts[4].toLocaleString()} records`);
  console.log(`📄 SEO Article Types: ${counts[5].toLocaleString()} records`);
  console.log(`📄 Blog Descriptions: ${counts[6].toLocaleString()} records`);
  console.log('==================');
  console.log(`🎯 TOTAL: ${counts.reduce((sum, count) => sum + count, 0).toLocaleString()} records`);
}

// Run the import
importAllCSV();