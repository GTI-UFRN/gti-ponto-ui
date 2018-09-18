<template>
  <q-page class="flex flex-center column">
    <span class="clock">{{this.time}}</span>
    <p>Boa tarde, {{user.name}}!</p>
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
  import auth from '../services/auth/api'
  import ponto from '../services/ponto/api'
// add zero in front of numbers < 10
function checkTime(i) {
    if (i < 10) {i = "0" + i} 
    return i
}

export default {
  name: 'PageIndex',
  data() {
    return {
      time: '',
      user: {},
      isCheckin: true,
    }
  },
  methods: {
    checkin() {
      ponto.checkin(window.user._id).then( ({data}) => {
        this.isCheckin = true
      })
      .catch(e => {
        this.isCheckin = false
      })
    },
    checkout() {
      ponto.checkout(window.user._id).then( ({data}) => {
        this.isCheckin = false
      })
      .catch(e => {
        this.isCheckin = true
      })
    }
  },
  created() {
    if(!window.user) {
      this.$router.push('/login')
    }else {
      auth.getUser(window.user._id).then( ({data}) => {
        this.user = data.data
      })
      ponto.getUserStatus(window.user._id).then( ({data}) => {
        console.log(data);
         if(!data.data) {
           this.isCheckin = true
         }else {
            this.isCheckin = false
         }
      })
    }
    setInterval(() => {
      const today = new Date()
      var h = today.getHours()
      var m = today.getMinutes()
      var s = today.getSeconds()
      m = checkTime(m)
      s = checkTime(s)
      this.time = h + ":" + m + ":" + s
    }, 500)
  }
}
</script>

<style>
  .clock {
    font-size: 88px;
  }
</style>
