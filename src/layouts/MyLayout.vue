<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar class="bg-nav">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          GTI Ponto
          <div slot="subtitle">Sistema de Ponto Gerência de Tecnologia da Informação - EAJ</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Menu</q-list-header>
        <q-item v-for="item in menuItens" :key="item.label" @click.native="gotTo(item.router)">
          <q-item-side :icon="item.icon" />
          <q-item-main :label="item.label"/>
        </q-item>
        <q-item @click.native="logout">
          <q-item-side icon="exit_to_app" />
          <q-item-main label="Sair"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar"

const defaultMenuItens = [
  {icon: 'home', label: 'Início', router: '/'},
  {icon: 'list', label: 'Espelho', router: '/history'},
]

const adminMenuItens = [
  {icon: 'home', label: 'Início', router: '/'},
  {icon: 'list', label: 'Espelhos', router: '/history-admin'},
  {icon: 'account_circle', label: 'Usuários', router: '/users'},
]

export default {
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen: false,
      menuItens:  (window.user && window.user.rules.includes('admin')) ?  adminMenuItens : defaultMenuItens 
    }
  },
  methods: {
    openURL,
    logout() {
      delete window.user
      this.$router.push("/login")
    },
    gotTo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style>
.bg-nav {
  background: linear-gradient(
    45deg,
    rgb(100, 168, 121) 0%,
    rgb(53, 155, 172) 40%,
    rgb(52, 152, 185) 60%,
    rgb(71, 160, 152) 100%
  ) !important;
}
</style>
