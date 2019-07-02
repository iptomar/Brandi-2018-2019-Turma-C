const fs = require("fs");
const path = require("path");

exports.PUBLIC_DIR = path.dirname(require.main.filename) + path.sep + 'html' + path.sep;
exports.DATASHEET_IMAGES_FOLDER = path.dirname(require.main.filename) + path.sep + "datasheets_images";

exports.getAllImagesFromDatasheet = (id) => {
    let imgs = [];
    if (fs.existsSync(this.DATASHEET_IMAGES_FOLDER + path.sep + id)) {
        fs.readdirSync(this.DATASHEET_IMAGES_FOLDER + path.sep + id).forEach(file => {
            imgs.push(file);
        });
    }
    return imgs;
};

exports.getLastIdImage = (id) => {
    let lid = 0;
    if (fs.existsSync(this.DATASHEET_IMAGES_FOLDER + path.sep + id)) {
        fs.readdirSync(this.DATASHEET_IMAGES_FOLDER + path.sep + id).forEach(file => {
            let fid = parseInt(file.split('.').slice(0, -1).join('.'),10);
            if (lid < fid) lid = fid;
        });
    }
    return lid;
};

exports.getFirstImage = (id) => {
    let lid = -1;
    let f = "NaN";
    if (fs.existsSync(this.DATASHEET_IMAGES_FOLDER + path.sep + id)) {
        fs.readdirSync(this.DATASHEET_IMAGES_FOLDER + path.sep + id).forEach(file => {
            let fid = parseInt(file.split('.').slice(0, -1).join('.'), 10);
            if (lid > fid || lid === -1) {
                lid = fid;
                f = file;
            }
        });
    }
    return f;
};

/**
 * 
 * @param {any} field field that is not required
 * @returns {any} null if not set, or the field if it is set
 */
exports.notRequiredField = (field) => {
    return field == null ? null : field;
}
