-- CreateTable
CREATE TABLE "CatalogVariant" (
    "id" SERIAL NOT NULL,
    "catalogId" INTEGER NOT NULL,
    "optionName" TEXT NOT NULL,
    "optionValues" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CatalogVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CatalogVariant_catalogId_optionName_key" ON "CatalogVariant"("catalogId", "optionName");

-- AddForeignKey
ALTER TABLE "CatalogVariant" ADD CONSTRAINT "CatalogVariant_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
