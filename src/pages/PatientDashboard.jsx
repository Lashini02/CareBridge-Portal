import React from 'react';

const mockPersonalRecords = [
  { date: '2026-08-10', test: 'Lipid Profile', result: 'Normal', physician: 'Dr. Saman' },
  { date: '2026-05-15', test: 'Fasting Blood Sugar', result: '98 mg/dL', physician: 'Dr. Saman' }
];

export default function PatientDashboard() {
  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#4f46e5' }}>My Patient Health Record</h2>
      <p style={{ color: '#64748b' }}>Protected View: Accessible only to accounts with 'Patient' role</p>

      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {mockPersonalRecords.map((r, i) => (
          <div key={i} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fafafa' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{r.test}</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Date: {r.date} | Consultant: {r.physician}</div>
            <div style={{ marginTop: '0.5rem', color: '#059669', fontWeight: '600' }}>Result: {r.result}</div>
          </div>
        ))}
      </div>
    </div>
  );
}