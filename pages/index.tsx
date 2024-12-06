import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const LandingPage = () => {
  const apis = [
    { name: 'ClinicalTrials.gov', link: '/clinicaltrials' },
    { name: 'NIH ExPORTER', link: '/nih-exporter' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Clinical Trial RFP APIs</h1>
      <ul>
        {apis.map((api) => (
          <li key={api.name}>
            <Link href={api.link}>{api.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LandingPage;