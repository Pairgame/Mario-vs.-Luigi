// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    const mario = "http://res.cloudinary.com/hedgehogs4578/image/upload/v1498062873/mario_yllwvl.png"
    const
    { user } = hook.params
    console.log(hook.params.name)
    // assign the owner of the game
    hook.data.userId = user._id
    hook.data.name = `${user.name}'s game!'`
    console.log(hook.data)
    // add the owner to the players, as the first player in the game
    hook.data.players = [{
      userId: user._id,
      clickCount: 0,
      character: mario
    }]

    return Promise.resolve(hook);
  };
};
