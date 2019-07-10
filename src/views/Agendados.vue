<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="30000" :color="color" top right>
      {{ this.$store.state.message }}
      <v-btn flat fab color="white" @click="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

    <h2 class="mr-auto ml-auto mt-4 mb-4">Lista dos Agendados</h2>

    <v-container fill-height>
      <v-layout row wrap align-center justify-center>
        <v-flex xs12 md10>
          <v-date-picker
            v-model="date"
            :first-day-of-week="0"
            locale="pt-br"
            :min="dateSelect"
            :max="dateMax"
          ></v-date-picker>
        </v-flex>

        <v-flex xs12 md10>
          <v-btn
            tag="button"
            @click="listar"
            color="primary"
            class="mt-4"
            style="border-radius: 15px;"
          >Listar</v-btn>
        </v-flex>

        <v-flex xs12 class="mt-5" v-if="showList">
          <v-list two-line style="background-color: #ccc;">
            <div
              v-for="(item, i) in this.$store.state.data"
              :key="i"
              class="radius15"
              style="background-color: #eee;"
            >
              <v-subheader>
                <h3>Nome: {{item.name}}</h3>

                <v-spacer></v-spacer>

                <h3 v-html="`Senha: ${item.pass}`"></h3>
              </v-subheader>

              <v-divider></v-divider>

              <v-list-tile @click :id="'item'+i" class="mb-2 mt-1">
                <v-list-tile-avatar>
                  <v-icon>perm_contact_calendar</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>
                    <h3 v-html="`Tipo: ${item.type}`"></h3>
                  </v-list-tile-title>
                </v-list-tile-content>

                <v-btn flat fab small @click="feito(i, item.id)" :id="'btnFeito'">
                  <v-icon>check</v-icon>
                </v-btn>

                <v-btn flat fab small @click="cancelado(i, item.id)" :id="'btnCancelado'">
                  <v-icon>close</v-icon>
                </v-btn>

                <v-btn flat fab small @click="download(i, item.name)" :id="'btnDownloadFile'">
                  <v-icon>arrow_downward</v-icon>
                </v-btn>
              </v-list-tile>
            </div>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { setTimeout } from "timers";
export default {
  name: "Agendados",

  data: () => ({
    date: null,
    dateMax: null,
    showList: false,
    snackbar: false,
    color: "info",
    isF: false,
    isC: false
  }),

  computed: {
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
    ...mapMutations(["setDate", "setUserID"]),
    ...mapActions(["agendados", "deletar", "download"]),

    listar() {
      this.setDate({
        date: this.date
      });

      this.agendados();

      this.snackbar = true;

      if (
        this.$store.state.message ===
        "Listados: " + `${this.$store.state.qtdAgendamentos}` + " agendamentos"
      ) {
        this.showList = true;
      }
    },

    feito(value, userID) {
      this.setUserID({
        userID: userID
      });
      console.log("feito " + value);
      console.log("user " + userID);

      this.isF = true;

      let item = document.getElementById("item" + value);

      let btnDisabledFeito = item.childNodes[2];
      let btnDisabledCancelado = item.childNodes[3];

      console.log(btnDisabledFeito);
      console.log(btnDisabledCancelado);

      btnDisabledFeito.disabled = true;
      btnDisabledCancelado.disabled = true;

      this.deletar();

      this.$store.state.message = "Concluido..."

      this.snackbar = true;

      return (
        (item.style.backgroundColor = "#0cdd86"),
        (item.style.borderRadius = "15px")
      );
    },

    cancelado(value, userID) {
      this.setUserID({
        userID: userID
      });
      console.log("feito " + value);
      console.log("user " + userID);

      this.isC = true;

      let item = document.getElementById("item" + value);

      let btnDisabledFeito = item.childNodes[2];
      let btnDisabledCancelado = item.childNodes[3];

      console.log(item.childNodes);

      btnDisabledFeito.disabled = true;
      btnDisabledCancelado.disabled = true;

      this.deletar();

      this.$store.state.message = "Removido..."

      this.snackbar = true;

      return (
        (item.style.backgroundColor = "#e22518"),
        (item.style.borderRadius = "15px")
      );
    },

    download(value, name) {
      console.log("downloadFile: " + value + " : " + name);
    }
  }
};
</script>

<style scoped>
#app > div > main > div > div > div > div > div:nth-child(1) > div {
  border-radius: 20px;
}

.text-start {
  text-align: start;
}
</style>
