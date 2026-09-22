import React from 'react';

const mockPatients = [
  { id: 'PT-101', name: 'Nimal Perera', age: 45, diagnosis: 'Hypertension', status: 'Stable' },
  { id: 'PT-102', name: 'Sunil Shantha', age: 32, diagnosis: 'Type 2 Diabetes', status: 'Follow-up' },
  { id: 'PT-103', name: 'Anula Devi', age: 58, diagnosis: 'Mild Asthma', status: 'Discharged' }
];

export default function DoctorDashboard() {
  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#059669' }}>Doctor Dashboard</h2>
      <p style={{ color: '#64748b' }}>Protected View: Accessible only to accounts with 'Doctor' role</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
            <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Record ID</th>
            <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Patient Name</th>
            <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Age</th>
            <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Clinical Diagnosis</th>
            <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockPatients.map(p => (
            <tr key={p.id}>
              <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>{p.id}</td>
              <td style={{ padding: '12px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>{p.name}</td>
              <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>{p.age}</td>
              <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>{p.diagnosis}</td>
              <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}