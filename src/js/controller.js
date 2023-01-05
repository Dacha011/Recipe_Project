//MAIN MODULE, this one is linked in the HTML <script> tag
import { MODAL_CLOSE_SEC, RES_PER_PAGE } from './config.js';

import * as model from './model.js';    

import recipeView from './views/recipeView.js' //default import, so only a class we be imported
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';


//type in the termina:  npm i core-js  and npm i regenerator-runtime. Those packages will help older browsers understand your new code.
//the will be visible in package.json - dependencies

import 'regenerator-runtime/runtime'; //polifiling async/await
import 'core-js/stable'; //polifiling everithing else

_btnNext = document.querySelector('.btn--next');
_btnPrev = document.querySelector('.btn--prev');
_btnRemove = document.querySelector('.btn--remove');

if (module.hot) {  //this is a parcel thing. When we save the code, it will not reload the page !
  module.hot.accept();
}


const controlRecipes = async function() { //when we click on a recipe URL
  try {        
    const id = window.location.hash.slice(1); //grab the hash from the address bar
    if(!id) return;  //guard clause, if no id - leave the function        
    recipeView.renderSpinner();     
    bookmarksView.render(model.state.bookmarks); 
    // 1 Loading Recipe; loadRecipe is an async function, and since async f(x) are always returning promises 
    // we need to await that promise !     
    await model.loadRecipe(id); // model.state is updated    

    // 2 Rendering Recipe    
    recipeView.render(model.state.recipe);    

    // update the colors of the buttons! feed the updateButtons function with the position if the clicked recipe !
    updateButtons(currentRecipePosition());
    removeBtnDisplay();
        
  } catch (err) {
    recipeView.renderError();
  }  
}

const controlSearchResult = async function () { //when we type a word in the search form
  try {

    resultsView.renderSpinner();    
    const query = searchView.getQuery();
    if(!query) return;    
    
    //get data    
    await model.loadSearchResults(query); //will update the model.state    

    //Render results
    resultsView.render(model.getSearchResultsPage()); //no arg, default page is 1          
    
    //Render pagination buttons
    paginationView.render(model.state.search);

    //hide 3 buttons when we do a new search
    const buttons = document.querySelectorAll('.btn--mldn');
    buttons.forEach(bt => bt.style.display = 'none');    
    
    //updateButtons(currentRecipePosition());

  } catch (err) {}
};

const controlPagination = function (goToPage) {
  //1.render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage)); 

  //2. Render NEW pagination buttons [next-prev]
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  //1. update the recipe servings (in state)  
  model.updateServings(newServings);
  //recipeView.render(model.state.recipe);
  
  //2. update the recipe view
  recipeView.update(model.state.recipe); //it will only update text and attributes in the DOM
  
}

const controlBookmark = function() {
  //1) Add or remove bookmark. If the .bookmarked property does not exist -add call addBookmark
  if (!model.state.recipe.bookmarked) { 
    model.addBookmark(model.state.recipe); 
  } else {                           
    // if the bookmared property exist - call deleteBookmark
    model.deleteBookmark(model.state.recipe.id)     
  }  

  //update recipes
  recipeView.update(model.state.recipe);  //render the bookmark button
  //render bookmarks
  bookmarksView.render(model.state.bookmarks); //render the bookmarks under the bookmark element
} 

const controlBookmarksInitialRender = function() {
  bookmarksView.render(model.state.bookmarks);
}
//---- MLADEN 👇--------

const controlBtnNext = async function() { 
  
  // 1. find the position of the current recipe 
  const currentPosition = currentRecipePosition();
  
  //2. get the ID of the next recipe 
  const newRecipe = model.state.search.results[currentPosition + 1];   
  if(!newRecipe) return; //guard clause, unneessary, since the next button will be disabled when the last recipe in the array is displayed
  
  //3. jump to the next pagination page, render both the list of receipts, as well as the pagination buttons
  jumpToNext();  

  //4. load the next recipe ID, change the state
  await model.loadRecipe(newRecipe.id);
  //5. render it
  recipeView.render(model.state.recipe);  
  
  //6. change or disable the element  
  updateButtons(currentPosition + 1);
}

const controlBtnPrev = async function() { 
  
  const currentPosition = currentRecipePosition();
  
  //1. get the id of the prev recipe
  const newRecipe = model.state.search.results[currentPosition - 1];     
  if(!newRecipe) return; //guard clause, unneessary, since the prev button will be disabled when the first recipe in the array is displayed

  //1.1 if we are on the last recipe on a page, it will render 2 things - the pagination buttons, and the results list !
  jumpToPrev();

  //2. load the next recipe ID, change the state
  await model.loadRecipe(newRecipe.id);
  //3. render it
  recipeView.render(model.state.recipe);  
  //4. enable /disable btn  
  updateButtons(currentPosition - 1); 
}

function updateButtons(currentPosition) {  
  //console.log('model.state.search.results.length: ', model.state.search.results.length);
  
  //if there isn't a single recipe, hide the buttons
  if (!model.state.search.results.length === 0){
    this._btnNext.style.display = 'none'    
    this._btnPrev.style.display = 'none'    
    return;
  } else {
    this._btnNext.style.display = 'block'    
    this._btnPrev.style.display = 'block'    
  }               
  
  //if only ONE recipe
  if(model.state.search.results.length === 1){
    console.log('Only 1 recipe in the list');
    _btnPrev.classList.add('disabled');
    _btnNext.classList.add('disabled');
    _btnNext.disabled = true;
    _btnPrev.disabled = true;
    return;
  }    
  
  if (currentPosition === 0) { //if FIRST
    _btnPrev.disabled = true; //disable button ! 
    _btnPrev.classList.add('disabled');    
    _btnNext.disabled = false;
    _btnNext.classList.remove('disabled');
  } else if ( currentPosition === model.state.search.results.length-1 ) { //if LAST
    _btnNext.disabled = true;
    _btnNext.classList.add('disabled');
    _btnPrev.disabled = false;
    _btnPrev.classList.remove('disabled');
  } else {
    _btnPrev.disabled = false;
    _btnNext.disabled = false;
    _btnNext.classList.remove('disabled')
    _btnPrev.classList.remove('disabled')
  }
}

const controlBtnRemove = async function() {     
  
  //If only one recipe is left
  if (model.state.search.results.length === 1) {      
    model.state.search.results = []; //empty list
    
    recipeView.renderError(`No more recipes, please search for another recipe`);
    resultsView.renderError(` You've deleted all recipes ❌`);        
    
    //hide all buttons
    const arr = [this._btnPrev, this._btnNext, this._btnRemove]; 
    arr.forEach(it => it.style.display = 'none' );    
    return;
  } 

  const currentPosition = currentRecipePosition();      

  if (currentPosition === model.state.search.results.length - 1) {  //if current recipe is the last recipe
    const prevRecipeID = model.state.search.results[currentPosition - 1].id;  //find prev recipe ID    
    await model.loadRecipe(prevRecipeID);  //load the prev recipe
  } else { 
    const prevRecipeID = model.state.search.results[currentPosition + 1].id;  //otherwise find next recipe ID    
    await model.loadRecipe(prevRecipeID);      
  }
  
  // delete the removed recipe from the state
  model.state.search.results.splice(currentPosition, 1);

  // find the current recipe index, and the current page
  const currentRecipeIndex = model.state.search.results.findIndex(el => el.id === model.state.recipe.id);
  const currentPage = Math.floor(currentRecipeIndex / RES_PER_PAGE) + 1; 
  // Why did I add 1 to the current Page ? So that the first page will be page number 1. More details is jumpToPrev/Next methods
  
  resultsView.render(model.getSearchResultsPage(currentPage));
  recipeView.render(model.state.recipe); //render both the recipe and the results 

  updateButtons(currentRecipePosition()); // update buttons
}

const jumpToPrev = function () {
  const currentRecipeIndex = model.state.search.results.findIndex(el => el.id === model.state.recipe.id);
  const currentPage = Math.floor(currentRecipeIndex / RES_PER_PAGE) + 1; //we added ONE. Our first page is page 1. 
  
  // check if current recipe is first. I'm sure there are other, more elegant solutions
  if (RES_PER_PAGE * currentPage - currentRecipeIndex === RES_PER_PAGE) {         
      resultsView.render(model.getSearchResultsPage(currentPage - 1));
      paginationView.render(model.state.search);    
  }
};

const jumpToNext = function () {
  const currentRecipeIndex = model.state.search.results.findIndex(el => el.id === model.state.recipe.id);
  const currentPage = Math.floor(currentRecipeIndex / RES_PER_PAGE) + 1; //we added ONE. Our first page is page 1. 

  if (RES_PER_PAGE * currentPage - currentRecipeIndex === 1) {  //if last on page     
      resultsView.render(model.getSearchResultsPage(currentPage + 1));
      paginationView.render(model.state.search);    
  }
};

function removeBtnDisplay(){
  if (!model.state.search.results.length === 0){
    this._btnRemove.style.display = 'none'            
  } else {    
    this._btnRemove.style.display = 'block'    
  }    
}

const currentRecipePosition = function () {
  const num = model.state.search.results.findIndex(item => item.id === model.state.recipe.id);
  return num;
  //console.log(`recipePosition: `,num, model.state.recipe.title);
}
//-----MLADEN 👆-------

const controlAddRecipe = async function (newRecipe) {
  //model.uploadRecipe is async !
  try {
    //upload the recipe data
    recipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    //render recipe
    recipeView.render(model.state.recipe);

    //Success message
    addRecipeView.renderMessage();

    //render bookmark view, so the uploaded recipe will be shown in the bookmark list (it's already bookmarked)
    bookmarksView.render(model.state.bookmarks);

    //Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(`🧡`, err);
    addRecipeView.renderError(err.message);
  }
};

const init = function() { 
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult); 
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);  
  paginationView.addHandlerClick(controlPagination);    
  bookmarksView.addHandlerRenderBro(controlBookmarksInitialRender);
  addRecipeView.addHandlerUpload(controlAddRecipe);  
  //--
  recipeView.addHandlerBtnNext(controlBtnNext);
  recipeView.addHandlerBtnPrev(controlBtnPrev);
  recipeView.addHandlerBtnRemove(controlBtnRemove);
  recipeView.addLeftArrow(controlBtnPrev);
  recipeView.addRightArrow(controlBtnNext);
  recipeView.addDeleteKey(controlBtnRemove);
}

init();