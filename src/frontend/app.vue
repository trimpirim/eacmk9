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
          <li class="drop-text"> 
            <router-link :to="{name: 'upcoming-litters', params: {littersName: '2017-nemesis-x-haras-van-acros'}}">
              2017<br> 
              Nemesis x Haras Van Acros
            </router-link>
          </li>
          <li>
            <router-link to="/litters/2018-nemesis-x-isa-x">
              2018<br> 
              Nemesis x <br />
              Isa x
            </router-link>
          </li>
          <li>
            <router-link to="/litters/2019-nemesis-x-isa-x">
              2019<br> 
              Nemesis x <br />
              Isa x
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

}
</script>