import baseFields from "./base.js";
import userFields from "./user.js";
import dateFields from "./date.js";
import enumsFields from "./date.js";
import numberFields from "./date.js";
import stringFields from "./string.js";

/**
 * @param {Field} field
 */
export default {
  ...baseFields,
  ...enumsFields,
  ...dateFields,
  ...userFields,
  ...numberFields,
  ...stringFields,
};
