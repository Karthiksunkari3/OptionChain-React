import React, { useState, useEffect } from 'react';
import "./form.css";

const Form = () => {
    // Define state variables to manage form data
    const [optSymbol, setOptSymbol] = useState('');
    const [optExpDate, setOptExpDate] = useState('');

    // Define event handlers
    const handleOptSymbolChange = (e) => {
        setOptSymbol(e.target.value);
    };

    const handleOptExpDateChange = (e) => {
        setOptExpDate(e.target.value);
        // getcloseststrike(); // Assuming this function is defined elsewhere
    };

    // useEffect hook for handling side effects (similar to componentDidMount and componentDidUpdate)
    useEffect(() => {
        // Your side effects code here
    }, []); 
    // Empty dependency array to run only once on component mount
    let [sections, setSections] = useState([
        {
          name: 'People',
          items: [
            {name: 'David'},
            {name: 'Same'},
            {name: 'Jane'}
          ]
        },
        {
          name: 'Animals',
          items: [
            {name: 'Aardvark'},
            {name: 'Kangaroo'},
            {name: 'Snake'}
          ]
        }
      ]);
      
    
    return (
        <form onSubmit={(e) => { e.preventDefault(); }} method="post">
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select" style={{ width: '140px' }}>
                <label htmlFor="optSymbol" className="mdl-textfield__label">Select Symbol</label>
                <select id='optSymbol' name='optSymbol' className="mdl-textfield__input" onChange={handleOptSymbolChange}>
                {/* <Picker items={sections}> */}
        {section =>
          <section key={section.name} title={section.name} items={section.items}>
            {item => <item key={item.name}>{item.name}</item>}
          </section>
        }
      {/* </Picker> */}
                </select>
            </div>
        

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select" style={{ width: '80px' }}>
                <label htmlFor="optExpDate" className="mdl-textfield__label">Expiry Date</label>
                <select id='optExpDate' name='optExpDate' onChange={handleOptExpDateChange} className="mdl-textfield__input">
                    {/* Your options here */}
                </select>
            </div>

            {/* Other form fields */}
            {/* Add more JSX code for other form fields as needed */}

            {/* Hidden input fields */}
            <input type="hidden" id="strikePriceATM" name="strikePriceATM" placeholder="" value="" />
            {/* Add more hidden input fields as needed */}

            {/* Scripts and Stylesheets */}
            <script src="/opt/js/Customjs_Curr.js?21"></script>
            <link rel="stylesheet" type="text/css" href="/opt/js/select2_custom_v3.css" />
            <script type="text/javascript" src="/opt/js/select2_custom_symbolDashboard.js"></script>
        </form>
    );
};

export default Form;
