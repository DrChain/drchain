<template>
  <div id="app">
    <h1>QRCode</h1>
    <div class="margin">
     <qrcode :cls="qrCls" :value="qrText" :size="qrSize" :background="qrBackgroud" ></qrcode>
   </div>
  </div>
</template>

<script>
import Qrcode from 'v-qrcode'
import dbData from '../dbData.json'
import urlencode from 'urlencode'

export default {
  data () {
    var content = urlencode(dbData.hosiptals[0].name.toString())
    console.log('content:', content)
    return {
      qrCls: 'qrcode',
      qrText: content,
      qrSize: 300,
      qrBackgroud: '#FFFFFF'
    }
  },
  components: {
    Qrcode
  }
}
</script>

<style scoped>
  .margin {
    margin-left: 50px;
  }
</style>
