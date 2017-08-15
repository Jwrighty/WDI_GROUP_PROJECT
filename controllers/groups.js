const Group = require('../models/group');

function groupIndexRoute(req, res){
  Group
  .find()
  .exec()
  .then(groups => res.status(200).json(groups))
  .catch(err => res.status(500).json(err));
}

function groupCreateRoute(req, res){
  Group
  .create(req.body)
  .then(group => res.status(201).json(group))
  .catch(err => res.status(500).json(err));
}



function groupShowRoute(req, res){
  Group
  .findById(req.params.id)
  .populate('createdBy members')
  .exec()
  .then(group => {
    if(!group) return res.status(404).json({ message: 'no group found'});

    return res.status(200).json(group);
  })
  .catch(err => res.status(500).json(err));
}

function groupUpdateRoute(req, res){
  Group
  .findById(req.params.id)
  .exec()
  .then(group => {
    if(!group) return res.status(404).json({ message: 'no group found'});

    for(const field in req.body ){
      group[field] = req.body[field];
    }
    return group.save();
  })
  .then(group => res.status(200).json(group))
  .catch(err => res.status(500).json(err));
}

function groupDeleteRoute(req, res){
  Group
  .findById(req.params.id)
  .exec()
  .then(group => {
    if(!group) return res.status(404).json({ message: 'no group found'});

    return group.remove();
  })
  .then(()=> res.status(204).end())
  .catch(err => res.status(500).json(err));
}

function groupsAttending(req, res){
  Group
  .findById(req.params.id)
  .exec()
  .then(group => {
    if (group.members.indexOf(req.user.id) === -1) {
      group.members.push(req.user.id);
      group.save();
      res.sendStatus(201).json(group);
    } else {
      res.sendStatus(422);
    }
  });
}



module.exports = {
  index: groupIndexRoute,
  create: groupCreateRoute,
  show: groupShowRoute,
  update: groupUpdateRoute,
  delete: groupDeleteRoute,
  attending: groupsAttending
};
