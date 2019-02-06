<template>
    <div class="">
        <div class="left-select">
            <input 
                type="text" 
                :placeholder="searchablePlaceholder" 
                :class="searchableClass" 
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
                :class="searchableClass" 
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
                    left: [],
                    right: [],
                },
                rightSearch: '',
                leftSearch: '',
                originalItems: {
                    left: [],
                    right: [],
                },
            } 
        },
        created(){
            this.list.left = this.items;
            this.list.right = this.selectedItems;
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
                alert('ta bugado');
                var self = this;
                if(!text){
                    console.log(this.getUnselectedItems());
                    this.list[position] = (position == 'left') ? this.getUnselectedItems() : this.list.right;
                } else{
                    // this.list[position] = (position == 'left') ? this.getUnselectedItems() : this.list.right;
                    this.list[position] = this.list[position].filter(function(result){
                        return result[self.textField].toLowerCase().includes(text.toLowerCase());
                    })
                }
            },
            getUnselectedItems(){
                var self = this;
                let data = [];
                this.items.forEach(function(leftItem, index){
                    self.list.right.forEach(function(rightItem){
                        if(leftItem.id !== rightItem.id){
                            data[index] = leftItem;
                        }
                    })
                })

                return data;
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
        margin-right: 50px;
    }

    .right-select{
        float: left;
    }

    .left-select, .right-select{
        width: 30%;
    }
</style>