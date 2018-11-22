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
    :title="'Entre ' + formatDate(initDate) + ' - ' + formatDate(endDate) "
    no-data-label="Nenhum registro encontrado!"
    :data="mirror" :columns="columns"
    :pagination="{rowsPerPage: 25}"
    row-key="date">
    <div slot="top-right" slot-scope="props" class="flex">
      <div class="user__select">
        <q-select
        v-model="user"
        float-label="Bolsista"
        radio :options="usersList"
        />
      </div>
    </div>
    <div slot="bottom" slot-scope="props" class="row text-black">
      <mirro-resume :times="mirror" />
    </div>
    </q-table>
  </q-page>
</template>

<script>
import moment from 'moment'
import ponto from '../services/ponto'
import users from '../services/users'
import MirroResume from '../components/MirroResume.vue'

function getMonthDateRange () {
  const date = new Date()
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
      mirror: [],
      user: null,
      users: []
    }
  },
  components: {
    MirroResume
  },
  methods: {
    formatDate (d) {
      return moment(d).format('DD/MM/Y')
    },
    getMirror (id) {
      const range = { start: this.initDate, end: this.endDate }
      ponto.getMirror(id, range).then(({ data }) => {
        if (data.data) {
          this.mirror = data.data
        }
      })
    },
    async request () {
      try {
        const { data } = await users.getAll()
        this.users = data.data
        this.user = this.users[0]._id
        this.getMirror(this.user)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    usersList: function () {
      return this.users.map(u => ({ value: u._id, label: u.name }))
    }
  },
  watch: {
    initDate: function (val) {
      this.endDate = moment(val)
        .endOf('month')
        .toDate()
    },
    user: function (newId, old) {
      if (newId !== old) this.getMirror(newId)
    }
  },
  created () {
    if (!window.user) {
      this.$router.push('/login')
      return
    }
    this.request()
  }
}
</script>

<style>
  .user__select {
    width: 100%;
    min-width: 300px;
  }
</style>
