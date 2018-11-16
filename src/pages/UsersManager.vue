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
      <q-btn @click="user = { bankAccount: {}, address: {} }; showUserForm()" icon="note_add" color="green">
        Novo usuário
      </q-btn>
    </div>
    <template slot="top-selection" slot-scope="props">
      <q-btn @click="user = selected[0]; showUserForm()" color="primary" flat label="Editar" class="q-mr-sm" />
      <div class="col" />
    </template>
  </q-table>
   <q-modal v-model="showForm" maximized>
    <div style="padding: 16px">
      <h1 class="q-headline">Dados básicos</h1>
      <form>
        <div class="row gutter-sm">
          <div class="col-xs-12 col-md-3">
            <q-field>
              <q-input v-model="user.name" float-label="Nome"  />
            </q-field>
          </div>
          <div class="col-xs-12 col-md-3">
            <q-field>
              <q-input v-model="user.email" float-label="Email"  />
            </q-field>
          </div>
          <div class="col-xs-12 col-md-3">
            <q-field>
              <q-input v-model="user.registration" float-label="Matrícula"  />
            </q-field>
          </div>
          <div class="col-xs-12 col-md-3">
            <q-field>
              <q-datetime v-model="user.birthday" format="DD/MM/YY" type="date" float-label="Nascimento"/>
            </q-field>
          </div>
        </div>
        <h1 class="q-headline">Dados bancários</h1>
        <div class="row gutter-sm">
           <div class="col-xs-12 col-md-3">
            <q-field>
              <q-input v-model="user.bankAccount.agency" float-label="Agência"  />
            </q-field>
          </div>
          <div class="col-xs-12 col-md-3">
            <q-field>
              <q-input v-model="user.bankAccount.account" float-label="Conta"  />
            </q-field>
          </div>
          <div class="col-xs-12 col-md-3">
            <q-field>
              <q-select
                  v-model="user.bankAccount.bank"
                  float-label="Status"
                  radio
                :options="banks"
                />
            </q-field>
          </div>
          <div class="col-xs-12 col-md-3">
            <q-field>
              <q-input v-model="user.bankAccount.operation" float-label="Operação"/>
            </q-field>
          </div>
        </div>

        <h1 class="q-headline">Dados da bolsa</h1>
        <div class="row gutter-sm">
           <div class="col-xs-12 col-md-3">
            <q-field>
              <q-datetime v-model="user.createdAt" float-label="Data Entrada"  />
            </q-field>
          </div>
          <div class="col-xs-12 col-md-3">
            <q-field>
              <q-datetime v-model="user.exitAt" float-label="Data saida"  />
            </q-field>
          </div>
          <div class="col-xs-12 col-md-3">
            <q-field>
               <q-select
                  v-model="user.active"
                  float-label="Status"
                  radio
                :options="[{value: true, label: 'Ativo'}, {value: false, label: 'Inativo'}]"
                />
            </q-field>
          </div>
          <div class="col-xs-12 col-md-12">
            <q-field>
              <q-input v-model="user.operation" float-label="Observação"/>
            </q-field>
          </div>
        </div>
        <h1 class="q-headline">Dados de endereço</h1>
        <div class="row gutter-sm">
           <div class="col-xs-12 col-md-3">
            <q-field>
              <q-input v-model="user.address.cep" float-label="Cep"  />
            </q-field>
          </div>
          <div class="col-xs-12 col-md-3">
            <q-field>
              <q-input v-model="user.address.number" float-label="Número"  />
            </q-field>
          </div>
          <div class="col-12">
            <p>
              {{address.localidade}} - {{address.uf}} <br/>
              {{address.logradouro || 'Centro'}} <span v-if="address.bairro"> - {{address.bairro}}</span> <br/>
            </p>
          </div>
        </div>
        <br>
        <q-btn @click="showForm = false" color="green">
          Salvar
        </q-btn>
      </form>
    </div>
  </q-modal>
  </q-page>
</template>

<script>
import moment from 'moment'
import users from '../services/users'

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
      banks: [
        { value: '001', label: '001 - BANCO DO BRASIL S/A' },
        { value: '104', label: '104 - CAIXA ECONOMICA FEDERAL' }
      ],
      columns: tableColumns,
      selected: [],
      users: [],
      address: {},
      user: {
        bankAccount: {},
        address: {}
      },
      showForm: false
    }
  },
  methods: {
    getCep (cep) {
      const url = `https://viacep.com.br/ws/${cep}/json`
      fetch(url)
        .then(r => r.json())
        .then(r => {
          this.address = r
        })
    },
    showUserForm () {
      this.showForm = true
      if (this.user.address.cep && this.user.address.cep !== '') {
        this.getCep(this.user.address.cep)
      }
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
