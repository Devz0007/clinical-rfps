import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Starting NIH Exporter API request...');
    
    const response = await axios.post('https://api.reporter.nih.gov/v2/projects/search', {
      criteria: {
        fiscal_years: [2023], // Adjust this to your needs
        terms: ['cancer'], // Replace with desired terms
      },
      offset: 0,
      limit: 10,
    });

    console.log('NIH Exporter Response:', JSON.stringify(response.data, null, 2));

    const formattedResults = response.data.results.map((project: any) => ({
      id: project.project_id,
      title: project.project_title,
      investigator: project.principal_investigator,
      year: project.fiscal_year,
      organization: project.organization,
      award: project.award_amount,
    }));

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error('Error fetching NIH Exporter data:', error.message);

    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Request failed without a response.');
    }

    res.status(500).json({ message: 'Failed to fetch NIH Exporter data' });
  }
}