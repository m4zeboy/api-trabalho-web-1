-- CreateTable
CREATE TABLE "ratings_of_recipe" (
    "rating" INTEGER NOT NULL DEFAULT 0,
    "recipe_id" TEXT NOT NULL,

    PRIMARY KEY ("recipe_id", "rating"),
    CONSTRAINT "ratings_of_recipe_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
