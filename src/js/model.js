import { API_URL, DEFAULT_RESULTS_PER_PAGE } from './config';
import { getJSON } from './helper';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: DEFAULT_RESULTS_PER_PAGE,
    page: 1,
  },
};

export const loadRecipe = async function (id) {
  try {
    const url = `${API_URL}${id}`;
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
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    this.state.search.query = query;
    const { recipes } = await getJSON(`${API_URL}?search=${query}`);
    this.state.search.results = recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
    }));
    return;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page) {
  this.state.search.page = page;
  const start = (page - 1) * this.state.search.resultsPerPage;
  const end = page * this.state.search.resultsPerPage;
  return this.state.search.results.slice(start, end);
};
