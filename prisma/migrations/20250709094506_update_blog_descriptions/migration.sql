/*
  Warnings:

  - You are about to drop the column `blog_id` on the `agcy_blog_descriptions` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `agcy_blog_descriptions` table. All the data in the column will be lost.
  - Added the required column `agcy_blogs_id` to the `agcy_blog_descriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `agcy_blog_descriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_agency_member_id` to the `agcy_blog_descriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ordinal` to the `agcy_blog_descriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_slug` to the `agcy_blog_descriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `agcy_blog_descriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by_agency_member_id` to the `agcy_blog_descriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "agcy_blog_descriptions" DROP COLUMN "blog_id",
DROP COLUMN "language",
ADD COLUMN     "agcy_blogs_id" INTEGER NOT NULL,
ADD COLUMN     "agcy_galleries_id" INTEGER,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_by_agency_member_id" INTEGER NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by_agency_member_id" INTEGER,
ADD COLUMN     "image_description" TEXT,
ADD COLUMN     "ordinal" INTEGER NOT NULL,
ADD COLUMN     "type_slug" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_by_agency_member_id" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
