import api from './services/api'
import Vue from 'vue'
import Vuex from 'vuex'
import download from "./jsPDF";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    message: "Agendando...",
    name: "",
    pass: null,
    type: "",
    date: null,
    data: {},
    files: []
  },

  getters: {
    getName(state) {
      return name = state.name
    }
  },

  mutations: {
    setName(state, value) {
      state.name = value.name
    },

    addPass(state) {
      state.pass++
    },

    setType(state, value) {
      state.type = value.type
    },

    setDate(state, value) {
      state.date = value.date
    },

    setTime(state, value) {
      state.time = value.time
    },

    addFile(state, value) {
      state.files = value
    }
  },

  actions: {
    addFile({ commit, file }) {
      commit('addFile', value)
    },

    async agendamento({ commit, state }) {
      api().post('/agendar', {
        name: await state.name,
        type: await state.type,
        date: await state.date,
      })
        .then(response => {
          console.log(response)

          state.pass = response.data.data.pass

          state.data = response.config.data

          console.log(response.data.data.hours)

          download()

          state.message = "Agendado com sucesso!"
        })

        .catch(error => {
          console.log("Error " + error.message)
          state.message = "Error: " + `${error.message}`
        })
        .finally(() => {
          console.log('Finalizado!')
        })
    },

    async agendados({ commit, state }) {
      console.log("Listando agendados: v-list")
      api().get('agendados/' + state.date)
        .then(response => {
          console.log(state.date)

          response.data.data ? console.log(response.data.data) : console.log(response.data.message)

          state.data = response.data.data

          state.message = "Agendados..."
        })
        .catch(error => {
          console.log("Error")
          state.message = "Error"

          console.log(response)
        })
        .finally(() => {
          console.log('Listados!')
        })
    }
  }
})

export default store