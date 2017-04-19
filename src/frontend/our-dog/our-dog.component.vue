<template>
  <div class="vue-template-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-6">
          <div class="js-slick-slider" v-if="dog">
            <div class="slider-item" v-for="image in dog.images">
              <img class="responsive" :src="'/images/display?image=' + image.content" width="500" height="auto" />
            </div>
          </div>
        </div> 
        <div class="col-xs-6">
          <div class="col-describe">
            <ul class="describe">
              <li class="name">NAME: {{ dog.title }}
              </li>
              <li>
                <p class="describe-paragraph">
                  {{ dog.bio }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const OurDog = {
    data: function() {
      return {
        dog: {}
      }
    },
    created() {
      this.$http.get('/api/dogs/' + this.$route.params.dog).then(response => {
        response.json().then(json => {
          this.dog = json
          $('.js-slick-slider').slick({
            arrows: false,
            slidesToShow: 1
          })
        })
      }, error => {

      })
    }
  }

  export default OurDog
</script>