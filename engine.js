const { Marpit } = require('@marp-team/marpit')
const markdownItImplicitFigures = require('markdown-it-implicit-figures')

// Create Marpit instance with the plugin
// module.exports = ({ marpit }) => {
// const marpit = new Marpit()
//   .use(markdownItImplicitFigures, {
//     figcaption: 'alt',  // Use alt text as figcaption
//     dataType: true,     // Add data-type="image" attribute
//     lazyLoading: true   // Add loading="lazy" attribute
//   })
// }

module.exports = new Marpit()

