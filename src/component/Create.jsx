import React, { useState } from 'react'
import MemberService from '../services/MemberService';
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    MemberId: 0,
    MemberName: '',
    MemberAddress: '',
    MemberTypeId: 0,
    MemberPhoto: null,
    MemberSignature: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for API
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
      const response = await MemberService.create(data);
      console.log('Member created successfully:', response);
      navigate(`/member`)
    } catch (err) {
      console.error('Error creating member:', err);
    }
  };



  return (
    <div>
      <h1>Create</h1>
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
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default Create
