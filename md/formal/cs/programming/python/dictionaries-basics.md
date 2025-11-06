{{yaml}}

{{title}}

# Dictionaries Basics

---

### Creating Dictionaries

```python
# create dict
person = {"name": "Alice", "age": 25}
empty = {}
scores = {"math": 90, "english": 85}
```

---

### Accessing Values

```python
# access by key
person = {"name": "Alice", "age": 25}
person["name"]
#ans: "Alice"
person["age"]
#ans: 25
```

---

### Get Method

```python
# get with default
person = {"name": "Alice"}
person.get("age")
#ans: None
person.get("age", 0)
#ans: 0
```

---

### Adding/Updating

```python
# add new key
person = {"name": "Alice"}
person["age"] = 25
#ans: {"name": "Alice", "age": 25}
#ans: update existing
person["age"] = 26
#ans: {"name": "Alice", "age": 26}
```

---

### Deleting Items

```python
# delete key
person = {"name": "Alice", "age": 25}
del person["age"]
#ans: {"name": "Alice"}
```

---

### Keys, Values, Items

```python
# get keys, values, items
person = {"name": "Alice", "age": 25}
person.keys()
#ans: dict_keys(['name', 'age'])
person.values()
#ans: dict_values(['Alice', 25])
person.items()
#ans: dict_items([('name', 'Alice'), ('age', 25)])
```

---

### Exercises - Part 1

```python
# what is the value?
d = {"a": 1, "b": 2}
d["a"]
#ans: 1
```

---

### Exercises - Part 2

```python
# key not found?
d = {"a": 1}
d["b"]
#ans: KeyError
```

---

### Exercises - Part 3

```python
# get vs brackets?
d = {"a": 1}
d.get("b")
#ans: None
d["b"]
#ans: KeyError
```

---

### Exercises - Part 4

```python
# adding new key?
d = {"a": 1}
d["b"] = 2
#ans: {"a": 1, "b": 2}
```

---

### Exercises - Part 5

```python
# updating value?
d = {"a": 1}
d["a"] = 10
#ans: {"a": 10}
```

---

### Exercises - Part 6

```python
# membership test?
d = {"a": 1, "b": 2}
"a" in d
#ans: True
1 in d
#ans: False (checks keys, not values)
```

---

### Exercises - Part 7

```python
# dict length?
d = {"a": 1, "b": 2, "c": 3}
len(d)
#ans: 3
```

---

### Exercises - Part 8

```python
# empty dict check?
d = {}
bool(d)
#ans: False
```

---

### Exercises - Part 9

```python
# nested dict?
d = {"user": {"name": "Alice", "age": 25}}
d["user"]["name"]
#ans: "Alice"
```

---

### Exercises - Part 10

```python
# dict from pairs?
pairs = [("a", 1), ("b", 2)]
d = dict(pairs)
#ans: {"a": 1, "b": 2}
```
