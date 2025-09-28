---
marp: true
theme: default
paginate: false
---

<!-- _class: dashboard -->
<style scoped>
.dashboard-tiles {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  margin-top: 48px;
}
.tile-link {
  display: inline-block;
  width: 200px;
  height: 140px;
  background: #0078D7;
  border-radius: 14px;
  color: #fff !important;
  text-decoration: none;
  font-size: 22px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.30);
  transition: background 0.2s;
}
.tile-link:hover {
  background: #005a9e;
}
</style>

<div class="dashboard-tiles">
  <a class="tile-link" href="index.html">index</a>
  <a class="tile-link" href="35h/index.html">35h/index</a>
  <a class="tile-link" href="index1.html">MD TEST LINK</a>
  <a class="tile-link" href="35h/foundations.html">folder-html-link</a>
  <!-- add more tiles as needed -->
</div>
