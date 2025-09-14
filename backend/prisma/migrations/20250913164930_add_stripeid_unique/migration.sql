/*
  Warnings:

  - A unique constraint covering the columns `[stripeId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripeId_key" ON "public"."Payment"("stripeId");
