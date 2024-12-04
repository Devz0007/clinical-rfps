import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const params = {
      format: 'json',
      'query.term': 'oncology',
      'query.locn': 'United States',
      'filter.overallStatus': 'RECRUITING',
      pageSize: 10,
      countTotal: true,
    };

    const response = await axios.get('https://clinicaltrials.gov/api/v2/studies', { params });
    res.status(200).json(response.data?.studies || []);
  } catch (error) {
    console.error('Error fetching clinical trials:', error);
    res.status(500).json({ message: 'Failed to fetch clinical trials' });
  }
}