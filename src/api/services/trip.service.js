const Excel = require('exceljs');
const _ = require('lodash');
const moment = require('moment');
const models = require('../models').db;
const path = require('path');

const readExcel = async (fileName) => {   
    const workBook = new Excel.Workbook();
    await workBook.xlsx.readFile(fileName);
    const trips = [];
    const columns = [
        'br_no',	
        'invoice_no',	
        'principal',	
        'trip_no',	
        'from_description',	
        'from_location',	
        'to_description',	
        'to_location',	
        'vehicle_type',	
        'volume',	
        'weight',	
        'sequence',	
        'service_type',	
        'location',
        'rdd'
    ]

    const workSheet = workBook.getWorksheet('Planning Details')
    workSheet.eachRow((row,rowNumber) => {
        let trip = {}
        row.values.map((item,index) => {
            if(item instanceof Date){
                trip[columns[index-1]] = moment(item).format('YYYY-MM-DD')
            }
            else if(item instanceof Object) {
                trip[columns[index-1]] = item.result
            }
            else {
                trip[columns[index-1]] = item    
            }
        })

        trips.push(trip)
    })

    trips.shift();
    return trips
}

const generateKronosTemplate = async(data, filePath='') => {
    const workBook = new Excel.Workbook();
    const tripHeaderSheet = workBook.addWorksheet('Trip Header');
    tripHeaderSheet.columns = [
        {
            header:'Sheet id',
            key:'sheet_id'
        },
        {
            header:'Trip Log Id',
            key:'trip_id'
        },
        {   
            header:'Service Type',
            key:'service_type'
        },
        {
            header:'Trip Assignment No.',
            key:'trip_assignment_no'
        },
        {
            header:'Route and Load Sheet No.',
            key:'route_load_sheet'
        },
        {
            header:'Leg Count',
            key:'leg_count'
        },
        {
            header:'Vehicle ID',
            key:'vehicle_id'
        },
        {
            header:'Trucker Name',
            key:'trucker_name'
        },
        {
            header:'Vehicle Type',
            key:'vehicle_type'
        },
        {
            header:'Driver Name',
            key:'driver_name'
        },
        {
            header:'Driver Contact No',
            key:'driver_contact_no'
        },
        {
            header:'Trip Plan Date & Time',
            key:'trip_plan_date_time'
        },
        {
            header:'Trip Status',
            key:'trip_status'
        },
        {
            header:'Location',
            key:'location'
        }
    ]
    tripHeaderSheet.addRows(data.trip_headers)

    const legDetailsSheet = workBook.addWorksheet('Leg Details');
    legDetailsSheet.columns = [
        //Sheet id	Trip Log Id	Trip Leg	Leg Behaviour	From Location	To Location	Dock No	From City	To City	To Name	To Address	Contact No.	Pickup/Delivery Status
        {
            header:'Sheet id',
            key:'sheet_id'
        },
        {
            header:'Trip Log Id',
            key:'trip_id'
        },
        {
            header:'Trip Leg',
            key:'trip_leg'
        },
        {
            header:'Leg Behaviour',
            key:'leg_behaviour'
        },
        {
            header:'From Location',
            key:'from_location'
        },
        {
            header:'To Location',
            key:'to_location'
        },
        {
            header:'Dock No',
            key:'dock_no'
        },
        {
            header:'From City',
            key:'from_city'
        },
        {
            header:'To City',
            key:'to_city'
        },
        {
            header:'To Name',
            key:'to_name'
        },
        {
            header:'To Address',
            key:'to_address'
        },
        {
            header:'Contact No.',
            key:'contact_no'
        },
        {
            header:'Pickup/Delivery Status',
            key:'pickup_delivery_status'
        }
    ]
    legDetailsSheet.addRows(data.leg_details)

    const dispatchDocDetailsSheet = workBook.addWorksheet('Dispatch Doc Details')
    dispatchDocDetailsSheet.columns = [
        {
            header:'Sheet id',
            key:'sheet_id'
        },
        {
            header:'Trip Log Id',
            key:'trip_id'
        },
        {
            header:'Dispatch Document',
            key:'dispatch_document'
        },
        {
            header:'Booking Request No',
            key:'br_no'
        },
        {
            header:'Customer Ref No\n(Invoice No)',
            key:'invoice_no'
        },
        {
            header:'Customer ID',
            key:'customer_id'
        },
        {
            header:'Senders Ref No\n(Shipment Manifest)',
            key:'shipment_manifest'
        },
        {
            header:'Receivers Ref No\n(DO/DR No)',
            key:'dr_no'
        },
        {
            header:'Required Delivery Date',
            key:'rdd'
        },
        {
            header:'Delivery Instructions',
            key:'delivery_instruction'
        }
    ]
    dispatchDocDetailsSheet.addRows(data.dispatch_doc_details);

    const eventDetailsSheet = workBook.addWorksheet('Event Details')
    eventDetailsSheet.columns = [
        {
            header:'Sheet id',
            key:'sheet_id'
        },
        {
            header:'Trip Log Id',
            key:'trip_id'
        },
        {
            header:'Trip Leg',
            key:'trip_leg'
        },
        {
            header:'Event Description',
            key:'event_description'
        },
        {
            header:'Planned Date & Time	Actual',
            key:'planned_date'
        },
        {
            header:'Actual Date & Time',
            key:'actual_date'
        }
    ]
    eventDetailsSheet.addRows(data.event_details)

    //Sheet id	Trip Log Id	Trip Leg	Dispatch Document	THU ID	Planned THU Qty	Qty UOM	Actual THU Qty	Damaged Qty	Reason Code	Total Weight	Weight UOM	Total Volume	Volume UOM
    const consignmentDetailsSheet = workBook.addWorksheet('Consignment Details');
    consignmentDetailsSheet.columns = [
        {
            header:'Sheet id',
            key:'sheet_id'
        },
        {
            header:'Trip Log Id',
            key:'trip_id'
        },
        {
            header:'Dispatch Document',
            key:'dispatch_document'
        },
        {
            header:'THU ID',
            key:'thu_id'
        },
        {
            header:'Planned THU Qty',
            key:'planned_qty'
        },
        {
            header:'Qty UOM',
            key:'qty_uom'
        },
        {
            header:'Actual THU Qty',
            key:'actual_qty'
        },
        {
            header:'Reason Code',
            key:'reason_code'
        },
        {
            header:'Total Weight',
            key:'weight'
        },
        {
            header:'Weight UOM',
            key:'weight_uom'
        },
        {
            header:'Total Volume',
            key:'volume'
        },
        {
            header:'Volume UOM',
            key:'volume_uom'
        }
    ]
    consignmentDetailsSheet.addRows(data.consignment_details)

    const ancillarySheet = workBook.addWorksheet('Ancillary');
    ancillarySheet.columns = [
        {
            header:'Sheet id'
        },
        {
            header:'Trip Log Id'
        },
        {
            header:'Trip Leg'
        },
        {
            header:'Ancillary ID'
        },
        {
            header:'Qty Received'
        },
        {
            header:'Qty Returned'
        },
        {
            header:'Qty Received'
        },
        {
            header:'Qty Left'
        },
        {
            header:'Reason Code'
        },
        {
            header:'Ancillary Weight'
        },
        {
            header: 'Weight UOM'
        },
        {
            header:'Ancilliary Volume'
        },
        {
            header:'Volume UOM'
        }
    ]

    workBook.xlsx.writeFile(filePath)
}

const generateUploadID = async() => {
    const uploadId = await models.tms_raw_trip_hdr_tbl.max('upload_id');
   
    if(!uploadId) {
        return 'RAW000000001'
    }

    const count = Number(String(uploadId).substring(3))
    return `RAW${String(count + 1).padStart(9,'000000000')}`
}

const generateTripNo = async() => {
    const tripNo = await models.tms_trip_hdr_tbl.max('trip_no')
    if(!tripNo) {
        return 'TRP000000001'
    }
    const count = Number(String(tripNo).substring(3))
    return `TRP${String(count + 1).padStart(9,'000000000')}`
}

exports.tripUpload = async(file) => {
    const tripData = await readExcel(file.path);
    return tripData
}

exports.tripConvert = async(data = []) => {
    let trip_headers         = [];
    let leg_details          = [];
    let dispatch_doc_details = [];
    let event_details        = [];
    let consignment_details  = [];
    let ancillary            = [];

    let tms_trips = [];

    const vehicleTypes = await models.tms_vehicle_type_mapping.findAll({
        where:{
            is_active: 1
        }
    })
    
    const group = _.groupBy(data,(item) => item.trip_no);
    let trip_no = await generateTripNo();
    
    Object.keys(group).map(key => {
        const trip = data.find(item => String(item.trip_no) === key)
        const details = _.orderBy(data.filter(item => String(item.trip_no) === key), ['sequence'], ['asc'])

        tms_trips.push({
            trip_no,
            job_id: trip.job_id,
            vehicle_type: trip.vehicle_type,
            service_type: trip.service_type,
            location: trip.location,
            vehicle_id: vehicleTypes.find(item => item.vehicle_type === trip.vehicle_type)?.default_vehicle_id || null,
            details
        })
        trip_no = 'TRP'+String(Number(String(trip_no).substring(3)) + 1).padStart(9,'000000000')
    });

    tms_trips.map(({details, ...trip}) => {
        trip_headers.push({
            sheet_id:           1,
            trip_id:            trip.trip_no,
            service_type:       trip.service_type,
            trip_assignment_no: null,
            route_load_sheet:   trip.trip_no,
            leg_count:          details.length + 1,
            vehicle_id:         trip.vehicle_id,
            trucker_name:       null,
            vehicle_type:       trip.vehicle_type,
            driver_name:        null,
            driver_contact_no:  null,
            trip_plan_date_time:moment().format('YYYY-MM-DD HH:mm:ss'),
            trip_status:        'Released',
            location:           trip.location
        })

        leg_details = leg_details.concat([
            {
                sheet_id:               2,
                trip_id:                trip.trip_no,
                trip_leg:               1,
                leg_behaviour:          'Pick',
                from_location:          details[0].location,
                to_location:            details[0].location,
                dock_no:                null,
                from_city:              details[0].location_master_tbl?.city || null,
                to_city:                details[0].location_master_tbl?.city || null,
                to_name:                details[0].location,
                to_address:             details[0].location_master_tbl?.address || null,
                contact_no:             null,
                pickup_delivery_status: null
            }
        ])

        let trip_leg = 2;
        for(let i = 0; i < details.length; i++) {
            let leg = {
                sheet_id:               2,
                trip_id:                trip.trip_no,
                trip_leg:               trip_leg,
                leg_behaviour:          'Dvry',
                dock_no:                null,
                contact_no:             null,
                pickup_delivery_status:     null
            }
            if(i === 0){
                leg = {
                    ...leg,
                    from_location: details[i].from_location,
                    from_city:details[i].from_ship_point?.city ?? null,
                    to_location: details[i].to_location,
                    to_city:    details[i].to_ship_point?.city ?? null,
                    to_name:    details[i].to_ship_point?.shipPointDesc ?? null,
                    to_address: details[i].to_ship_point?.shipPointAddress ?? null
                }
            }
            if(i > 0) {
                leg={
                    ...leg,
                    from_location:  details[i-1].to_location,
                    from_city:      details[i-1].from_ship_point?.city ?? null,
                    to_location:    details[i].to_location,
                    to_city:        details[i].to_ship_point?.city ?? null,
                    to_name:        details[i].to_ship_point?.shipPointDesc ?? null,
                    to_address:     details[i].to_ship_point?.shipPointAddress ?? null
                }
            }

            trip_leg = trip_leg+1;

            leg_details.push(leg)
        }

        dispatch_doc_details = dispatch_doc_details.concat(details.map(item => ({
            sheet_id: 3,
            trip_id: trip.trip_no,
            dispatch_document: item.br_no,
            br_no:  item.br_no,
            invoice_no: item.invoice_no,
            customer_id: item.principal,
            shipment_manifest: null,
            dr_no: null,
            rdd: item.rdd,
            delivery_instruction: null
        })))

        const pickEvents = [
            'Trip Start',
            'Arrived',
            'Loading Start',
            'Loading End',
            'Document Handover',
            'Departed',
            'Returned Without Completion',
            'Trip End'
        ];

        const dvryEvents = [
            'Trip Start',
            'Arrived',
            'Unloading Start',
            'Unloading End',
            'Departed',
            'Returned Without Completion',
            'Returned to Virtual Bay',
            'Trip End'
        ];

        for(let i = 1; i<=details.length+1; i++){
            if(i === 1){
                event_details = event_details.concat(pickEvents.map(event => ({
                    sheet_id: 4,
                    trip_id: trip.trip_no,
                    trip_leg: i,
                    event_description: event,
                    planned_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                    actual_date: null
                })))
            }
            else{
                event_details = event_details.concat(dvryEvents.map(event => ({
                    sheet_id: 4,
                    trip_id: trip.trip_no,
                    trip_leg: i,
                    event_description: event,
                    planned_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                    actual_date: null
                })))
            }
        }
        //pick leg
        details.map(({booking_request_dtl_tbls}) => {
            consignment_details = consignment_details.concat(booking_request_dtl_tbls.map(item => ({
                sheet_id: 5,
                trip_id: trip.trip_no,
                trip_leg: 1,
                dispatch_document: item.bookingRequestNo,
                thu_id: item.skuCode,
                planned_qty: item.plannedQty,
                qty_uom: item.uom,
                actual_qty: null,
                damaged_qty:null,
                reason_code: null,
                weight: item.weight,
                weight_uom: item.weightUOM,
                volume: item.cbm,
                volume_uom: item.cbmUOM 
            })))
        })

        //delivery leg
        details.map(({booking_request_dtl_tbls,...dtl}) => {
            booking_request_dtl_tbls.map(item => {
                consignment_details.push({  
                    sheet_id: 5,
                    trip_id: trip.trip_no,
                    trip_leg: dtl.sequence + 1,
                    dispatch_document: item.bookingRequestNo,
                    thu_id: item.skuCode,
                    planned_qty: item.plannedQty,
                    qty_uom: item.uom,
                    actual_qty: null,
                    damaged_qty:null,
                    reason_code: null,
                    weight: item.weight,
                    weight_uom: item.weightUOM,
                    volume: item.cbm,
                    volume_uom: item.cbmUOM 
                })
            })
        })
    });

    const fileName = 'kronos'+moment().format('YYYYMMDDHHmmss.SSS')+'.xlsx';
    const filePath = path.join(global.appRoot,'src/assets/kronos/'+fileName)

    await generateKronosTemplate({
        trip_headers,
        leg_details,
        dispatch_doc_details,
        event_details,
        consignment_details
    },filePath)

    return {
        trip_headers,
        leg_details,
        dispatch_doc_details,
        event_details,
        consignment_details,
        tms_trips,
        filePath
    }
}

exports.createTripRaw = async(id,user=null) => {
    await models.tms_raw_trip_hdr_tbl.create({
        job_id: id,
        upload_status:'INPROGRESS',
        created_by: user
    })
}

exports.updateTripRaw = async(data={},filters={},stx=null) => {
    await models.tms_raw_trip_hdr_tbl.update(
        {
            ...data
        },
        {
            where:{
                ...filters
            },
            transaction: stx
        }
    )
}

exports.createTrip = async(trip = [],stx=null) => {
    await models.tms_trip_hdr_tbl.bulkCreate(trip,{
        include:[
            {
                model: models.tms_trip_dtl_tbl,
                as:'details'
            }
        ],
        transaction: stx
    })
}

exports.createTripDetailsRaw = async(job_id=null, data=[], stx=null) => {
    const uploadID = await generateUploadID()
    await models.tms_raw_trip_tbl.bulkCreate(data.map(item => ({
        ...item,
        job_id,
        volume: _.round(item.volume,2),
        weight: _.round(item.weight,2)
    })),{
        transaction: stx
    })
    
    return uploadID;
}

exports.bulkCreateTrip = async(data=[], stx=null) => {

}

exports.getRawTrip = async(filters) => {
   const data = await models.tms_raw_trip_hdr_tbl.findOne({
        include:[
            {
                model:models.tms_raw_trip_tbl,
                include:[
                    {
                        model: models.ship_point_master_tbl,
                        required:false,
                        as:'from_ship_point'
                    },
                    {
                        model: models.ship_point_master_tbl,
                        required:false,
                        as: 'to_ship_point'
                    },
                    {
                        model: models.location_master_tbl,
                        required: false
                    },
                    {
                        model: models.booking_request_dtl_tbl,
                        required:false
                    }
                ]
            }
        ],
        where:{
            ...filters
        }
   })

   return JSON.parse(JSON.stringify(data))

}

exports.getPaginatedRawTrips = async({
    page,
    totalPage,
    ...filters
}) => {
    const {count,rows} = await models.tms_raw_trip_hdr_tbl.findAndCountAll({
        order:[['createdAt','DESC']],
        offset: parseInt(page) * parseInt(totalPage),
        limit: parseInt(totalPage)
    })
    .then(result => JSON.parse(JSON.stringify(result)))

    return {
        count,
        rows,
        pageCount: Math.ceil(count/totalPage)
    }
}


