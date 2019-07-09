<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <h2 class="mr-auto ml-auto mt-4 mb-4">Lista dos Agendados</h2>

        <v-flex xs12 md10>
          <v-date-picker
            v-model="date"
            :first-day-of-week="0"
            locale="pt-br"
            :min="dateSelect"
            :max="dateMax"
          ></v-date-picker>

          <v-btn color="primary" class="mt-4" @click="listar" style="border-radius: 15px;">Listar</v-btn>
        </v-flex>

        <v-flex xs12>
          <v-list two-line style="background-color: #ccc;">
            <v-list-tile
              v-for="(items, i) in this.$store.state.data"
              :key="i"
              class="mb-2 ba-1 radius15"
              style="background-color: #eee;"
            >
              {{ items.name }}
              <v-spacer></v-spacer>
              {{ items.date }}
              <v-spacer></v-spacer>
              {{ items.type }}
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "Agendados",

  data: () => ({
    date: null,
    dateMax: null
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
    ...mapMutations(["setDate"]),
    ...mapActions(["agendados"]),

    listar() {
      this.setDate({
        date: this.date
      });

      this.agendados();
    }
  }
};
</script>

<style scoped>
#app > div > div > div > div > div.flex.xs12.md10 > div {
  border-radius: 20px;
}
</style>
