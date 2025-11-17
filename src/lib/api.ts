// TheMealDB API - Free API for meal recipes
const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  [key: string]: string | null;
}

export interface MealsResponse {
  meals: Meal[] | null;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

export const mealApi = {
  // Search meals by name
  searchMeals: async (query: string): Promise<Meal[]> => {
    const response = await fetch(`${API_BASE}/search.php?s=${query}`);
    const data: MealsResponse = await response.json();
    return data.meals || [];
  },

  // Get random meal
  getRandomMeal: async (): Promise<Meal> => {
    const response = await fetch(`${API_BASE}/random.php`);
    const data: MealsResponse = await response.json();
    return data.meals![0];
  },

  // Get meal by ID
  getMealById: async (id: string): Promise<Meal> => {
    const response = await fetch(`${API_BASE}/lookup.php?i=${id}`);
    const data: MealsResponse = await response.json();
    return data.meals![0];
  },

  // List all categories
  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE}/categories.php`);
    const data: CategoriesResponse = await response.json();
    return data.categories;
  },

  // Filter by category
  getMealsByCategory: async (category: string): Promise<Meal[]> => {
    const response = await fetch(`${API_BASE}/filter.php?c=${category}`);
    const data: MealsResponse = await response.json();
    return data.meals || [];
  },

  // Filter by area
  getMealsByArea: async (area: string): Promise<Meal[]> => {
    const response = await fetch(`${API_BASE}/filter.php?a=${area}`);
    const data: MealsResponse = await response.json();
    return data.meals || [];
  },
};
