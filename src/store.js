import api from './services/api'
import Vue from 'vue'
import Vuex from 'vuex'
import downloadPDF from "./jsPDF";

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
    file: [],
    qtdAgendamentos: 0
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
    addFile(state, file) {
      console.log("Files: " + file.length)
      for(let i = 0; i < file.length; i++) {
        state.file[i] = file[i]
      }
    },
    removeFile(state, file) {
      let files = state.file

      let ultimoFile

      files.length === 1 ? state.file = [] : ultimoFile = files.length

      let penultimoFile = ultimoFile-1

      if(files.length !== 1) {
        state.file = files.slice(penultimoFile, ultimoFile)

        console.log(state.file.name)
      }
    }
  },

  actions: {
    async addFile({ commit }, file) {
      await commit('addFile', file)
    },
    async removeFile({ commit }, file) {
      await commit('removeFile', file)
    },

    async agendar({ commit, state }) {
      state.message = "Agendando..."
      api().post('/agendar', {
        name: await state.name,
        type: await state.type,
        date: await state.date,
      })
        .then(response => {
          state.pass = response.data.data.pass
          state.data = response.config.data
          console.log(response.data.data.hours)
          downloadPDF()
          state.message = "Agendado com sucesso!"
        })
        .catch(error => {
          console.log("Error " + error.message)
          state.message = "Error: " + `${error.message}`
        })
        .finally(() => {
          console.log('Finalizado!')
          this.dispatch('upload', state.file)
          console.log("callUpload: " + state.file)
        })
    },

    async agendados({ commit, state }) {
      console.log("Listando agendados: v-list")
      api().get('agendados/' + state.date)
        .then(response => {
          console.log(response)

          response.data.data ? console.log("data.data: " + response.data.data) : console.log("msg: " + response.data.message)

          state.data = response.data.data

          state.qtdAgendamentos = response.data.data ? response.data.data.length : "oi"+ null

          console.log("qtd: " + state.qtdAgendamentos)

          state.message = response.data.message ? response.data.message : "Listados: " + `${state.qtdAgendamentos}` + " agendamentos"
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

    async deletar({ commit, state }) {
      console.log("Deletando...")
      api().delete('/delete/' + state.userID)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    async upload({ commit, state }, file) {
      console.log("Enviando arquivos..." + file)
      api().post('/upload', { file })
        .then(response => {
          console.log("Vem da store: " + file)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    async download({ commit, state }, name) {
      console.log("download: " + name)
    }
  }
})

export default store