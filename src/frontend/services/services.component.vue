<template>
  <div class="vue-template-wrapper">
    <div class="container-fluid cont-second">
      <div class="row">
        <div class="col-xs-12" v-if="content.services">
          <h1 class="info-header" v-html="content.services.title"></h1>
          <p class="info-text" v-html="content.services.content"></p>
        </div>
      </div>
    </div>
    <div class="container-fluid cont-second">
      <div class="row">
        <div class="col-xs-6" v-if="content.detection">
          <h2 v-html="content.detection.title" class="info-header"></h2>
          <p class="info-text" v-html="content.detection.content"></p>
        </div>
        <div class="col-xs-6" v-if="content.security">
          <h2 v-html="content.security.title" class="info-header"></h2>
          <p class="info-text" v-html="content.security.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const Services = {
    data: function() {
      return {
        content: {
          detection: null,
          security: null
        }
      }
    },
    created() {
      this.$http.get('/api/dynamic-content/list').then(response => {
        response.json().then(json => {
          this.content = json
        })
      }, error => {

      })
    }
  }

  export default Services
</script>