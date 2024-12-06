useEffect(() => {
    const fetchRFPs = async () => {
      try {
        const response = await fetch('/api/clinicaltrials'); // Ensure this is correct
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Data:', data);
        setRFPs(data);
      } catch (err) {
        console.error('Error fetching RFPs:', err);
        setError('Failed to fetch clinical trials. Please try again later.');
      }
    };
  
    fetchRFPs();
  }, []);