//import icons
import View from './view.js';
import icons from 'url:../../img/icons.svg';


class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = `Could not find the recipe.\n Please try again 🌹 `;

  _generateMarkup() {
    //fill the markup below with the _data from the class
    return `       
    <figure class="recipe__fig">
    <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
    </figure>
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons" >
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings - 1
          }">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings + 1
          }">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

    <!--  <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div> -->

      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
        </svg>
      </button>
    </div>


    <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

    ${this._data.ingredients
      .map(this._generateMarkupIngredients)
      .join(``)}      

      </ul>
    </div>
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">
        ${this._data.publisher}
          </span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceURL}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;
  }

  addHandlerRender(handler) {
    //handler is the subscriber function that will be called after the addHandlerRender publishies (when it gets triggered)
    const triggerArr = ['hashchange', 'load'];
    triggerArr.forEach(trig => window.addEventListener(trig, handler));
  }

  addHandlerUpdateServings(handler) {
    document.querySelector('.recipe').addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings'); //matching strategy !
      if (!btn) return;

      const updateTo = Number(btn.dataset.updateTo); //data-update-to => dataset.updateTo | update-to becomes cammelCase
      if (updateTo < 1) return; //don't go below 1
      handler(updateTo);
    });
  }

  addHandlerBookmark(handler) {
    //the button does not exist, so we must wait for the page to render | Event delegation
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  addHandlerBtnPrev(handler) {
    document.querySelector('.btn--prev').addEventListener('click', function () {
      handler();
    });
  }

  addHandlerBtnNext(handler) {
    document.querySelector('.btn--next').addEventListener('click', function () {
      handler();
    });
  }

  addHandlerBtnRemove(handler) {
    document
      .querySelector('.btn--remove')
      .addEventListener('click', function () {
        handler();
      });
  }

  addRightArrow(handler) {
    document.addEventListener('keydown',function (e) {
      if (e.keyCode === 39) handler();
    });
  }

  addLeftArrow(handler) {
    document.addEventListener('keydown',function (e) {
      if (e.keyCode === 37) handler();
    });
  }
  
  addDeleteKey(handler) {
    document.addEventListener('keydown',function (e) {
      if (e.keyCode === 46) handler();
    });
  }
}

//we will create the recipeView object, and then export the finished object,
//instead of exporting the class, and making instanciating the object at controller.js

export default new RecipeView(); //this way the only think that can be accessed from outside is this object. Nothing else will be exported.
