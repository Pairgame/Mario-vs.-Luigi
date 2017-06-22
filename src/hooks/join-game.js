// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    // see if hook.data has { join: boolean }
    if (hook.data.join === undefined) return Promise.resolve(hook);

    const { user } = hook.params;
    const luigi = "http://res.cloudinary.com/hedgehogs4578/image/upload/v1498145123/luigi_rmeeil.png"

    // see if player already present
    return hook.app.service('games').get(hook.id)
      .then((game) => {
        const { players } = game;
        const wantsToJoin = hook.data.join;
        const joined = players.map((p) => (p.userId)).includes(user._id);

        hook.data = {};

        if (!joined && wantsToJoin) {
          hook.data = {
            players: players.concat({ character: "", userId: user._id, clickCount: [] })
          }
        }

        if (joined && !wantsToJoin) {
          hook.data = {
            players: players.filter((p) => (p.userId !== user._id))
          }
        }

        hook.data.userId = user._id,
        // add the owner to the players, as the first player in the game
        hook.data.player2 = [{
          userId: user._id,
          clickCount: 0,
          character: luigi
        }]


        return Promise.resolve(hook);
      });
  };
};
