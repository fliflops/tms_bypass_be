const Joi = require('joi')

exports.uploadTripSchema = Joi.array().items({
    br_no:              Joi.string().required(),	
    invoice_no:         Joi.any().required(),	
    principal:          Joi.any().required(),	
    trip_no:            Joi.any().required(),	
    from_description:   Joi.string(),	
    from_location:      Joi.string().required(),	
    to_description:     Joi.string(),	
    to_location:        Joi.string().required(),	
    vehicle_type:       Joi.string().required(),	
    volume:             Joi.number().required(),	
    weight:             Joi.number().required(),	
    sequence:           Joi.number().required(),	
    service_type:       Joi.string().required(),	
    location:           Joi.string().required(),
    rdd:                Joi.string().required()
})