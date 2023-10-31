-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author_id" TEXT NOT NULL,
    "recipe_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "preparation_time" DECIMAL NOT NULL,
    "preparation_instructions" TEXT NOT NULL,
    "portions" INTEGER NOT NULL,
    "nutritional_value" INTEGER NOT NULL,
    "cooking_method" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Recipe_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("author_id", "cooking_method", "description", "id", "nutritional_value", "portions", "preparation_instructions", "preparation_time", "recipe_name") SELECT "author_id", "cooking_method", "description", "id", "nutritional_value", "portions", "preparation_instructions", "preparation_time", "recipe_name" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
