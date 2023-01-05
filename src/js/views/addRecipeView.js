import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded';
    
    _windowE = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');  

    _btnOpenRecipe = document.querySelector('.nav__btn--add-recipe');
    _btnCloseRecipe = document.querySelector('.btn--close-modal');

    //we wont to execute the addHandlerShowWindow f(x) immediatly, as soon as the class is created. 
    //Since we don't need any f(x) in the controler, we will just create the constructor() and call the f(x)
    constructor(){  
        super(); //we need this because this class is an extention of View
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        this._windowE.classList.toggle('hidden');  
        this._overlay.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {
        this._btnOpenRecipe.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow() {        
        this._btnCloseRecipe.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            const dataArr = [... new FormData(this)];
            //FormData is an object, it will create an array out of the data from the form. the form should be inside the parentesis
            const data = Object.fromEntries(dataArr); //Converts array to Object            
            //since we will upload this data to web, we will make an API call, and it has to happen in the MODEL            
            handler(data); //the function that will be called in C will hava data as an argument
        })
    }    
/*
  why we need to bind .this ? If we don't do it - this will be undefined, because it will [point] to the element
  .this inside of a handler points to the element that the handler is assigned to
  so we will create another method, and use the bind method | that way the .this will point to the Object (AddRecipeView)
  and not the element 
  */  
}

export default new AddRecipeView(); 
// we need to import/export this function to the controler, not because we will call some method in the C, but because it has to be 
// called in order to be executed ! If we don't export/import it, this script will not be executed ! 
