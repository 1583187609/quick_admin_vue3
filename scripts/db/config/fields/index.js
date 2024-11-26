import baseFields from "./base.js";
import userFields from "./user.js";
import enumsFields from "./enums.js";
import dateFields from "./date.js";
import numberFields from "./number.js";
import stringFields from "./string.js";

/**
 * @param {Field} field
 */
export default {
  ...baseFields,
  ...userFields,
  ...enumsFields,
  ...dateFields,
  ...numberFields,
  ...stringFields,
};
