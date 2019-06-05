
/**
 * 
 * @param {any} field field that is not required
 * @returns {any} null if not set, or the field if it is set
 */
exports.notRequiredField = (field) => {
    return field == null ? null : field;
}