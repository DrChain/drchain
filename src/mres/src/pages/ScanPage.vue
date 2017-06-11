<template>
  <div class="scan">
    <div class="center">
      <qr-code :text="text" size="500"></qr-code>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScanPage',
  data () {
    return {
      text: '{"content":{"patientId":"A12345678","applicant":{"id":2},"records":[{"hosiptalId":1,"recordId":1,}]}}',
      query: this.$route.params.query
    }
  },
  mounted () {
    this.generateQRCode()
  },
  methods: {
    generateQRCode () {
      console.log(this.query)
    }
  }
}
</script>

<style scoped>
.center {
  display: table;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
