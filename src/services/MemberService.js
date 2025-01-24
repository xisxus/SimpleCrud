import axios from "axios"

const baseUrl = 'http://localhost:5288/api/Members/';

const baseUrlType = 'http://localhost:5288/api/MemberTypes/';


const MemberService =  {
   
    getAllMember : async () =>{
        try {
            const res = await axios.get(baseUrl)
            console.log(res);
            
            return res.data;
        } catch (err){
            console.error(err);
            throw new Error("error get");
            
        }
    },


    getAllMemberType : async () =>{
        try {
            const res = await axios.get(baseUrlType)
            console.log(res);
            
            return res.data;
        } catch (err){
            console.error(err);
            throw new Error("error get");
            
        }
    },



    getAllMemberById : async (memberId) =>{
        try {
            const res = await axios.get(baseUrl + memberId)
            return res.data;
        } catch (err){
            console.error(err);
            throw new Error("error get");
            
        }
    },

    create : async (data) =>{
        try {
            const res = await axios.post(baseUrl , data)
            return res.data;
        } catch (err){
            console.error(err);
            throw new Error("error get");
            
        }
    },

    update : async (memberId, data) =>{
        try {
            const res = await axios.post(baseUrl + memberId , data)
            return res.data;
        } catch (err){
            console.error(err);
            throw new Error("error get");
            
        }
    },

    delete : async (id) =>{
        try {
            debugger
            const res = await axios.delete(baseUrl + id)
            return res.data;
        } catch (err){
            console.error(err);
            throw new Error("error get");
            
        }
    },


}

export default MemberService
