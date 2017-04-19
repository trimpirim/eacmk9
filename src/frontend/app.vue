<template>
<div class="container-fluid">
  <nav class="navbar nav-inverse nav-background">
    <ul class="nav navbar-nav">
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
          <li v-for="litter in litters">
            <router-link :to="{name: 'upcoming-litters', params: {id: litter._id}}">
              {{ litter.title }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>

  <router-view></router-view>

  <div id="largeImgPanel" onclick="hideMe(this);">
    <img id="largeImg">
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      litters: []
    }
  },
  created() {
    this.$http.get('/api/litters').then(response => {
      response.json().then(json => {
        this.litters = json
      })
    }, error => {

    })
  }
}
</script>