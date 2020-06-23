/*!

=========================================================
* Paper Kit React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create switch buttons

// reactstrap components
import {

  Container,

} from "reactstrap";
import Record from '../../components/Record/Record'


function SectionButtons() {
  React.useEffect(() => {


  });
  return (
    <>
      <div className="section section-buttons">
        <Container>
          <div className="title">
            <h2>Voice Separation</h2>
          </div>
          <div id="buttons">
            <div className="title">
            <Record />
              <h3>
                
                Buttons
                
              </h3>
            </div>
          </div>
          <div className="title">
            <h3>Links</h3>
          </div>
        </Container>
      </div>
    </>
  );
}

export default SectionButtons;
