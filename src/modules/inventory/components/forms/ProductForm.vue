<template>
  <div class="pa-5">
    <v-toolbar class="bg-primary mb-4 rounded" title="Formulario de Productos">
      <v-btn
        :text="`${product.id ? 'Actualizar' : 'Guardar'} Producto`"
        color="white"
        class="bg-success"
        append-icon="mdi mdi-floppy"
      />
    </v-toolbar>

    <v-row>
      <v-col cols="12" md="8" sm="12" lg="8">
        <TheFieldset title="Informacion del Producto">
          <v-container>
            <v-row>
              <v-col cols="12" md="8" lg="8" sm="12">
                <v-text-field
                  v-model="product.name"
                  :loading="isLoading"
                  :disabled="disabled || isLoading"
                  label="Nombre del Producto"
                  placeholder="Digite el nombre del producto..."
                  hide-details
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="4" lg="4" sm="12">
                <v-select
                  v-model="product.categoryId"
                  :items="categoryList"
                  :loading="categoryService.requestData.isLoading"
                  :disabled="categoryService.requestData.isLoading || disabled"
                  item-title="name"
                  item-value="id"
                  label="Categoria del Producto"
                  placeholder="Seleccione la categoria del producto..."
                  hide-details
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="12" lg="12" sm="12">
                <v-text-field
                  v-model="product.barCode"
                  :loading="isLoading"
                  :disabled="disabled || isLoading"
                  label="Codigo de barra del Producto"
                  placeholder="Digite el codigo de barra del producto..."
                  hide-details
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="4">
                <v-text-field
                  v-model.number="product.stock"
                  :loading="isLoading"
                  :disabled="disabled || isLoading"
                  label="Cantidad en almacen"
                  placeholder="Digite la cantidad en almacen..."
                  hide-details
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="4">
                <v-text-field
                  v-model.number="product.minimalStock"
                  :loading="isLoading"
                  :disabled="disabled || isLoading"
                  label="Cantidad minima en almacen"
                  placeholder="Digite la cantidad minima en almacen..."
                  hide-details
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="4">
                <v-select
                  v-model="product.unitMeasurementId"
                  :disabled="disabled || isLoading"
                  :items="unitsMeasurements"
                  item-title="name"
                  item-value="id"
                  label="Unidad de Medida"
                  placeholder="Seleccione la unidad de medida..."
                  hide-details
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="12" lg="12" sm="12">
                <v-textarea
                  v-model="product.description"
                  :disabled="disabled || isLoading"
                  label="Descripcion del Producto"
                  placeholder="Digite la descripcion del producto..."
                  hide-details
                  variant="outlined"
                  rows="7"
                />
              </v-col>
            </v-row>
          </v-container>
        </TheFieldset>
      </v-col>
      <v-col cols="12" md="4" sm="12" lg="4">
        <TheFieldset title="Foto del Producto" class="mb-4">
          <!-- <v-toolbar class="bg-primary" title="Foto del Producto" /> -->
          <div class="w-100">
            <div v-if="product.image">
              <img
                :src="product.image"
                :alt="product.name.replace('', '-') + '.jpg'"
                width="205"
                class="img-fluid d-block mx-auto"
              />
            </div>
            <div v-else style="font-size: 8rem">
              <v-icon icon="mdi mdi-image" class="w-100" />
            </div>
            <div class="pa-2">
              <v-btn
                @click="imageInput?.click()"
                :disabled="disabled || isLoading"
                text="Subir Foto"
                class="w-100"
                variant="tonal"
                append-icon="mdi mdi-plus"
              />
              <input
                @change="onSetImage"
                accept="image/*"
                hidden
                type="file"
                ref="imageInput"
              />
            </div>
          </div>
        </TheFieldset>
        <TheFieldset title="Informacion de Venta">
          <!-- <v-toolbar class="bg-primary" title="Informacion de Venta" /> -->
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-text-field
                  :loading="isLoading"
                  :disabled="disabled || isLoading"
                  label="Precio de Compra"
                  placeholder="Digite el precio de compra..."
                  hide-details
                  variant="outlined"
                  v-model="product.pucharsePrice"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-text-field
                  :loading="isLoading"
                  :disabled="disabled || isLoading"
                  label="Precio de Venta"
                  placeholder="Digite el precio de venta..."
                  hide-details
                  variant="outlined"
                  v-model="product.salePrice"
                />
              </v-col>
            </v-row>
          </v-container>
        </TheFieldset>
      </v-col>
    </v-row>
    <!-- <v-card-actions>
      <v-btn text="Cancelar" variant="tonal" @click="$emit('on-cancel')" />
      <v-btn
        :loading="isLoading"
        :disabled="isLoading || disabled"
        :text="!product.id ? 'Guardar' : 'Actualizar'"
        class="bg-primary"
        append-icon="mdi mdi-floppy"
        @click="$emit('on-submit')"
      />
    </v-card-actions> -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { TheFieldset } from "@/components";
import { useRequestService } from "@/composables";
import { ICategory, IProduct } from "@/modules/inventory/interfaces";
interface IProps {
  product: IProduct;
  disabled?: boolean;
  isLoading?: boolean;
}
interface IEmits {
  (event: "on-submit"): void;
  (event: "on-cancel"): void;
  (event: "update:product"): void;
}

const props = defineProps<IProps>();
defineEmits<IEmits>();

const categoryService = useRequestService<ICategory>("/inventory/categories");
const categories = ref<ICategory[]>([]);
const imageInput = ref<HTMLInputElement>();
//COMPUTEDS
const categoryList = computed(() => categoryService.requestData.list);
const unitsMeasurements = [
  {
    id: 1,
    name: "Litro",
  },
  {
    id: 2,
    name: "Libra",
  },
];

const onSetImage = (event: any) => {
  if (!imageInput.value || !imageInput.value.files) return;

  const [image]: File[] = imageInput.value.files as any;

  const fileReader = new FileReader();
  fileReader.onload = () => {
    props.product.image = fileReader.result as string;
  };

  fileReader.readAsDataURL(image);
};

onMounted(async () => {
  categories.value = await categoryService.getList();
});
</script>

<style scoped></style>
