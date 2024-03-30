/* eslint-disable no-unused-expressions */
import Rules from "./Rules";
import Regex from "./Regex"

const validator = (value, validations) => {
  let validationResult = [];

  for (const validator of validations) {
    if (validator.value === Rules.requiredValue) {
      value.trim().length === 0 && validationResult.push(false);
    }

    if (validator.value === Rules.minValue) {
      value.trim().length < validator.min && validationResult.push(false);
    }

    if (validator.value === Rules.maxValue) {
      value.trim().length > validator.max && validationResult.push(false);
    }

    if (validator.value === Rules.emailValue) {
      !Regex.testEmail(value) && validationResult.push(false);
    }
}

if (validationResult.length) {
    return false;
  } else {
    return true;
  }

};
export default validator;
