import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const params = {
      format: 'json',
      pageSize: 100,
      countTotal: true,
    };

    // Fetch data from ClinicalTrials.gov
    const response = await axios.get('https://clinicaltrials.gov/api/v2/studies', { params });

    // Log the raw API response to debug
    console.log('Raw API Response:', JSON.stringify(response.data, null, 2));

    const studies = response.data?.studies || [];

    // Extract relevant details
    const formattedStudies = studies.map((study: any) => {
      const idModule = study.protocolSection?.identificationModule || {};
      const statusModule = study.protocolSection?.statusModule || {};
      const descriptionModule = study.protocolSection?.descriptionModule || {};
      const locationModule = study.protocolSection?.contactsLocationsModule?.locations || [];

      return {
        nctId: idModule.nctId || 'N/A',
        title: idModule.briefTitle || 'Untitled',
        status: statusModule.overallStatus || 'Unknown',
        description: descriptionModule.briefSummary || 'No description available.',
        locations: locationModule.map((loc: any) => `${loc.facility}, ${loc.city}, ${loc.state}`),
      };
    });

    console.log('Formatted Studies:', JSON.stringify(formattedStudies, null, 2));

    res.status(200).json(formattedStudies);
  } catch (error) {
    console.error('Error fetching clinical trials:', error.message);
    res.status(500).json({ message: 'Failed to fetch clinical trials' });
  }
}