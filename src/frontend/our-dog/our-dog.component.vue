<template>
  <div class="vue-template-wrapper" v-if="dog">
    <div class="container-fluid">
      <div class="row d-flex f-wrap">
        <div class="col-xs-12 col-sm-6 d-flex f-direction-column info-row-separator">
          <h1 class="info-header">
            {{ dog.name }}
          </h1>
          <div class="info-content dog-info">
            <div class="dog-info-item">
              <strong>
                Description
              </strong>
              <p v-html="dog.bio"></p>
            </div>

            <div class="dog-info-item">
              <strong>
                Date Of Birth
              </strong>
              <p>
                {{ dog.dateOfBirth|toDate }}
              </p>
            </div>

            <div class="dog-info-item">
              <strong>
                Color
              </strong>
              <p v-html="dog.color">
              </p>
            </div>

            <div class="dog-info-item" v-if="dog.awards && dog.awards.length > 0">
              <strong>Titles/Certifications</strong>
              <ul>
                <li v-for="award in dog.awards" v-html="award.title"></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 d-flex f-direction-column info-row-separator" v-if="dog.images.length > 0">
          <div class="info-content info-content-without-header">
            <img class="img-responsive center-block" :src="'/images/display?image=' + dog.images[0].content" width="500" height="auto" style="height: 300px; display: block; margin: 0 auto; padding: 10px;"/>
            <div class="row">
              <div class="col-xs-3" v-for="image in dog.images">
                <img class="img-responsive img-pup" :src="'/images/display?image=' + image.content">
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 d-flex f-direction-column info-row-separator">
          <h2 class="info-header">
            Planned breedings
          </h2>
          <div class="info-content">
            <ul>
              <li><a href=""><strong style="border-bottom: 1px solid white;">Nemesis</strong></a> x <a href=""><strong style="border-bottom: 1px solid white;">Other Malinois</strong></a> text here text here text here text heretext heretext heretext heretext here</li>
            </ul>
            <ul>
              <li><a href=""><strong style="border-bottom: 1px solid white;">Nemesis</strong></a> x <a href=""><strong style="border-bottom: 1px solid white;">Other Malinois</strong></a> text here text here text here</li>
            </ul>
            <ul>
              <li><a href=""><strong style="border-bottom: 1px solid white;">Nemesis</strong></a> x <a href=""><strong style="border-bottom: 1px solid white;">Other Malinois</strong></a> text here text here text here</li>
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
        dog: null
      }
    },
    created() {
      this.$http.get('/api/dogs/' + this.$route.params.dog).then(response => {
        response.json().then(json => {
          this.dog = json
        })
      }, error => {

      })
    },
    filters: {
      toDate: function(date) {
        return moment(date).format('YYYY MM DD')
      }
    },
  }

  export default OurDog
</script>