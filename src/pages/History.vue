<template>
  <q-page padding>
    <div>
      <h1 class="q-headline">Espelho de ponto</h1>
      <q-datetime v-model="initDate" format="DD/MM/YY" type="date" float-label="Data inicial" />
      <q-datetime v-model="endDate" format="DD/MM/YY" type="date" float-label="Data final" />
      <br>
      <q-btn @click="getMirror" color="green">Buscar</q-btn>
    </div>
    <br>
    <q-table
      :title="'Resumo entre ' + formatDate(initDate) + ' - ' + formatDate(endDate) "
      no-data-label="Nenhum registro encontrado!"
      :data="mirror"
      :columns="columns"
      :pagination="{rowsPerPage: 25}"
      row-key="date">
      <div slot="bottom" slot-scope="props" class="row text-black">
        <mirro-resume :times="mirror" />
      </div>
    </q-table>
  </q-page>
</template>

<script>
import moment from 'moment'
import ponto from '../services/ponto'
import MirroResume from '../components/MirroResume.vue'

function getMonthDateRange () {
  const date = window.time
  const year = date.getFullYear()
  const month = date.getMonth()

  const startDate = moment([year, month])
  const endDate = moment(startDate).endOf('month')

  return { start: startDate.toDate(), end: endDate.toDate() }
}

const mothRange = getMonthDateRange()

export default {
  name: 'HistoryView',
  data () {
    return {
      initDate: mothRange.start,
      endDate: mothRange.end,
      columns: [
        {
          name: 'date',
          label: 'Data',
          field: 'date',
          align: 'left',
          format: val => moment(val).format('DD/MM/Y')
        },
        {
          name: 'checkin',
          label: 'Entrada',
          field: 'checkin',
          align: 'left',
          format: val => moment(val).format('HH:mm')
        },
        {
          name: 'checkout',
          label: 'Saida',
          field: 'checkout',
          align: 'left',
          format: val => {
            return val ? moment(val).format('HH:mm') : '--:--'
          }
        },
        {
          name: 'worktime',
          label: 'Tempo',
          field: time => {
            if (!time.checkout) return '--:--'
            const wt = moment.duration(
              new Date(time.checkout) - new Date(time.checkin)
            )
            return moment.utc(wt.asMilliseconds()).format('HH:mm')
          },
          align: 'left'
        }
      ],
      mirror: []
    }
  },
  components: {
    MirroResume
  },
  methods: {
    formatDate (d) {
      return moment(d).format('DD/MM/Y')
    },
    getMirror () {
      const range = { start: this.initDate, end: this.endDate }
      ponto.getMirror(window.user._id, range).then(({ data }) => {
        if (data.data) {
          this.mirror = data.data
        }
      })
    }
  },
  watch: {
    initDate: function (val) {
      this.endDate = moment(val)
        .endOf('month')
        .toDate()
    }
  },
  created () {
    if (!window.user) {
      this.$router.push('/login')
      return
    }
    this.getMirror()
  }
}
</script>
