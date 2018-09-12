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
          <div slot="subtitle">Sitema de Ponto Gerência de Tecnologia da Informação - EAJ</div>
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
        <q-item @click.native="$router.push('/')">
          <q-item-side icon="home" />
          <q-item-main label="Início"/>
        </q-item>
        <q-item @click.native="$router.push('/')">
          <q-item-side icon="list" />
          <q-item-main label="Espelho"/>
        </q-item>
        <q-item @click.native="$router.push('/login')">
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
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
.bg-nav {
	  background: linear-gradient(45deg, rgb(100, 168, 121) 0%, rgb(53, 155, 172) 40%, rgb(52, 152, 185) 60%, rgb(71, 160, 152) 100%) !important;
	}
</style>
