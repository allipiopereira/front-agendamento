import api from './services/api'
import Vue from 'vue'
import Vuex from 'vuex'
import downloadPDF from "./jsPDF";

Vue.use(Vuex)

function forceFileDownload (response) {
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', response.data) //or any other extension
  document.body.appendChild(link)
  link.click()
  console.log("Baixando")
}

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
    }
  },

  actions: {
    async agendar({ commit, state }, file) {
      state.message = "Agendando..."
      api().post('/agendar/' + state.date, {
        name: await state.name,
        type: await state.type,
        date: await state.date,
      })
        .then(response => {
          state.pass = response.data.data.pass
          state.data = response.config.data

          console.log(response)

          //console.log(response.data.data.hours)
          //downloadPDF()
          state.message = "Agendado com sucesso!"
          if (file.type === "click") {
            console.log("Não veio arquivos")
          } else {
            console.log("Veio arquivos")
            this.dispatch('upload', file)
          }
        })
        .catch(error => {
          console.log("Error " + error.message)
          state.message = "Ops, aconteceu um erro..."
        })
        .finally(() => {
          console.log('Finalizado!')
          //this.dispatch('upload', state.file)
          //console.log("callUpload: " + state.file)
        })
    },

    async agendados({ commit, state }) {
      console.log("Listando agendados: v-list")
      api().get('agendados/' + state.date)
        .then(response => {
          console.log(response)

          response.data.data ? console.log("data.data: " + response.data.data) : console.log("msg: " + response.data.message)

          state.data = response.data.data

          state.qtdAgendamentos = response.data.data ? response.data.data.length : "oi" + null

          console.log("qtd: " + state.qtdAgendamentos)

          state.message = response.data.message ? response.data.message : "Listados: " + `${state.qtdAgendamentos}` + " agendamentos"
        })
        .catch(error => {
          console.log("Error")
          state.message = "Ops, aconteceu um erro..."
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
      api().post('/files', { file })
        .then(response => {
          console.log("Vem da store: " + file)
          console.log("upload: " + file.uploader.uploader.fileList.length)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    async download({ commit, state }, id) {
      console.log("downloadID: " + id)
      api().get('/files/' + id) 
        .then(response => {
          console.log("Arquivo encontrado...")
          console.log(response)
          forceFileDownload(response)
        })
        .catch(error => {
          console.log("Error -> showFile")
          console.log(error)
        })
    }
  }
})

export default store