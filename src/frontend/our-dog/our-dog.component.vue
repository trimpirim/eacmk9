<template>
  <div class="vue-template-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-6">
          <div v-if="dog.images.length > 0">
            <img class="responsive" :src="'/images/display?image=' + dog.images[0].content" width="500" height="auto" style="display: block; margin: 0 auto;" />

            <div class="row row-dog-photos">
              <div class="col-xs-3" v-for="image in dog.images">
                <img class="img-pup" :src="'/images/display?image=' + image.content" style="cursor: pointer" onclick="showImage('img/Puppy1.jpg');">
              </div>
            </div> 
          </div>
          <div class="planned-breedings">
            <h4 style="margin-bottom: 20px; border-bottom: 1px solid white;"><strong>Planned Breedings</strong></h4>
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

        <div class="col-xs-6" style="border-left: 1px solid white; min-height: 600px;">
          <div class="col-describe">
            <ul class="describe">
              <li class="name"><strong>Dog Bio</strong>
              </li>
              <li>
                <p class="describe-paragraph" v-html="dog.bio">
                </p>
              </li>
            </ul>
          </div>
          <div class="titles-certifications">
            <h4 style="margin-bottom: 20px; margin-top: 50px;"><strong style="border-bottom: 1px solid white;">Titles/ Certifications:</strong>
              <ul class="ul-titles">
                <li class="li-titles" v-for="award in dog.awards" v-html="award.title"></li>
              </ul>
            </h4>
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
        dog: {
          awards: [],
          images: []
        }
      }
    },
    created() {
      this.$http.get('/api/dogs/' + this.$route.params.dog).then(response => {
        response.json().then(json => {
          this.dog = json
        })
      }, error => {

      })
    }
  }

  export default OurDog
</script>