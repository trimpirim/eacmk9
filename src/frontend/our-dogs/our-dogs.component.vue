<template>
  <div class="vue-template-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <h3 class="kratos">KRATOS</h3>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-2">
        </div>
        <div class="col-xs-8">
          <div class="dog-list">
            <ul class="dog-name" v-for="dog in dogs">
              <li>
                <router-link :to="{name: 'our-dog', params: {dog: dog._id}}">{{ dog.title }}</router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-xs-2">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  const OurDogs = {
    name: 'our-dogs',
    data: function() {
      return {
        dogs: []
      }
    },
    created() {
      this.$http.get('/api/dogs').then(response => {
        response.json().then(json => {
          this.dogs = json
        })
      }, error => {

      })
    }
  }

  export default OurDogs
</script>