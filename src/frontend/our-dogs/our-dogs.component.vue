<template>
  <div class="vue-template-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <h1 class="info-header">Our dogs</h1>
        </div>
        <div class="col-xs-12">
          <div class="info-content">
            <div class="row">
              <div class="col-xs-12">
                <div class="row">
                  <div class="col-xs-12 col-sm-3" v-for="(searchableObject, key) in searchableObjects" v-if="searchableObject.items.length > 0">
                    <div class="dropdown-search">
                      <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                        {{ searchableObject.selectedTitleOrDefaultTitle() }}
                        <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <a href="javascript:void(0);" v-on:click="changeFilter(key, null)">
                            {{ searchableObject.title }}
                          </a>
                        </li>
                        <li v-for="item in searchableObject.items">
                          <a href="javascript:void(0);" v-on:click="changeFilter(key, item.value)">
                            {{ item.title }}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <div class="dog-list">
                  <ul class="dog-name" v-for="dog in dogs">
                    <li>
                      <router-link :to="{name: 'our-dog', params: {dog: dog._id}}">{{ dog.name }}</router-link>
                    </li>
                  </ul>
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
  class SearchableObject {
    constructor(title, items = []) {
      this.title = title
      this.items = items
    }

    select(value) {
      this.items = this.items.map(object => {
        object.active = (object.value === value)
        return object
      })
    }

    unselectAll() {
      this.items = this.items.map(object => {
        object.active = false
        return object
      })
    }

    selectedTitleOrDefaultTitle() {
      const filtered = this.items.filter(object => {
        return object.active
      })

      return filtered.length > 0 ? filtered[0].title : this.title
    }
  }

  const searchableObjects = {
    sire: new SearchableObject('Sire'),
    dam: new SearchableObject('Dam'),
    year: new SearchableObject('Year'),
    discipline: new SearchableObject('Discipline'),
    gender: new SearchableObject('Gender'),
    color: new SearchableObject('Color'),
    title: new SearchableObject('Title'),
    certificate: new SearchableObject('Certification'),
    age: new SearchableObject('Age'),
    litter: new SearchableObject('Litter')
  }

  const OurDogs = {
    name: 'our-dogs',
    data: function() {
      return {
        dogs: [],
        searchableObjects: searchableObjects
      }
    },
    created() {
      this.$http.get('/api/search/criterias').then(response => {
        response.json().then(json => {
          this.searchableObjects.color.items = json.colors
          this.searchableObjects.dam.items = json.dams
          this.searchableObjects.discipline.items = json.disciplines
          this.searchableObjects.gender.items = json.genders
          this.searchableObjects.litter.items = json.litters
          this.searchableObjects.sire.items = json.sires
          this.searchableObjects.year.items = json.years
          this.searchableObjects.title.items = json.titles
          this.searchableObjects.certificate.items = json.certificates
          this.searchableObjects.age.items = json.ages
        })
      }, error => {

      })

      this.loadData({puppy: false}, json => {
        this.dogs = json
      })
    },
    methods: {
      resetFilter() {
        Object.keys(this.searchableObjects).forEach(key => {
          let obj = this.searchableObjects[key]
          obj.unselectAll()
        })
      },
      activeFilters() {
        let filters = {}
        Object.keys(this.searchableObjects).forEach(key => {
          let obj = this.searchableObjects[key]
          let filtered = obj.items.filter(item => {
            return item.active
          })

          if (filtered.length > 0) {
            filtered = filtered[0]
            filters[key] = filtered.value
          }
        })

        return filters
      },
      changeFilter(key, value) {
        console.log(key, value)
        this.searchableObjects[key].unselectAll()
        this.searchableObjects[key].select(value)
        this.loadData(this.activeFilters(), (json) => {
          this.dogs = json
        })
      },
      loadData(filterData = {}, callback = (json) => {}) {
        const url = Object.keys(filterData).map(function(k) {
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

  export default OurDogs
</script>