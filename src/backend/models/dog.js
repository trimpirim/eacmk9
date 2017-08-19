const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    DogImage = require('./dog-image'),
    Award = require('./award'),
    SchemaHelper = require('../helpers/schema-helper')

const schema = new Schema({
    name: SchemaHelper.withDefault(String, ''),
    bio: SchemaHelper.withDefault(String, ''),
    dateOfBirth: SchemaHelper.withDefault(Date, Date.now),
    color: SchemaHelper.withDefault(String, ''),
    discipline: SchemaHelper.withDefault(Number, 1),
    gender: SchemaHelper.withDefault(Number, 1),
    puppy: SchemaHelper.withDefault(Boolean, false),
    available: SchemaHelper.withDefault(Boolean, true),
    litter: SchemaHelper.withRef(ObjectId, 'Litter'),
    sire: SchemaHelper.withRef(ObjectId, 'Dog'), //father
    dam: SchemaHelper.withRef(ObjectId, 'Dog'), //mother
    evaluation: SchemaHelper.withDefault(String, ''),
    createdAt: SchemaHelper.withDefault(Date, Date.now),
    updatedAt: Date,
    images: [
        SchemaHelper.withDefaultAndRef(ObjectId, new DogImage(), 'DogImage')
    ],
    awards: [
        SchemaHelper.withDefaultAndRef(ObjectId, new Award(), 'Award')
    ],
    breedings: [
        {
            dog: SchemaHelper.withRef(ObjectId, 'Dog'),
            text: SchemaHelper.withDefault(String, '')
        }
    ]
})

schema.pre('validate', true, function (next, done) {
    this.litter = SchemaHelper.ifNull(this.litter)
    this.sire = SchemaHelper.ifNull(this.sire)
    this.dam = SchemaHelper.ifNull(this.dam)

    next()
    done()
})

const autoPopulate = function (next) {
    this.populate('sire dam images litter awards')
    next()
}

schema
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate)

const Dog = mongoose.model('Dog', schema)

class Discipline {
    constructor(id, title, group) {
        this.id = id
        this.title = title
        this.position = id
        this.group = group
    }
}


Dog.DISCIPLINES = [
    new Discipline(2, 'ScH I', 'Schutzhund. BH'),
    new Discipline(3, 'ScH II', 'Schutzhund. BH'),
    new Discipline(4, 'ScH III', 'Schutzhund. BH'),
    new Discipline(6, 'PSA I', 'PSA. PDC'),
    new Discipline(7, 'PSA II', 'PSA. PDC'),
    new Discipline(8, 'PSA III', 'PSA. PDC'),
    new Discipline(10, 'Ring I', 'French Ring. Brevet'),
    new Discipline(11, 'Ring II', 'French Ring. Brevet'),
    new Discipline(12, 'Ring III', 'French Ring. Brevet'),
    new Discipline(14, 'Ring I', 'Mondio Ring.'),
    new Discipline(15, 'Ring II', 'Mondio Ring.'),
    new Discipline(16, 'Ring III', 'Mondio Ring.')
]

Dog.GENDERS = {
    MALE: 1,
    FEMALE: 2
}

module.exports = Dog