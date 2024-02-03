const db = require('../models/index');

const Posts = db.posts;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body.title) {
        res.status(404).send({
            message: 'Content can not be empty'
        })
        return;
    }
    const posts = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Posts.create(posts).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating post"
        });
    })
}
exports.findAll = (req, res) => {
    const title = req.query.title;
    const conditions = title ? { title: { [Op.like]: `%${title}` } } : null;
    Posts.findAll({ where: conditions }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts"
        });
    });
}
exports.findOne = (req, res) => {
    const id = req.params.id;

    Posts.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Couldn't find Post with id ${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || `Error while retrieving posts with id ${id}.`
        })
    })
}
exports.update = (req, res) => {
    const id = req.params.id;
    Posts.update(req.body, {
        where: { id: id },
    }).then(num => {
        if (num == 1) {
            res.send({
                message: `Post was updated successfully`
            });
        } else {
            res.send({
                message: `can't update post with id ${id}`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || `error updating post with id ${id}`
        });
    })
}
exports.delete = (req, res) => {
    const id = req.params.id;
    Posts.destroy({
        where: { id: id },
    }).then(num => {
        if (num == 1) {
            res.send({ message: `Delete post with id ${id}` });
        } else {
            res.send({ message: `Cannot delete post with id ${id}` });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message || `error deleting post with id ${id}` });
    })
}
exports.deleteAll = (req, res) => {
    Posts.destroy({
        where: {},
        truncate: false,
    }).then(num => {
        res.send({ message: `${num} posts were deleted successfully` });
    }).catch(err => {
        res.status(500).send({ message: err.message || `error deleting all posts with id ${id}` });
    })
}
exports.findAllPublished = (req, res) => {
    Posts.findAll({
        where: { published: true }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || ` Some error occurred while retrieving Posts` });
    })
}