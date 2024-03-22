const models = require('../models/scmdb');

exports.updateBrStatus = async (br) => {
    await models.tms_br_booking_request_hdr.update({
        br_status:'PLND'
    },
    {
        where:{
            br_request_Id: br
        }
    })
}