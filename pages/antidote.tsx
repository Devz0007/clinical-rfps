import React, { useEffect } from 'react';

const AntidotePage = () => {
  useEffect(() => {
    // Dynamically load the Antidote JS-Connect API script
    const script = document.createElement('script');
    script.src = '/antidote/Antidote-API_JS-Connect.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <head>
        <link href="/antidote/Antidote-API_JS-Connect.css" rel="stylesheet" />
      </head>
      <div>
        <h1>Antidote Integration Example</h1>
        <div>
          <button id="initAntidote">Activate Antidote Buttons</button>
          <button id="desinitAntidote">Deactivate Antidote Buttons</button>
        </div>
        <div>
          <textarea data-antidoteapi_jsconnect_groupe_id="01">
            This is a sample text field linked to the Antidote corrector.
          </textarea>
          <button
            className="boutonAntidote"
            data-antidoteapi_jsconnect_groupe_id="01"
            data-antidoteapi_jsconnect_lanceoutil="C"
          >
            Correct
          </button>
        </div>
      </div>
    </div>
  );
};

export default AntidotePage;