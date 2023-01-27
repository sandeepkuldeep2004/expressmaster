const AddressModel  = require("../models/Address");
const {getAddressByUid}=require("../lib/customer");

module.exports={
    saveAddress:async(data)=>{
        Object.entries(data).forEach(async(element)=>{
            const uid=await getAddressByUid(element[1].uid);
            if(!uid){
              const address=new AddressModel({
                uid:element[1].uid,
                firstname:element[1].firstname,
                lastname:element[1].lastname,
                email:element[1].email,
                fax:element[1].fax,
                dataofbirth:element[1].dataofbirth,
                gender:element[1].gender,
                streetno:element[1].streetno,
                streetname:element[1].streetname,
                pobox:element[1].pobox,
                appartment:element[1].appartment,
                building:element[1].building,
                cellphone:element[1].cellphone,   
                city:element[1].city,
                postalCode:element[1].postalCode                           
              });
                address.save(function(err){
                    if(err){
                        console.log(err);
                    }
                });
            } else {
                console.log("Address with the same UID is already available");
            }
        });       
    },   
};