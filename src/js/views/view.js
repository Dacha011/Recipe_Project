import icons from 'url:../../img/icons.svg';
import fracty from "fracty";

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data Takes an Object, or an array of objects
   * @returns {undefined} This function returns nothing
   * @author Dacha_B
   */

  render(data) {    
    //0. data - is model.state.recipe - an array with recipe info
    if (!data || (Array.isArray(data) && data.length === 0)) {      //*** BUT IF WE PASS AN OBJECT, IT WON'T RENDER THE ERROR. WHY ? */
      return this.renderError();
    }

    //store the input argument (data) in the class property _data
    this._data = data;         
    const markup = this._generateMarkup();            
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    //console.log(data);
    // this is Jonas way, but it's not efficient, the purpose is just to show the principles
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.log(`NOT FOUND 🔥! `);
      return this.renderError();
    }
    
    this._data = data;
    const newMarkup = this._generateMarkup(); 
    //we will cr8 a new markup, compare it with the regular, and change the diffrent parts
    //We will create a virtual DOM, compare it with the regular DOM, and spot the differences.
    //The virtual DOM lives in memory, it won't be displayed
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*')); //select all elements from the newDOM (virtual DOM)
    const currentElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((elem, idx) => {
      const curEl = currentElements[idx];
      //update TEXT
      if (
        !elem.isEqualNode(curEl) && elem.firstChild?.nodeValue.trim() !== ''
      ) {
        //console.log(curEl, elem); //parent elements will also be displayed if their children are not identical
        curEl.textContent = elem.textContent;
        //we need to find a method that determines if the nodeValue is just text
        // nodeValue - if the node is just text - it returns the text. In many other cases it will return null ()
        //firstChild - the text will be there
      }
      //update ATTRIBUTES - (WTF, idk what's happening)
      if (!elem.isEqualNode(curEl)) {
        Array.from(elem.attributes).forEach(attr =>curEl.setAttribute(attr.name, attr.value));
      }
    });    
    //Array.from - to convert an iterable(NodeList) to a regular Array
  }
  
  clear() {
    //private method
    this._parentElement.innerHTML = '';
  }

  _generateMarkupIngredients(ing) {
    //we need a long HTML string, each ing should be turned into a string
    //map returns a new arr, but elements will be returned strings
    //we join all those strings
    return `    
        <li class="recipe__ingredient">
        <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
            ing.quantity ? fracty(ing.quantity).toString() : ''
            } </div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>
    `;
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
    </div>
    `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  renderError(message = this._errorMessage) {
    // if no args, default is #errorMessage
    const markap = `
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
    </div>
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markap);
  }

  renderMessage() {
    const markap = `
    <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markap);
  }
}
