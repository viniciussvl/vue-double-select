<template>
    <div class="row">
        <div class="col-md-5">
            <div class="left-select">
                <input 
                    class="searchable"
                    type="text" 
                    :placeholder="searchablePlaceholder" 
                    :class="'searchable ' + searchableClass" 
                    name="leftSearch" 
                    v-model="leftSearch"
                    @keyup="search($event.target.value, 'left')"
                    v-if="searchable">
                
                <ul>
                    <li v-for="(item, index) in list.left" :key="index" @click="addItem(item, index)">
                        {{ item[textField] }} 
                    </li>
                </ul>
                <p class="text-selected-items"><strong>{{ list.left.length }}</strong> {{ textItems }}</p>
            </div>
        </div>

        <div class="switch">
            <img src="../public/switch.png" alt="Switch">
        </div>

        <div class="col-md-5">
            <div class="right-select">
                <input 
                    type="text" 
                    :placeholder="searchablePlaceholder" 
                    :class="'searchable ' + searchableClass" 
                    name="rightSearch" 
                    v-model="rightSearch"
                    @keyup="search($event.target.value, 'right')"
                    v-if="searchable">

                <ul>
                    <li v-for="(item, index) in list.right" :key="index" @click="removeItem(item, index)">
                        {{ item[textField] }}
                    </li>
                </ul>

                <p class="text-selected-items"><strong>{{ list.right.length }}</strong> {{ textSelectedItems[list.right.length == 1 ? 'one' : 'greaterThanOne'] }}</p>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'DoubleSelect',
        props: {
            items: {
                type: Array,
                required: true
            },
            selectedItems: {
                type: Array,
                default: function() { return[] }
            },
            valueField: {
                default: 'value',
                type: String,
            },
            textField: {
                default: 'text',
                type: String
            },
            searchable: {
                type: Boolean,
                default: false,
            },
            searchablePlaceholder: {
                type: String,
                default: 'Search'
            },
            searchableClass: {
                type: String,
                default: 'form-control mb-2'
            },
            textItems: {
                type: String,
                default: 'items'
            },
            textSelectedItems: {
                type: Object,
                default: function() { return {
                    one: 'selected item',
                    greaterThanOne: 'selected items'
                } }
            },
            sorteable: {
                type: Boolean,
                default: false,
            },
            orderBy: {
                type: String,
                default: 'id' 
            },
            limitSelectedItems: {
                type: Number,
                default: 999
            }
        },
        data() {
            return {
                list: {
                    left: this.items,
                    right: this.selectedItems,
                },
                rightSearch: '',
                leftSearch: '',
            } 
        },
        created(){
            var self = this;
            if(this.selectedItems){
                this.selectedItems.forEach(function(selectedItem, index){
                    let pos = self.findWithAttr(self.list.left, 'id', selectedItem.id);
                    if(pos >= 0){
                        self.list.left.splice(pos, 1);
                    }
                }) 
            }

            if(this.sorteable){
                this.list.left = this.sort(this.list.left, this.orderBy, 0);
                this.list.right = this.sort(this.list.right, this.orderBy, 0);
            }
        },
        methods: {
            addItem(item, index) {
                let totalItems = this.list.right.length;
                if(totalItems >= this.limitSelectedItems){
                    return false;
                }

                this.list.right.push(item);
                this.list.left.splice(index, 1);

                // sort
                this.list.right = this.sort(this.list.right, this.orderBy, 0);
                this.$emit('itemAdded', this.list.right)
                this.$emit('selectedListModified', this.list.right)
            },
            removeItem(item, index){
                this.list.left.push(item);
                this.list.right.splice(index, 1);

                this.list.right = this.getSelectedItems();
                this.rightSearch = null;

                // sort
                this.list.left = this.sort(this.list.left, this.orderBy, 0);
                this.$emit('itemRemoved', this.list.left)
                this.$emit('selectedListModified', this.list.right)
            },
            search(text, position){
                var self = this;
                this.list[position] = (position == 'left') ? this.getUnselectedItems() : this.getSelectedItems();
                if(text){
                    this.list[position] = this.list[position].filter(function(result){
                        return result[self.textField].toLowerCase().includes(text.toLowerCase());
                    })
                }
            },
            getUnselectedItems() {
                var self = this;
                let data = this.items;
                data.forEach(function(leftItem, index){
                    self.list.right.forEach(function(rightItem){
                        if(leftItem.id == rightItem.id){
                            data.splice(index, 1);
                        }
                    })
                })

                return this.items;
            },
            getSelectedItems() {
                var self = this;
                let items = this.items;
                let selectedItems = this.selectedItems;

                selectedItems.forEach(function(selectedItem, index){
                    items.forEach(function(item){
                        if(item.id == selectedItem.id){
                            selectedItems.splice(index, 1);
                        }
                    })
                }) 

                return selectedItems;
            },
            findWithAttr(array, attr, value) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i][attr] === value) {
                        return i
                    }
                }
                return -1
            },
            sort(items, property, direction) {
                function compare(a, b) {
                    if(!a[property] && !b[property]) {
                        return 0;
                    } else if(a[property] && !b[property]) {
                        return -1;
                    } else if(!a[property] && b[property]) {
                        return 1;
                    } else {
                        const value1 = a[property].toString().toUpperCase(); // ignore upper and lowercase
                        const value2 = b[property].toString().toUpperCase(); // ignore upper and lowercase
                        if (value1 < value2) {
                        return direction === 0 ? -1 : 1;
                        } else if (value1 > value2) {
                        return direction === 0 ? 1 : -1;
                        } else {
                        return 0;
                        }
                    }
                }
    
                return items.sort(compare);
            } 
        }
    }
</script>

<style scoped>
    ul{
        list-style-type: none;
        padding: 0;
        height: 270px;
        overflow: auto;
        border: 1px solid rgba(153, 153, 153, 0.2);
        width: 100%;
        margin: 5px 0;
    }

    ul li{
        padding: 8px;
        border-bottom: 1px solid rgba(153, 153, 153, 0.2);
    }

    ul li:hover{
        background: #09f;
        cursor: pointer;
        color: #fff;
    }


    .searchable{
        border: 1px solid #ddd;
        padding: 10px;
        width: 100%;
    }

    .text-selected-items{
        margin: 0;
        padding: 0;
    }

    .switch{
        display: flex;
        flex-direction: column;
        justify-content: center;
    } 


    /* Responsive */
    @media (max-width: 768px) 
    {
        .switch{
           text-align: center;
           margin: 0 auto;
           padding: 15px 0;
        }    
    }

</style>