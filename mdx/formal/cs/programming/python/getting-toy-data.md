---
theme: gaia2
paginate: true
transition: slide
class: lead
footer: '[<i class="fa-regular fa-house"></i>](/index.html) [<i class="fa-regular fa-circle-up"></i>](../index.html) [<i class="fa-regular fa-circle-left"></i>](#1)'
---

<link href="/styles/czoom3.css" rel="stylesheet">

<script src="/scripts/czoom3.js"></script>

### sklearn (16)

```python
import sklearn
dataset = sklearn.datasets.load_iris(as_frame=True)
df = dataset.frame
```

<div class="cc">

<span data-marpit-fragment>

- `load_iris()`
- `load_diabetes()`
- `load_digits()`
- `load_linnerud()`
- `load_wine()`
- `load_breast_cancer()`

</span>

<span data-marpit-fragment>

- `fetch_olivetti_faces()`
- `fetch_20newgroups()`
- `fetch_california_housing()`
- `fetch_lfw_people()`
- `fetch_kddcup99()`

</span>
</div>

---

### seaborn (22)

```python
import seaborn
seaborn.get_dataset_names()
df = seaborn.get_dataset('titanic')
```

---

### UCI (100+)

```bash
pip install ucimlrepo
```

```python
import ucimlrepo as uci
uci.list_available_datasets()
dataset = uci.fetch_ucirepo(id=45)
df = dataset.data.original
```

---

### openml (24k+)

```bash
pip install openml
```

```python
import openml
dataset = openml.datasets.get_dataset(61)
X, y , categoical, names = dataset.get_data()
```
