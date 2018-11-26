<template>
  <q-page class="flex flex-center column">
    <img :src="user.photoURL" alt="Usuario" class="img-profile">
    <span class="day">{{this.day}}.</span>
    <span class="clock">{{this.time}}</span>
    <p>Usuário, <b>{{displayName}}</b></p>
    <p v-if="openTime._id">Tempo de trabalho: {{this.workTime}}</p>
    <q-btn @click="checkin" v-if="isCheckin" color="green" size="lg">
      Entrada
    </q-btn>
    <q-btn @click="checkout" v-else color="red" size="lg">
      Saída
    </q-btn>
  </q-page>
</template>

<script>
import moment from 'moment'
import auth from '../services/auth'
import ponto from '../services/ponto'

moment.locale('pt-BR')

export default {
  name: 'PageIndex',
  methods: {
    checkin () {
      ponto
        .checkin(window.user._id)
        .then(({ data }) => {
          this.updateStatus()
          this.logout()
        })
        .catch(({ response }) => {
          alert(response.data.msg)
          this.updateStatus()
        })
    },
    checkout () {
      ponto
        .checkout(this.openTime._id)
        .then(({ data }) => {
          this.updateStatus()
          this.logout()
        })
        .catch(({ response }) => {
          alert(response.data.msg)
          this.updateStatus()
        })
    },
    updateStatus () {
      ponto.getUserStatus(window.user._id).then(({ data }) => {
        if (!data.data) {
          this.isCheckin = true
          this.openTime = {}
        } else {
          this.isCheckin = false
          this.openTime = data.data
        }
      })
    },
    logout () {
      setTimeout(() => {
        delete window.user
        this.$router.push('/login')
      }, 10000)
    }
  },
  computed: {
    displayName () {
      const name = this.user.name.split(' ')
      return `${name[0]} ${name[1]}`
    }
  },
  data () {
    return {
      time: '',
      workTime: '',
      user: {},
      isCheckin: true,
      openTime: {},
      day: moment().format('ddd DD MMM')
    }
  },
  created () {
    if (!window.user) {
      this.$router.push('/login')
    } else {
      user.rules.includes('admin') ? this.$router.push('/dashborad') : this.$router.push('/')
      clearInterval(window.clock1)
      clearInterval(window.clock2)
      auth.getUser(window.user._id).then(({ data }) => {
        this.user = data.data
      })
      ponto.getServerTime().then((time) => {
        window.time = new Date(time)
        window.time.setMilliseconds(window.time.getMilliseconds() + 1000)
        window.clock1 = setInterval(() => {
          if (window.time) {
            window.time.setMilliseconds(window.time.getMilliseconds() + 1000)
          }
        }, 1000)
      })
      this.updateStatus()
    }
    window.clock2 = setInterval(() => {
      if (this.openTime._id && window.time) {
        const wt = moment.duration(window.time - new Date(this.openTime.checkin))
        this.workTime = moment.utc(wt.asMilliseconds()).format('HH:mm:ss')
      }
      this.time = moment().format('HH:mm:ss')
      window.timerOn = true
    }, 1000)
  }
}
</script>

<style>
.clock {
  font-size: 58px;
}
.day {
  font-size: 48px;
}

.img-profile {
  border-radius: 100%;
  width: 120px;
  height: 120px;
}
</style>
