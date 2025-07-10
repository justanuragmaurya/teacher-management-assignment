-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Teacher', 'Admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Teacher';
