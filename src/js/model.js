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
  bookmarks: [],
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

    this.state.recipe.bookmarked = this.state.bookmarks.some(
      bookmark => bookmark.id === id
    );
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
    this.state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const getSearchResultsPage = function (page) {
  this.state.search.page = page;
  const start = (page - 1) * this.state.search.resultsPerPage;
  const end = page * this.state.search.resultsPerPage;
  return this.state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  this.state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / this.state.recipe.servings;
  });
  this.state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  // Add bookmark
  this.state.bookmarks.push(recipe);

  //Mark current recipe as bookmark
  if (recipe.id === this.state.recipe.id) this.state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = this.state.bookmarks.findIndex(el => el.id === id);
  this.state.bookmarks.splice(index, 1);
  if (id === this.state.recipe.id) this.state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
