<template>
  <div class="container">
      <h1>Vue Double Select</h1>
        
      <double-select 
        :items="cryptocurrencies"
        :selectedItems="selectedCurrencies"
        :searchable="true"
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
            ],
        }
    },
}
</script>

<style scoped>

</style>