var mongoose = require("mongoose")
var SocketSchema = mongoose.Schema({
  boxState: {
    type: mongoose.Schema.Types.Array,
    items: {
      type: Number,
    },
  },

})




var SocketList = mongoose.model("sockets", SocketSchema)
module.exports = SocketList