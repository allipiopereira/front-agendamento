import api from './services/api'
import Vue from 'vue'
import Vuex from 'vuex'
import download from "./jsPDF";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    message: "",
    msg: '',
    userID: null,
    name: "",
    pass: null,
    type: "",
    date: null,
    data: {},
    files: [],
    qtdAgendamentos: null
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

    setUserID(state, value) {
      state.userID = value.userID
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
      state.message = "Agendando..."

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
          response.data.data ? console.log(response.data.data) : console.log(response.data.message)

          state.data = response.data.data

          state.qtdAgendamentos = response.data.data ? response.data.data.length : null

          console.log(state.qtdAgendamentos)

          state.message = response.data.message ? response.data.message : "Listados: " +`${state.qtdAgendamentos}` + " agendamentos"
        })
        .catch(error => {
          console.log("Error")
          state.message = error

          console.log(response)
        })
        .finally(() => {
          console.log('Listados!')
        })
    },

    async deletar({ commit,  state}) {
      console.log("Deletando...")
      api().delete('/delete/' + state.userID)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})

export default store