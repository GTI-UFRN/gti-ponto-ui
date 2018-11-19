<template>
  <q-page padding>
    <br>
    <q-table
    :title="'Gerênciamento de usuários'"
    no-data-label="Nenhum registro encontrado!"
    :data="users"
    :columns="columns"
    :pagination="{rowsPerPage: 25}"
    row-key="username"
    selection="single"
    :selected.sync="selected"
    @request="request"
  >
    <div slot="top-right" slot-scope="props" class="column">
      <q-btn @click="addUser" icon="note_add" color="green">
        Novo usuário
      </q-btn>
    </div>
    <template slot="top-selection" slot-scope="props">
      <q-btn @click="editUser" color="primary" flat label="Editar" class="q-mr-sm" />
      <div class="col" />
    </template>
  </q-table>
  <q-modal v-model="showForm" maximized>
    <user-form @onSave="save" :user="user" />
  </q-modal>
  </q-page>
</template>

<script>
import moment from 'moment'
import users from '../services/users'
import UserForm from '../components/UserForm'

const tableColumns = [
  {
    name: 'name',
    label: 'Nome',
    field: 'name',
    align: 'left'
  },
  {
    name: 'username',
    label: 'Usuário',
    field: 'username',
    align: 'left'
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left'
  },
  {
    name: 'registration',
    label: 'Matricula',
    field: 'registration',
    align: 'left'
  },
  {
    name: 'birthday',
    label: 'Nascimento',
    field: 'birthday',
    align: 'left',
    format: val => moment(val).format('DD/MM/Y')
  },
  {
    name: 'active',
    label: 'Status',
    field: 'active',
    align: 'left',
    format: val => (val ? 'Ativo' : 'Inativo')
  }
]

export default {
  name: 'UsersManager',
  data () {
    return {
      columns: tableColumns,
      selected: [],
      users: [],
      address: {},
      user: {
        address: {},
        bankAccount: {}
      },
      showForm: false
    }
  },
  components: {
    UserForm
  },
  methods: {
    addUser () {
      this.user = { address: {}, bankAccount: {} }
      this.showUserForm()
    },
    editUser () {
      this.user = this.selected[0]
      if (!this.user.bankAccount) this.user.bankAccount = {}
      if (!this.user.address) this.user.address = {}
      this.showUserForm()
    },
    getCep (cep) {
      const url = `https://viacep.com.br/ws/${cep}/json`
      fetch(url)
        .then(r => r.json())
        .then(r => {
          this.address = r
        })
    },
    save (user) {
      this.showForm = false
    },
    showUserForm () {
      this.showForm = true
      // if (this.user.address.cep && this.user.address.cep !== '') {
      //   this.getCep(this.user.address.cep)
      // }
    },
    async request () {
      try {
        const { data } = await users.getAllUsers()
        this.users = data.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    this.request()
  }
}
</script>
