<template>
  <div>
    <v-snackbar v-model="snackbar" color="info" :timeout="30000" top right>
      {{ this.$store.state.message }}
      <v-btn flat fab color="red" @click="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

    <h2 class="mr-auto ml-auto mt-5 mb-2 ml-3 mr-3">Agende o serviço que deseja e receba sua senha</h2>

    <v-container fluid>
      <v-layout row wrap align-center justify-center>
        <v-flex xs12 md10>
          <v-container fluid>
            <v-layout row wrap align-center justify-center>
              <v-flex xs12 md6 d-flex>
                <v-layout row wrap align-center justify-center>
                  <v-flex xs12 sm8 md8>
                    <div class="radius15 pl-2 pr-2 mb-5" style="background-color: #fbf2f2">
                      <v-select
                        flat
                        v-model="select"
                        :items="items"
                        item-text="state"
                        item-value="abbr"
                        label="Selecione um serviço"
                        persistent-hint
                        return-object
                        single-line
                        background-color="#fbf2f2"
                        :dataPicker="dataPicker"
                        :disabled="disabledSelect"
                      ></v-select>
                    </div>
                  </v-flex>

                  <v-flex xs12 md10>
                    <v-date-picker
                      v-model="date"
                      :allowed-dates="allowedDates"
                      :first-day-of-week="0"
                      locale="pt-br"
                      :min="dateSelect"
                      :max="dateMax"
                      :disabled="disabledDataPicker"
                    ></v-date-picker>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex xs12 sm8 md6 d-flex v-if="!disabledDataPicker" class="mt-5">
                <v-layout row wrap align-center justify-center>
                  <v-flex xs12 md10>
                    <v-card class="box-shadow radius15 mb-4">
                      <v-card-title class="f-12 bb-1 border-grey">Insira seus dados</v-card-title>

                      <v-card-text>
                        <div class="mb-2 radius15" style="background-color: #fbf2f2">
                          <v-text-field
                            v-model="name"
                            flat
                            solo
                            clearable
                            hide-details
                            background-color="#fbf2f2"
                            type="text"
                            clear-icon="mdi-close"
                            class="ml-3 mr-3 pa-0"
                            placeholder="Seu nome completo..."
                            @click:clear="clearName"
                          ></v-text-field>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 md10>
                    <uploader
                      @file-added="onFileAdded"
                      @file-success="onFileSuccess"
                      @file-progress="onFileProgress"
                      @file-error="onFileError"
                      :options="uploadConfig.options"
                      class="uploader-vue"
                    >
                      <uploader-unsupport></uploader-unsupport>
                      <uploader-btn
                        id="global-uploader-btn"
                        :attrs="uploadConfig.attrs"
                        :single="true"
                        style="border-radius: 200px;"
                      >Enviar Arquivo</uploader-btn>

                      <uploader-list></uploader-list>
                    </uploader>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>

      <v-btn
        v-if="!disabledDataPicker"
        color="primary"
        class="mt-4"
        @click="confirmar"
        style="border-radius: 15px;"
      >Confirmar</v-btn>
      <v-btn
        v-if="!disabledDataPicker"
        color="primary"
        class="mt-4 radius15"
        @click="cancel"
        style="border-radius: 15px;"
      >Cancelar</v-btn>
    </v-container>
  </div>
</template>

<script>
import vueUploader from "../uploader";
import { mapMutations, mapActions } from "vuex";
import { setTimeout } from "timers";
export default {
  name: "Agendar",

  data: () => ({
    uploadConfig: {},
    f: {},
    snackbar: false,
    disabledSelect: false,
    disabledDataPicker: true,
    select: null,
    name: "",
    type: "",
    date: null,
    dateMax: null,
    docs: [],
    itemsAgendados: [],
    items: [
      { state: "Emissão de RG", abbr: "RG" },
      { state: "Emissão de CPF", abbr: "CPF" },
      { state: "Emissão de CTPS", abbr: "CTPS" }
    ],
    dialog: false
  }),

  mounted() {
    this.uploadConfig = vueUploader;
  },

  computed: {
    dataPicker() {
      if (this.select) {
        this.disabledDataPicker = false;
        this.disabledSelect = true;
        this.type = this.select.abbr;
      }
    },

    // Gerando data atual
    dateSelect: function() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate() + 1;

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      return (this.date = year + "-" + month + "-" + dt);
    },

    // Gerando data máxima
    dateMaxSelect: function() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 3;
      let dt = date.getDate();
      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      return (this.dateMax = year + "-" + month + "-" + dt);
    }
  },

  methods: {
    onFileAdded(file) {
      console.log(file);
      file.fileType !== "application/pdf"
        ? this.fileRemove(file)
        : this.fileAdd(file);

      console.log("onFileAdded: " + file.name);
    },
    onFileProgress(rootFile, file, chunk) {
      console.log(
        `Enviando: ${file.name}，chunk：${chunk.startByte /
          1024 /
          1024} ~ ${chunk.endByte / 1024 / 1024}`
      );
    },
    onFileSuccess(rootFile, file, chunk) {
      console.log("onFileSuccess: " + file.name);
    },
    onFileError(rootFile, file, chunk) {
      console.log(error);
    },
    // Store -> Getters, Mutations and Actions
    ...mapMutations(["setName", "setType", "setDate", "setTime"]),
    ...mapActions(["agendamento"]),

    fileAdd(file) {
      this.$store.state.message = "Arquivo adicionado!";
      this.snackbar = true;
      setTimeout(() => {
        console.log("setTimeout");
        this.$store.state.message = "Você pode adicionar mais um";
      }, 5000);

      console.log("fileAdd");
    },

    fileRemove(file) {
      file.cancel();
      this.$store.state.message = "Ops, isso não é um pdf...";
      this.snackbar = true;
      console.log("fileRemove: " + file.abord);
    },

    clearName() {
      this.name = "";
    },
    cancel() {
      this.disabledDataPicker = true;
      this.disabledSelect = false;
      this.clearName();
      this.date = this.dateSelect;
      this.select = null;
    },

    allowedDates: val => parseInt(val.split("-")[2], 10),

    confirmar() {
      this.setName({
        name: this.name.trim()
      });

      this.setType({
        type: this.type
      });

      this.setDate({
        date: this.date
      });

      this.agendamento();

      this.snackbar = true;

      console.log("Agendando...");

      this.cancel();
    }
  }
};
</script>

<style>
.radius15 {
  border-radius: 15px;
}

.box-shadow {
  box-shadow: -1px 0px 12px -2px #ccc;
}

.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #fbf2f2;
  border: 1px;
}

.v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none;
  border-width: none;
  border: none;
}

div.v-menu__content.theme--light.menuable__content__active {
  border-radius: 15px;
}

#app
  > div.application--wrap
  > main
  > div
  > div
  > div
  > div
  > div
  > div
  > div
  > div
  > div
  > div.flex.xs12.md10
  > div {
  border-radius: 20px;
}

.uploader-vue {
  width: auto;
  font-size: 12px;
  box-shadow: -1px 0px 12px -2px #ccc;
}
.uploader-vue .uploader-btn {
  margin-right: 4px;
  background-color: #fff;
  border: none;
}
.uploader-vue .uploader-list {
  margin-top: 5px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 15px;
}

.radius150 {
  border-radius: 150px;
}
</style>
