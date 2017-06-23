// games-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const playerSchema = new Schema ({
    character: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'users'},
    clickCount: { type: Number}
  });

  const games = new Schema({
    name: { type: String },
    player1: [playerSchema],
    player2: [playerSchema],
    players: [playerSchema],
    countdownTimer: { type: Number, default: 15},
    start: { type: Boolean, default: false},
    evenScore: { type: Boolean, default: true},
    winnerId: { type: Schema.Types.ObjectId, ref: 'users' },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });



  return mongooseClient.model('games', games);
};
