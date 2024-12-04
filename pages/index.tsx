export async function getServerSideProps() {
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
  
    const response = await fetch(
      'https://clinicaltrials.gov/api/v2/studies?' + new URLSearchParams(params)
    );
    const data = await response.json();
  
    return {
      props: {
        rfps: data.studies || [], // Pass RFP data as props
      },
    };
  }
  
  const Home = ({ rfps }: { rfps: any[] }) => {
    return (
      <div>
        <h1>Latest Oncology RFPs in the USA</h1>
        <ul>
          {rfps.map((rfp, index) => (
            <li key={index}>
              <h3>{rfp.protocolSection.identificationModule.briefTitle}</h3>
              <p>Status: {rfp.protocolSection.statusModule.overallStatus}</p>
              <p>
                Sponsor:{' '}
                {rfp.protocolSection.sponsorCollaboratorsModule?.leadSponsor?.name ||
                  'Various Institutions'}
              </p>
              <a
                href={`https://clinicaltrials.gov/study/${rfp.protocolSection.identificationModule.nctId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Details
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Home;