// engine.js
module.exports = ({ marp }) =>
  marp.use(({ marpit }) => {
    const { highlighter } = marpit

    marpit.highlighter = function (code, lang, attrs) {
      const original = highlighter.call(this, code, lang, attrs)

      // Check if fragments are enabled for this code block
      // You can use a custom attribute like {fragment} or {fragments}
      const enableFragments = attrs.toString().includes('fragment')

      // if (!enableFragments) {
      // If fragments not enabled, return original rendering
      // return original
      // }

      // Split code into lines and add fragment attributes
      const listItems = original
        .split(/\n(?!$)/) // Don't split at the trailing newline
        .map((line, index) => {
          const fragmentIndex = index + 1
          return `<li data-marpit-fragment="${fragmentIndex}"><span>${line}</span></li>`
        })

      return `<ol>${listItems.join('')}</ol>`
    }
  })
