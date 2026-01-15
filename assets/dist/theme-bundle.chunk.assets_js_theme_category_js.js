"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_category_js"],{

/***/ "./assets/js/theme/category.js"
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Category)
/* harmony export */ });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_product_color_swatches__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/product-color-swatches */ "./assets/js/theme/common/product-color-swatches.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }






var Category = /*#__PURE__*/function (_CatalogPage) {
  function Category(context) {
    var _this;
    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(context);
    return _this;
  }
  _inheritsLoose(Category, _CatalogPage);
  var _proto = Category.prototype;
  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      'aria-live': ariaLiveStatus
    });
  };
  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;
    if (!$('[data-shop-by-price]').length) return;
    if ($('.navList-action').hasClass('is-active')) {
      $('a.navList-action.is-active').trigger('focus');
    }
    $('a.navList-action').on('click', function () {
      return _this2.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive');
    });
  };
  _proto.onReady = function onReady() {
    var _this3 = this;
    this.arrangeFocusOnSortBy();
    $('[data-button-type="add-cart"]').on('click', function (e) {
      return _this3.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite');
    });
    this.makeShopByPriceFilterAccessible();
    (0,_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);

    // Initialize color swatches for category page
    (0,_common_product_color_swatches__WEBPACK_IMPORTED_MODULE_5__["default"])();
    this.initFacetedSearch();
    if (!$('#facetedSearch').length) {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__.hooks.on('sortBy-submitted', this.onSortBySubmit);

      // Refresh range view when shop-by-price enabled
      var urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('search_query')) {
        $('.reset-filters').show();
      }
      $('input[name="price_min"]').attr('value', urlParams.get('price_min'));
      $('input[name="price_max"]').attr('value', urlParams.get('price_max'));
    }
    $('a.reset-btn').on('click', function () {
      return _this3.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite');
    });
    this.ariaNotifyNoProducts();
  };
  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $('[data-no-products-notification]');
    if ($noProductsMessage.length) {
      $noProductsMessage.trigger('focus');
    }
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this$validationDicti = this.validationDictionary,
      onMinPriceError = _this$validationDicti.price_min_evaluation,
      onMaxPriceError = _this$validationDicti.price_max_evaluation,
      minPriceNotEntered = _this$validationDicti.price_min_not_entered,
      maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
      onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset');

      // Re-initialize color swatches after faceted search updates
      (0,_common_product_color_swatches__WEBPACK_IMPORTED_MODULE_5__["default"])();
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };
  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ },

/***/ "./assets/js/theme/common/product-color-swatches.js"
/*!**********************************************************!*\
  !*** ./assets/js/theme/common/product-color-swatches.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initColorSwatches)
/* harmony export */ });
function initColorSwatches() {
  /**
   * Initialize color swatch functionality on category/product listing pages
   * Uses Stencil util-api to fetch product details with color variants
   */

  var colorSwatchContainers = document.querySelectorAll('[data-product-id]');
  if (colorSwatchContainers.length === 0) {
    return;
  }
  colorSwatchContainers.forEach(function (container) {
    var productId = container.getAttribute('data-product-id');
    var swatchButtons = container.querySelectorAll('.color-swatch');
    swatchButtons.forEach(function (button) {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        var colorValue = button.getAttribute('data-color-value');

        // Remove active class from all swatches in this container
        swatchButtons.forEach(function (btn) {
          return btn.classList.remove('active');
        });

        // Add active class to clicked swatch
        button.classList.add('active');

        // Fetch product details with color filtering using Stencil util-api
        if (window.stencilUtils && window.stencilUtils.api) {
          var api = window.stencilUtils.api;

          // Get product details
          api.getPage("/api/v3/catalog/products/" + productId + "?include=options,variants", {
            config: {
              category: {
                products: {
                  limit: 1
                }
              }
            }
          }, function (err, response) {
            if (err) {
              console.error('Error fetching product details:', err);
              return;
            }

            // Filter variants by selected color
            var variants = response.data.variants || [];
            var matchingVariants = variants.filter(function (variant) {
              // Check if variant has the selected color
              return variant.option_values && variant.option_values.some(function (optVal) {
                return optVal.label && optVal.label.toLowerCase() === colorValue.toLowerCase();
              });
            });

            // Update UI with filtered variants or availability
            if (matchingVariants.length > 0) {
              var firstVariant = matchingVariants[0];
              updateProductInfo(container, firstVariant, colorValue);
            }
          });
        }
      });
    });
  });
}

/**
 * Update product information when a color swatch is selected
 * @param {HTMLElement} container - The product card container
 * @param {Object} variant - The variant data
 * @param {string} colorValue - The selected color value
 */
function updateProductInfo(container, variant, colorValue) {
  // Update variant availability message if needed
  var productCard = container.closest('.card');
  if (productCard) {
    // Add visual feedback that color has been selected
    var swatchContainer = productCard.querySelector('.product-color-swatches');
    if (swatchContainer) {
      swatchContainer.setAttribute('data-selected-color', colorValue);
    }

    // You can add additional UI updates here:
    // - Update pricing if it varies by variant
    // - Show/hide add to cart button based on availability
    // - Update product image to show the selected color variant
  }
}

/***/ },

/***/ "./assets/js/theme/common/utils/translations-utils.js"
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTranslationDictionary: () => (/* binding */ createTranslationDictionary)
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXRlZ29yeV9qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ2Y7QUFDb0I7QUFDSjtBQUM0QjtBQUNoQjtBQUFBLElBRTNDTSxRQUFRLDBCQUFBQyxZQUFBO0VBQ3pCLFNBQUFELFNBQVlFLE9BQU8sRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFDakJBLEtBQUEsR0FBQUYsWUFBQSxDQUFBRyxJQUFBLE9BQU1GLE9BQU8sQ0FBQztJQUNkQyxLQUFBLENBQUtFLG9CQUFvQixHQUFHUCw2RkFBMkIsQ0FBQ0ksT0FBTyxDQUFDO0lBQUMsT0FBQUMsS0FBQTtFQUNyRTtFQUFDRyxjQUFBLENBQUFOLFFBQUEsRUFBQUMsWUFBQTtFQUFBLElBQUFNLE1BQUEsR0FBQVAsUUFBQSxDQUFBUSxTQUFBO0VBQUFELE1BQUEsQ0FFREUsdUJBQXVCLEdBQXZCLFNBQUFBLHVCQUF1QkEsQ0FBQ0MsUUFBUSxFQUFFQyxRQUFRLEVBQUVDLGNBQWMsRUFBRTtJQUN4REYsUUFBUSxDQUFDRyxJQUFJLENBQUM7TUFDVkMsSUFBSSxFQUFFSCxRQUFRO01BQ2QsV0FBVyxFQUFFQztJQUNqQixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUFMLE1BQUEsQ0FFRFEsK0JBQStCLEdBQS9CLFNBQUFBLCtCQUErQkEsQ0FBQSxFQUFHO0lBQUEsSUFBQUMsTUFBQTtJQUM5QixJQUFJLENBQUNDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDQyxNQUFNLEVBQUU7SUFFdkMsSUFBSUQsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUNFLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtNQUM1Q0YsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUNHLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDcEQ7SUFFQUgsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUNJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7TUFBQSxPQUFNTCxN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SCxPQUFPLENBQTNDNkgsK0JBQStCO0VBQ25HLElBQU1DLGdCQUFnQixHQUFHVCxzQkFBc0IsQ0FBQ00sd0JBQXdCLEVBQUVDLGdDQUFnQyxFQUFFQywrQkFBK0IsQ0FBQztFQUM1SSxJQUFNRSxhQUFhLEdBQUdaLE1BQU0sQ0FBQ2EsTUFBTSxDQUFDRixnQkFBZ0IsQ0FBQ2QsWUFBWSxDQUFDLENBQUM7RUFDbkUsSUFBTWlCLGVBQWUsR0FBR2QsTUFBTSxDQUFDQyxJQUFJLENBQUNVLGdCQUFnQixDQUFDZCxZQUFZLENBQUMsQ0FBQyxDQUFDa0IsR0FBRyxDQUFDLFVBQUFDLEdBQUc7SUFBQSxPQUFJQSxHQUFHLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLENBQUM7RUFBQSxFQUFDO0VBRXBHLE9BQU9KLGVBQWUsQ0FBQ0ssTUFBTSxDQUFDLFVBQUNDLEdBQUcsRUFBRUosR0FBRyxFQUFFYixDQUFDLEVBQUs7SUFDM0NpQixHQUFHLENBQUNKLEdBQUcsQ0FBQyxHQUFHSixhQUFhLENBQUNULENBQUMsQ0FBQztJQUMzQixPQUFPaUIsR0FBRztFQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNWLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NhdGVnb3J5LmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9wcm9kdWN0LWNvbG9yLXN3YXRjaGVzLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJztcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cyc7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xuaW1wb3J0IGluaXRDb2xvclN3YXRjaGVzIGZyb20gJy4vY29tbW9uL3Byb2R1Y3QtY29sb3Itc3dhdGNoZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIENhdGFsb2dQYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuICAgIH1cblxuICAgIHNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCRlbGVtZW50LCByb2xlVHlwZSwgYXJpYUxpdmVTdGF0dXMpIHtcbiAgICAgICAgJGVsZW1lbnQuYXR0cih7XG4gICAgICAgICAgICByb2xlOiByb2xlVHlwZSxcbiAgICAgICAgICAgICdhcmlhLWxpdmUnOiBhcmlhTGl2ZVN0YXR1cyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpIHtcbiAgICAgICAgaWYgKCEkKCdbZGF0YS1zaG9wLWJ5LXByaWNlXScpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICgkKCcubmF2TGlzdC1hY3Rpb24nKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICQoJ2EubmF2TGlzdC1hY3Rpb24uaXMtYWN0aXZlJykudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2EubmF2TGlzdC1hY3Rpb24nKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCQoJ3NwYW4ucHJpY2UtZmlsdGVyLW1lc3NhZ2UnKSwgJ3N0YXR1cycsICdhc3NlcnRpdmUnKSk7XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgdGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpO1xuXG4gICAgICAgICQoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiYWRkLWNhcnRcIl0nKS5vbignY2xpY2snLCAoZSkgPT4gdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkKGUuY3VycmVudFRhcmdldCkubmV4dCgpLCAnc3RhdHVzJywgJ3BvbGl0ZScpKTtcblxuICAgICAgICB0aGlzLm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKTtcblxuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGNvbG9yIHN3YXRjaGVzIGZvciBjYXRlZ29yeSBwYWdlXG4gICAgICAgIGluaXRDb2xvclN3YXRjaGVzKCk7XG5cbiAgICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xuXG4gICAgICAgIGlmICghJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuXG4gICAgICAgICAgICAvLyBSZWZyZXNoIHJhbmdlIHZpZXcgd2hlbiBzaG9wLWJ5LXByaWNlIGVuYWJsZWRcbiAgICAgICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG5cbiAgICAgICAgICAgIGlmICh1cmxQYXJhbXMuaGFzKCdzZWFyY2hfcXVlcnknKSkge1xuICAgICAgICAgICAgICAgICQoJy5yZXNldC1maWx0ZXJzJykuc2hvdygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicHJpY2VfbWluXCJdJykuYXR0cigndmFsdWUnLCB1cmxQYXJhbXMuZ2V0KCdwcmljZV9taW4nKSk7XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicHJpY2VfbWF4XCJdJykuYXR0cigndmFsdWUnLCB1cmxQYXJhbXMuZ2V0KCdwcmljZV9tYXgnKSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdhLnJlc2V0LWJ0bicpLm9uKCdjbGljaycsICgpID0+IHRoaXMuc2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzKCQoJ3NwYW4ucmVzZXQtbWVzc2FnZScpLCAnc3RhdHVzJywgJ3BvbGl0ZScpKTtcblxuICAgICAgICB0aGlzLmFyaWFOb3RpZnlOb1Byb2R1Y3RzKCk7XG4gICAgfVxuXG4gICAgYXJpYU5vdGlmeU5vUHJvZHVjdHMoKSB7XG4gICAgICAgIGNvbnN0ICRub1Byb2R1Y3RzTWVzc2FnZSA9ICQoJ1tkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl0nKTtcbiAgICAgICAgaWYgKCRub1Byb2R1Y3RzTWVzc2FnZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICRub1Byb2R1Y3RzTWVzc2FnZS50cmlnZ2VyKCdmb2N1cycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHByaWNlX21pbl9ldmFsdWF0aW9uOiBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICBwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgcHJpY2VfbWluX25vdF9lbnRlcmVkOiBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBwcmljZV9tYXhfbm90X2VudGVyZWQ6IG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlLFxuICAgICAgICB9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeTtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzUGVyUGFnZTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAgICAgICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93TW9yZTogJ2NhdGVnb3J5L3Nob3ctbW9yZScsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdjb21wYXJlUmVzZXQnKTtcblxuICAgICAgICAgICAgLy8gUmUtaW5pdGlhbGl6ZSBjb2xvciBzd2F0Y2hlcyBhZnRlciBmYWNldGVkIHNlYXJjaCB1cGRhdGVzXG4gICAgICAgICAgICBpbml0Q29sb3JTd2F0Y2hlcygpO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgb25JbnZhbGlkUHJpY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0Q29sb3JTd2F0Y2hlcygpIHtcclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSBjb2xvciBzd2F0Y2ggZnVuY3Rpb25hbGl0eSBvbiBjYXRlZ29yeS9wcm9kdWN0IGxpc3RpbmcgcGFnZXNcclxuICAgICAqIFVzZXMgU3RlbmNpbCB1dGlsLWFwaSB0byBmZXRjaCBwcm9kdWN0IGRldGFpbHMgd2l0aCBjb2xvciB2YXJpYW50c1xyXG4gICAgICovXHJcbiAgICBcclxuICAgIGNvbnN0IGNvbG9yU3dhdGNoQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXByb2R1Y3QtaWRdJyk7XHJcbiAgICBcclxuICAgIGlmIChjb2xvclN3YXRjaENvbnRhaW5lcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb2xvclN3YXRjaENvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvZHVjdElkID0gY29udGFpbmVyLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWlkJyk7XHJcbiAgICAgICAgY29uc3Qgc3dhdGNoQnV0dG9ucyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuY29sb3Itc3dhdGNoJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3dhdGNoQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3JWYWx1ZSA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sb3ItdmFsdWUnKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIGFsbCBzd2F0Y2hlcyBpbiB0aGlzIGNvbnRhaW5lclxyXG4gICAgICAgICAgICAgICAgc3dhdGNoQnV0dG9ucy5mb3JFYWNoKChidG4pID0+IGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gY2xpY2tlZCBzd2F0Y2hcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gRmV0Y2ggcHJvZHVjdCBkZXRhaWxzIHdpdGggY29sb3IgZmlsdGVyaW5nIHVzaW5nIFN0ZW5jaWwgdXRpbC1hcGlcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuc3RlbmNpbFV0aWxzICYmIHdpbmRvdy5zdGVuY2lsVXRpbHMuYXBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXBpID0gd2luZG93LnN0ZW5jaWxVdGlscy5hcGk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHByb2R1Y3QgZGV0YWlsc1xyXG4gICAgICAgICAgICAgICAgICAgIGFwaS5nZXRQYWdlKGAvYXBpL3YzL2NhdGFsb2cvcHJvZHVjdHMvJHtwcm9kdWN0SWR9P2luY2x1ZGU9b3B0aW9ucyx2YXJpYW50c2AsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHByb2R1Y3QgZGV0YWlsczonLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgdmFyaWFudHMgYnkgc2VsZWN0ZWQgY29sb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFyaWFudHMgPSByZXNwb25zZS5kYXRhLnZhcmlhbnRzIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGluZ1ZhcmlhbnRzID0gdmFyaWFudHMuZmlsdGVyKCh2YXJpYW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB2YXJpYW50IGhhcyB0aGUgc2VsZWN0ZWQgY29sb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YXJpYW50Lm9wdGlvbl92YWx1ZXMgJiYgdmFyaWFudC5vcHRpb25fdmFsdWVzLnNvbWUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wdFZhbCkgPT4gb3B0VmFsLmxhYmVsICYmIG9wdFZhbC5sYWJlbC50b0xvd2VyQ2FzZSgpID09PSBjb2xvclZhbHVlLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIFVJIHdpdGggZmlsdGVyZWQgdmFyaWFudHMgb3IgYXZhaWxhYmlsaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGluZ1ZhcmlhbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0VmFyaWFudCA9IG1hdGNoaW5nVmFyaWFudHNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVQcm9kdWN0SW5mbyhjb250YWluZXIsIGZpcnN0VmFyaWFudCwgY29sb3JWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBwcm9kdWN0IGluZm9ybWF0aW9uIHdoZW4gYSBjb2xvciBzd2F0Y2ggaXMgc2VsZWN0ZWRcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGFpbmVyIC0gVGhlIHByb2R1Y3QgY2FyZCBjb250YWluZXJcclxuICogQHBhcmFtIHtPYmplY3R9IHZhcmlhbnQgLSBUaGUgdmFyaWFudCBkYXRhXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclZhbHVlIC0gVGhlIHNlbGVjdGVkIGNvbG9yIHZhbHVlXHJcbiAqL1xyXG5mdW5jdGlvbiB1cGRhdGVQcm9kdWN0SW5mbyhjb250YWluZXIsIHZhcmlhbnQsIGNvbG9yVmFsdWUpIHtcclxuICAgIC8vIFVwZGF0ZSB2YXJpYW50IGF2YWlsYWJpbGl0eSBtZXNzYWdlIGlmIG5lZWRlZFxyXG4gICAgY29uc3QgcHJvZHVjdENhcmQgPSBjb250YWluZXIuY2xvc2VzdCgnLmNhcmQnKTtcclxuICAgIFxyXG4gICAgaWYgKHByb2R1Y3RDYXJkKSB7XHJcbiAgICAgICAgLy8gQWRkIHZpc3VhbCBmZWVkYmFjayB0aGF0IGNvbG9yIGhhcyBiZWVuIHNlbGVjdGVkXHJcbiAgICAgICAgY29uc3Qgc3dhdGNoQ29udGFpbmVyID0gcHJvZHVjdENhcmQucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtY29sb3Itc3dhdGNoZXMnKTtcclxuICAgICAgICBpZiAoc3dhdGNoQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHN3YXRjaENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2VsZWN0ZWQtY29sb3InLCBjb2xvclZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gWW91IGNhbiBhZGQgYWRkaXRpb25hbCBVSSB1cGRhdGVzIGhlcmU6XHJcbiAgICAgICAgLy8gLSBVcGRhdGUgcHJpY2luZyBpZiBpdCB2YXJpZXMgYnkgdmFyaWFudFxyXG4gICAgICAgIC8vIC0gU2hvdy9oaWRlIGFkZCB0byBjYXJ0IGJ1dHRvbiBiYXNlZCBvbiBhdmFpbGFiaWxpdHlcclxuICAgICAgICAvLyAtIFVwZGF0ZSBwcm9kdWN0IGltYWdlIHRvIHNob3cgdGhlIHNlbGVjdGVkIGNvbG9yIHZhcmlhbnRcclxuICAgIH1cclxufVxyXG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwibmFtZXMiOlsiaG9va3MiLCJDYXRhbG9nUGFnZSIsImNvbXBhcmVQcm9kdWN0cyIsIkZhY2V0ZWRTZWFyY2giLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJpbml0Q29sb3JTd2F0Y2hlcyIsIkNhdGVnb3J5IiwiX0NhdGFsb2dQYWdlIiwiY29udGV4dCIsIl90aGlzIiwiY2FsbCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJzZXRMaXZlUmVnaW9uQXR0cmlidXRlcyIsIiRlbGVtZW50Iiwicm9sZVR5cGUiLCJhcmlhTGl2ZVN0YXR1cyIsImF0dHIiLCJyb2xlIiwibWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSIsIl90aGlzMiIsIiQiLCJsZW5ndGgiLCJoYXNDbGFzcyIsInRyaWdnZXIiLCJvbiIsIm9uUmVhZHkiLCJfdGhpczMiLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsImUiLCJjdXJyZW50VGFyZ2V0IiwibmV4dCIsImluaXRGYWNldGVkU2VhcmNoIiwib25Tb3J0QnlTdWJtaXQiLCJiaW5kIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJoYXMiLCJzaG93IiwiZ2V0Iiwic2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzIiwiYXJpYU5vdGlmeU5vUHJvZHVjdHMiLCIkbm9Qcm9kdWN0c01lc3NhZ2UiLCJfdGhpcyR2YWxpZGF0aW9uRGljdGkiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJwcm9kdWN0cyIsImxpbWl0IiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiaHRtbCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiZGVmYXVsdCIsImNvbG9yU3dhdGNoQ29udGFpbmVycyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJjb250YWluZXIiLCJwcm9kdWN0SWQiLCJnZXRBdHRyaWJ1dGUiLCJzd2F0Y2hCdXR0b25zIiwiYnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsInByZXZlbnREZWZhdWx0IiwiY29sb3JWYWx1ZSIsImJ0biIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInN0ZW5jaWxVdGlscyIsImFwaSIsImdldFBhZ2UiLCJlcnIiLCJyZXNwb25zZSIsImNvbnNvbGUiLCJlcnJvciIsInZhcmlhbnRzIiwiZGF0YSIsIm1hdGNoaW5nVmFyaWFudHMiLCJmaWx0ZXIiLCJ2YXJpYW50Iiwib3B0aW9uX3ZhbHVlcyIsInNvbWUiLCJvcHRWYWwiLCJsYWJlbCIsInRvTG93ZXJDYXNlIiwiZmlyc3RWYXJpYW50IiwidXBkYXRlUHJvZHVjdEluZm8iLCJwcm9kdWN0Q2FyZCIsImNsb3Nlc3QiLCJzd2F0Y2hDb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwic2V0QXR0cmlidXRlIiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJPYmplY3QiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJhcmd1bWVudHMiLCJKU09OIiwicGFyc2UiLCJ1bmRlZmluZWQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=