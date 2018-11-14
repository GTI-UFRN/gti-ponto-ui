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

const data = [
  {
    active: true,
    _id: '5bcdb4299a2c66001b47fde3',
    name: 'Iron Lucas Nascimento de Oliveira',
    email: 'iron.lucas.7@outlook.com',
    birthday: '1997-12-21T03:00:00.000Z',
    username: 'iron.lucas.7',
    registration: '20160144375',
    bankAccount: {
      _id: '5bcdb4299a2c66001b47fde4',
      agency: '763',
      account: '41191-9',
      bank: '104',
      operation: '013'
    },
    address: {
      _id: '5bcdb4299a2c66001b47fde5',
      cep: '59990000',
      number: '15'
    },
    __v: 0
  },
  {
    active: true,
    _id: '5bcdb4750876ec001c0b3515',
    name: 'Heverton Gomes',
    email: 'heverton.gomes2018@gmail.com',
    birthday: '1998-03-13T03:00:00.000Z',
    username: 'Heverton20',
    registration: '20180122123',
    bankAccount: {
      _id: '5bcdb4750876ec001c0b3516',
      agency: '1101',
      account: '35128-1',
      bank: '104',
      operation: '013'
    },
    address: {
      _id: '5bcdb4750876ec001c0b3517',
      cep: '59190000',
      number: '107'
    },
    __v: 0
  },
  {
    active: true,
    _id: '5bcdb47d0876ec001c0b3518',
    name: 'Lucas Antônio Lopes de Sousa',
    email: 'lucas-antonio2011@hotmail.com',
    birthday: '1994-08-12T03:00:00.000Z',
    username: 'lucasantonio12',
    registration: '20170136152',
    bankAccount: {
      _id: '5bcdb47d0876ec001c0b3519',
      agency: '13',
      account: '373876',
      bank: '104',
      operation: '013'
    },
    address: {
      _id: '5bcdb47d0876ec001c0b351a',
      cep: '59149333',
      number: '366'
    },
    __v: 0
  },
  {
    active: true,
    _id: '5bcdb4840876ec001c0b351b',
    name: 'Joane Gonçalo Felipe da Rocha',
    email: 'joaneg.rocha@gmail.com',
    birthday: '1995-11-10T03:00:00.000Z',
    username: 'joanerocha',
    registration: '20150125760',
    bankAccount: {
      _id: '5bcdb4840876ec001c0b351c',
      agency: '760',
      account: '250-4',
      bank: '104',
      operation: '013'
    },
    address: {
      _id: '5bcdb4840876ec001c0b351d',
      cep: '59540000',
      number: '7'
    },
    __v: 0
  },
  {
    active: true,
    _id: '5bcdb48f0876ec001c0b351e',
    name: 'Ayrton da Silva Barreto',
    email: 'ayrtonsbarreto@outlook.com',
    birthday: '1994-05-10T03:00:00.000Z',
    username: 'ayrtonsbarreto',
    registration: '20170003272',
    bankAccount: {
      _id: '5bcdb48f0876ec001c0b351f',
      agency: '',
      account: '',
      bank: '104',
      operation: '013'
    },
    address: {
      _id: '5bcdb48f0876ec001c0b3520',
      cep: '59104280',
      number: '30'
    },
    __v: 0
  },
  {
    active: true,
    _id: '5bcdb4970876ec001c0b3521',
    name: 'Arthur Vinicius Ribeiro Silva',
    email: 'devarthurribeiro@gmail.com',
    birthday: '1997-08-29T02:34:00.000Z',
    username: 'devarthurribeiro',
    registration: '20180122428',
    bankAccount: {
      _id: '5bcdb4970876ec001c0b3522',
      agency: '2256-0',
      account: '37409-1',
      bank: '001',
      operation: '001'
    },
    address: {
      _id: '5bcdb4970876ec001c0b3523',
      cep: '59280000',
      number: '42'
    },
    __v: 0
  },
  {
    active: true,
    _id: '5bcdb4a10876ec001c0b3524',
    name: 'João Paulo Santos de Farias',
    email: 'joaopaulokad@gmail.com',
    birthday: '1999-05-04T03:00:00.000Z',
    username: 'shouy',
    registration: '20180071070',
    bankAccount: {
      _id: '5bcdb4a10876ec001c0b3525',
      agency: '2010',
      account: '00124685-4',
      bank: '104',
      operation: '013'
    },
    address: {
      _id: '5bcdb4a10876ec001c0b3526',
      cep: '59575-000',
      number: '5'
    },
    __v: 0
  }
]

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
    }
  },
  data () {
    return {
      banks: [
        { value: '001', label: '001 - BANCO DO BRASIL S/A' },
        { value: '104', label: '104 - CAIXA ECONOMICA FEDERAL' }
      ],
      columns: tableColumns,
      selected: [],
      users: data,
      address: {},
      user: {
        bankAccount: {},
        address: {}
      },
      showForm: false
    }
  }
}
</script>
