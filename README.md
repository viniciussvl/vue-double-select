# Vue Double Select Component

[![npm](https://img.shields.io/npm/v/vue-double-select.svg)](https://www.npmjs.com/package/vue-double-select)

A MultiSelect with two lists for Vue.js, searchable, sorting and action buttons.

![vue-double-select](https://i.imgur.com/g1mSkm7.png)

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
| sorteable | Boolean | false | Sort array by property name
| orderBy | String | id | Property name to sort
| textItems | String | items | Counter text that is below the left list
| textSelectedItems | Object | {one: 'selected item', greaterThanOne: 'selected items'} | Counter text that is below the right list
| limitSelectedItems | Number | 999 | Limit items that the user can select
| disabled           | Boolean | false             | Disable select |

## Events

| Name                   | Description                                                              |
|------------------------|--------------------------------------------------------------------------|
| itemAdded              | When an item has been added to the list  |
| itemRemoved            | When an item has been removed from the list  |
| selectedListModified   | When the selected list has been modified  |


## How to use


After you have installed the package and imported it, call the component's html and pass its properties.

```html
<double-select
  :items="arrayOfItems"
  :selectedItems="arrayOfSelectedtems"
  :limitSelectedItems="10"
  :searchable="true"
  :sorteable="true"
  :orderBy="'name'"
  text-field="name"
  value-field="id"
  ></double-select>
```

## Contributing

To contribute to this project you can clone the repository and run the npm run dev command to test.

```javascript
npm install

npm run dev

npm publish
```