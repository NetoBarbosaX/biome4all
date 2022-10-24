<template>
  <div class="grid">
    <div class="col-12 xl:col-12">
      <div class="card">
        <h5>Tipos de espécies que analisamos:</h5>
        <DataTable
          :value="species"
          :rows="8"
          :paginator="true"
          responsiveLayout="scroll"
        >
          <Column
            field="type"
            header="Tipo"
            :sortable="true"
            style="width: 35%"
          ></Column>
          <Column
            field="name"
            header="Nome"
            :sortable="true"
            style="width: 35%"
          ></Column>
          <Column style="width: 15%">
            <template #header> Saiba Mais! </template>
            <template #body>
              <Button
                label="Conhecer"
                icon="pi pi-external-link"
                @click="openBasic"
              />
              <Dialog
                header="Sobre a espécie"
                v-model:visible="displayBasic"
                :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
                :style="{ width: '50vw' }"
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <template #footer>
                  <Button
                    label="Sair"
                    icon="pi pi-check"
                    @click="closeBasic"
                    autofocus
                  />
                </template>
              </Dialog>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import SpeciesService from "../service/SpeciesService";

export default {
  data() {
    return {
      displayBasic: false,
      species: null,
      speciesService: null,
    };
  },
  mounted() {
    this.speciesService.getSpecies().then((data) => (this.species = data));
  },
  beforeUnmount() {},
  created() {
    this.speciesService = new SpeciesService();
  },
  methods: {
    openBasic() {
      this.displayBasic = true;
    },
    closeBasic() {
      this.displayBasic = false;
    }
  },
};
</script>

<style scoped>
.p-button {
    color: #ffffff;
    background: var(--primary-color);
    border: 1px solid var(--primary-color);
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
    border-radius: 4px;
}

.p-button:hover {
    background: #74001F;
}

</style>
