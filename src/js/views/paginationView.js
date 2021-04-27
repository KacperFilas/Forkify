import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupButtonForward(currPage);
    }

    //Last page
    if (currPage === numPages && numPages > 1)
      return this._generateMarkupButtonBack(currPage);
    //Other page
    if (currPage < numPages) {
      const buttons = [
        this._generateMarkupButtonBack(currPage),
        this._generateMarkupButtonForward(currPage),
      ];

      return buttons;
    }
    //Page 1, and no other pages
    return '';
  }
  _generateMarkupButtonForward(page) {
    // const currPage = this._data.page;
    return `
    <button data-goto ="${page + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
`;
  }

  _generateMarkupButtonBack(page) {
    // const currPage = this._data.page;
    return `
    <button data-goto ="${page - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page${page - 1}</span>
    </button>
`;
  }
}

export default new PaginationView();
