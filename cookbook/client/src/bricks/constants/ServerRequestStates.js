export const STATE = {
    PENDING: "pending",
    SUCCESS: "success",
    ERROR: "error",
  };

export const REQUEST_TYPE = {
    GET: "GET",
    POST: "POST",
  };

export const API_URLS = {
    RECIPE_UPDATE: 'http://localhost:3000/recipe/update',
    RECIPE_CREATE: 'http://localhost:3000/recipe/create',
    RECIPE_DELETE: `http://localhost:3000/recipe/delete`,
    RECIPE_LIST_GET: `http://localhost:3000/recipe/list`,
    RECIPE_INGREDIENTS_GET: `http://localhost:3000/ingredient/list`,
  };