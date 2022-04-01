/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uniqueCode" TEXT NOT NULL,
    "songId" INTEGER NOT NULL,
    CONSTRAINT "User_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("id", "songId", "uniqueCode") SELECT "id", "songId", "uniqueCode" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_uniqueCode_key" ON "User"("uniqueCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
