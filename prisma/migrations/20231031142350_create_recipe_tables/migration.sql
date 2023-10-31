-- CreateTable
CREATE TABLE "categories" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author_id" TEXT NOT NULL,
    "recipe_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "preparation_time" DECIMAL NOT NULL,
    "preparation_instructions" TEXT NOT NULL,
    "portions" INTEGER NOT NULL,
    "nutritional_value" INTEGER NOT NULL,
    "cooking_method" TEXT NOT NULL,
    CONSTRAINT "Recipe_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categories_of_recipe" (
    "category_name" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,

    PRIMARY KEY ("category_name", "recipe_id"),
    CONSTRAINT "categories_of_recipe_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "categories" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "categories_of_recipe_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ingredients_of_recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ingredient_name" TEXT NOT NULL,
    "quantity" DECIMAL NOT NULL,
    "unity" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    CONSTRAINT "ingredients_of_recipe_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "images_of_recipe" (
    "url" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    PRIMARY KEY ("url", "recipeId"),
    CONSTRAINT "images_of_recipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
