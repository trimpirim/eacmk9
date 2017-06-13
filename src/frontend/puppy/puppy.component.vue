<template>
  <div class="vue-template-wrapper" v-if="puppy && litter">
    <!--<div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <h1 class="info-header" v-html="litter.name"></h1>
        </div>
      </div>
    </div>-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <div class="row info-row-separator d-flex f-wrap">
            <!-- PUPPY INFO --> 
            <div class="col-xs-6 d-flex f-direction-column">
              <h1 class="info-header">
                {{ puppy.name }} ({{ litter.name }})
              </h1>
              <div class="info-content dog-info">
                <div class="dog-info-item">
                  <strong>
                    Description
                  </strong>
                  <p v-html="puppy.bio"></p>
                </div>

                <div class="dog-info-item">
                  <strong>
                    Date Of Birth
                  </strong>
                  <p>
                    {{ puppy.dateOfBirth|toDate }}
                  </p>
                </div>

                <div class="dog-info-item">
                  <strong>
                    Color
                  </strong>
                  <p v-html="puppy.color">
                  </p>
                </div>

                <div class="dog-info-item">
                  <strong>
                    Litter
                  </strong>
                  <p v-html="litter.name"></p>
                </div>

                <div class="dog-info-item">
                  <strong>
                    Evaluation
                  </strong>
                  <p v-html="puppy.evaluation"></p>
                </div>
              </div>
            </div>
            <!-- PUPPY INFO END --> 

            <!-- PUPPY IMAGES --> 
            <div class="col-xs-6 d-flex f-direction-column">
              <div class="info-content info-content-without-header">
                <div v-if="puppy.images.length > 0">
                  <img :src="'/images/display?image=' + puppy.images[0].content._id" style="height: 300px; display: block; margin: 0 auto; padding: 10px;">
                  <div class="row">
                    <div class="col-xs-3" v-for="image in puppy.images">
                      <img class="img-pup" :src="'/images/display?image=' + image.content._id" style="cursor: pointer;"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- PUPPY IMAGES END -->
        </div>

        <!-- LINEAGE --> 
        <div class="col-xs-12">
          <div class="row info-row-separator">
            <div class="col-xs-12">
              <div class="row d-flex f-wrap">
                <div class="col-xs-6 d-flex f-direction-column">
                  <div class="row">
                    <div class="col-xs-12">
                      <h2 class="info-header">
                        Lineage
                      </h2>
                      <div class="info-content">
                        <div class="row">
                          <div class="col-xs-6">
                            <div class="dog-block">
                              <strong v-html="sire.name"></strong>
                              <img class="img-responsive center-block" :src="'/images/display?image=' + sire.images[0].content._id" v-if="sire.images.length > 0">
                            </div>
                          </div>
                          <div class="col-xs-6">
                            <div class="dog-block">
                              <strong v-html="dam.name"></strong>
                              <img class="img-responsive center-block" :src="'/images/display?image=' + dam.images[0].content._id" v-if="dam.images.length > 0">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xs-6 d-flex f-direction-column">
                  <div class="info-content info-content-without-header">
                    <div class="lineage-tree">
                      <div class="branch branch-root">
                        <div class="entry">
                          <div class="label"> 
                            {{ sire.name }}
                          </div>
                          <div class="branch" v-if="sire.sire || sire.dam">
                            <div class="entry" v-if="sire.sire">
                              <div class="label">
                                {{ sire.sire.name }}
                              </div>
                              <div class="branch" v-if="sire.sire.sire || sire.sire.dam">
                                <div class="entry" v-if="sire.sire.sire">
                                  <div class="label">
                                    {{ sire.sire.sire.name }}
                                  </div>
                                </div>
                                <div class="entry" v-if="sire.sire.dam">
                                  <div class="label">
                                    {{ sire.sire.dam.name }}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="entry" v-if="sire.dam">
                              <div class="label">
                                {{ sire.dam.name }}
                              </div>
                              <div class="branch" v-if="sire.dam.sire || sire.dam.dam">
                                <div class="entry" v-if="sire.dam.sire">
                                  <div class="label">
                                    {{ sire.dam.sire.name }}
                                  </div>
                                </div>
                                <div class="entry" v-if="sire.dam.dam">
                                  <div class="label">
                                    {{ sire.dam.dam.name }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="entry">
                          <div class="label"> 
                            {{ dam.name }}
                          </div>
                          <div class="branch" v-if="dam.sire || dam.dam">
                            <div class="entry" v-if="dam.sire">
                              <div class="label">
                                {{ dam.sire.name }}
                              </div>
                              <div class="branch" v-if="dam.sire.sire || dam.sire.dam">
                                <div class="entry" v-if="dam.sire.sire">
                                  <div class="label">
                                    {{ dam.sire.sire.name }}
                                  </div>
                                </div>
                                <div class="entry" v-if="dam.sire.dam">
                                  <div class="label">
                                    {{ dam.sire.dam.name }}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="entry" v-if="dam.dam">
                              <div class="label">
                                {{ dam.dam.name }}
                              </div>
                              <div class="branch" v-if="dam.dam.sire || dam.dam.dam">
                                <div class="entry" v-if="dam.dam.sire">
                                  <div class="label">
                                    {{ dam.dam.sire.name }}
                                  </div>
                                </div>
                                <div class="entry" v-if="dam.dam.dam">
                                  <div class="label">
                                    {{ dam.dam.dam.name }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <!-- LINEAGE END --> 

        <!-- PUPPIES LIST OF LITTER -->
        <div class="col-xs-12">
          <div class="row">
            <div class="col-xs-6">
              <h2 class="info-header">
                Puppy List and Availability
              </h2>
              <div class="info-content">
                <div class="row">
                  <div class="col-xs-3" v-for="puppy in puppies">
                    <div class="dog-block">
                      <router-link :to="{name: 'puppy', params: {id: puppy._id}}">
                        <strong>{{ litter.name }}</strong>
                      </router-link>
                      <img class="img-responsive" :src="'/images/display?image=' + puppy.images[0].content._id" v-if="puppy.images.length > 0" />
                    </div>
                  </div>
                  <small class="availability-unavailable" v-if="!puppy.available"></small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PUPPIES LIST OF LITTER END -->
      </div>
    </div>
    <!--
    <div class="container-fluid cont-pup" v-if="litter">
      <div class="row">
        <div class="col-xs-6">
          <div class="col-describe">
            <ul class="describe">
              <li class="name">
                <strong v-html="litter.name"></strong>
              </li>
            </ul>
            <div v-if="puppy.images.length > 0">
              <img :src="'/images/display?image=' + puppy.images[0].content._id" style="height: 300px; display: block; margin: 0 auto; padding: 10px;">
              <div class="row row-pups">
                <div class="col-xs-3" v-for="image in puppy.images">
                  <img class="img-pup" :src="'/images/display?image=' + image.content._id" style="cursor: pointer;" onclick="showImage('img/Puppy1.jpg');" />
                </div>
              </div>
            </div>
          </div>
          <h5 style="padding:20px;"><strong>Puppy List and Availability</strong></h5>
          <div class="row">
            <div class="col-xs-3" v-for="puppy in puppies">
              <img class="img-pup" :src="'/images/display?image=' + puppy.images[0].content._id" v-if="puppy.images.length > 0" style="cursor: pointer;" onclick="showImage('img/puppy.jpg');" />
              <router-link :to="{name: 'puppy', params: {id: puppy._id}}">
                {{ litter.name }}
              </router-link>
              <small class="availability-unavailable" v-if="!puppy.available"></small>
            </div>
          </div>
        </div>

        <div class="col-xs-6 col-description" style="border-left: 1px solid white; min-height: 500px;">
          <h4 style="background-color: none; padding: 10px;"> <strong>Description</strong> </h4>
          <p style="padding: 10px;" v-html="puppy.bio"></p>
          <ul style="padding: 10px;">
            <li style="padding-bottom: 5px;"><strong>Date Of Birth: </strong><span>{{ puppy.dateOfBirth|toDate }}</span></li>
            <li style="padding-bottom: 5px;"><strong>Color: </strong><span v-html="puppy.color"></span></li>
            <li style="padding-bottom: 5px;"><strong>Litter: </strong><span v-html="litter.name"></span></li>
            <li style="padding-bottom: 5px;"><strong>Evaluation:</strong><span v-html="puppy.evaluation"></span></li>
          </ul>
          <div class="cont-lineage" v-if="hasLineage()">
            <div class="row">
              <h5 class="lineage-h">Lineage</h5>
              <div class="col-xs-6 col-mom" style=" border-bottom: 1px solid white; background-color: rgba(52, 73, 94, 0.5);">
                <img class="img-lineage-mother" :src="'/images/display?image=' + sire.images[0].content._id" v-if="sire.images.length > 0">
              </div>
              
              <div class="col-xs-6 col-dad" style=" border-bottom: 1px solid white; background-color: rgba(52, 73, 94, 0.5);">
                <img class="img-lineage-father" :src="'/images/display?image=' + dam.images[0].content._id" v-if="dam.images.length > 0">
              </div>
            </div>
            <div class="row">
              <div class="col-xs-3">
                <div class="gran-sire-dam">
                  {{ sire.name }}
                </div>
                <div class="row">
                  <div class="col-xs-6 col-great-sire" v-if="sire.sire">
                    <div class="great-gran-sire"> 
                      {{ sire.sire.name }}
                    </div>
                  </div>
                  <div class="col-xs-6 col-great-dam" v-if="sire.dam">
                    <div class="great-gran-dam">
                      {{ sire.dam.name }} 
                    </div>
                  </div>
                  
                </div>
              </div>
              

              <div class="col-xs-3">
                <div class="gran-sire-dam">
                  {{ dam.name }}
                </div>
                <div class="row">
                  <div class="col-xs-6 col-great-sire" v-if="dam.sire">
                    <div class="great-gran-sire">
                      {{ dam.sire.name }}
                    </div>
                  </div>
                  <div class="col-xs-6 col-great-dam" v-if="dam.dam">
                    <div class="great-gran-dam">
                      {{ dam.dam.name }}
                    </div>
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
    -->
  </div>
</template>

<script>
  const Puppy = {
    data: function() {
      return {
        litter: null,
        puppy: null,
        puppies: [],
        sire: null,
        dam: null
      }
    },
    created() {
      console.log("A")
      this.loadData()
    },
    methods: {
      hasLineage() {
        return !!this.sire && !!this.dam
      },
      loadData() {
        console.log(this.$route.params.id)
        this.$http.get('/api/dogs/' + this.$route.params.id).then(response => {
          response.json().then(json => {
            this.puppy = json

            if (this.puppy.sire) {
              this.sire = this.puppy.sire
            }

            if (this.puppy.dam) {
              this.dam = this.puppy.dam
            }

            this.$http.get('/api/dogs?litter=' + this.puppy.litter._id + '&puppy=1').then(response => {
              response.json().then(json => {
                this.puppies = json
              })
            }, error => {

            })

            this.$http.get('/api/litters/' + this.puppy.litter._id).then(response => {
              response.json().then(json => {
                this.litter = json
              })
            }, error => {

            })
          })
        }, error => {

        })
      }
    },
    filters: {
      toDate: function(date) {
        return moment(date).format('YYYY MM DD')
      }
    },
    watch: {
      '$route': function(to, from) {
        if (from.params.id !== to.params.id) {

          return this.loadData()

        }
      }
    }
  }

  export default Puppy
</script>