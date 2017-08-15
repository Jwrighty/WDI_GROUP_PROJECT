const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema({
//   body: String,
//   user: { type: mongoose.Schema.ObjectId, ref: 'User'}
// });
//
const destinationsSchema = new mongoose.Schema({
  name: String
});

const groupSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  dates: {type: Date, required: true},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  description: {type: String},
  //how do we create members array when they join 'do'
  members: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  destinations: [destinationsSchema],
  // comments: [commentSchema],
  //how to populate this automatically
  // stagOrHen: {type: Boolean, required: true}

});

module.exports = mongoose.model('Group', groupSchema);
