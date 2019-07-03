<template>
  <v-app>
    <h2 class="mr-auto ml-auto mt-5 mb-2 ml-3 mr-3">Agende o serviço que deseja e receba sua senha</h2>

    <v-container fluid>
      <v-layout row wrap align-center justify-center>
        <v-flex xs12 md10>
          <v-container fluid>
            <v-layout row wrap align-center justify-center>
              <v-flex xs12 md6 d-flex>
                <v-layout row wrap align-center justify-center>
                  <v-flex xs12 md6>
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
                      :min="dataAtual"
                      :max="dataMax"
                      :disabled="disabledDataPicker"
                    ></v-date-picker>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex xs12 md6 d-flex v-if="!disabledDataPicker" class="mt-5">
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
                    <v-card class="box-shadow radius15">
                      <v-card-title class="bb-1 border-grey">Documentos necessários</v-card-title>

                      <v-card-text>Ao confirmar você recebar sua senha junto com orietações e uma lista dos documentos necessários</v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-btn
                v-if="!disabledDataPicker"
                color="primary"
                class="mt-4 radius15"
                @click="confirmar"
              >Confirmar</v-btn>
              <v-btn
                v-if="!disabledDataPicker"
                color="primary"
                class="mt-4 radius15"
                @click="cancel"
              >Cancelar</v-btn>
            </v-layout>
          </v-container>
        </v-flex>
        {{ this.$store.state.data }}
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: "app",

  data: () => ({
    disabledSelect: false,
    disabledDataPicker: true,
    select: null,
    name: "",
    type: "",
    date: null,
    dateMax: null,
    docs: [],
    items: [
      { state: "Emissão de RG", abbr: "RG" },
      { state: "Emissão de CPF", abbr: "CPF" },
      { state: "Emissão de CTPS", abbr: "CTPS" }
    ]
  }),

  computed: {
    dataPicker() {
      if (this.select) {
        this.disabledDataPicker = false;
        this.disabledSelect = true;
        this.type = this.select.abbr;
        console.log(this.type);
      }
    },

    /*Docs() {
      switch (this.select.abbr) {
        case "RG":
          this.docs = [
            {
              doc: "Certidão de nascimento (Original)"
            },
            {
              doc: "ou Certidão de casamento (Original)"
            },
            {
              doc: "ou Certidão de divórcio (Original)"
            },
            {
              doc: "CPF"
            }
          ];
          console.log(this.docs);
          break;
        default:
          console.log("switchDefault");
      }
    },*/

    // Gerando data atual
    dataAtual: function() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      return (this.date = year + "-" + month + "-" + dt);
    },

    // Gerando data máxima
    dataMax: function() {
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
    clearName() {
      this.name = "";
    },
    cancel() {
      this.disabledDataPicker = true;
      this.disabledSelect = false;
      this.clearName();
      this.date = this.dataAtual;
      this.select = null;
    },

    allowedDates: val => parseInt(val.split("-")[2], 10),

    // Store
    //->Mutations
     ...mapMutations([
       'setName',
       'setType',
       'setDate',
       'setTime'
     ]),
     
     ...mapActions([
       'agendamento'
     ]),

    confirmar() {
      this.setName({
        name: this.name
      })

      this.setType({
        type: this.type
      })

      this.setDate({
        date: this.date
      })

      this.setTime({
        time: this.time
      })
      
      this.agendamento()

      console.log("Agendando...");

      this.cancel()

    }
  }
};
</script>

<style>
#app {
  font-family: "Courier New", Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.radius15 {
  border-radius: 15px;
}

.box-shadow {
  box-shadow: -1px 0px 12px -2px #ccc;
}

.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #fbf2f2;
}

.v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none;
  border-width: none;
}

div.v-menu__content.theme--light.menuable__content__active {
  border-radius: 15px;
}

#app
  > div.application--wrap
  > div
  > div
  > div
  > div
  > div
  > div
  > div
  > div.flex.xs12.md10
  > div {
  border-radius: 15px;
}
</style>
