const yaml = require('js-yaml');
const fs = require('fs');

class YamlLoader {
    /**
     * Load YAML file
     *
     * @param {String} path
     *
     * @return {Object}
     */
    static loadYaml(path) {
        try {
          return yaml.safeLoad(fs.readFileSync(path, 'utf8'));
        } catch (e) {
          return null;
        }
    }

    /**
     * Parse an object into an array
     *
     * @param {Object} object
     * @param {String} attribute
     *
     * @return {Array}
     */
    static keyAsAttribute(object, attribute = 'name') {
        if (Array.isArray(object)) {
            return object;
        }

        return Object.keys(object).map(key => {
            const value = object[key];

            value[attribute] = key;

            return value;
        });
    }
}

module.exports = YamlLoader;
