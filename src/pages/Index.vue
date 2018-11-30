<template>
  <q-page class="flex flex-center column">
    <img :src="user.photoURL  || 'https://png.pngtree.com/svg/20161212/personal_default_avatar_for_mobile_phone_app__146524.png'" alt="Usuario" class="img-profile">
    <span class="day">{{this.day}}.</span>
    <span class="clock">{{this.time}}</span>
    <p>Usuário, <b>{{displayName}}</b></p>
    <p v-if="openTime._id && !blocked">Tempo de trabalho: {{this.workTime}}</p>
    <div v-if="!blocked">
      <q-btn @click="checkin" v-if="isCheckin" color="green" size="lg">
        Entrada
      </q-btn>
      <q-btn @click="checkout" v-else color="red" size="lg">
        Saída
      </q-btn>
    </div>
    <div class="alert text-red" v-else>
      <p>Olá Querido! {{msgText}} :) Você esqueceu de bater o ponto!!! Entre em contato com o Coordenador do setor para liberar novamente. Beijos, queridos.</p>
    </div>
  </q-page>
</template>

<script>
import moment from 'moment'
import auth from '../services/auth'
import ponto from '../services/ponto'

moment.locale('pt-BR')

const isOtherDay = (dateCheckin, dateServer) => dateCheckin.getDate() !== dateServer.getDate()

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
          if (isOtherDay(new Date(this.openTime.date), window.time)) this.blocked = true
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
      return name.length > 1 ? `${name[0]} ${name[1]}` : name[0]
    },
    msgText () {
      return window.time.getHours() < 12 ? 'Bom dia' : 'Boa tarde'
    }
  },
  data () {
    return {
      time: '',
      workTime: '',
      user: { name: '' },
      isCheckin: true,
      blocked: false,
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

.alert{
  padding: 16px;
}
</style>
