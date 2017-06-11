<template>
  <div class="scan">
    <div class="center container">
      <div class="row">
        <div class="col-md-6">
          <qr-code :text="text" size="500"></qr-code>
        </div>
        <div class="col-md-6">
          <table v-if="record" class="table">
            <tbody>
              <tr>
                <th scope="row">紀錄名稱</th>
                <td>{{record.name}}</td>
              </tr>
              <tr>
                <th scope="row">Patient Id</th>
                <td>{{record.patientId}}</td>
              </tr>
              <tr>
                <th scope="row">Date</th>
                <td>{{record.date}}</td>
              </tr>
              <tr>
                <th scope="row">Physician Name</th>
                <td>{{record.physicianName}}</td>
              </tr>
              <tr>
                <th scope="row">ICD Code</th>
                <td>{{record.data.icd.code}}</td>
              </tr>
              <tr>
                <th scope="row">ICD Name</th>
                <td>{{record.data.icd.name}}</td>
              </tr>
              <tr>
                <th scope="row">醫囑</th>
                <td>{{record.data.docSect.subjective}}</td>
              </tr>
              <tr>
                <th scope="row">處方</th>
                <td>{{record.data.prescription[0]}}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
      this.record = JSON.parse(record)
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
