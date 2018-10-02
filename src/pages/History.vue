<template>
  <h1>espelho</h1>
</template>

<script>
import moment from "moment"
import ponto from "../services/ponto/api"
function getMonthDateRange() {
  const date = new Date();
  const year = date.getFullYear()
  const month = date.getMonth()

  const startDate = moment([year, month - 1]);
  const endDate = moment(startDate).endOf('month');

  return { start: startDate.toDate(), end: endDate.toDate() };
}
export default {
  name: "HistoryView",
  data() {
    return {}
  },
  methods: {},
  created() {
    if (!window.user) {
      this.$router.push("/login")
      return
    }
    console.log(getMonthDateRange())
    ponto.getMirror(window.user._id, getMonthDateRange()).then(({ data }) => {
      if (data.data) {
        console.log(data.data)
      }
    })
  }
}
</script>