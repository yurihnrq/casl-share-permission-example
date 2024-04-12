/*
  Warnings:

  - A unique constraint covering the columns `[farmId,userId]` on the table `UserFarm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserFarm_farmId_userId_key" ON "UserFarm"("farmId", "userId");
