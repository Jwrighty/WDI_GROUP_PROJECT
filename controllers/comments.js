const Group = require('../models/group');

function commentsCreate(req, res) {
  Group
  .findById(req.params.id)
  .exec()
  .then(group => {
    if (group.members.indexOf(req.user.id) !== -1) {
      req.body.user = req.user.id;
      group.comments.push(req.body);
      group.save();

      return res.status(200).json(group);
    } else {
      return res.status(500).json({ message: 'You must be a member to comment on the group'});
    }
  })
  .catch(err => console.log(err));
}

// function commentsDelete(req, res) {
//   Group
//     .findById(req.params.groupId)
//     .exec()
//     .then(group => {
//       const comment = group.comments.id(req.params.commentId);
//       comment.remove();
//       group.save();
//       res.status(200).json(group);
//     });
// }


module.exports  =  {
  create: commentsCreate
  // delete: commentsDelete
};
