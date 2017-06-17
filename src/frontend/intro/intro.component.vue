<template>
<div class="intro-component" v-bind:class="{'intro-component-seen': seen}">
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12 col-with-background">
        <div class="intro-component-content">
          <img class="img-responsive" src="images/logo.png" />
          <button type="button" class="btn btn-primary btn-rounded-transparent u-full-width" v-on:click="hideIntro">
            Dive in
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      seen: false,
    }
  },
  methods: {
    hideIntro: function() {
      this.seen = true
      sessionStorage.setItem('intro-seen', JSON.stringify(this.seen))
    }
  },
  created() {
    this.seen = (sessionStorage.getItem('intro-seen')) ? sessionStorage.getItem('intro-seen') : false
  },
  mounted() {

  }
}
</script>