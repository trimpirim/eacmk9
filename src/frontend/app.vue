<template>
<div class="container-fluid">
  <nav class="navbar nav-inverse nav-background">
    <ul class="nav navbar-nav collapse" id="navbar">
      <li>
        <router-link :to="{name: 'home'}">EACM K9</router-link>
      </li>
      <li>
        <router-link to="/services">SERVICES</router-link>
      </li>
      <li>
        <router-link :to="{name: 'our-dogs'}">OUR DOGS</router-link>
      </li>

      <li class="dropdown">
        <a href="#" data-toggle="dropdown" class="dropdown-toggle">
          UPCOMING LITTERS<b class="caret"></b>
        </a>
        <ul class="dropdown-menu">
          <li v-for="litter in filteredLitters">
            <router-link :to="{name: 'puppy', params: {id: litter.firstPuppy._id}}">
              {{ litter.name }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
    <div class="navbar-arrow collapsed" data-toggle="collapse" data-target="#navbar"></div>
  </nav>

  <intro></intro>

  <router-view></router-view>

  <div id="largeImgPanel" onclick="hideMe(this);">
    <img id="largeImg">
  </div>
</div>
</template>

<script>
import Intro from './intro/intro.component.vue'

export default {
  data() {
    return {
      litters: [],
      filteredLitters: []
    }
  },
  created() {
    this.$http.get('/api/litters').then(response => {
      response.json().then(json => {
        this.litters = json.filter(item => {
          return item.puppies.length > 0
        })

        this.filteredLitters = this.litters.filter(litter => {
          return litter.puppies.length > 0 && litter.puppies[0]
        }).map(litter => {
          litter.firstPuppy = litter.puppies[0]
          return litter
        })
      })
    }, error => {

    })
  },
  components: {
    'intro': Intro
  }
}
</script>