-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "phone" INTEGER;

-- CreateTable
CREATE TABLE "Qualifications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rate" INTEGER NOT NULL,
    "teacherid" TEXT NOT NULL,

    CONSTRAINT "Qualifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Qualifications" ADD CONSTRAINT "Qualifications_teacherid_fkey" FOREIGN KEY ("teacherid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
