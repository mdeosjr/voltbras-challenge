/*
  Warnings:

  - Added the required column `planetId` to the `stations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stations" ADD COLUMN     "planetId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "planets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mass" INTEGER NOT NULL,
    "hasStation" BOOLEAN NOT NULL,

    CONSTRAINT "planets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "planets_name_key" ON "planets"("name");

-- AddForeignKey
ALTER TABLE "stations" ADD CONSTRAINT "stations_planetId_fkey" FOREIGN KEY ("planetId") REFERENCES "planets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
