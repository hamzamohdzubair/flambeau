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

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NLV7GHEJDK"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NLV7GHEJDK');
</script>

<!-- _class: lead invert -->

# Data Structures

---

### Lists - Creation and Access

```python
# creating lists
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, True]
empty = []

# accessing elements
fruits[0]      # "apple"
fruits[-1]     # "cherry" (last element)
fruits[1:3]    # ["banana", "cherry"]

# length
len(fruits)    # 3
```

---

### Lists - Modification

```python
# modifying elements
fruits = ["apple", "banana", "cherry"]
fruits[1] = "blueberry"

# adding elements
fruits.append("date")                # add to end
fruits.insert(1, "apricot")          # insert at index
fruits.extend(["fig", "grape"])      # add multiple

# removing elements
fruits.remove("apple")               # remove by value
popped = fruits.pop()                # remove and return last
popped = fruits.pop(0)               # remove at index
del fruits[1]                        # delete at index
fruits.clear()                       # remove all
```

---

### Lists - Operations

```python
# concatenation
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list1 + list2             # [1, 2, 3, 4, 5, 6]

# repetition
repeated = [0] * 5                   # [0, 0, 0, 0, 0]

# membership
"apple" in fruits                    # True
"mango" not in fruits                # True

# sorting
numbers = [3, 1, 4, 1, 5]
numbers.sort()                       # sort in place
sorted_nums = sorted(numbers)        # return sorted copy
numbers.sort(reverse=True)           # descending

# reversing
numbers.reverse()                    # reverse in place
reversed_nums = numbers[::-1]        # return reversed copy
```

---

### Lists - Methods

```python
numbers = [1, 2, 3, 2, 4, 2, 5]

# count occurrences
numbers.count(2)                     # 3

# find index
numbers.index(3)                     # 2
numbers.index(2, 2)                  # start search from index 2

# copy
new_list = numbers.copy()
new_list = numbers[:]                # alternative

# min, max, sum
min(numbers)                         # 1
max(numbers)                         # 5
sum(numbers)                         # 21
```

---

### Tuples

```python
# creating tuples
point = (3, 5)
rgb = (255, 128, 0)
single = (42,)                       # single element tuple
empty = ()

# unpacking
x, y = point
r, g, b = rgb

# accessing (like lists)
point[0]                             # 3
rgb[-1]                              # 0

# tuples are immutable
# point[0] = 5                       # Error!

# operations
tuple1 = (1, 2)
tuple2 = (3, 4)
combined = tuple1 + tuple2           # (1, 2, 3, 4)
repeated = tuple1 * 3                # (1, 2, 1, 2, 1, 2)

# methods
numbers = (1, 2, 3, 2, 4)
numbers.count(2)                     # 2
numbers.index(3)                     # 2
```

---

### Dictionaries - Creation and Access

```python
# creating dictionaries
person = {"name": "Alice", "age": 25, "city": "NYC"}
empty = {}
from_keys = dict.fromkeys(["a", "b"], 0)  # {'a': 0, 'b': 0}

# accessing values
person["name"]                       # "Alice"
person.get("age")                    # 25
person.get("country", "Unknown")     # "Unknown" (default)

# keys and values
person.keys()                        # dict_keys(['name', 'age', 'city'])
person.values()                      # dict_values(['Alice', 25, 'NYC'])
person.items()                       # dict_items([...])
```

---

### Dictionaries - Modification

```python
person = {"name": "Alice", "age": 25}

# adding/updating
person["city"] = "NYC"               # add new key
person["age"] = 26                   # update existing
person.update({"country": "USA", "age": 27})

# removing
del person["city"]                   # delete key
age = person.pop("age")              # remove and return
last = person.popitem()              # remove and return last item
person.clear()                       # remove all

# setdefault
person.setdefault("age", 0)          # returns value or sets default
```

---

### Dictionaries - Operations

```python
# membership (checks keys)
"name" in person                     # True
"salary" not in person               # True

# length
len(person)                          # number of keys

# copying
new_dict = person.copy()

# merging (Python 3.9+)
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
merged = dict1 | dict2

# nested dictionaries
users = {
    "user1": {"name": "Alice", "age": 25},
    "user2": {"name": "Bob", "age": 30}
}
users["user1"]["name"]               # "Alice"
```

---

### Sets - Creation and Operations

```python
# creating sets
fruits = {"apple", "banana", "cherry"}
numbers = {1, 2, 3, 4, 5}
empty = set()                        # NOT {}

# from list (removes duplicates)
numbers = set([1, 2, 2, 3, 3, 3])   # {1, 2, 3}

# adding and removing
fruits.add("date")
fruits.remove("apple")               # raises error if not found
fruits.discard("mango")              # no error if not found
popped = fruits.pop()                # remove arbitrary element
fruits.clear()

# membership
"apple" in fruits                    # True
```

---

### Sets - Set Operations

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# union
a | b                                # {1, 2, 3, 4, 5, 6}
a.union(b)

# intersection
a & b                                # {3, 4}
a.intersection(b)

# difference
a - b                                # {1, 2}
a.difference(b)

# symmetric difference
a ^ b                                # {1, 2, 5, 6}
a.symmetric_difference(b)

# subset and superset
{1, 2}.issubset({1, 2, 3})          # True
{1, 2, 3}.issuperset({1, 2})        # True

# disjoint
{1, 2}.isdisjoint({3, 4})           # True
```

---

### Frozen Sets

```python
# immutable sets
fs = frozenset([1, 2, 3])

# can be used as dict keys
lookup = {
    frozenset([1, 2]): "A",
    frozenset([3, 4]): "B"
}

# set operations work
fs1 = frozenset([1, 2, 3])
fs2 = frozenset([2, 3, 4])
fs1 | fs2                            # frozenset({1, 2, 3, 4})

# but cannot modify
# fs.add(4)                          # Error!
```
