# Vue Double Select Component

[![npm](https://img.shields.io/npm/v/vue-double-select.svg)](https://www.npmjs.com/package/vue-double-select)

A MultiSelect with two lists for Vue.js, searchable, action buttons.

## Demo

See [demo](http://viniciussvl.github.io/vue-double-select/example).

## Install via npm

```bash
npm install vue-double-select --save
```

## Import and use

Import for global usage
```javascript
import Vue from 'vue'
import DoubleSelect from 'vue-double-select'

Vue.use(DoubleSelect)
...
```

Or on a single component
```javascript
import DoubleSelect from 'vue-double-select'
...
},
components: { DoubleSelect }
...
```

## Props

| Name                    | Type             | Default         | Description                                                              |
|-------------------------|------------------|-----------------|--------------------------------------------------------------------------|
| items                    | Array           | | Array of items to select                                               |
| selectedItems           | Array |              | Array of selected items  |
| valueField           | String | value             | Value field |
| textField           | String | text             | Text field |
| searchable           | Boolean | false             | If enabled, it will display search fields for lists. |
| searchablePlaceholder | String | Search | Placeholder of inputs search

## Events

| Name                   | Description                                                              |
|------------------------|--------------------------------------------------------------------------|
|                |                                          |

## How to use


After you have installed the package and imported it, call the component's html and pass its properties.

```html
<double-select 
  :items="arrayOfItems"
  :searchable="true"
  text-field="name"
  value-field="id"
></double-select>
```


