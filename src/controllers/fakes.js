const db = require('../models/index');
const { faker } = require('@faker-js/faker');
const Fakes = db.posts;

exports.create = (req, res) => {

    const posts = {
        title: faker.person.jobTitle(),
        description: faker.person.jobDescriptor(),
        published: true
    }
    Fakes.create(posts).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating post"
        });
    })
}
