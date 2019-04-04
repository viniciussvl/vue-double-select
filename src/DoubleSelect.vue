<template>
    <div class="">
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
        </div>

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
        },
        methods: {
            addItem(item, index) {
                this.list.right.push(item);
                this.list.left.splice(index, 1);
            },
            removeItem(item, index){
                this.list.left.push(item);
                this.list.right.splice(index, 1);
            },
            search(text, position){
                var self = this;
                if(!text){
                    this.list[position] = (position == 'left') ? this.getUnselectedItems() : this.getSelectedItems();
                } else{
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
            }
        }
    }
</script>

<style scoped>
    ul{
        list-style-type: none;
        padding: 0;
        height: 250px;
        overflow: auto;
        border: 1px solid rgba(153, 153, 153, 0.2);
        width: 100%;
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

    .left-select{
        float: left;
    }

    .right-select{
        margin-left: 45px;
        float: left;
    }

    .left-select, .right-select{
        width: 30%;
    }

    .searchable{
        border: 1px solid #ddd;
        padding: 10px;
        width: 100%;
    }


</style>