import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash;
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id.slice(1));
    const { recipe } = model.state;
    // 2) Rendering recipe

    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search
    await model.loadSearchResults(query);
    resultsView.render(model.state.search.results);
  } catch (err) {}
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
