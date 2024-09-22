<template>
    <TheFieldset title="Informacion del Lote">
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                    <v-text-field
                        v-model="modelValue.lotNumber"
                        :loading="isLoading"
                        :disabled="disabled || isLoading"
                        label="Numero del Lote"
                        placeholder="Digite el numero del lote..."
                        hide-details
                        variant="outlined"
                    />
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4">
                    <v-select
                        v-model="modelValue.productId"
                        :items="productList"
                        :loading="isLoading"
                        :disabled="isLoading || disabled"
                        item-title="name"
                        item-value="id"
                        label="Producto del Lote"
                        placeholder="Seleccione el producto..."
                        hide-details
                        variant="outlined"
                    />
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4">
                    <v-select
                        v-model="modelValue.supplierId"
                        :items="productList"
                        :loading="isLoading"
                        :disabled="isLoading || disabled"
                        item-title="name"
                        item-value="id"
                        label="Proveedor del Lote"
                        placeholder="Seleccione el proveedor..."
                        hide-details
                        variant="outlined"
                    />
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4">
                    <v-text-field
                        v-model="modelValue.quantity"                     
                        :loading="isLoading"
                        :disabled="isLoading || disabled"                        
                        label="Cantidad del Lote"
                        placeholder="Digite la cantidad..."
                        hide-details
                        variant="outlined"
                    />
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4">
                    <v-text-field
                        v-model="modelValue.cost"
                        :loading="isLoading"
                        :disabled="isLoading || disabled"
                        label="Costo del Lote"
                        placeholder="Digite el costo..."
                        hide-details
                        variant="outlined"
                    />
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4">
                    <v-text-field
                        v-model="modelValue.productionDate"
                        :loading="isLoading"
                        :disabled="isLoading || disabled"                        
                        label="Fecha de Produccion"
                        placeholder="Seleccione la fecha de produccion..."
                        type="date"
                        hide-details
                        variant="outlined"
                    />
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4">
                    <v-text-field
                        v-model="modelValue.expirationDate"
                        :loading="isLoading"
                        :disabled="isLoading || disabled"
                        type="date"
                        label="Fecha de Expiracion"
                        placeholder="Seleccione la fecha de expiracion..."
                        hide-details
                        variant="outlined"
                    />
                </v-col>
                
            </v-row>
        </v-container>
    </TheFieldset>
</template>

<script setup lang="ts">
import TheFieldset from '@/components/TheFieldset.vue';
import { ILot } from '../../interfaces';
defineProps<{
    modelValue:ILot;
    isLoading?:boolean;
    disabled?:boolean;
}>()
defineEmits<{
    (event:'update:modelValue', args:ILot):void
}>()

const productList:any[] = []

</script>

<style scoped>

</style>