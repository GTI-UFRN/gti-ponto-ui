<template>
  <h1>espelho</h1>
</template>

<script>
  export default {
    name: "HistoryView",
    data() {
      return {}
    },
    methods: {},
    created() {
      if (!window.user) {
        this.$router.push("/login")
      }
    }
  }
</script>