import View from "./view.js";
import previewView from "./previewView.js";
import icons from 'url:../../img/icons.svg'; 

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query ! Please try again💛';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {    
    //we need to return a string. Render method will render some markup, but we need to prevent that, because we just need a string. 
    //the line below will return a string. false in render returns the markap (string);
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
            <a class="preview__link ${result.id === id ? 'preview__link--active' : '' }" 
            href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title} ...</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>
    `;      
  }  
}

export default new ResultView ();