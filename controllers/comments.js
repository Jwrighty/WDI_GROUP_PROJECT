const Group = require('../models/group');

function commentsCreate(req, res) {
  Group
  .findById(req.params.id)
  .exec()
  .then(group => {
    req.body.user = req.user._id;

    group.comments.push(req.body);
    group.save();

    res.status(200).json(group);
  });
}

function commentsDelete(req, res) {
  Group
    .findById(req.params.groupId)
    .exec()
    .then(group => {
      const comment = group.comments.id(req.params.commentId);
      comment.remove();
      group.save();
      res.status(200).json(group);
    });
}


module.exports  =  {
  create: commentsCreate,
  delete: commentsDelete
};
