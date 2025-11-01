---
theme: gaia2
paginate: true
transition: slide
class: lead
footer: '[<iconify-icon icon="hugeicons:home-11" title="Home"></iconify-icon>](/index.html) [<iconify-icon icon="si:left-up-line" title="Back"></iconify-icon>](../index.html) [<iconify-icon icon="octicon:move-to-start-24" title="Start"></iconify-icon>](#1)'
---
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
<link href="/styles/zoom.css" rel="stylesheet">

<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
<script src="/scripts/zoom.js"></script>
<script src="/scripts/navigation.js"></script>
<script src="/scripts/backbutton.js"></script>

### Glove Embeddings

<figure>
  <iframe src="https://nlp.stanford.edu/pubs/glove.pdf"></iframe>
  <figcaption><a href="https://nlp.stanford.edu/pubs/glove.pdf" target="_blank">https://nlp.stanford.edu/pubs/glove.pdf</a></figcaption>
</figure>

---

### Reading Embeddings

```python
import numpy as np
import gensim.downloader as api
# load 'glove-wiki-gigaword-50' pre-treained Embeddings
model = api.load('glove-wiki-gigaword-50')
# find the size of the model (no. of words / tokens)
len(model)
# get the embedding for any word
model['india']
model['king']
# meaningful relationships
vector1 = model['man'] + model['queen'] - model['king']
model.most_similar(vector1, topn=1)
vector2 = model['paris'] - model['france'] + model['india']

```
