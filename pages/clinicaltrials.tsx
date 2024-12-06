import React, { useEffect, useState } from 'react';

const ClinicalTrials = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/clinicaltrials');
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err.message);
        setError('Error fetching data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>ClinicalTrials.gov API Data</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {data.map((item: any, index: number) => (
            <li
              key={index}
              style={{
                marginBottom: '20px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
              }}
            >
              <h3>{item.title}</h3>
              <p>
                <strong>Status:</strong> {item.status}
              </p>
              <p>
                <strong>Description:</strong> {item.description}
              </p>
              {item.locations && item.locations.length > 0 ? ( // Check if locations exist and have length
                <p>
                  <strong>Locations:</strong>
                  <ul>
                    {item.locations.map((location: string, i: number) => (
                      <li key={i}>{location}</li>
                    ))}
                  </ul>
                </p>
              ) : (
                <p><strong>Locations:</strong> Not available</p>
              )}
              <a
                href={`https://clinicaltrials.gov/study/${item.nctId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Details
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClinicalTrials;