<template>
  <div class="container">
      <h1>Vue Double Select</h1>
      <button type="button" @click="resetItems()">Reset Items</button><br><br>
        
      <double-select
        v-if="toggle"
        :items="cryptocurrencies"
        :selectedItems="selectedCurrencies"
        :searchable="true"
        :sorteable="true"
        :limitSelectedItems="4"
        :orderBy="'name'"
        text-field="name"
        value-field="id"
        ></double-select>
  </div>
</template>

<script>
import DoubleSelect from '../DoubleSelect'

export default {
    components: {
        DoubleSelect,
    },
    data () {
        return {
            toggle: true,
            cryptocurrencies: [
                {
                    id: 1,
                    name: 'Bitcoin'
                },
                {
                    id: 2,
                    name: 'Ethereum'
                },
                {
                    id: 3,
                    name: 'Ripple'
                },
                {
                    id: 4,
                    name: 'Bitcoin Cash'
                },
                {
                    id: 5,
                    name: 'Litecoin'
                },
                {
                    id: 6,
                    name: 'Dash'
                },
                {
                    id: 7,
                    name: 'Monero'
                },
                {
                    id: 8,
                    name: 'Ethereum Classic'
                },
                {
                    id: 9,
                    name: 'Nano'
                }
            ],
            selectedCurrencies: [
                {
                    id: 3,
                    name: 'Ripple'
                },
                {
                    id: 1,
                    name: 'Bitcoin'
                },
                {
                    id: 2,
                    name: 'Ethereum'
                },
              
            ],
        }
    },
    methods: {
        resetItems(){
            this.toggle = this.toggle ? false : true;
            this.selectedCurrencies = [];
            this.cryptocurrencies = [
                {
                    id: 1,
                    name: 'Bitcoin'
                },
                {
                    id: 2,
                    name: 'USD Coin'
                },
                {
                    id: 3,
                    name: 'Ratomorto Coin'
                },
            ];
        }
    }
}
</script>

<style scoped>

</style>