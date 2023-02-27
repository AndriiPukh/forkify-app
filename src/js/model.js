import { API_URL } from './config';
import { getJSON } from './helper';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const url = `${API_URL}${id}`;
    console.log(url, 'url');
    const data = await getJSON(url);
    const { recipe } = data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.sourceUrl,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(err);
  }
};
