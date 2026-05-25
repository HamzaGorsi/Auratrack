-- AlterTable
ALTER TABLE "User" ADD COLUMN "avatarUrl" TEXT DEFAULT '';
ALTER TABLE "User" ADD COLUMN "bannerUrl" TEXT DEFAULT '';
ALTER TABLE "User" ADD COLUMN "bio" TEXT DEFAULT '';
ALTER TABLE "User" ADD COLUMN "favoriteGame" TEXT DEFAULT '';

-- CreateTable
CREATE TABLE "ConnectedAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "platform" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "tagline" TEXT,
    "puuid" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ConnectedAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
