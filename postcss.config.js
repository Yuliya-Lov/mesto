const autoPrefixer = require('autoprefixer');
const cssnano = require('cssnano');


module.exports = {
    plugins: [
        autoPrefixer,
    cssnano({ preset: 'default' })
    ]
}
