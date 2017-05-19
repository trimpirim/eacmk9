<template>
  <div class="vue-template-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-6">
          <h3 class="our-dogs-h">Our Dogs</h3>
        </div>
        <div class="col-xs-6">
          <h3>Search Dogs/ Puppies</h3>
        </div>  
      </div>

    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-6">
          <div class="dog-list">
            <ul class="dog-name" v-for="dog in dogs">
              <li>
                <router-link :to="{name: 'our-dog', params: {dog: dog._id}}">{{ dog.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="row row-search">
          <div class="col-xs-6">
            <div class="col-xs-4">
              <ul class="first-line">
                <div class="dropdown-search">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                    Sire<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#">HTML</a></li>
                    <li><a href="#">CSS</a></li>
                    <li><a href="#">JavaScript</a></li>
                  </ul>
                </div>
                <div class="dropdown-search">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                    Dam<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#">HTML</a></li>
                    <li><a href="#">CSS</a></li>
                    <li><a href="#">JavaScript</a></li>
                  </ul>
                </div>
                <div class="dropdown-search">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                    Year<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#">HTML</a></li>
                    <li><a href="#">CSS</a></li>
                    <li><a href="#">JavaScript</a></li>
                  </ul>
                </div>
              </ul>
            </div>
            <div class="col-xs-4">
              <ul class="second-line">
                <div class="dropdown-search">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                    Discipline<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#">HTML</a></li>
                    <li><a href="#">CSS</a></li>
                    <li><a href="#">JavaScript</a></li>
                  </ul>
                </div>
                <div class="dropdown-search">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                    Gender<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#">HTML</a></li>
                    <li><a href="#">CSS</a></li>
                    <li><a href="#">JavaScript</a></li>
                  </ul>
                </div>
                <div class="dropdown-search">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                    Color<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#">HTML</a></li>
                    <li><a href="#">CSS</a></li>
                    <li><a href="#">JavaScript</a></li>
                  </ul>
                </div>
              </ul>
            </div>
            <div class="col-xs-4">
              <ul class="third-line">
                <div class="dropdown-search">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                    Title<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#">HTML</a></li>
                    <li><a href="#">CSS</a></li>
                    <li><a href="#">JavaScript</a></li>
                  </ul>
                </div>
                <div class="dropdown-search">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                    Certification<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#">HTML</a></li>
                    <li><a href="#">CSS</a></li>
                    <li><a href="#">JavaScript</a></li>
                  </ul>
                </div>
                <div class="dropdown-search">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                    Age<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#">HTML</a></li>
                    <li><a href="#">CSS</a></li>
                    <li><a href="#">JavaScript</a></li>
                  </ul>
                </div>
              </ul>
            </div>

          </div>
          <img class="search-icon" src="img/research.png">
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
      this.$http.get('/api/dogs?puppy=false').then(response => {
        response.json().then(json => {
          this.dogs = json
        })
      }, error => {

      })
    }
  }

  export default OurDogs
</script>