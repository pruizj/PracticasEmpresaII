const cardValidator = require("card-validator");

export const validationCard = (
  cardNumber,
  expiryDate,
  securityCode
): boolean => {
  // Validate the card number
  const cardNumberValidation = cardValidator.number(cardNumber);
  if (!cardNumberValidation.isValid) {
    return false;
  }

  // Validate expiry date
  const expiryDateValidation = cardValidator.expirationDate(expiryDate);
  if (!expiryDateValidation.isValid) {
    return false;
  }

  // Validate the security code
  const securityCodeValidation = cardValidator.cvv(securityCode);
  if (!securityCodeValidation.isValid) {
    return false;
  }

  // If all validations are correct, returns success.
  return true;
};
