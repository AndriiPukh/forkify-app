import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model';
import recipeView from './views/recipeView';
const recipeContainer = document.querySelector('.recipe');

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
    alert(err);
  }
};

['haschange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipe));
//////////////
