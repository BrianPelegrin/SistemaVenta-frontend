<template>
      <v-container> 
        <v-toolbar class="bg-primary mb-4 rounded" title="Formulario de Lotes">
            <!--  -->
            <v-btn
                :text="`${lotForm.id ? 'Actualizar' : 'Guardar'} Lote`"
                color="white"
                class="bg-success"
                append-icon="mdi mdi-floppy"
                @click="$emit('on-submit')"
            />
        </v-toolbar>       
          <LotForm v-model="lotForm" />          
      </v-container>
</template>

<script setup lang="ts">
import LotForm from '@/modules/inventory/components/forms/LotForm.vue';
import { reactive } from 'vue';
import { ILot } from '../interfaces';
const lotForm = reactive<ILot>({
    id:0,
    lotNumber:'',
    stateId:0,
    cost:0,
    expirationDate:'',
    productionDate:'',
    quantity:null,
    productId:null,
    supplierId:null
})
</script>

<style scoped>

</style>