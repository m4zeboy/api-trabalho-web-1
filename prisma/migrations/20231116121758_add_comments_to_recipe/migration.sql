-- CreateTable
CREATE TABLE "CommentsOfRecipe" (
    "recipe_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT NOT NULL,

    PRIMARY KEY ("recipe_id", "user_id", "comment"),
    CONSTRAINT "CommentsOfRecipe_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentsOfRecipe_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
