// games-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const playerSchema = new Schema ({
    character: { type: String },
    userId: { type: String},
    clickCount: { type: Number}
  });

  const games = new Schema({
    players: [playerSchema],
    countdownTimer: { type: Number, default: 15},
    start: { type: Boolean, default: false},
    evenScore: { type: Boolean, default: true},
    winner: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });



  return mongooseClient.model('games', games);
};
