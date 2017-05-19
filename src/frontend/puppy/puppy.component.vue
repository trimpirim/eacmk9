<template>
  <div class="vue-template-wrapper">
    <div class="container-fluid cont-pup" v-if="litter">
      <div class="row">
        <div class="col-xs-6">
          <div class="col-describe">
            <ul class="describe">
              <li class="name">
                <strong v-html="litter.name"></strong>
              </li>
            </ul>
            <img src="img/Puppy1.jpg" style="height: 300px; display: block; margin: 0 auto; padding: 10px;">
            <div class="row row-pups">
              <div class="col-xs-3">
                <img class="img-pup" src="img/Puppy1.jpg" style="cursor: pointer" onclick="showImage('img/Puppy1.jpg');">
              </div>
              <div class="col-xs-3">
                <img class="img-pup" src="img/Puppy1.jpg" style="cursor: pointer" onclick="showImage('img/Puppy1.jpg');">
              </div>
              <div class="col-xs-3">
                <img class="img-pup" src="img/Puppy1.jpg" style="cursor: pointer" onclick="showImage('img/Puppy1.jpg');">
              </div>
              <div class="col-xs-3">
                <img class="img-pup" src="img/Puppy1.jpg" style="cursor: pointer" onclick="showImage('img/Puppy1.jpg');">
              </div>
            </div>
          </div>
          <h5 style="padding:20px;"><strong>Puppy List and Availability</strong></h5>
          <div class="row">
            <div class="col-xs-3">
              <img class="img-pup" src="img/Puppy1.jpg" style="cursor: pointer" onclick="showImage('img/Puppy1.jpg');">
              <small class="availability-unavailable">UNAVAILABLE</small>
            </div>
            <div class="col-xs-3">
              <img class="img-pup" src="img/Puppy1.jpg" style="cursor: pointer" onclick="showImage('img/Puppy1.jpg');">
            </div>
            <div class="col-xs-3">
              <img class="img-pup" src="img/Puppy1.jpg" style="cursor: pointer" onclick="showImage('img/Puppy1.jpg');">
            </div>
            <div class="col-xs-3">
              <img class="img-pup" src="img/Puppy1.jpg" style="cursor: pointer" onclick="showImage('img/Puppy1.jpg');">
              <small class="availability-unavailable">UNAVAILABLE</small>
            </div>

          </div>
          <div class="row">
            <div class="col-xs-3">
              <img class="img-pup" src="img/Puppy1.jpg" style="cursor: pointer" onclick="showImage('img/Puppy1.jpg');">
            </div>
            <div class="col-xs-3">
              <img class="img-pup" src="img/Puppy1.jpg" style="cursor: pointer" onclick="showImage('img/Puppy1.jpg');">
            </div>
            <div class="col-xs-3">
              <img class="img-pup" src="img/Puppy1.jpg" style="cursor: pointer" onclick="showImage('img/Puppy1.jpg');">
            </div>
            <div class="col-xs-3">
              <img class="img-pup" src="img/Puppy1.jpg" style="cursor: pointer" onclick="showImage('img/Puppy1.jpg');">
            </div>

          </div>
        </div>

        <div class="col-xs-6 col-description" style="border-left: 1px solid white; min-height: 500px;">
          <h4 style="background-color: none; padding: 10px;"> <strong>Description</strong> </h4>
          <p style="padding: 10px;" v-html="puppy.bio"></p>
          <ul style="padding: 10px;">
            <li style="padding-bottom: 5px;"><strong>Date Of Birth: </strong><span v-html="puppy.dateOfBirth"></span></li>
            <li style="padding-bottom: 5px;"><strong>Color: </strong><span v-html="puppy.color"></span></li>
            <li style="padding-bottom: 5px;"><strong>Litter: </strong><span v-html="litter.name"></span></li>
            <li style="padding-bottom: 5px;"><strong>Evaluation:</strong><span v-html="puppy.evaluation"></span></li>
          </ul>
          <div class="cont-lineage">
            <div class="row">
              <h5 class="lineage-h">Lineage</h5>
              <div class="col-xs-6 col-mom" style=" border-bottom: 1px solid white; background-color: rgba(52, 73, 94, 0.5);">
                <img class="img-lineage-mother" src="img/FB_IMG_1490587265409.jpg">
              </div>
              
              <div class="col-xs-6 col-dad" style=" border-bottom: 1px solid white; background-color: rgba(52, 73, 94, 0.5);">
                <img class="img-lineage-father" src="img/FB_IMG_1490587265409.jpg">
              </div>
            </div>
            <div class="row">
              <div class="col-xs-3">
                <div class="gran-sire-dam">
                  Gran Sire
                </div>
                <div class="row">
                  <div class="col-xs-6 col-great-sire">
                    <div class="great-gran-sire"> Great Gran Sire</div>
                  </div>
                  <div class="col-xs-6 col-great-dam">
                    <div class="great-gran-dam"> Great Gran Dam</div>
                  </div>
                  
                </div>
              </div>
              

              <div class="col-xs-3">
                <div class="gran-sire-dam">
                  Gran Dam
                </div>
                <div class="row">
                  <div class="col-xs-6 col-great-sire">
                    <div class="great-gran-sire"> Great Gran Sire</div>
                  </div>
                  <div class="col-xs-6 col-great-dam">
                    <div class="great-gran-dam"> Great Gran Dam</div>
                  </div>
                  
                </div>

              </div>

              <div class="col-xs-3">
                <div class="gran-sire-dam">
                  Gran Sire
                </div>
                <div class="row">
                  <div class="col-xs-6 col-great-sire">
                    <div class="great-gran-sire"> Great Gran Sire</div>
                  </div>
                  <div class="col-xs-6 col-great-dam">
                    <div class="great-gran-dam"> Great Gran Dam</div>
                  </div>
                </div>
              </div>
              <div class="col-xs-3">
                <div class="gran-sire-dam">
                  Gran Dam
                </div>
                <div class="row">
                  <div class="col-xs-6 col-great-sire">
                    <div class="great-gran-sire"> Great Gran Sire</div>
                  </div>
                  <div class="col-xs-6 col-great-dam">
                    <div class="great-gran-dam"> Great Gran Dam</div>
                  </div>
                  
                </div>

              </div>
            </div>      
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
  const Puppy = {
    data: function() {
      return {
        litter: null,
        puppy: null,
        puppies: []
      }
    },
    created() {
      this.$http.get('/api/dogs/' + this.$route.params.id).then(response => {
        response.json().then(json => {
          this.puppy = json

          this.$http.get('/api/dogs?litter=' + this.puppy.litter + '&puppy=1').then(response => {
            response.json().then(json => {
              this.puppies = json
            })
          }, error => {

          })

          this.$http.get('/api/litters/' + this.puppy.litter).then(response => {
            response.json().then(json => {
              this.litter = json
            })
          }, error => {

          })
        })
      }, error => {

      })
    }
  }

  export default Puppy
</script>