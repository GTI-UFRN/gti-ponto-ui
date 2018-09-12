<template>
  <q-page class="flex flex-center column">
    <h1>{{this.time}}</h1>
    <q-btn color="green" size="lg">
      Entrar
    </q-btn>
  </q-page>
</template>

<style>
</style>

<script>
// add zero in front of numbers < 10
function checkTime(i) {
    if (i < 10) {i = "0" + i} 
    return i
}
export default {
  name: 'PageIndex',
  data() {
    return {
      time: ''
    }
  },
  created() {
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
