const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const prisma = new PrismaClient();

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

async function importProductPool() {
  try {
    console.log('🚀 Starting Product Pool CSV import...\n');
    console.log('📦 Importing Product Pool...');
    
    // Clear existing data first
    await prisma.productPool.deleteMany({});
    console.log('   🗑️ Cleared existing product pool data');
    
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
            console.log(`   ✅ Successfully imported ALL ${results.length} product pool records`);
            resolve();
          } catch (error) {
            console.error('   ❌ Error importing product pool:', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('   ❌ Error reading CSV file:', error);
          reject(error);
        });
    });
    
  } catch (error) {
    console.error('❌ Error importing CSV:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
importProductPool();