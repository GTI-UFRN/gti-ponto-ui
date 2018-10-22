<template>
  <div>
    <q-table
    title="Espelho de Ponto"
    no-data-label="Nenhum registro encontrado!"
    :data="mirror"
    :columns="columns"
    row-key="date"
  />
  </div>
</template>

<script>
import moment from "moment"
import ponto from "../services/ponto/api"
function getMonthDateRange() {
  const date = window.time
  const year = date.getFullYear()
  const month = date.getMonth()

  const startDate = moment([year, month]);
  const endDate = moment(startDate).endOf('month');

  return { start: startDate.toDate(), end: endDate.toDate() };
}
export default {
  name: "HistoryView",
  data() {
    return {
      columns: [
      {
        name: 'date',
        label: 'Data',
        field: 'date',
        align: 'left',
        format: val => moment(val).format("DD/MM/Y")
      },
      {
        name: 'checkin',
        label: 'Entrada',
        field: 'checkin',
        align: 'left',
        format: val => moment(val).format("HH:mm")
      },
      {
        name: 'checkout',
        label: 'Saida',
        field: 'checkout',
        align: 'left',
        format: val => {
          return val ? moment(val).format("HH:mm") : '--:--'
        }
      },
      {
        name: 'worktime',
        label: 'Tempo',
        field: time => {
          if(!time.checkout) return '--:--'
          const wt = moment.duration( new Date(time.checkout) - new Date(time.checkin))
          return moment.utc(wt.asMilliseconds()).format("HH:mm")
        },
        align: 'left',
      },
    ],
      mirror: []
    }
  },
  methods: {},
  created() {
    if (!window.user) {
      this.$router.push("/login")
      return
    }
    ponto.getMirror(window.user._id, getMonthDateRange()).then(({ data }) => {
      if (data.data) {
        this.mirror = data.data
      }
    })
  }
}
</script>