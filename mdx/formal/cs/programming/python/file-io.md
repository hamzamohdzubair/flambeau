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

# File I/O

---

### Reading Files - Basics

```python
# read entire file
file = open("data.txt", "r")
content = file.read()
file.close()

# read with context manager (recommended)
with open("data.txt", "r") as file:
    content = file.read()

# read line by line
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())

# read all lines into list
with open("data.txt", "r") as file:
    lines = file.readlines()
```

---

### Reading Files - Methods

```python
# read() - read entire file or n characters
with open("data.txt", "r") as file:
    content = file.read()        # all content
    content = file.read(10)      # first 10 characters

# readline() - read one line
with open("data.txt", "r") as file:
    line1 = file.readline()
    line2 = file.readline()

# readlines() - read all lines
with open("data.txt", "r") as file:
    lines = file.readlines()     # list of lines

# iterate (memory efficient)
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())
```

---

### Writing Files

```python
# write (overwrites file)
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("Second line\n")

# write multiple lines
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]
with open("output.txt", "w") as file:
    file.writelines(lines)

# append (adds to existing file)
with open("output.txt", "a") as file:
    file.write("Appended line\n")

# write doesn't add newline automatically
with open("output.txt", "w") as file:
    file.write("No newline here")
    file.write("This is on the same line")
```

---

### File Modes

```python
# read modes
open("file.txt", "r")      # read (default)
open("file.txt", "rb")     # read binary

# write modes
open("file.txt", "w")      # write (overwrites)
open("file.txt", "wb")     # write binary

# append modes
open("file.txt", "a")      # append
open("file.txt", "ab")     # append binary

# read and write
open("file.txt", "r+")     # read and write
open("file.txt", "w+")     # write and read (overwrites)
open("file.txt", "a+")     # append and read

# exclusive creation
open("file.txt", "x")      # create (fails if exists)
```

---

### File Position

```python
with open("data.txt", "r") as file:
    # get current position
    pos = file.tell()

    # read some data
    data = file.read(10)

    # get new position
    pos = file.tell()

    # move to beginning
    file.seek(0)

    # move to specific position
    file.seek(10)

    # move relative to current position
    file.seek(5, 1)

    # move relative to end
    file.seek(-10, 2)
```

---

### Binary Files

```python
# write binary
data = bytes([65, 66, 67, 68])  # ABCD
with open("data.bin", "wb") as file:
    file.write(data)

# read binary
with open("data.bin", "rb") as file:
    data = file.read()
    print(data)                  # b'ABCD'

# copy binary file
with open("image.png", "rb") as src:
    with open("copy.png", "wb") as dst:
        dst.write(src.read())

# read binary in chunks
with open("large.bin", "rb") as file:
    while True:
        chunk = file.read(1024)   # 1KB chunks
        if not chunk:
            break
        process(chunk)
```

---

### Working with Paths

```python
import os

# check if file exists
os.path.exists("file.txt")
os.path.isfile("file.txt")
os.path.isdir("folder")

# get file info
os.path.getsize("file.txt")        # size in bytes
os.path.getmtime("file.txt")       # modification time
os.path.getctime("file.txt")       # creation time

# path operations
os.path.join("folder", "file.txt")
os.path.dirname("/path/to/file.txt")
os.path.basename("/path/to/file.txt")
os.path.splitext("file.txt")       # ('file', '.txt')

# absolute path
os.path.abspath("file.txt")
os.path.realpath("symlink.txt")
```

---

### pathlib Module

```python
from pathlib import Path

# create path object
path = Path("data.txt")
path = Path("/home/user/data.txt")

# check existence
path.exists()
path.is_file()
path.is_dir()

# read and write
text = path.read_text()
path.write_text("Hello, World!")
data = path.read_bytes()
path.write_bytes(b"binary data")

# path operations
path.name                          # "data.txt"
path.stem                          # "data"
path.suffix                        # ".txt"
path.parent                        # parent directory
path.absolute()                    # absolute path
```

---

### Directory Operations

```python
import os

# list directory
files = os.listdir(".")
files = os.listdir("/path/to/dir")

# create directory
os.mkdir("new_folder")
os.makedirs("path/to/folder")      # create intermediate dirs

# remove directory
os.rmdir("folder")                 # only if empty
import shutil
shutil.rmtree("folder")            # remove with contents

# rename/move
os.rename("old.txt", "new.txt")
shutil.move("file.txt", "folder/")

# delete file
os.remove("file.txt")
os.unlink("file.txt")              # same as remove
```

---

### Working with CSV

```python
import csv

# read CSV
with open("data.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)                 # row is a list

# read CSV with headers
with open("data.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["name"], row["age"])

# write CSV
data = [["Name", "Age"], ["Alice", 25], ["Bob", 30]]
with open("output.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)

# write CSV with DictWriter
with open("output.csv", "w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "age"])
    writer.writeheader()
    writer.writerow({"name": "Alice", "age": 25})
```

---

### Working with JSON

```python
import json

# write JSON
data = {"name": "Alice", "age": 25, "city": "NYC"}
with open("data.json", "w") as file:
    json.dump(data, file)
    # or with indentation
    json.dump(data, file, indent=2)

# read JSON
with open("data.json", "r") as file:
    data = json.load(file)

# convert to/from JSON string
json_string = json.dumps(data, indent=2)
data = json.loads(json_string)

# custom encoding
import datetime
class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.date):
            return obj.isoformat()
        return super().default(obj)
```

---

### Temporary Files

```python
import tempfile

# temporary file
with tempfile.TemporaryFile(mode="w+") as temp:
    temp.write("temporary data")
    temp.seek(0)
    data = temp.read()
# file is deleted after with block

# named temporary file
with tempfile.NamedTemporaryFile(delete=False) as temp:
    temp.write(b"data")
    temp_path = temp.name

# temporary directory
with tempfile.TemporaryDirectory() as temp_dir:
    file_path = os.path.join(temp_dir, "file.txt")
    # work with files in temp_dir
# directory is deleted after with block
```
