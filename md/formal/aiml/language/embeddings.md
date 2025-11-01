{{yaml}}

### Glove Embeddings

{{frame(https://nlp.stanford.edu/pubs/glove.pdf)}}

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
