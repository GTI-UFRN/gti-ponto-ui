<template>
  <q-page class="flex flex-center column">
    <span class="clock">{{this.time}}</span>
    <p>Boa tarde, {{user.name}}!</p>
    <p v-if="openTime._id">Tempo de trabalho: {{this.workTime}}</p>
    <q-btn @click="checkin" v-if="isCheckin" color="green" size="lg">
      Entrada
    </q-btn>
    <q-btn @click="checkout" v-else color="red" size="lg">
      Saída
    </q-btn>
  </q-page>
</template>

<style>
</style>

<script>
  import moment from "moment"
  import auth from "../services/auth/api"
  import ponto from "../services/ponto/api"
  moment.locale('pt-BR')
  export default {
    name: "PageIndex",
    data() {
      return {
        time: "",
        workTime: "",
        user: {},
        isCheckin: true,
        openTime: {}
      }
    },
    methods: {
      checkin() {
        ponto
          .checkin(window.user._id)
          .then(({ data }) => {
            this.updateStatus()
          })
          .catch(e => {
            this.updateStatus()
          })
      },
      checkout() {
        ponto
          .checkout(this.openTime._id)
          .then(({ data }) => {
            this.updateStatus()
          })
          .catch(e => {
            this.updateStatus()
          })
      },
      updateStatus() {
        ponto.getUserStatus(window.user._id).then(({ data }) => {
          console.log(data)
          if (!data.data) {
            this.isCheckin = true
            this.openTime = {}
          } else {
            this.isCheckin = false
            this.openTime = data.data
          }
        })
      }
    },
    created() {
      if (!window.user) {
        this.$router.push("/login")
      } else {
        auth.getUser(window.user._id).then(({ data }) => {
          this.user = data.data
        })
        this.updateStatus()
      }
      setInterval(() => {
        const today = new Date()
        if (this.openTime._id) {
          const wt = moment.duration(today - new Date(this.openTime.checkin))
          this.workTime = moment.utc(wt.asMilliseconds()).format("HH:mm:ss")
        }
        this.time = moment().format("HH:mm:ss")
      }, 1000)
    }
  }
</script>

<style>
.clock {
  font-size: 68px
}
</style>
