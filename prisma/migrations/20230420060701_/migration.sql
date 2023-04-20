-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUBADMIN', 'MANAGER', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "cuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "handle" TEXT NOT NULL,
    "screen_name" TEXT NOT NULL,
    "bio" TEXT NOT NULL DEFAULT '',
    "hidden_commnet" TEXT NOT NULL DEFAULT '',
    "profile_image" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "Follow" (
    "cuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "src_user_cuid" TEXT NOT NULL,
    "dst_user_cuid" TEXT NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "Post" (
    "cuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "src_user_cuid" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "HashTag" (
    "cuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "HashTag_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "PostLike" (
    "cuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "src_user_cuid" TEXT NOT NULL,
    "dst_post_cuid" TEXT NOT NULL,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "PostComment" (
    "cuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "src_user_cuid" TEXT NOT NULL,
    "dst_post_cuid" TEXT NOT NULL,

    CONSTRAINT "PostComment_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "_HashTagToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_handle_key" ON "User"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_src_user_cuid_dst_user_cuid_key" ON "Follow"("src_user_cuid", "dst_user_cuid");

-- CreateIndex
CREATE UNIQUE INDEX "HashTag_name_key" ON "HashTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PostLike_src_user_cuid_dst_post_cuid_key" ON "PostLike"("src_user_cuid", "dst_post_cuid");

-- CreateIndex
CREATE UNIQUE INDEX "_HashTagToPost_AB_unique" ON "_HashTagToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_HashTagToPost_B_index" ON "_HashTagToPost"("B");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_src_user_cuid_fkey" FOREIGN KEY ("src_user_cuid") REFERENCES "User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_dst_user_cuid_fkey" FOREIGN KEY ("dst_user_cuid") REFERENCES "User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_src_user_cuid_fkey" FOREIGN KEY ("src_user_cuid") REFERENCES "User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_src_user_cuid_fkey" FOREIGN KEY ("src_user_cuid") REFERENCES "User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_dst_post_cuid_fkey" FOREIGN KEY ("dst_post_cuid") REFERENCES "Post"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_src_user_cuid_fkey" FOREIGN KEY ("src_user_cuid") REFERENCES "User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_dst_post_cuid_fkey" FOREIGN KEY ("dst_post_cuid") REFERENCES "Post"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashTagToPost" ADD CONSTRAINT "_HashTagToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "HashTag"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashTagToPost" ADD CONSTRAINT "_HashTagToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;
