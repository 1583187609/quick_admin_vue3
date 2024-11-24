import baseFields from "./base.js";
import userFields from "./user.js";
import contentFields from "./content.js";
import dateFields from "./date.js";

/**
 * @param {Field} field
 */
export default {
  ...baseFields,
  ...dateFields,
  ...userFields,
  ...contentFields,
};
