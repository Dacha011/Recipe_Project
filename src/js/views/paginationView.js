import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      e.preventDefault();
      const target = e.target.closest('.btn--inline'); //event delegation, we will catch the element
      if (!target) return;
      const goToPage = Number(target.dataset.goto); //we need take the value from the data-goto="" attribute of the button
      handler(goToPage); //this handler has an argument!
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page; //current page
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); //total number of pages to display

    //Page 1, there are other pages | add only the NEXT button
    if (currentPage === 1 && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--next" data-goto="${
          currentPage + 1
        }">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
    }

    //Last page | add only the PREV button
    if (currentPage === numPages && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto="${
          currentPage - 1
        }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left">$</use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
        `;
    }
    //Other page, add both NEXT and PREV
    if (currentPage < numPages) {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto="${
          currentPage - 1
        }">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left">$</use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>

        <button class="btn--inline pagination__btn--next" data-goto="${
          currentPage + 1
        }">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
    }
    //Page 1, only page [if none of the above scenarios are true]
    return ``;
  }
}
export default new PaginationView();
