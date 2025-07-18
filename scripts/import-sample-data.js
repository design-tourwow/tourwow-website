const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');

const prisma = new PrismaClient();

async function importSampleData() {
  try {
    console.log('Starting import of sample data...');
    
    const results = [];
    
    // Read the CSV file
    fs.createReadStream('/Users/gap/tourwow-website/data/Xqc7k7_product_pools.csv')
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', async () => {
        console.log(`Processing ${results.length} rows...`);
        
        // Take only first 50 rows for testing
        const sampleData = results.slice(0, 50);
        
        for (const row of sampleData) {
          try {
            await prisma.productPool.create({
              data: {
                supplierId: parseInt(row.supplier_id),
                productRunningId: parseInt(row.product_running_id),
                productId: parseInt(row.product_id),
                periodId: parseInt(row.period_id),
                productSubCategoryId: parseInt(row.product_sub_category_id),
                productTourCode: row.product_tour_code,
                productTourwowCode: row.product_tourwow_code,
                productTwUrlPath: row.product_tw_url_path,
                productName: row.product_name,
                productStartAt: new Date(row.product_start_at),
                productPrice: parseFloat(row.product_price),
                productPriceCompare: row.product_price_compare ? parseFloat(row.product_price_compare) : null,
                productHasOneCountry: parseInt(row.product_has_one_country),
                productMainCountryId: parseInt(row.product_main_country_id),
                productMainCountryNameTh: row.product_main_country_name_th,
                productMainCountryNameEn: row.product_main_country_name_en,
                productCountries: row.product_countries,
                productCountrySubUnits: row.product_country_sub_units,
                productTags: row.product_tags || '',
                productTagsJson: row.product_tags_json || '[]',
                productDurationDay: parseInt(row.product_duration_day),
                productDurationNight: parseInt(row.product_duration_night),
                productDurationDayAndNight: row.product_duration_day_and_night,
                productFreeDay: row.product_free_day ? parseInt(row.product_free_day) : null,
                productMealAmount: parseInt(row.product_meal_amount || 0),
                productHotelStar: parseInt(row.product_hotel_star || 0),
                productHasVisa: parseInt(row.product_has_visa),
                productVisaPrice: row.product_visa_price ? parseFloat(row.product_visa_price) : null,
                productHilightDescription: row.product_hilight_description || '',
                productSubCategoryLabel: row.product_sub_category_label,
                productBannerUrl: row.product_banner_url,
                productHasActivePeriods: parseInt(row.product_has_active_periods),
                productIsRecommended: parseInt(row.product_is_recommended),
                periodGroupCode: row.period_group_code || null,
                periodStartAt: new Date(row.period_start_at),
                periodEndAt: new Date(row.period_end_at),
                periodIsChannelTwpOnlineBooking: parseInt(row.period_is_channel_twp_online_booking),
                periodPriceAdultDouble: parseFloat(row.period_price_adult_double),
                periodPriceAdultSingle: row.period_price_adult_single ? parseFloat(row.period_price_adult_single) : null,
                periodPriceAdultTripple: row.period_price_adult_tripple ? parseFloat(row.period_price_adult_tripple) : null,
                periodPriceChildNoBed: row.period_price_child_no_bed ? parseFloat(row.period_price_child_no_bed) : null,
                periodPriceChildBed: row.period_price_child_bed ? parseFloat(row.period_price_child_bed) : null,
                periodPriceInfant: row.period_price_infant ? parseFloat(row.period_price_infant) : null,
                periodPriceJoinLand: row.period_price_join_land ? parseFloat(row.period_price_join_land) : null,
                periodPriceAdultDoubleCompare: row.period_price_adult_double_compare ? parseFloat(row.period_price_adult_double_compare) : null,
                periodPriceAdultSingleCompare: row.period_price_adult_single_compare ? parseFloat(row.period_price_adult_single_compare) : null,
                periodPriceAdultTrippleCompare: row.period_price_adult_tripple_compare ? parseFloat(row.period_price_adult_tripple_compare) : null,
                periodPriceChildNoBedCompare: row.period_price_child_no_bed_compare ? parseFloat(row.period_price_child_no_bed_compare) : null,
                periodPriceChildBedCompare: row.period_price_child_bed_compare ? parseFloat(row.period_price_child_bed_compare) : null,
                periodPriceInfantCompare: row.period_price_infant_compare ? parseFloat(row.period_price_infant_compare) : null,
                periodPriceJoinLandCompare: row.period_price_join_land_compare ? parseFloat(row.period_price_join_land_compare) : null,
                periodDeposit: row.period_deposit ? parseFloat(row.period_deposit) : null,
                periodCommission: parseFloat(row.period_commission),
                periodCommissionCompany: parseFloat(row.period_commission_company),
                periodCommissionSeller: parseFloat(row.period_commission_seller),
                periodQuantity: parseInt(row.period_quantity),
                periodQuantityRemaining: parseInt(row.period_quantity_remaining),
                periodSellStatusCode: parseInt(row.period_sell_status_code),
                periodIsActive: parseInt(row.period_is_active),
                periodDeal: parseInt(row.period_deal),
                periodConfig: parseInt(row.period_config),
                periodInstallmentCount: parseInt(row.period_installment_count),
                periodTransportationCategoryId: parseInt(row.period_transportation_category_id),
                periodTransportationCategoryName: row.period_transportation_category_name,
                periodGoTransportationId: parseInt(row.period_go_transportation_id),
                periodGoTransportationNameEn: row.period_go_transportation_name_en,
                periodGoTransportationCode: row.period_go_transportation_code,
                periodGoAirportArrival: row.period_go_airport_arrival || null,
                periodGoAirportDeparture: row.period_go_airport_departure || null,
                periodGoFlightNumberArrival: row.period_go_flight_number_arrival || null,
                periodGoFlightNumberDeparture: row.period_go_flight_number_departure || null,
                periodGoFlightTimeArrival: row.period_go_flight_time_arrival || null,
                periodGoFlightTimeDeparture: row.period_go_flight_time_departure || null,
                periodBackTransportationId: parseInt(row.period_back_transportation_id),
                periodBackTransportationNameEn: row.period_back_transportation_name_en,
                periodBackTransportationCode: row.period_back_transportation_code,
                periodBackAirportArrival: row.period_back_airport_arrival || null,
                periodBackAirportDeparture: row.period_back_airport_departure || null,
                periodBackFlightNumberArrival: row.period_back_flight_number_arrival || null,
                periodBackFlightNumberDeparture: row.period_back_flight_number_departure || null,
                periodBackFlightTimeArrival: row.period_back_flight_time_arrival || null,
                periodBackFlightTimeDeparture: row.period_back_flight_time_departure || null,
                createdAt: new Date(row.created_at),
              }
            });
            
            console.log(`Imported tour: ${row.product_tourwow_code} - ${row.product_name.substring(0, 50)}...`);
          } catch (error) {
            console.error(`Error importing row for ${row.product_tourwow_code}:`, error.message);
          }
        }
        
        console.log('Import completed!');
        
        // Test query
        const count = await prisma.productPool.count();
        console.log(`Total tours imported: ${count}`);
        
        // Sample some tour codes for testing
        const samples = await prisma.productPool.findMany({
          take: 10,
          select: {
            productTourCode: true,
            productTourwowCode: true,
            productName: true,
            periodIsActive: true,
            periodQuantityRemaining: true,
          }
        });
        
        console.log('\nSample tour codes for testing:');
        samples.forEach(sample => {
          console.log(`${sample.productTourwowCode} (${sample.productTourCode}) - ${sample.productName.substring(0, 50)}... - Active: ${sample.periodIsActive}, Remaining: ${sample.periodQuantityRemaining}`);
        });
        
        await prisma.$disconnect();
      });
      
  } catch (error) {
    console.error('Error importing data:', error);
    await prisma.$disconnect();
  }
}

importSampleData();