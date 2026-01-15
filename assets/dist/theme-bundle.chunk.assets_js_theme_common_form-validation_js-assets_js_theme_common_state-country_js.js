"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_common_form-validation_js-assets_js_theme_common_state-country_js"],{

/***/ "./assets/js/theme/common/form-validation.js"
/*!***************************************************!*\
  !*** ./assets/js/theme/common/form-validation.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_translations_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");


/**
 * Validate that the given date for the day/month/year select inputs is within potential range
 * @param $formField
 * @param validation
 * @returns {{selector: string, triggeredBy: string, validate: Function, errorMessage: string}}
 */
function buildDateValidation($formField, validation, requiredMessage) {
  // No date range restriction, skip
  if (validation.min_date && validation.max_date) {
    var invalidMessage = "Your chosen date must fall between " + validation.min_date + " and " + validation.max_date + ".";
    var formElementId = $formField.attr('id');
    var minSplit = validation.min_date.split('-');
    var maxSplit = validation.max_date.split('-');
    var minDate = new Date(minSplit[0], minSplit[1] - 1, minSplit[2]);
    var maxDate = new Date(maxSplit[0], maxSplit[1] - 1, maxSplit[2]);
    return {
      selector: "#" + formElementId + " select[data-label=\"year\"]",
      triggeredBy: "#" + formElementId + " select:not([data-label=\"year\"])",
      validate: function validate(cb, val) {
        var day = Number($formField.find('select[data-label="day"]').val());
        var month = Number($formField.find('select[data-label="month"]').val()) - 1;
        var year = Number(val);
        var chosenDate = new Date(year, month, day);
        cb(chosenDate >= minDate && chosenDate <= maxDate);
      },
      errorMessage: invalidMessage
    };
  }
  // Required Empty Date field
  if (validation.required && (!validation.min_date || !validation.max_date)) {
    var _formElementId = $formField.attr('id');
    return {
      selector: "#" + _formElementId + " select[data-label=\"year\"]",
      triggeredBy: "#" + _formElementId + " select:not([data-label=\"year\"])",
      validate: function validate(cb, val) {
        var day = $formField.find('select[data-label="day"]').val();
        var month = $formField.find('select[data-label="month"]').val();
        var year = val;
        cb(day && month && year);
      },
      errorMessage: requiredMessage
    };
  }
}

/**
 * We validate checkboxes separately from single input fields, as they must have at least one checked option
 * from many different inputs
 * @param $formField
 * @param validation
 * @param errorText provides error validation message
 */
function buildRequiredCheckboxValidation(validation, $formField, errorText) {
  var formFieldId = $formField.attr('id');
  var primarySelector = "#" + formFieldId + " input:first-of-type";
  var secondarySelector = "#" + formFieldId + " input";
  return {
    selector: primarySelector,
    triggeredBy: secondarySelector,
    validate: function validate(cb) {
      var result = false;
      $(secondarySelector).each(function (index, checkbox) {
        if (checkbox.checked) {
          result = true;
          return false;
        }
      });
      cb(result);
    },
    errorMessage: errorText
  };
}
function buildRequiredValidation(validation, selector, errorText) {
  return {
    selector: selector,
    validate: function validate(cb, val) {
      cb(val.length > 0);
    },
    errorMessage: errorText
  };
}
function buildNumberRangeValidation(validation, formFieldSelector) {
  var invalidMessage = "The value for " + validation.label + " must be between " + validation.min + " and " + validation.max + ".";
  var min = Number(validation.min);
  var max = Number(validation.max);
  return {
    selector: formFieldSelector + " input[name=\"" + validation.name + "\"]",
    validate: function validate(cb, val) {
      var numberVal = Number(val);
      cb(numberVal >= min && numberVal <= max);
    },
    errorMessage: invalidMessage
  };
}
function buildValidation($validateableElement, errorMessage) {
  var validation = $validateableElement.data('validation');
  var fieldValidations = [];
  var formFieldSelector = "#" + $validateableElement.attr('id');
  if (validation.type === 'datechooser') {
    var dateValidation = buildDateValidation($validateableElement, validation, errorMessage);
    if (dateValidation) {
      fieldValidations.push(dateValidation);
    }
  } else if (validation.required && (validation.type === 'checkboxselect' || validation.type === 'radioselect')) {
    fieldValidations.push(buildRequiredCheckboxValidation(validation, $validateableElement, errorMessage));
  } else {
    $validateableElement.find('input, select, textarea').each(function (index, element) {
      var $inputElement = $(element);
      var tagName = $inputElement.get(0).tagName;
      var inputName = $inputElement.attr('name');
      var elementSelector = formFieldSelector + " " + tagName + "[name=\"" + inputName + "\"]";
      if (validation.type === 'numberonly') {
        fieldValidations.push(buildNumberRangeValidation(validation, formFieldSelector));
      }
      if (validation.required) {
        fieldValidations.push(buildRequiredValidation(validation, elementSelector, errorMessage));
      }
    });
  }
  return fieldValidations;
}

/**
 * Builds the validation model for dynamic forms
 * @param $form
 * @param context provides access for error messages on required fields validation
 * @returns {Array}
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__($form, context) {
  var validationsToPerform = [];
  var _createTranslationDic = (0,_utils_translations_utils__WEBPACK_IMPORTED_MODULE_0__.createTranslationDictionary)(context),
    requiredFieldValidationText = _createTranslationDic.field_not_blank;
  $form.find('[data-validation]').each(function (index, input) {
    var getLabel = function getLabel($el) {
      return $el.first().data('validation').label;
    };
    var requiredValidationMessage = getLabel($(input)) + requiredFieldValidationText;
    validationsToPerform = validationsToPerform.concat(buildValidation($(input), requiredValidationMessage));
  });
  return validationsToPerform;
}

/***/ },

/***/ "./assets/js/theme/common/state-country.js"
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");






/**
 * Extracts attributes from a jQuery element into a plain object
 * @param {jQuery} element - The element to extract attributes from
 * @returns {Object} Plain object with attribute name-value pairs
 */
function getElementAttributes(element) {
  return lodash_transform__WEBPACK_IMPORTED_MODULE_1___default()(element.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
}

/**
 * Creates a select element for states when the country has states AND they are required
 * @param {jQuery} stateElement - The current state input element
 * @param {Object} context - Context object containing translated strings
 * @returns {jQuery} The new select element
 */
function makeStateSelectRequired(stateElement, context) {
  var attrs = getElementAttributes(stateElement);
  var replacementAttributes = Object.assign({}, attrs, {
    "class": 'form-select',
    'aria-required': 'true'
  });
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }
  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }
  return $newElement;
}

/**
 * Creates a select element for states when the country has states but they are NOT required
 * @param {jQuery} stateElement - The current state input element
 * @returns {jQuery} The new select element
 */
function makeStateSelectOptional(stateElement) {
  var attrs = getElementAttributes(stateElement);
  var replacementAttributes = Object.assign({}, attrs, {
    "class": 'form-select',
    'aria-required': 'false'
  });
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }

  // Hide the required indicator since state is optional
  $newElement.prev().find('small').hide();
  return $newElement;
}

/**
 * Creates a text input for states when the country has no states list
 * @param {jQuery} stateElement - The current state element
 * @returns {jQuery} The new text input element
 */
function makeStateTextOptional(stateElement) {
  var attrs = getElementAttributes(stateElement);
  var replacementAttributes = Object.assign({}, attrs, {
    type: 'text',
    "class": 'form-input'
  });
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  if ($newElement.length !== 0) {
    (0,_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.insertStateHiddenField)($newElement);
    $newElement.prev().find('small').hide();
  }
  return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */
function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");
  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()($selectElement)) {
    statesArray.states.forEach(function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + (stateObj.label ? stateObj.label : stateObj.name) + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}

/**
 * Makes the zip/postal code field required and shows the required indicator
 * @param {jQuery} $zipElement The zip/postal code field element
 * @param {Object} context The context object containing translated strings
 */
function makeZipRequired($zipElement, context) {
  $zipElement.prop('required', true);
  // since the attribute is set within templates/components/common/forms/*,
  // we explicitly set aria-required to ensure assistive technologies announce this field correctly after dynamic changes
  $zipElement.attr('aria-required', 'true');
  if ($zipElement.prev().find('small').length === 0) {
    $zipElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $zipElement.prev().find('small').show();
  }
}

/**
 * Makes the zip/postal code field optional and hides the required indicator
 *
 * DOM Structure Expectation:
 * The function assumes the following DOM structure:
 * <label>
 *   <span>Zip/Postal Code</span>
 *   <small>*</small> <!-- required indicator -->
 * </label>
 * <input data-field-type="Zip" />
 *
 * @param {jQuery} $zipElement The zip/postal code field element
 */
function makeZipOptional($zipElement) {
  $zipElement.prop('required', false);
  // since the attribute is set within templates/components/common/forms/*,
  // we explicitly set aria-required to ensure assistive technologies announce this field correctly after dynamic changes
  $zipElement.attr('aria-required', false);
  var $prevElement = $zipElement.prev();
  if ($prevElement.length > 0) {
    var $requiredIndicator = $prevElement.find('small');
    if ($requiredIndicator.length > 0) {
      $requiredIndicator.hide();
    }
  }
}

/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */
// eslint-disable-next-line default-param-last
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }
  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }
  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();
    if (countryName === '') {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_4__.showAlertModal)(context.state_error);
        return callback(err);
      }
      var $currentInput = $('[data-field-type="State"]');
      var $zipInput = $('[data-field-type="Zip"]');
      var hasStates = !lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(response.data.states);
      var requiresState = response.data.requiresSubdivision !== undefined ? response.data.requiresSubdivision : hasStates;
      var $newElement;
      if (hasStates) {
        if (requiresState) {
          $newElement = makeStateSelectRequired($currentInput, context);
        } else {
          $newElement = makeStateSelectOptional($currentInput);
        }
        addOptions(response.data, $newElement, options);
      } else {
        $newElement = makeStateTextOptional($currentInput);
      }
      if ($zipInput.length > 0) {
        // Default to true when requiresPostalCodes is undefined to maintain original behavior
        var requiresZip = response.data.requiresPostalCodes !== undefined ? response.data.requiresPostalCodes : true;
        if (requiresZip) {
          makeZipRequired($zipInput, context);
        } else {
          makeZipOptional($zipInput);
        }
      }
      callback(null, $newElement, requiresState);
    });
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jb21tb25fZm9ybS12YWxpZGF0aW9uX2pzLWFzc2V0c19qc190aGVtZV9jb21tb25fc3RhdGUtY291bnRyeV9qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBeUU7O0FBRXpFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNDLG1CQUFtQkEsQ0FBQ0MsVUFBVSxFQUFFQyxVQUFVLEVBQUVDLGVBQWUsRUFBRTtFQUNsRTtFQUNBLElBQUlELFVBQVUsQ0FBQ0UsUUFBUSxJQUFJRixVQUFVLENBQUNHLFFBQVEsRUFBRTtJQUM1QyxJQUFNQyxjQUFjLDJDQUF5Q0osVUFBVSxDQUFDRSxRQUFRLGFBQVFGLFVBQVUsQ0FBQ0csUUFBUSxNQUFHO0lBQzlHLElBQU1FLGFBQWEsR0FBR04sVUFBVSxDQUFDTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzNDLElBQU1DLFFBQVEsR0FBR1AsVUFBVSxDQUFDRSxRQUFRLENBQUNNLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDL0MsSUFBTUMsUUFBUSxHQUFHVCxVQUFVLENBQUNHLFFBQVEsQ0FBQ0ssS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUMvQyxJQUFNRSxPQUFPLEdBQUcsSUFBSUMsSUFBSSxDQUFDSixRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUVBLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUVBLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRSxJQUFNSyxPQUFPLEdBQUcsSUFBSUQsSUFBSSxDQUFDRixRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUVBLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUVBLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuRSxPQUFPO01BQ0hJLFFBQVEsUUFBTVIsYUFBYSxpQ0FBNEI7TUFDdkRTLFdBQVcsUUFBTVQsYUFBYSx1Q0FBa0M7TUFDaEVVLFFBQVEsRUFBRSxT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Q0FBQztBQUNWLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9mb3JtLXZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3N0YXRlLWNvdW50cnkuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5cbi8qKlxuICogVmFsaWRhdGUgdGhhdCB0aGUgZ2l2ZW4gZGF0ZSBmb3IgdGhlIGRheS9tb250aC95ZWFyIHNlbGVjdCBpbnB1dHMgaXMgd2l0aGluIHBvdGVudGlhbCByYW5nZVxuICogQHBhcmFtICRmb3JtRmllbGRcbiAqIEBwYXJhbSB2YWxpZGF0aW9uXG4gKiBAcmV0dXJucyB7e3NlbGVjdG9yOiBzdHJpbmcsIHRyaWdnZXJlZEJ5OiBzdHJpbmcsIHZhbGlkYXRlOiBGdW5jdGlvbiwgZXJyb3JNZXNzYWdlOiBzdHJpbmd9fVxuICovXG5mdW5jdGlvbiBidWlsZERhdGVWYWxpZGF0aW9uKCRmb3JtRmllbGQsIHZhbGlkYXRpb24sIHJlcXVpcmVkTWVzc2FnZSkge1xuICAgIC8vIE5vIGRhdGUgcmFuZ2UgcmVzdHJpY3Rpb24sIHNraXBcbiAgICBpZiAodmFsaWRhdGlvbi5taW5fZGF0ZSAmJiB2YWxpZGF0aW9uLm1heF9kYXRlKSB7XG4gICAgICAgIGNvbnN0IGludmFsaWRNZXNzYWdlID0gYFlvdXIgY2hvc2VuIGRhdGUgbXVzdCBmYWxsIGJldHdlZW4gJHt2YWxpZGF0aW9uLm1pbl9kYXRlfSBhbmQgJHt2YWxpZGF0aW9uLm1heF9kYXRlfS5gO1xuICAgICAgICBjb25zdCBmb3JtRWxlbWVudElkID0gJGZvcm1GaWVsZC5hdHRyKCdpZCcpO1xuICAgICAgICBjb25zdCBtaW5TcGxpdCA9IHZhbGlkYXRpb24ubWluX2RhdGUuc3BsaXQoJy0nKTtcbiAgICAgICAgY29uc3QgbWF4U3BsaXQgPSB2YWxpZGF0aW9uLm1heF9kYXRlLnNwbGl0KCctJyk7XG4gICAgICAgIGNvbnN0IG1pbkRhdGUgPSBuZXcgRGF0ZShtaW5TcGxpdFswXSwgbWluU3BsaXRbMV0gLSAxLCBtaW5TcGxpdFsyXSk7XG4gICAgICAgIGNvbnN0IG1heERhdGUgPSBuZXcgRGF0ZShtYXhTcGxpdFswXSwgbWF4U3BsaXRbMV0gLSAxLCBtYXhTcGxpdFsyXSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiBgIyR7Zm9ybUVsZW1lbnRJZH0gc2VsZWN0W2RhdGEtbGFiZWw9XCJ5ZWFyXCJdYCxcbiAgICAgICAgICAgIHRyaWdnZXJlZEJ5OiBgIyR7Zm9ybUVsZW1lbnRJZH0gc2VsZWN0Om5vdChbZGF0YS1sYWJlbD1cInllYXJcIl0pYCxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRheSA9IE51bWJlcigkZm9ybUZpZWxkLmZpbmQoJ3NlbGVjdFtkYXRhLWxhYmVsPVwiZGF5XCJdJykudmFsKCkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRoID0gTnVtYmVyKCRmb3JtRmllbGQuZmluZCgnc2VsZWN0W2RhdGEtbGFiZWw9XCJtb250aFwiXScpLnZhbCgpKSAtIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgeWVhciA9IE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNob3NlbkRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcblxuICAgICAgICAgICAgICAgIGNiKGNob3NlbkRhdGUgPj0gbWluRGF0ZSAmJiBjaG9zZW5EYXRlIDw9IG1heERhdGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogaW52YWxpZE1lc3NhZ2UsXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIFJlcXVpcmVkIEVtcHR5IERhdGUgZmllbGRcbiAgICBpZiAodmFsaWRhdGlvbi5yZXF1aXJlZCAmJiAoIXZhbGlkYXRpb24ubWluX2RhdGUgfHwgIXZhbGlkYXRpb24ubWF4X2RhdGUpKSB7XG4gICAgICAgIGNvbnN0IGZvcm1FbGVtZW50SWQgPSAkZm9ybUZpZWxkLmF0dHIoJ2lkJyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiBgIyR7Zm9ybUVsZW1lbnRJZH0gc2VsZWN0W2RhdGEtbGFiZWw9XCJ5ZWFyXCJdYCxcbiAgICAgICAgICAgIHRyaWdnZXJlZEJ5OiBgIyR7Zm9ybUVsZW1lbnRJZH0gc2VsZWN0Om5vdChbZGF0YS1sYWJlbD1cInllYXJcIl0pYCxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRheSA9ICRmb3JtRmllbGQuZmluZCgnc2VsZWN0W2RhdGEtbGFiZWw9XCJkYXlcIl0nKS52YWwoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb250aCA9ICRmb3JtRmllbGQuZmluZCgnc2VsZWN0W2RhdGEtbGFiZWw9XCJtb250aFwiXScpLnZhbCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHllYXIgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBjYihkYXkgJiYgbW9udGggJiYgeWVhcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiByZXF1aXJlZE1lc3NhZ2UsXG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vKipcbiAqIFdlIHZhbGlkYXRlIGNoZWNrYm94ZXMgc2VwYXJhdGVseSBmcm9tIHNpbmdsZSBpbnB1dCBmaWVsZHMsIGFzIHRoZXkgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBjaGVja2VkIG9wdGlvblxuICogZnJvbSBtYW55IGRpZmZlcmVudCBpbnB1dHNcbiAqIEBwYXJhbSAkZm9ybUZpZWxkXG4gKiBAcGFyYW0gdmFsaWRhdGlvblxuICogQHBhcmFtIGVycm9yVGV4dCBwcm92aWRlcyBlcnJvciB2YWxpZGF0aW9uIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gYnVpbGRSZXF1aXJlZENoZWNrYm94VmFsaWRhdGlvbih2YWxpZGF0aW9uLCAkZm9ybUZpZWxkLCBlcnJvclRleHQpIHtcbiAgICBjb25zdCBmb3JtRmllbGRJZCA9ICRmb3JtRmllbGQuYXR0cignaWQnKTtcbiAgICBjb25zdCBwcmltYXJ5U2VsZWN0b3IgPSBgIyR7Zm9ybUZpZWxkSWR9IGlucHV0OmZpcnN0LW9mLXR5cGVgO1xuICAgIGNvbnN0IHNlY29uZGFyeVNlbGVjdG9yID0gYCMke2Zvcm1GaWVsZElkfSBpbnB1dGA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RvcjogcHJpbWFyeVNlbGVjdG9yLFxuICAgICAgICB0cmlnZ2VyZWRCeTogc2Vjb25kYXJ5U2VsZWN0b3IsXG4gICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcblxuICAgICAgICAgICAgJChzZWNvbmRhcnlTZWxlY3RvcikuZWFjaCgoaW5kZXgsIGNoZWNrYm94KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yTWVzc2FnZTogZXJyb3JUZXh0LFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUmVxdWlyZWRWYWxpZGF0aW9uKHZhbGlkYXRpb24sIHNlbGVjdG9yLCBlcnJvclRleHQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgdmFsaWRhdGUoY2IsIHZhbCkge1xuICAgICAgICAgICAgY2IodmFsLmxlbmd0aCA+IDApO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvck1lc3NhZ2U6IGVycm9yVGV4dCxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBidWlsZE51bWJlclJhbmdlVmFsaWRhdGlvbih2YWxpZGF0aW9uLCBmb3JtRmllbGRTZWxlY3Rvcikge1xuICAgIGNvbnN0IGludmFsaWRNZXNzYWdlID0gYFRoZSB2YWx1ZSBmb3IgJHt2YWxpZGF0aW9uLmxhYmVsfSBtdXN0IGJlIGJldHdlZW4gJHt2YWxpZGF0aW9uLm1pbn0gYW5kICR7dmFsaWRhdGlvbi5tYXh9LmA7XG4gICAgY29uc3QgbWluID0gTnVtYmVyKHZhbGlkYXRpb24ubWluKTtcbiAgICBjb25zdCBtYXggPSBOdW1iZXIodmFsaWRhdGlvbi5tYXgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0b3I6IGAke2Zvcm1GaWVsZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiJHt2YWxpZGF0aW9uLm5hbWV9XCJdYCxcbiAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBudW1iZXJWYWwgPSBOdW1iZXIodmFsKTtcblxuICAgICAgICAgICAgY2IobnVtYmVyVmFsID49IG1pbiAmJiBudW1iZXJWYWwgPD0gbWF4KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBpbnZhbGlkTWVzc2FnZSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBidWlsZFZhbGlkYXRpb24oJHZhbGlkYXRlYWJsZUVsZW1lbnQsIGVycm9yTWVzc2FnZSkge1xuICAgIGNvbnN0IHZhbGlkYXRpb24gPSAkdmFsaWRhdGVhYmxlRWxlbWVudC5kYXRhKCd2YWxpZGF0aW9uJyk7XG4gICAgY29uc3QgZmllbGRWYWxpZGF0aW9ucyA9IFtdO1xuICAgIGNvbnN0IGZvcm1GaWVsZFNlbGVjdG9yID0gYCMkeyR2YWxpZGF0ZWFibGVFbGVtZW50LmF0dHIoJ2lkJyl9YDtcblxuICAgIGlmICh2YWxpZGF0aW9uLnR5cGUgPT09ICdkYXRlY2hvb3NlcicpIHtcbiAgICAgICAgY29uc3QgZGF0ZVZhbGlkYXRpb24gPSBidWlsZERhdGVWYWxpZGF0aW9uKCR2YWxpZGF0ZWFibGVFbGVtZW50LCB2YWxpZGF0aW9uLCBlcnJvck1lc3NhZ2UpO1xuXG4gICAgICAgIGlmIChkYXRlVmFsaWRhdGlvbikge1xuICAgICAgICAgICAgZmllbGRWYWxpZGF0aW9ucy5wdXNoKGRhdGVWYWxpZGF0aW9uKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvbi5yZXF1aXJlZCAmJiAodmFsaWRhdGlvbi50eXBlID09PSAnY2hlY2tib3hzZWxlY3QnIHx8IHZhbGlkYXRpb24udHlwZSA9PT0gJ3JhZGlvc2VsZWN0JykpIHtcbiAgICAgICAgZmllbGRWYWxpZGF0aW9ucy5wdXNoKGJ1aWxkUmVxdWlyZWRDaGVja2JveFZhbGlkYXRpb24odmFsaWRhdGlvbiwgJHZhbGlkYXRlYWJsZUVsZW1lbnQsIGVycm9yTWVzc2FnZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICR2YWxpZGF0ZWFibGVFbGVtZW50LmZpbmQoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRpbnB1dEVsZW1lbnQgPSAkKGVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3QgdGFnTmFtZSA9ICRpbnB1dEVsZW1lbnQuZ2V0KDApLnRhZ05hbWU7XG4gICAgICAgICAgICBjb25zdCBpbnB1dE5hbWUgPSAkaW5wdXRFbGVtZW50LmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRTZWxlY3RvciA9IGAke2Zvcm1GaWVsZFNlbGVjdG9yfSAke3RhZ05hbWV9W25hbWU9XCIke2lucHV0TmFtZX1cIl1gO1xuXG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvbi50eXBlID09PSAnbnVtYmVyb25seScpIHtcbiAgICAgICAgICAgICAgICBmaWVsZFZhbGlkYXRpb25zLnB1c2goYnVpbGROdW1iZXJSYW5nZVZhbGlkYXRpb24odmFsaWRhdGlvbiwgZm9ybUZpZWxkU2VsZWN0b3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgZmllbGRWYWxpZGF0aW9ucy5wdXNoKGJ1aWxkUmVxdWlyZWRWYWxpZGF0aW9uKHZhbGlkYXRpb24sIGVsZW1lbnRTZWxlY3RvciwgZXJyb3JNZXNzYWdlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBmaWVsZFZhbGlkYXRpb25zO1xufVxuXG4vKipcbiAqIEJ1aWxkcyB0aGUgdmFsaWRhdGlvbiBtb2RlbCBmb3IgZHluYW1pYyBmb3Jtc1xuICogQHBhcmFtICRmb3JtXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgZm9yIGVycm9yIG1lc3NhZ2VzIG9uIHJlcXVpcmVkIGZpZWxkcyB2YWxpZGF0aW9uXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgkZm9ybSwgY29udGV4dCkge1xuICAgIGxldCB2YWxpZGF0aW9uc1RvUGVyZm9ybSA9IFtdO1xuICAgIGNvbnN0IHsgZmllbGRfbm90X2JsYW5rOiByZXF1aXJlZEZpZWxkVmFsaWRhdGlvblRleHQgfSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcblxuICAgICRmb3JtLmZpbmQoJ1tkYXRhLXZhbGlkYXRpb25dJykuZWFjaCgoaW5kZXgsIGlucHV0KSA9PiB7XG4gICAgICAgIGNvbnN0IGdldExhYmVsID0gJGVsID0+ICRlbC5maXJzdCgpLmRhdGEoJ3ZhbGlkYXRpb24nKS5sYWJlbDtcbiAgICAgICAgY29uc3QgcmVxdWlyZWRWYWxpZGF0aW9uTWVzc2FnZSA9IGdldExhYmVsKCQoaW5wdXQpKSArIHJlcXVpcmVkRmllbGRWYWxpZGF0aW9uVGV4dDtcblxuICAgICAgICB2YWxpZGF0aW9uc1RvUGVyZm9ybSA9IHZhbGlkYXRpb25zVG9QZXJmb3JtLmNvbmNhdChidWlsZFZhbGlkYXRpb24oJChpbnB1dCksIHJlcXVpcmVkVmFsaWRhdGlvbk1lc3NhZ2UpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB2YWxpZGF0aW9uc1RvUGVyZm9ybTtcbn1cbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4uL2dsb2JhbC9tb2RhbCc7XG5cbi8qKlxuICogRXh0cmFjdHMgYXR0cmlidXRlcyBmcm9tIGEgalF1ZXJ5IGVsZW1lbnQgaW50byBhIHBsYWluIG9iamVjdFxuICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCB0byBleHRyYWN0IGF0dHJpYnV0ZXMgZnJvbVxuICogQHJldHVybnMge09iamVjdH0gUGxhaW4gb2JqZWN0IHdpdGggYXR0cmlidXRlIG5hbWUtdmFsdWUgcGFpcnNcbiAqL1xuZnVuY3Rpb24gZ2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCkge1xuICAgIHJldHVybiBfLnRyYW5zZm9ybShlbGVtZW50LnByb3AoJ2F0dHJpYnV0ZXMnKSwgKHJlc3VsdCwgaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCByZXQgPSByZXN1bHQ7XG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc2VsZWN0IGVsZW1lbnQgZm9yIHN0YXRlcyB3aGVuIHRoZSBjb3VudHJ5IGhhcyBzdGF0ZXMgQU5EIHRoZXkgYXJlIHJlcXVpcmVkXG4gKiBAcGFyYW0ge2pRdWVyeX0gc3RhdGVFbGVtZW50IC0gVGhlIGN1cnJlbnQgc3RhdGUgaW5wdXQgZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHQgLSBDb250ZXh0IG9iamVjdCBjb250YWluaW5nIHRyYW5zbGF0ZWQgc3RyaW5nc1xuICogQHJldHVybnMge2pRdWVyeX0gVGhlIG5ldyBzZWxlY3QgZWxlbWVudFxuICovXG5mdW5jdGlvbiBtYWtlU3RhdGVTZWxlY3RSZXF1aXJlZChzdGF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICBjb25zdCBhdHRycyA9IGdldEVsZW1lbnRBdHRyaWJ1dGVzKHN0YXRlRWxlbWVudCk7XG5cbiAgICBjb25zdCByZXBsYWNlbWVudEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIC4uLmF0dHJzLFxuICAgICAgICBjbGFzczogJ2Zvcm0tc2VsZWN0JyxcbiAgICAgICAgJ2FyaWEtcmVxdWlyZWQnOiAndHJ1ZScsXG4gICAgfTtcblxuICAgIHN0YXRlRWxlbWVudC5yZXBsYWNlV2l0aCgkKCc8c2VsZWN0Pjwvc2VsZWN0PicsIHJlcGxhY2VtZW50QXR0cmlidXRlcykpO1xuXG4gICAgY29uc3QgJG5ld0VsZW1lbnQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcbiAgICBjb25zdCAkaGlkZGVuSW5wdXQgPSAkKCdbbmFtZSo9XCJGb3JtRmllbGRJc1RleHRcIl0nKTtcblxuICAgIGlmICgkaGlkZGVuSW5wdXQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICRoaWRkZW5JbnB1dC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpZiAoJG5ld0VsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIFN0cmluZyBpcyBpbmplY3RlZCBmcm9tIGxvY2FsaXplclxuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuYXBwZW5kKGA8c21hbGw+JHtjb250ZXh0LnJlcXVpcmVkfTwvc21hbGw+YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykuc2hvdygpO1xuICAgIH1cblxuICAgIHJldHVybiAkbmV3RWxlbWVudDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc2VsZWN0IGVsZW1lbnQgZm9yIHN0YXRlcyB3aGVuIHRoZSBjb3VudHJ5IGhhcyBzdGF0ZXMgYnV0IHRoZXkgYXJlIE5PVCByZXF1aXJlZFxuICogQHBhcmFtIHtqUXVlcnl9IHN0YXRlRWxlbWVudCAtIFRoZSBjdXJyZW50IHN0YXRlIGlucHV0IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtqUXVlcnl9IFRoZSBuZXcgc2VsZWN0IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gbWFrZVN0YXRlU2VsZWN0T3B0aW9uYWwoc3RhdGVFbGVtZW50KSB7XG4gICAgY29uc3QgYXR0cnMgPSBnZXRFbGVtZW50QXR0cmlidXRlcyhzdGF0ZUVsZW1lbnQpO1xuXG4gICAgY29uc3QgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzID0ge1xuICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgY2xhc3M6ICdmb3JtLXNlbGVjdCcsXG4gICAgICAgICdhcmlhLXJlcXVpcmVkJzogJ2ZhbHNlJyxcbiAgICB9O1xuXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxzZWxlY3Q+PC9zZWxlY3Q+JywgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzKSk7XG5cbiAgICBjb25zdCAkbmV3RWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuICAgIGNvbnN0ICRoaWRkZW5JbnB1dCA9ICQoJ1tuYW1lKj1cIkZvcm1GaWVsZElzVGV4dFwiXScpO1xuXG4gICAgaWYgKCRoaWRkZW5JbnB1dC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgJGhpZGRlbklucHV0LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIC8vIEhpZGUgdGhlIHJlcXVpcmVkIGluZGljYXRvciBzaW5jZSBzdGF0ZSBpcyBvcHRpb25hbFxuICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmhpZGUoKTtcblxuICAgIHJldHVybiAkbmV3RWxlbWVudDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdGV4dCBpbnB1dCBmb3Igc3RhdGVzIHdoZW4gdGhlIGNvdW50cnkgaGFzIG5vIHN0YXRlcyBsaXN0XG4gKiBAcGFyYW0ge2pRdWVyeX0gc3RhdGVFbGVtZW50IC0gVGhlIGN1cnJlbnQgc3RhdGUgZWxlbWVudFxuICogQHJldHVybnMge2pRdWVyeX0gVGhlIG5ldyB0ZXh0IGlucHV0IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gbWFrZVN0YXRlVGV4dE9wdGlvbmFsKHN0YXRlRWxlbWVudCkge1xuICAgIGNvbnN0IGF0dHJzID0gZ2V0RWxlbWVudEF0dHJpYnV0ZXMoc3RhdGVFbGVtZW50KTtcblxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcbiAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgY2xhc3M6ICdmb3JtLWlucHV0JyxcbiAgICB9O1xuXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxpbnB1dCAvPicsIHJlcGxhY2VtZW50QXR0cmlidXRlcykpO1xuXG4gICAgY29uc3QgJG5ld0VsZW1lbnQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcblxuICAgIGlmICgkbmV3RWxlbWVudC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCgkbmV3RWxlbWVudCk7XG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmhpZGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogQWRkcyB0aGUgYXJyYXkgb2Ygb3B0aW9ucyBmcm9tIHRoZSByZW1vdGUgcmVxdWVzdCB0byB0aGUgbmV3bHkgY3JlYXRlZCBzZWxlY3QgYm94LlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlc0FycmF5XG4gKiBAcGFyYW0ge2pRdWVyeX0gJHNlbGVjdEVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGFkZE9wdGlvbnMoc3RhdGVzQXJyYXksICRzZWxlY3RFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gW107XG5cbiAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7c3RhdGVzQXJyYXkucHJlZml4fTwvb3B0aW9uPmApO1xuXG4gICAgaWYgKCFfLmlzRW1wdHkoJHNlbGVjdEVsZW1lbnQpKSB7XG4gICAgICAgIHN0YXRlc0FycmF5LnN0YXRlcy5mb3JFYWNoKChzdGF0ZU9iaikgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMudXNlSWRGb3JTdGF0ZXMpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIiR7c3RhdGVPYmouaWR9XCI+JHtzdGF0ZU9iai5uYW1lfTwvb3B0aW9uPmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIiR7c3RhdGVPYmoubmFtZX1cIj4ke3N0YXRlT2JqLmxhYmVsID8gc3RhdGVPYmoubGFiZWwgOiBzdGF0ZU9iai5uYW1lfTwvb3B0aW9uPmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2VsZWN0RWxlbWVudC5odG1sKGNvbnRhaW5lci5qb2luKCcgJykpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBNYWtlcyB0aGUgemlwL3Bvc3RhbCBjb2RlIGZpZWxkIHJlcXVpcmVkIGFuZCBzaG93cyB0aGUgcmVxdWlyZWQgaW5kaWNhdG9yXG4gKiBAcGFyYW0ge2pRdWVyeX0gJHppcEVsZW1lbnQgVGhlIHppcC9wb3N0YWwgY29kZSBmaWVsZCBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dCBUaGUgY29udGV4dCBvYmplY3QgY29udGFpbmluZyB0cmFuc2xhdGVkIHN0cmluZ3NcbiAqL1xuZnVuY3Rpb24gbWFrZVppcFJlcXVpcmVkKCR6aXBFbGVtZW50LCBjb250ZXh0KSB7XG4gICAgJHppcEVsZW1lbnQucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAvLyBzaW5jZSB0aGUgYXR0cmlidXRlIGlzIHNldCB3aXRoaW4gdGVtcGxhdGVzL2NvbXBvbmVudHMvY29tbW9uL2Zvcm1zLyosXG4gICAgLy8gd2UgZXhwbGljaXRseSBzZXQgYXJpYS1yZXF1aXJlZCB0byBlbnN1cmUgYXNzaXN0aXZlIHRlY2hub2xvZ2llcyBhbm5vdW5jZSB0aGlzIGZpZWxkIGNvcnJlY3RseSBhZnRlciBkeW5hbWljIGNoYW5nZXNcbiAgICAkemlwRWxlbWVudC5hdHRyKCdhcmlhLXJlcXVpcmVkJywgJ3RydWUnKTtcblxuICAgIGlmICgkemlwRWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJHppcEVsZW1lbnQucHJldigpLmFwcGVuZChgPHNtYWxsPiR7Y29udGV4dC5yZXF1aXJlZH08L3NtYWxsPmApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICR6aXBFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLnNob3coKTtcbiAgICB9XG59XG5cbi8qKlxuICogTWFrZXMgdGhlIHppcC9wb3N0YWwgY29kZSBmaWVsZCBvcHRpb25hbCBhbmQgaGlkZXMgdGhlIHJlcXVpcmVkIGluZGljYXRvclxuICpcbiAqIERPTSBTdHJ1Y3R1cmUgRXhwZWN0YXRpb246XG4gKiBUaGUgZnVuY3Rpb24gYXNzdW1lcyB0aGUgZm9sbG93aW5nIERPTSBzdHJ1Y3R1cmU6XG4gKiA8bGFiZWw+XG4gKiAgIDxzcGFuPlppcC9Qb3N0YWwgQ29kZTwvc3Bhbj5cbiAqICAgPHNtYWxsPio8L3NtYWxsPiA8IS0tIHJlcXVpcmVkIGluZGljYXRvciAtLT5cbiAqIDwvbGFiZWw+XG4gKiA8aW5wdXQgZGF0YS1maWVsZC10eXBlPVwiWmlwXCIgLz5cbiAqXG4gKiBAcGFyYW0ge2pRdWVyeX0gJHppcEVsZW1lbnQgVGhlIHppcC9wb3N0YWwgY29kZSBmaWVsZCBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIG1ha2VaaXBPcHRpb25hbCgkemlwRWxlbWVudCkge1xuICAgICR6aXBFbGVtZW50LnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgIC8vIHNpbmNlIHRoZSBhdHRyaWJ1dGUgaXMgc2V0IHdpdGhpbiB0ZW1wbGF0ZXMvY29tcG9uZW50cy9jb21tb24vZm9ybXMvKixcbiAgICAvLyB3ZSBleHBsaWNpdGx5IHNldCBhcmlhLXJlcXVpcmVkIHRvIGVuc3VyZSBhc3Npc3RpdmUgdGVjaG5vbG9naWVzIGFubm91bmNlIHRoaXMgZmllbGQgY29ycmVjdGx5IGFmdGVyIGR5bmFtaWMgY2hhbmdlc1xuICAgICR6aXBFbGVtZW50LmF0dHIoJ2FyaWEtcmVxdWlyZWQnLCBmYWxzZSk7XG5cbiAgICBjb25zdCAkcHJldkVsZW1lbnQgPSAkemlwRWxlbWVudC5wcmV2KCk7XG4gICAgaWYgKCRwcmV2RWxlbWVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0ICRyZXF1aXJlZEluZGljYXRvciA9ICRwcmV2RWxlbWVudC5maW5kKCdzbWFsbCcpO1xuICAgICAgICBpZiAoJHJlcXVpcmVkSW5kaWNhdG9yLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICRyZXF1aXJlZEluZGljYXRvci5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7alF1ZXJ5fSBzdGF0ZUVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlZmF1bHQtcGFyYW0tbGFzdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlRWxlbWVudCwgY29udGV4dCA9IHt9LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIC8qKlxuICAgICAqIEJhY2t3YXJkcyBjb21wYXRpYmxlIGZvciB0aHJlZSBwYXJhbWV0ZXJzIGluc3RlYWQgb2YgZm91clxuICAgICAqXG4gICAgICogQXZhaWxhYmxlIG9wdGlvbnM6XG4gICAgICpcbiAgICAgKiB1c2VJZEZvclN0YXRlcyB7Qm9vbH0gLSBHZW5lcmF0ZXMgc3RhdGVzIGRyb3Bkb3duIHVzaW5nIGlkIGZvciB2YWx1ZXMgaW5zdGVhZCBvZiBzdHJpbmdzXG4gICAgICovXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgfVxuXG4gICAgJCgnc2VsZWN0W2RhdGEtZmllbGQtdHlwZT1cIkNvdW50cnlcIl0nKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XG5cbiAgICAgICAgaWYgKGNvdW50cnlOYW1lID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYXBpLmNvdW50cnkuZ2V0QnlOYW1lKGNvdW50cnlOYW1lLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKGNvbnRleHQuc3RhdGVfZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkY3VycmVudElucHV0ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG4gICAgICAgICAgICBjb25zdCAkemlwSW5wdXQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiWmlwXCJdJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGhhc1N0YXRlcyA9ICFfLmlzRW1wdHkocmVzcG9uc2UuZGF0YS5zdGF0ZXMpO1xuICAgICAgICAgICAgY29uc3QgcmVxdWlyZXNTdGF0ZSA9IHJlc3BvbnNlLmRhdGEucmVxdWlyZXNTdWJkaXZpc2lvbiAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyByZXNwb25zZS5kYXRhLnJlcXVpcmVzU3ViZGl2aXNpb25cbiAgICAgICAgICAgICAgICA6IGhhc1N0YXRlcztcblxuICAgICAgICAgICAgbGV0ICRuZXdFbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAoaGFzU3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVzU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgJG5ld0VsZW1lbnQgPSBtYWtlU3RhdGVTZWxlY3RSZXF1aXJlZCgkY3VycmVudElucHV0LCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkbmV3RWxlbWVudCA9IG1ha2VTdGF0ZVNlbGVjdE9wdGlvbmFsKCRjdXJyZW50SW5wdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZGRPcHRpb25zKHJlc3BvbnNlLmRhdGEsICRuZXdFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJG5ld0VsZW1lbnQgPSBtYWtlU3RhdGVUZXh0T3B0aW9uYWwoJGN1cnJlbnRJbnB1dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkemlwSW5wdXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gdHJ1ZSB3aGVuIHJlcXVpcmVzUG9zdGFsQ29kZXMgaXMgdW5kZWZpbmVkIHRvIG1haW50YWluIG9yaWdpbmFsIGJlaGF2aW9yXG4gICAgICAgICAgICAgICAgY29uc3QgcmVxdWlyZXNaaXAgPSByZXNwb25zZS5kYXRhLnJlcXVpcmVzUG9zdGFsQ29kZXMgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA/IHJlc3BvbnNlLmRhdGEucmVxdWlyZXNQb3N0YWxDb2Rlc1xuICAgICAgICAgICAgICAgICAgICA6IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZXNaaXApIHtcbiAgICAgICAgICAgICAgICAgICAgbWFrZVppcFJlcXVpcmVkKCR6aXBJbnB1dCwgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWFrZVppcE9wdGlvbmFsKCR6aXBJbnB1dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCAkbmV3RWxlbWVudCwgcmVxdWlyZXNTdGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIl0sIm5hbWVzIjpbImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsImJ1aWxkRGF0ZVZhbGlkYXRpb24iLCIkZm9ybUZpZWxkIiwidmFsaWRhdGlvbiIsInJlcXVpcmVkTWVzc2FnZSIsIm1pbl9kYXRlIiwibWF4X2RhdGUiLCJpbnZhbGlkTWVzc2FnZSIsImZvcm1FbGVtZW50SWQiLCJhdHRyIiwibWluU3BsaXQiLCJzcGxpdCIsIm1heFNwbGl0IiwibWluRGF0ZSIsIkRhdGUiLCJtYXhEYXRlIiwic2VsZWN0b3IiLCJ0cmlnZ2VyZWRCeSIsInZhbGlkYXRlIiwiY2IiLCJ2YWwiLCJkYXkiLCJOdW1iZXIiLCJmaW5kIiwibW9udGgiLCJ5ZWFyIiwiY2hvc2VuRGF0ZSIsImVycm9yTWVzc2FnZSIsInJlcXVpcmVkIiwiYnVpbGRSZXF1aXJlZENoZWNrYm94VmFsaWRhdGlvbiIsImVycm9yVGV4dCIsImZvcm1GaWVsZElkIiwicHJpbWFyeVNlbGVjdG9yIiwic2Vjb25kYXJ5U2VsZWN0b3IiLCJyZXN1bHQiLCIkIiwiZWFjaCIsImluZGV4IiwiY2hlY2tib3giLCJjaGVja2VkIiwiYnVpbGRSZXF1aXJlZFZhbGlkYXRpb24iLCJsZW5ndGgiLCJidWlsZE51bWJlclJhbmdlVmFsaWRhdGlvbiIsImZvcm1GaWVsZFNlbGVjdG9yIiwibGFiZWwiLCJtaW4iLCJtYXgiLCJuYW1lIiwibnVtYmVyVmFsIiwiYnVpbGRWYWxpZGF0aW9uIiwiJHZhbGlkYXRlYWJsZUVsZW1lbnQiLCJkYXRhIiwiZmllbGRWYWxpZGF0aW9ucyIsInR5cGUiLCJkYXRlVmFsaWRhdGlvbiIsInB1c2giLCJlbGVtZW50IiwiJGlucHV0RWxlbWVudCIsInRhZ05hbWUiLCJnZXQiLCJpbnB1dE5hbWUiLCJlbGVtZW50U2VsZWN0b3IiLCIkZm9ybSIsImNvbnRleHQiLCJ2YWxpZGF0aW9uc1RvUGVyZm9ybSIsIl9jcmVhdGVUcmFuc2xhdGlvbkRpYyIsInJlcXVpcmVkRmllbGRWYWxpZGF0aW9uVGV4dCIsImZpZWxkX25vdF9ibGFuayIsImlucHV0IiwiZ2V0TGFiZWwiLCIkZWwiLCJmaXJzdCIsInJlcXVpcmVkVmFsaWRhdGlvbk1lc3NhZ2UiLCJjb25jYXQiLCJ1dGlscyIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCJzaG93QWxlcnRNb2RhbCIsImdldEVsZW1lbnRBdHRyaWJ1dGVzIiwiX3RyYW5zZm9ybSIsInByb3AiLCJpdGVtIiwicmV0IiwidmFsdWUiLCJtYWtlU3RhdGVTZWxlY3RSZXF1aXJlZCIsInN0YXRlRWxlbWVudCIsImF0dHJzIiwicmVwbGFjZW1lbnRBdHRyaWJ1dGVzIiwiT2JqZWN0IiwiYXNzaWduIiwicmVwbGFjZVdpdGgiLCIkbmV3RWxlbWVudCIsIiRoaWRkZW5JbnB1dCIsInJlbW92ZSIsInByZXYiLCJhcHBlbmQiLCJzaG93IiwibWFrZVN0YXRlU2VsZWN0T3B0aW9uYWwiLCJoaWRlIiwibWFrZVN0YXRlVGV4dE9wdGlvbmFsIiwiYWRkT3B0aW9ucyIsInN0YXRlc0FycmF5IiwiJHNlbGVjdEVsZW1lbnQiLCJvcHRpb25zIiwiY29udGFpbmVyIiwicHJlZml4IiwiX2lzRW1wdHkiLCJzdGF0ZXMiLCJmb3JFYWNoIiwic3RhdGVPYmoiLCJ1c2VJZEZvclN0YXRlcyIsImlkIiwiaHRtbCIsImpvaW4iLCJtYWtlWmlwUmVxdWlyZWQiLCIkemlwRWxlbWVudCIsIm1ha2VaaXBPcHRpb25hbCIsIiRwcmV2RWxlbWVudCIsIiRyZXF1aXJlZEluZGljYXRvciIsImNhbGxiYWNrIiwib24iLCJldmVudCIsImNvdW50cnlOYW1lIiwiY3VycmVudFRhcmdldCIsImFwaSIsImNvdW50cnkiLCJnZXRCeU5hbWUiLCJlcnIiLCJyZXNwb25zZSIsInN0YXRlX2Vycm9yIiwiJGN1cnJlbnRJbnB1dCIsIiR6aXBJbnB1dCIsImhhc1N0YXRlcyIsInJlcXVpcmVzU3RhdGUiLCJyZXF1aXJlc1N1YmRpdmlzaW9uIiwidW5kZWZpbmVkIiwicmVxdWlyZXNaaXAiLCJyZXF1aXJlc1Bvc3RhbENvZGVzIiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJhcmd1bWVudHMiLCJKU09OIiwicGFyc2UiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9