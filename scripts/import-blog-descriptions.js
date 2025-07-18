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
function safeParseInt(value) {
  if (!value || value === 'NULL' || value === '') return null;
  const parsed = parseInt(value);
  return isNaN(parsed) ? null : parsed;
}

function safeString(value) {
  if (!value || value === 'NULL') return null;
  return value;
}

async function importBlogDescriptions() {
  try {
    console.log('📄 Starting Blog Descriptions import...\n');

    // Clear existing data
    await prisma.blogDescription.deleteMany({});
    console.log('🧹 Cleared existing blog descriptions\n');

    const results = [];
    const filePath = path.join(__dirname, '../data/6kMWFc_agcy_blog_descriptions.csv');
    
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          results.push({
            id: parseInt(data.id),
            agcyBlogsId: parseInt(data.agcy_blogs_id),
            agcyGalleriesId: safeParseInt(data.agcy_galleries_id),
            typeSlug: data.type_slug,
            ordinal: parseInt(data.ordinal),
            description: safeString(data.description),
            imageDescription: safeString(data.image_description),
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
            // Insert in batches to avoid memory issues
            const batchSize = 500;
            for (let i = 0; i < results.length; i += batchSize) {
              const batch = results.slice(i, i + batchSize);
              await prisma.blogDescription.createMany({
                data: batch,
                skipDuplicates: true,
              });
              console.log(`   ⏳ Imported ${i + batch.length}/${results.length} blog description records`);
            }
            
            console.log(`   ✅ Imported ALL ${results.length} blog description records`);
            
            // Show summary
            const totalCount = await prisma.blogDescription.count();
            console.log(`\n📊 Total blog descriptions in database: ${totalCount.toLocaleString()}`);
            
            resolve();
          } catch (error) {
            console.error('   ❌ Error importing blog descriptions:', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('   ❌ Error reading CSV file:', error);
          reject(error);
        });
    });
  } catch (error) {
    console.error('❌ Error importing blog descriptions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
importBlogDescriptions();