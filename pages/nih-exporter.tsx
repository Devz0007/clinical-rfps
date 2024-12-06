import React, { useEffect, useState } from 'react';

const NIHExporter = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/nih-exporter');
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching NIH Exporter data:', err.message);
        setError('Error fetching data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>NIH Exporter Data</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {data.map((item: any, index: number) => (
            <li key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
              <h3>{item.title || 'No Title Available'}</h3>
              <p><strong>Year:</strong> {item.year}</p>
              <p><strong>Organization:</strong> {item.organization?.org_name || 'No Organization Info'}</p>
              <p><strong>Award:</strong> {item.award ? `$${item.award.toLocaleString()}` : 'N/A'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NIHExporter;