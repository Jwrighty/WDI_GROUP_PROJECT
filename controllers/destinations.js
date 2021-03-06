const Group  = require('../models/group');

function destinationsCreate(req, res) {
  Group
  .findById(req.params.id)
  .exec()
  .then(group => {
    group.destinations.push(req.body);
    group.save();
    res.status(200).json(group);
  });
}

function destinationsDelete(req, res) {
  Group
    .findById(req.params.groupId)
    .exec()
    .then(group => {
      const destination = group.destinations.id(req.params.destinationId);
      destination.remove();
      group.save();
      res.sendStatus(200);
    });
}


module.exports  =  {
  create: destinationsCreate,
  delete: destinationsDelete
};
