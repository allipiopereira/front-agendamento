import api from './services/api'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//Criando uma 'senha'
const store = new Vuex.Store({
  state: {
    message: "",
    name: "",
    pass: 1,
    type: "",
    date: null,
    time: null,
    data: {}
  },
  mutations: {
    showSnackbar(state, value) {
      state.snackbar = true
      state.text = value.text
    },
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
    }
  },
  actions: {    
    async agendamento({ commit, state }) {
      api().post('/agendar', {
        name: await state.name,
        pass: await state.pass,
        type: await state.type,
        date: await state.date,
        time: await state.time
      })
        .then(response => {
          console.log(response.config.data)

          state.data = response.config.data

          commit('addPass')
        })
        .catch(error => {
          console.log("Error")
        })
        .finally(() => {
          console.log('Agendado com sucesso!')
        })
    }
  }
})

export default store