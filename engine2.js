// engine.js
module.exports = ({ marp }) =>
  marp.use(({ marpit }) => {
    const { highlighter } = marpit

    // Custom code block highlighting with answer detection
    marpit.highlighter = function (code, lang, attrs) {
      const original = highlighter.call(this, code, lang, attrs)

      // Split code into lines and add fragment attributes
      const listItems = original
        .split(/\n(?!$)/) // Don't split at the trailing newline
        .map((line, index) => {
          const fragmentIndex = index + 1

          // Detect answer lines in code
          const isAnswerLine = line.includes('#ans:')
          const dataAttrs = isAnswerLine ? ' data-answer="true"' : ''
          return `<li data-marpit-fragment="${fragmentIndex}"${dataAttrs}><span>${line}</span></li>`
        })

      return `<ol>${listItems.join('')}</ol>`
    }

    // Add markdown-it plugin to add fragments and detect ans: in regular list items
    marpit.markdown.core.ruler.push('list_fragments_and_answers', (state) => {
      const tokens = state.tokens
      let listItemCounter = 0
      let inBulletList = false

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]

        // Track when we enter/exit bullet lists
        if (token.type === 'bullet_list_open') {
          inBulletList = true
          listItemCounter = 0
        } else if (token.type === 'bullet_list_close') {
          inBulletList = false
        }

        // Process list items in bullet lists
        if (token.type === 'list_item_open' && inBulletList) {
          listItemCounter++

          // Add fragment attribute to ALL list items
          if (!token.attrGet('data-marpit-fragment')) {
            token.attrSet('data-marpit-fragment', String(listItemCounter))
          }

          // Look ahead to find the inline content and check for ans:
          for (let j = i + 1; j < tokens.length && tokens[j].type !== 'list_item_close'; j++) {
            if (tokens[j].type === 'inline' && tokens[j].content) {
              // Check if content starts with 'ans:'
              if (tokens[j].content.trim().startsWith('ans:')) {
                // Add data-answer attribute to the list item
                if (!token.attrGet('data-answer')) {
                  token.attrSet('data-answer', 'true')
                }
              }
              break
            }
          }
        }
      }

      return true
    })
  })
