<template>
  <div class="vue-template-wrapper">
    <div class="container-fluid cont-second">
      <div class="row">
        <div class="col-xs-12" v-if="content.about">
          <h1 class="info-header" v-html="content.about.title"></h1>
          <p class="info-text" v-html="content.about.content"></p>
        </div>
      </div>
    </div>
    <div class="container-fluid cont-second">
      <div class="row">
        <div class="col-xs-12 col-sm-6" v-if="content.training">
          <h2 class="info-header" v-html="content.training.title"></h2> 
          <p class="info-text" v-html="content.training.content"></p>
        </div>

        <div class="col-xs-12 col-sm-6" v-if="content.breeding">
          <h2 class="info-header" v-html="content.breeding.title"></h2>
          <p class="info-text" v-html="content.breeding.content">
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const Home = {
    data: function() {
      return {
        content: {
          about: null,
          training: null,
          breeding: null
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

  export default Home
</script>