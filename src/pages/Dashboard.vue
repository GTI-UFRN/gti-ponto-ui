<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 col-md-6 col-lg-4">
        <h1 class="q-headline">Resumo</h1>
        <q-list highlight>
          <q-list-header>Bolsistas</q-list-header>
          <q-item v-for="user in users" :key="user._id" separator>
            <q-item-side>
              <q-item-tile avatar>
                <img :src="user.photoURL || 'https://png.pngtree.com/svg/20161212/personal_default_avatar_for_mobile_phone_app__146524.png'">
              </q-item-tile>
            </q-item-side>
            <q-item-main>
              <q-item-tile label>
                <a @click="showModal(user)">{{user.name}}</a>
              </q-item-tile>
              <q-item-tile sublabel>
                <b>Chamados Abertos</b> 2 <br>
              </q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-item-tile icon="fiber_manual_record" color="green" />
            </q-item-side>
          </q-item>
        </q-list>
      </div>
    </div>
    <q-modal v-model="showProfile">
      <div class="column flex-center user-profile">
        <img class="profile-img" :src="userProfile.photoURL || 'https://png.pngtree.com/svg/20161212/personal_default_avatar_for_mobile_phone_app__146524.png'">
        <br>
        <p class="user-info">
          <b> <i class="material-icons">account_circle</i> {{userProfile.name}}</b> <br>
          <b> <i class="material-icons">note</i> Matrícula </b>{{userProfile.registration}} <br>
          <b> <i class="material-icons">mail</i> Email </b><a :href="`mailto:${userProfile.email}`">{{userProfile.email}}</a> <br>
          <b> <i class="material-icons">phone</i> Telefone </b> <a :href="`https://wa.me/+55${userProfile.phone}`" target="_blank">{{userProfile.phone}}</a> <br>
          <b> <i class="material-icons text-green" >fiber_manual_record</i> Status </b> {{userProfile.active ? 'Ativo' : 'Inativo'}} <br>
        </p>
      </div>
    </q-modal>
  </q-page>
</template>

<script>
import users from '../services/users'

export default {
  methods: {
    async request () {
      try {
        const { data } = await users.getAll()
        this.users = data.data
      } catch (error) {
        console.log(error)
      }
    },
    showModal (user) {
      this.showProfile = true
      this.userProfile = user
    }
  },
  data () {
    return {
      users: [],
      userProfile: {},
      showProfile: false
    }
  },
  created () {
    this.request()
  }
}
</script>

<style>
  .q-item-avatar img{
    width: 42px;
    height: 42px;
  }

  .profile-img {
    width: 160px;
    height: 160px;
    border-radius: 100%;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }

  .user-profile {
    padding: 16px;
  }

  .user-info {
    line-height: 24px;
  }
</style>
