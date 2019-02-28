<template>
  <div style="padding: 16px">
    <h1 class="q-headline">Dados básicos</h1>
    <form @submit.prevent="save">
      <div class="row gutter-sm">
        <div class="col-xs-12 col-md-3">
          <q-field>
            <q-input v-model="user.name" float-label="Nome" required />
          </q-field>
        </div>
        <div class="col-xs-12 col-md-3">
          <q-field>
            <q-input v-model="user.email" float-label="Email" required />
          </q-field>
        </div>
        <div v-if="register" class="col-xs-12 col-md-3">
          <q-field>
            <q-input v-model="user.username" float-label="Usuário" required />
          </q-field>
        </div>
        <div v-if="register" class="col-xs-12 col-md-3">
          <q-field>
            <q-input v-model="user.password" float-label="Senha" type="password" required />
          </q-field>
        </div>
        <div class="col-xs-12 col-md-2">
            <q-field>
              <q-input v-model="user.phone" float-label="Fone" required />
            </q-field>
        </div>
        <div class="col-xs-12 col-md-2">
          <q-field>
            <q-input v-model="user.registration" float-label="Matrícula" required />
          </q-field>
        </div>
        <div class="col-xs-12 col-md-2">
          <q-field>
            <q-datetime v-model="user.birthday" format="DD/MM/YY" type="date" float-label="Nascimento" required />
          </q-field>
        </div>
        <div class="col-xs-12 col-md-12">
          <q-field>
            <q-uploader v-model="file" name="profile" url="" :upload-factory="uploadFile" float-label="Foto do perfil" />
          </q-field>
        </div>
      </div>
      <h1 class="q-headline">Dados da bolsa</h1>
      <div class="row gutter-sm">
        <div class="col-xs-12 col-md-3">
          <q-field>
            <q-select
              v-model="user.type"
              float-label="Tipo" radio :options="[{value: 'bolsista', label: 'Bolsista'}, {value: 'estagiario', label: 'Estágiario'}]"
              required
              />
          </q-field>
        </div>
      </div>
      <div v-if="!register" class="row gutter-sm">
        <div class="col-xs-12 col-md-3">
          <q-field>
            <q-datetime v-model="user.entryAt" float-label="Data Entrada"  />
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
              float-label="Status" radio :options="[{value: true, label: 'Ativo'}, {value: false, label: 'Inativo'}]"
              />
          </q-field>
        </div>
        <div class="col-xs-12 col-md-3">
          <q-field>
            <q-input v-model="user.ocomonId" float-label="Id do ocomon"/>
          </q-field>
        </div>
        <div class="col-xs-12 col-md-12">
          <q-field>
            <q-input v-model="user.obs" float-label="Observação"/>
          </q-field>
        </div>
      </div>
      <div v-show="user.type == 'bolsista'">
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
                float-label="Banco"
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
      </div>
      <h1 class="q-headline">Dados de endereço</h1>
      <div class="row gutter-sm">
        <div class="col-xs-12 col-md-3">
          <q-field>
            <q-input v-model="user.address.cep" float-label="Cep" />
          </q-field>
        </div>
        <div class="col-xs-12 col-md-3">
          <q-field>
            <q-input v-model="user.address.number" float-label="Número" />
          </q-field>
        </div>
        <div class="col-12">
          <p>
            {{address.localidade}} - {{address.uf}} <br/>
            {{address.logradouro || 'Centro'}} <span v-if="address.bairro"> - {{address.bairro}}</span> <br/>
          </p>
        </div>
      </div>
      <br/>
      <q-btn type="submit" color="green">
        Salvar
      </q-btn>
    </form>
  </div>
</template>

<script>
import users from '../services/users'

export default {
  name: 'UserForm',
  props: ['user', 'register'],
  data () {
    return {
      address: {},
      file: null,
      banks: [
        { value: '001', label: '001 - BANCO DO BRASIL S/A' },
        { value: '104', label: '104 - CAIXA ECONOMICA FEDERAL' }
      ]
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
    uploadFile (file, updateProgress) {
      delete this.user.photoURL
      users.setImageProfile(this.user, file).then((r) => {
        file = null
      }).catch(e => {
        console.log(e)
      })
    },
    save () {
      this.$emit('onSave', this.user)
    }
  },
  watch: {
    user: function () {
      if (this.user.address.cep && this.user.address.cep !== '') {
        this.getCep(this.user.address.cep)
      }
    }
  }
}
</script>
