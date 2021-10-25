var SocketList = require("./SocketModel");
module.exports.socketBox = async (index, id) => {
  try {
    console.log("id",id);
    console.log("index",index);
    const socketDel = await SocketList.findOne({_id:id})
    const checkRedBoxExist = socketDel?.boxState.find((item) => {
      return item == index
    })
    if (checkRedBoxExist && id) { //Check Red Box Exist or Not
      console.log('enter');
      const data = await SocketList.findByIdAndUpdate(
        id, {
        $pull: { boxState: index } //Del Red Box
      }, { new: true }
      )
      return { data: await data }

    } else {
      if (socketDel) { //Update the Rex Box Array and Insert new Red Box
        const data = await SocketList.findOneAndUpdate({_id:id}, {
          $push: { boxState: index }
        }, { new: true}
        )
        console.log("RUN@",data);
        return { data: await data }

      } else {//This run if document not exist
        const data = new SocketList({
          boxState: [index]
        });
        data.save()
        return { data: await data }

      }




    }

  } catch (error) {
    return error

  }

};
module.exports.getsocketBox = async () => {
  try {
    const data = await SocketList.findOne()
    return { data: await data }
  } catch (error) {
    return error

  }

};

module.exports.delsocketBox = async (id) => {
  try {
    const data = await SocketList.findByIdAndUpdate(id, {
      $set: { boxState: [] }
    }, { new: true }
    )
    return { data: await data.boxState }
  } catch (error) {
    return error

  }

};
