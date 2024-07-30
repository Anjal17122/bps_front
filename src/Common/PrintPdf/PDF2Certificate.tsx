import * as React from "react";

export function PDF2Certificate() {
  return (
    <div id="pdf1page2">
      <span>
        <strong>BUILDING COMPLETION REPORT </strong>
      </span>
      <p>
        <span>(To be filled by designer)</span>
      </p>
      <span className="floating1">
        <strong>1.</strong>
      </span>
      <ol className="PDFlist" style={{ listStyleType: "lower-alpha" }}>
        <li>
          Name of land owner
          :................................................................................................
        </li>
        <li>
          Name of house owner
          :......................................................................
        </li>
        <li>
          Purpose of building (Resi/comm etc) :
          ..........................................................
        </li>
        <li>
          Address&nbsp;:
          ....................................................................................
        </li>
        <li>
          Plot No. :
          ......................................................................
        </li>
        <li>
          Plot are (i) <>in Ropani......................................... </>
          <>(II) In SQ. </>
          FT....................................................
        </li>
        <li>Zone..................................</li>
        <li>
          Designer's Name
          <>................................................. </>
          <>Regd........... </>
          <>No...................... Class.................</>
        </li>
        <li>
          Actual site plan area: - (i) In Ropanl ........................ (Ii)
          in SQ. FT...............................
        </li>
        <li>
          Actual ground overage: - (i) in %............................ (ii) in
          SQ. FT............................... <br />
          <br /> Table No. 1
        </li>
      </ol>
      <table className="PDFtable" style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ width: "48px" }} rowSpan={2}>
              <p>S.No.</p>
            </td>
            <td style={{ width: "356px" }} rowSpan={2}>
              <p>Co-ordinate</p>
            </td>
            <td style={{ width: "362px", textAlign: "center" }} colSpan={2}>
              <p>Horizontal distance to be left</p>
            </td>
            <td style={{ width: "196px", textAlign: "center" }} rowSpan={2}>
              <p>Remarks</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: "187.2px", textAlign: "center" }}>
              <p>According to rule</p>
            </td>
            <td style={{ width: "174.8px", textAlign: "center" }}>
              <p>Actual Insite</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: "48px" }}>1.</td>
            <td style={{ width: "356px" }}>
              R.O.W.(From center line of adjacent existing road)
            </td>
            <td style={{ width: "187.2px" }}>&nbsp;</td>
            <td style={{ width: "174.8px" }}>&nbsp;</td>
            <td style={{ width: "196px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ width: "48px" }}>2. &nbsp;</td>
            <td style={{ width: "356px" }}>Set back</td>
            <td style={{ width: "187.2px" }}>&nbsp;</td>
            <td style={{ width: "174.8px" }}>&nbsp;</td>
            <td style={{ width: "196px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ width: "48px" }}>3. &nbsp;</td>
            <td style={{ width: "356px" }}>River Bank</td>
            <td style={{ width: "187.2px" }}>&nbsp;</td>
            <td style={{ width: "174.8px" }}>&nbsp;</td>
            <td style={{ width: "196px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ width: "48px" }}>4. &nbsp;</td>
            <td style={{ width: "356px" }}>KV Electric Line&nbsp;&nbsp; •</td>
            <td style={{ width: "187.2px" }}>&nbsp;</td>
            <td style={{ width: "174.8px" }}>&nbsp;</td>
            <td style={{ width: "196px" }}>&nbsp;</td>
          </tr>
        </tbody>
      </table>
      <p>&nbsp;</p>
      <ol start={2}>
        <li>
          Floor Area
          <br />
          Ground Floor........................... 1st.......................
          2nd...........................
        </li>
      </ol>
      <ol start={3}>
        <li>
          Floor Area
          <ol style={{ listStyleType: "lower-alpha" }}>
            <li>Taxable....................</li>
            <li>
              Difference in floor area than Pemitted
              Area...............................................................
            </li>
            <li>
              Total permissible
              area.......................................................................
            </li>
            <li>
              Actual built up floor
              area....................................................................
            </li>
          </ol>
        </li>
        <li>
          Building height permissible...........................................{" "}
          <>Actual in site.............................................. </>
        </li>
        <li>
          Plinth
          area....................................................................................................................
        </li>
        <li>No. of story:</li>
        <li>
          Remarks:
          <ol style={{ listStyleType: "lower-alpha" }}>
            <li>
              Comment if the construction is difference than the building
              permint............... <br /> (separate page can used for comment
              and sketch)
            </li>
            <li>
              special Report of all construction activities in the same plot.
            </li>
          </ol>
        </li>
      </ol>
      <p>
        I Certify that, the constructed building does not differ from the
        prevailing building by laws and is as the permitted building drawings.
      </p>
      <p style={{ textAlign: "left", fontStyle: "italic" }}>
        (Note: Separate page can be used for comment and sketch)
      </p>
      <p style={{ textAlign: "right" }}>
        <>..............................................</>
      </p>
      <p style={{ textAlign: "right" }}>
        <strong>Designer's Signature</strong>
      </p>
      <hr style={{ height: 2 }} />
      <p style={{ textAlign: "center" }}>
        <strong>For Official Use</strong>
      </p>
      <table style={{ width: "1016px" }}>
        <tbody>
          <tr style={{ height: "64.8px" }}>
            <td style={{ width: "594.2px", height: "128.8px" }} rowSpan={2}>
              <p>Reported/Received</p>
              <p>Name:...............................................</p>
              <p>Designation: .......................................</p>
              <p>Date:.................................................</p>
              <p>Remarks:...........................................</p>
            </td>
            <td
              style={{
                position: "relative",
                width: "594.2px",
                height: "128.8px",
              }}
            >
              <div style={{ position: "absolute", bottom: 0 }}>
                <p style={{ textAlign: "center" }}>
                  <>
                    ............................................................
                  </>
                </p>
                <p style={{ textAlign: "center" }}>
                  <strong>Signature</strong>
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
