# 2.0.0

* Upgraded lodash to 4.17.11

### Breaking changes

The `.find()` function's parameters have changed

Before:

```
cities.find("zipcode", 07946")
```

After:

```
cities.find({
  zipcode: 07946
})
```
