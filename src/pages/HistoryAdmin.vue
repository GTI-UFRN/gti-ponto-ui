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
    no-data-label="Nenhum registro encontrado!"
    :data="mirror" :columns="columns"
    :pagination="{rowsPerPage: 25}"
    row-key="date">
    <div slot="top-left" slot-scope="props" class="row align-items-center">
      <div>
        <q-btn @click="modalTime = true" icon="note_add" color="blue">
          Adicionar registro
        </q-btn>
      </div>
    </div>
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
    <q-modal v-model="modalTime" minimized>
      <div style="padding: 20px; max-width: 600px">
      <div class="q-display-1 q-mb-md">Formulário de ponto</div>
        <form @submit.prevent="saveTime">
          <div class="row gutter-sm">
            <div class="col-md-12">
              <q-field>
                <q-datetime v-model="time.date" float-label="Data Entrada" required />
              </q-field>
            </div>
            <div class="col-md-6">
              <label>Entrada</label>
              <q-field>
                <q-input v-model="time.checkin" label="Entrada" type="time" required />
              </q-field>
            </div>
            <div class="col-md-6">
              <label>Saída</label>
              <q-field>
                <q-input v-model="time.checkout" label="Saida" type="time" required />
              </q-field>
            </div>
            <div class="col-md-6">
              <q-btn type="submit" color="green">Salvar</q-btn>
            </div>
          </div>
        </form>
      </div>
    </q-modal>
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
      modalTime: false,
      time: {},
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
    },
    saveTime () {
      const date = new Date(this.time.date)
      const checkinTime = this.time.checkin.split(':')
      const checkoutTime = this.time.checkout.split(':')

      const checkin = new Date(this.time.date)
      const checkout = new Date(this.time.date)

      checkin.setHours(checkinTime[0])
      checkin.setMinutes(checkinTime[1])

      checkout.setHours(checkoutTime[0])
      checkout.setMinutes(checkoutTime[1])

      const newTime = {
        userId: this.user,
        date,
        checkin,
        checkout
      }

      ponto.create(newTime)
        .then(result => {
          alert('Novo registro adicionada!')
          this.modalTime = false
          this.time = {}
          this.getMirror(this.user)
        })
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
