# Migration `20200824150940`

This migration has been generated by Dennis Zimmermann at 8/24/2020, 5:09:40 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "ItemType" AS ENUM ('GROUP', 'LAYER', 'PATH')

CREATE TYPE "Role" AS ENUM ('USER')

CREATE TABLE "public"."Drawing" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"authorId" text   ,
"name" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Item" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"drawingName" text   NOT NULL ,
"authorId" text   ,
"name" text   NOT NULL ,
"type" "ItemType"  NOT NULL ,
"data" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."User" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"email" text   NOT NULL ,
"password" text   NOT NULL ,
"firstname" text   ,
"lastname" text   ,
"role" "Role"  NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "Drawing.name_unique" ON "public"."Drawing"("name")

CREATE UNIQUE INDEX "Item.name_unique" ON "public"."Item"("name")

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

ALTER TABLE "public"."Drawing" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Item" ADD FOREIGN KEY ("drawingName")REFERENCES "public"."Drawing"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Item" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200824150940
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,53 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Drawing {
+  id            String   @default(cuid()) @id
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
+  authorId      String?
+  author        User?  @relation(fields: [authorId], references: [id])
+  name          String   @unique
+  items         Item[]
+}
+
+model Item {
+  id            String   @default(cuid()) @id
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
+  drawingName   String
+  drawing       Drawing  @relation(fields: [drawingName], references: [id])
+  authorId      String?
+  author        User?    @relation(fields: [authorId], references: [id])
+  name          String   @unique
+  type          ItemType
+  data          String
+}
+
+model User {
+  id            String    @default(cuid()) @id
+  createdAt     DateTime  @default(now())
+  updatedAt     DateTime  @updatedAt
+  email         String    @unique
+  password      String
+  firstname     String?
+  lastname      String?
+  role          Role
+  drawings      Drawing[]
+}
+
+enum ItemType {
+  GROUP
+  LAYER
+  PATH
+}
+
+enum Role {
+  USER
+}
```


