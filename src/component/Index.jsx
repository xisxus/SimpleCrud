import React, { useEffect, useState } from 'react'
import MemberService from '../services/MemberService'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Index = () => {

  const [member , setMember] = useState([])
  const [loading , setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    getAllMember();
   } , []
  )

  const getAllMember = async () => {
    try{
    
      debugger
      const data  = await MemberService.getAllMember();
     // const data  = await axios.get('http://localhost:5288/api/Members')
      console.log(data)
      setMember(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false)
      
    }
  }

  const handleEdit = (id) =>{
    alert(id)
    navigate(`/member/edit/${id}`)
  }
 

  const handleDelete = (id) =>{
    
    const data = MemberService.delete(id)
    getAllMember()
  }


  if(loading){
    return (<div>loading .....</div>)
  }


  return (
    <div>
      <h1>Member</h1>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Member ID</th>
            <th>Member Name</th>
            <th>Address</th>
            <th>Type</th>
            <th>Photo</th>
            <th>Signature</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            member.map((m, i)=>{
              return(
                <>
                <tr key={i}>
                <td>{m.memberId}</td>
              <td>{m.memberName}</td>
              <td>{m.memberAddress}</td>
              <td>{m.memberTypeName}</td>
              <td>
                {m.memberPhoto ? (
                  <img
                    src={`http://localhost:5288/api/Members/${m.memberPhoto}`}
                    alt="Member"
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  "No Photo"
                )}
              </td>
              <td>
                {m.memberSignature ? (
                  <img
                    src={`data:image/jpeg;base64,${m.memberSignature}`}
                    alt="Signature"
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  "No Signature"
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(m.memberId )}>Edit</button>
                <button onClick={() => handleDelete(m.memberId )}>Delete</button>
              </td>

                </tr>
                </>
              )
            })
          }
        </tbody>
      </table>


       {/* <div>
       <pre>{JSON.stringify(member)}</pre>
       </div> */}

    </div>
  )
}

export default Index
