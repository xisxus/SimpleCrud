import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MemberService from '../services/MemberService';

const Edit = () => {
  const para = useParams();
  const navigate = useNavigate();
  const [type, setType] = useState([]); // State for member types
  const [formData, setFormData] = useState({
    MemberId: 0,
    MemberName: '',
    MemberAddress: '',
    MemberTypeId: 0,
    MemberPhoto: null,
    MemberSignature: null,
  });

  useEffect(() => {
    // Fetch member details and member types
    const fetchData = async () => {
      try {
        const [memberData, memberTypes] = await Promise.all([
          MemberService.getAllMemberById(para.id),
          MemberService.getAllMemberType(),
        ]);

        setFormData({
          MemberId: memberData.memberId,
          MemberName: memberData.memberName,
          MemberAddress: memberData.memberAddress,
          MemberTypeId: memberData.memberTypeId,
          MemberPhoto: null, // Reset to null since it's file input
          MemberSignature: null, // Reset to null since it's file input
        });

        setType(memberTypes); // Set the member types for the dropdown
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
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
      await MemberService.update(para.id, data);
      alert('Member updated successfully!');
      navigate('/members'); // Navigate back to the members list
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
          <label>Member Type:</label>
          <select
            name="MemberTypeId"
            value={formData.MemberTypeId}
            onChange={handleChange}
          >
            <option value={0} disabled>
              Select a Member Type
            </option>
            {type.map((t) => (
              <option key={t.MemberTypeId} value={t.MemberTypeId}>
                {t.MemberTypeName}
              </option>
            ))}
          </select>
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
};

export default Edit;
