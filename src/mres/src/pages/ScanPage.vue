<template>
  <div class="scan">
    <div class="center">
      <qr-code :text="text" size="500"></qr-code>
      <div>
        {{record}}
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import wsconf from '../../env/backend'
export default {
  name: 'ScanPage',
  data () {
    return {
      text: '{"content":{"patientId":"A12345678","applicant":{"id":2},"records":[{"hosiptalId":1,"recordId":1}]}}',
      query: this.$route.params.query,
      record: null
    }
  },
  mounted () {
    this.generateQRCode()

    let socket = io(wsconf.url(window.location.hostname))
    this.socket = socket
    socket.on('record_received', (record) => {
      console.log(record)
      this.record = record
    })
  },

  beforeDestroy () {
    if (this.socket) {
      this.socket.disconnect()
    }
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
