<template>
  <div>
    <h1 class="q-headline">Resumo</h1>
    <p>
      <b>Total de horas: </b> {{resume}}
    </p>
  </div>
</template>

<script>
import moment from 'moment'

const sumTime = time => {
  if (!time.checkout) return 0
  const wt = moment.duration(
    new Date(time.checkout) - new Date(time.checkin)
  )
  return wt.asMilliseconds()
}

export default {
  name: 'MirroResume',
  props: ['times'],
  computed: {
    resume: function () {
      return moment.utc(this.times.reduce((ac, at) => (ac + sumTime(at)), 0)).format('HH:mm')
    }
  }
}
</script>
