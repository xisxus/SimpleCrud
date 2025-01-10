import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import MemberService from '../services/MemberService';

const Edit = () => {
  const  para  = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    MemberId: 0,
    MemberName: '',
    MemberAddress: '',
    MemberTypeId: 0,
    MemberPhoto: null,
    MemberSignature: null,
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const data = await MemberService.getAllMemberById(para.id);
        console.log('getMember',data);
        
        setFormData({
          MemberId: data.memberId,
          MemberName: data.memberName,
          MemberAddress: data.memberAddress,
          MemberTypeId: data.memberTypeName,
          MemberPhoto: null, 
          MemberSignature: null,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchMember();
  }, [para.id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('MemberId', formData.MemberId);
    data.append('MemberName', formData.MemberName);
    data.append('MemberAddress', formData.MemberAddress);
    data.append('MemberTypeId', formData.MemberTypeId);
    if (formData.MemberPhoto) {
      data.append('MemberPhoto', formData.MemberPhoto);
    }
    if (formData.MemberSignature) {
      data.append('MemberSignature', formData.MemberSignature);
    }

    try {
      await MemberService.update(id, data);
      alert('Member updated successfully!');
      navigate('/members'); // Navigate back to the index page
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>   
     <form onSubmit={handleSubmit}>
      <div>
        <label>Member Name:</label>
        <input
          type="text"
          name="MemberName"
          value={formData.MemberName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Member Address:</label>
        <input
          type="text"
          name="MemberAddress"
          value={formData.MemberAddress}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Member Type ID:</label>
        <input
          type="number"
          name="MemberTypeId"
          value={formData.MemberTypeId}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Member Photo:</label>
        <input
          type="file"
          name="MemberPhoto"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Member Signature:</label>
        <input
          type="file"
          name="MemberSignature"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update Member</button>
    </form>
    </>

  );
}

export default Edit
