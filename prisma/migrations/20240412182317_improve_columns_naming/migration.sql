/*
  Warnings:

  - You are about to drop the column `UserId` on the `UserFarm` table. All the data in the column will be lost.
  - Added the required column `userId` to the `UserFarm` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserFarm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "farmId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "permission" INTEGER NOT NULL,
    CONSTRAINT "UserFarm_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserFarm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserFarm" ("farmId", "id", "permission") SELECT "farmId", "id", "permission" FROM "UserFarm";
DROP TABLE "UserFarm";
ALTER TABLE "new_UserFarm" RENAME TO "UserFarm";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
