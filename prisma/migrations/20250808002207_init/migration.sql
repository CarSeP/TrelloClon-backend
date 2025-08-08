-- CreateTable
CREATE TABLE "public"."Board" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "usersID" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Column" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "boardID" TEXT NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Card" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "columnID" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Board_id_key" ON "public"."Board"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Board_title_key" ON "public"."Board"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Column_id_key" ON "public"."Column"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Column_title_key" ON "public"."Column"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Card_id_key" ON "public"."Card"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Card_title_key" ON "public"."Card"("title");

-- AddForeignKey
ALTER TABLE "public"."Column" ADD CONSTRAINT "Column_boardID_fkey" FOREIGN KEY ("boardID") REFERENCES "public"."Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Card" ADD CONSTRAINT "Card_columnID_fkey" FOREIGN KEY ("columnID") REFERENCES "public"."Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
