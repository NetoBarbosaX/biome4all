<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">
              Identificação de Amostra
            </span>
            <div class="text-900 font-medium text-xl" v-if="loading === true"><ProgressBar mode="indeterminate" style="height: .5em" /></div>
            <div class="text-900 font-medium text-xl" v-else>{{ infoAmostra }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-key text-blue-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Tipo de amostra:</span>
            <div class="text-900 font-medium text-xl">Solo</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-map-marker text-orange-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Data de coleta:</span>
            <div class="text-900 font-medium text-xl">00/00/0000</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-inbox text-cyan-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Data do relatório:</span>
            <div class="text-900 font-medium text-xl">00/00/0000</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-purple-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-comment text-purple-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Especies Encontradas:</h5>
        <DataTable
          :value="species"
          :rows="5"
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
            <template #header> Encontrada? </template>
            <template #body>
              <Button
                icon="pi pi-times"
                type="button"
                class="p-button-text"
              ></Button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Gráfico 1</h5>
        <div style="height: 100%" v-if="loading === true">
          <ProgressBar mode="indeterminate" style="height: .5em" />
        </div>
        <div v-else>
        <Chart type="line" :data="lineData" />
        </div>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Gráfico 2</h5>
        <div v-if="loading === true">
          <ProgressBar mode="indeterminate" style="height: .5em" />
        </div>
        <div>
        <Chart type="bar" :data="lineData1" />
        </div>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <GMapMap
          :center="center"
          :zoom="4"
          map-type-id="terrain"
          style="width: 100%; height: 500px"
        >
          <GMapPolygon :paths="mapData" />
        </GMapMap>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo } from "../service/DashboardService";
import SpeciesService from "../service/SpeciesService";

export default {
  data() {
    return {
      loading: true,
      infoAmostra : null,
      center: { lat: -14.2400732, lng: -53.1805017 },
      species: null,
      speciesService: null,
      info: null,
      products: null,
      basicData: {
        labels: [],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "#d92546",
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: "My Second dataset",
            backgroundColor: "#FFA726",
            data: [28, 48, 40, 19, 86, 27, 90],
          },
        ],
      },
      basicOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      },
    };
  },
  computed: {
    mapData() {
      if (!this.info) return null;
      return this.info.mapa.features[0].geometry.coordinates[0][0].map((c) => ({
        lat: c[1],
        lng: c[0],
      }),
      );
    },
    lineData() {
      if (!this.info) return null;
      return {
        labels: Array.from(
          { length: this.info.graficos1.length },
          (_, i) => i + 1
        ),
        datasets: [
          {
            label: "Informações",
            data: this.info.graficos1,
            fill: false,
            backgroundColor: "#d92546",
            borderColor: "#d92546",
            tension: 0.4,
          },
        ],
      };
    },
    lineData1() {
      if (!this.info) return null;
      return {
        labels: Object.keys(this.info.graficos2),
        datasets: [
          {
            label: "Informações",
            data: Object.values(this.info.graficos2),
            backgroundColor: "#d92546",
            borderColor: "#d92546",
          },
        ],
      };
    },
  },
  mounted() {
    this.speciesService.getSpecies().then((data) => (this.species = data));
    this.getData();
    this.getApi();
  },
  beforeUnmount() {
    this.info.identificacao_amostra == this.infoAmostra
  },
  created() {
    this.speciesService = new SpeciesService();
  },
  methods: {
    async getApi() {
      let r = await getInfo();
      this.info = r;
      this.loading = false;
      console.log(this.info);
    },
    async getData() {
      let r = await getInfo();
      this.infoAmostra = r.identificacao_amostra;
    },
  },
};
</script>
