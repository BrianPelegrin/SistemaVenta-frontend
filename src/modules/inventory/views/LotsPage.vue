<template>
    <v-container>
        <v-card>
            <v-toolbar title="Lotes de Productos" class="bg-primary">
                <v-btn
                    @click="async () => await lotsService.getList()"
                    :loading="lotsService.requestData.isLoading"
                    class="bg-primary mx-2"
                    icon="mdi mdi-reload"
                    variant="tonal"
                />
                <v-btn
                    @click="
                        $router.push({
                        name: 'lots-form-add',
                        })
                    "
                    :disabled="lotsService.requestData.isLoading"
                    class="bg-success"
                    append-icon="mdi mdi-plus"
                    text="Registrar Lote"
                />
            </v-toolbar>
            <v-data-table
                :loading="lotsService.requestData.isLoading"
                :items="lotsService.requestData.list"
                :headers="tableHeaders"
            >
                <template v-slot:item.stateId="{ item }">
                    <v-chip
                        :color="item.isActive ? 'success' : 'red'"
                        variant="outlined"
                        :text="item.isActive ? 'Activo' : 'Inactivo'"
                    />
                </template>
                <template v-slot:item.id="{ item }">
                    <v-btn
                        @click="
                        $router.push({
                            name: 'lots-form-edit',
                            params: { id: item.id },
                        })
                        "
                        class="bg-primary"
                        icon="mdi mdi-pencil"
                    />
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { useRequestService } from "@/composables";
import { ILot } from "@/modules/inventory/interfaces"
const lotsService = useRequestService<ILot>('/api/inventory/lots')
const tableHeaders: any[] = [
    { title: "Nombre", align: "start", key: "name" },
    { title: "Telefono", align: "start", key: "phoneNumber" },
    { title: "Correo", align: "start", key: "email" },
    { title: "Estado", align: "start", key: "stateId" },
    { title: "Acciones", align: "start", key: "id" },
];
</script>

<style scoped>

</style>