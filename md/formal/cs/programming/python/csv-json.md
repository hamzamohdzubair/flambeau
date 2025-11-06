{{yaml}}

{{title}}

# CSV & JSON

---

### CSV - Reading

```python
import csv
# read CSV
with open("data.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
#ans: row is a list
```

---

### CSV - DictReader

```python
import csv
# read with headers
with open("data.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["name"], row["age"])
```

---

### CSV - Writing

```python
import csv
# write CSV
data = [["Name", "Age"], ["Alice", 25]]
with open("out.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)
```

---

### JSON - Reading

```python
import json
# read JSON file
with open("data.json", "r") as file:
    data = json.load(file)
#ans: returns dict or list
```

---

### JSON - Writing

```python
import json
# write JSON file
data = {"name": "Alice", "age": 25}
with open("out.json", "w") as file:
    json.dump(data, file, indent=2)
```

---

### JSON - String Conversion

```python
import json
# to JSON string
data = {"name": "Alice"}
json_str = json.dumps(data)
#ans: '{"name": "Alice"}'
#ans: from JSON string
data = json.loads(json_str)
#ans: {"name": "Alice"}
```

---

### Exercises - Part 1

```python
import csv
# csv.reader returns?
with open("data.csv") as f:
    reader = csv.reader(f)
    row = next(reader)
#ans: row is a list
```

---

### Exercises - Part 2

```python
import csv
# DictReader first row?
#ans: first row is headers
```

---

### Exercises - Part 3

```python
import csv
# writerows vs writerow?
writer.writerows([[1,2],[3,4]])
#ans: writes 2 rows
writer.writerow([1,2])
#ans: writes 1 row
```

---

### Exercises - Part 4

```python
import json
# load vs loads?
json.load(file)  # from file
json.loads(string)  # from string
```

---

### Exercises - Part 5

```python
import json
# dump vs dumps?
json.dump(data, file)  # to file
json.dumps(data)  # to string
```

---

### Exercises - Part 6

```python
import json
# indent parameter?
json.dumps({"a": 1}, indent=2)
#ans: pretty-printed with 2 spaces
```

---

### Exercises - Part 7

```python
import json
# JSON with Python types?
json.dumps([1, "text", True, None])
#ans: '[1, "text", true, null]'
```

---

### Exercises - Part 8

```python
import csv
# newline="" why?
open("file.csv", "w", newline="")
#ans: prevents extra blank lines
```

---

### Exercises - Part 9

```python
import json
# can JSON handle tuples?
json.dumps((1, 2, 3))
#ans: "[1, 2, 3]" (becomes array)
```

---

### Exercises - Part 10

```python
import csv
# CSV delimiter?
csv.reader(file, delimiter=";")
#ans: use semicolon instead of comma
```
