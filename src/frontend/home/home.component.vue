<template>
    <div class="vue-template-wrapper home-component">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <h1>EACM K9</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <slick ref="slick" :options="slickOptions">
                        <div>
                            <img src="/images/k9-slide1.jpg" alt="" class="img-responsive img-centered-vertically"/>
                        </div>
                        <div>
                            <img src="/images/k9-slide2.jpg" alt="" class="img-responsive img-centered-vertically"/>
                        </div>
                        <div>
                            <img src="/images/k9-slide1.jpg" alt="" class="img-responsive img-centered-vertically"/>
                        </div>
                        <div>
                            <img src="/images/k9-slide2.jpg" alt="" class="img-responsive img-centered-vertically"/>
                        </div>
                    </slick>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4 col-xs-12" v-if="content.breeding">
                    <h2 v-html="content.breeding.title" class="info-header"></h2>
                    <div class="info-text">
                        <p v-html="content.breeding.shortContent" class="s-3x-margin-bottom short-content"></p>
                        <img src="/images/home-image.jpg" class="img-responsive center-block s-2x-margin-bottom"/>
                        <router-link :to="{name: 'about'}" class="btn btn-primary btn-rounded-transparent u-full-width">
                            Read more
                        </router-link>
                    </div>
                </div>
                <div class="col-sm-4 col-xs-12" v-if="content.training">
                    <h2 v-html="content.training.title" class="info-header"></h2>
                    <div class="info-text">
                        <p v-html="content.training.shortContent" class="s-3x-margin-bottom short-content"></p>
                        <img src="/images/home-image.jpg" class="img-responsive center-block s-2x-margin-bottom"/>
                        <router-link :to="{name: 'about'}" class="btn btn-primary btn-rounded-transparent u-full-width">
                            Read more
                        </router-link>
                    </div>
                </div>
                <div class="col-sm-4 col-xs-12" v-if="content.services">
                    <h2 v-html="content.services.title" class="info-header"></h2>
                    <div class="info-text">
                        <p v-html="content.services.shortContent" class="s-3x-margin-bottom short-content"></p>
                        <img src="/images/home-image.jpg" class="img-responsive center-block s-2x-margin-bottom"/>
                        <router-link :to="{name: 'services'}"
                                     class="btn btn-primary btn-rounded-transparent u-full-width">
                            Read more
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="row s-3x-margin-top">
                <div class="col-xs-12">
                    <div class="info-content">
                        <div class="row">
                            <div class="col-sm-6 col-xs-12">
                                <div class="row">
                                    <div class="col-xs-12 s-1x-margin-bottom">
                                        <h2 class="no-background">
                                            Our dogs
                                        </h2>
                                    </div>
                                    <div class="col-sm-4 col-xs-12" v-for="dog in dogs" v-if="dog.images.length > 0">
                                        <div class="row">
                                            <div class="col-xs-12 puppy-image-box">
                                                <router-link :to="{name: 'our-dog', params: {dog: dog._id}}">
                                                    <img class="img-responsive"
                                                         :src="'/images/display?image=' + dog.images[0].content">
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-xs-12 s-1x-margin-top">
                                <p v-if="content['our-dogs-information']"
                                   v-html="content['our-dogs-information'].content"></p>
                                <router-link :to="{name: 'our-dogs'}"
                                             class="btn btn-primary btn-rounded-transparent btn-padded">
                                    More dogs
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Slick from 'vue-slick';

    const Home = {
        data: function () {
            return {
                content: {
                    training: null,
                    breeding: null,
                    services: null,
                    'our-dogs-information': null
                },
                slickOptions: {
                    slidesToShow: 1,
                    adaptiveHeight: false
                },
                dogs: []
            }
        },
        created() {
            this.$http.get('/api/dynamic-content/list').then(response => {
                response.json().then(json => {
                    this.content = json
                })
            }, error => {

            })

            this.loadDogs({puppy: false}, dogs => {
                this.dogs = dogs
            })
        },
        components: {
            'slick': Slick
        },
        methods: {
            loadDogs(filterData = {}, callback = (json) => {
            }) {
                const url = Object.keys(filterData).map(function (k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(filterData[k])
                }).join('&')

                this.$http.get('/api/dogs?' + url).then(response => {
                    response.json().then(json => {
                        callback.apply(null, [json])
                    })
                }, error => {

                })
            }
        }
    }

    export default Home
</script>