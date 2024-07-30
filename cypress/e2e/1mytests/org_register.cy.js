describe("login test", () => {
  beforeEach(() => {
    cy.visit("https://ebps.bagmatimunsarlahi.gov.np/public/register"); // Replace '/add-admin' with the actual URL of the form page
  });

  it("should display the Add Admin form", () => {
    cy.get(
      ".ant-col-lg-24 > :nth-child(1) > .ant-row > .ant-form-item-label > label"
    ).should("contain", "Consultant Type");
  });

  // it("should validate required fields", () => {
  // cy.get('.paddingLeft50 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-btn').click(); // Submit the form without filling any fields
  // cy.get(' .ant-form-item-explain-error').should("have.length", 6); // Check that error messages are displayed for all required fields
  // });

  it("should submit the form successfully", () => {
    // Fill in all required fields
    cy.get(
      "#consultantType > :nth-child(1) > .ant-radio > .ant-radio-input"
    ).click();
    //to upload
    cy.get(
      ".ant-col-lg-6 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #MyUploadWrapper > .ant-upload-wrapper > .ant-upload-select > .ant-upload"
    )
      .find("input")
      .selectFile("F:/rough/test.jpg", { force: true });
    cy.get(
      ".ant-col-lg-10 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #MyUploadWrapper > .ant-upload-wrapper > .ant-upload-select > .ant-upload"
    )
      .find("input")
      .selectFile("F:/rough/test.jpg", { force: true });
    cy.get(
      ":nth-child(6) > :nth-child(3) > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content"
    )
      .find("input")
      .selectFile("F:/rough/test.jpg", { force: true });
    cy.get(
      '.OrgReg > [style="padding-bottom: 20px;"] > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #MyUploadWrapper > .ant-upload-wrapper > .ant-upload-select > .ant-upload'
    )
      .find("input")
      .selectFile("F:/rough/test.jpg", { force: true });
    cy.get(
      '[style="margin-left: -10px; margin-right: -10px;"] > .ant-row-center > :nth-child(1) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #MyUploadWrapper > .ant-upload-wrapper > .ant-upload-select > .ant-upload'
    )
      .find("input")
      .selectFile("F:/rough/test.jpg", { force: true });
    cy.get(
      '[style="margin-left: -10px; margin-right: -10px;"] > .ant-row-center > :nth-child(2) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #MyUploadWrapper > .ant-upload-wrapper > .ant-upload-select > .ant-upload'
    )
      .find("input")
      .selectFile("F:/rough/test.jpg", { force: true });
    cy.get(
      ":nth-child(3) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #MyUploadWrapper > .ant-upload-wrapper > .ant-upload-select > .ant-upload"
    )
      .find("input")
      .selectFile("F:/rough/test.jpg", { force: true });
    cy.get("#nameEng").type("Test organization");
    cy.get("#nameNep").type("जोन डो");
    cy.get("#email").type("test.organization@gmail.com");
    cy.get("#phone").type("000000000");
    cy.get(".ant-input-affix-wrapper > #Username").type(
      "test.organization@gmail.com"
    );
    cy.get("#password").type("test123");
    cy.get("#confirm").type("test123");
    cy.get("#panNo").type("0000");
    cy.get("#NEC").type("0000");
    cy.get("#cNo").type("00000");

    cy.get("#cIDistrict").type("kath");
    cy.get("#cIDistrict").click();
    cy.get(".ant-select-item-option-content").contains("Kathmandu").click();
    cy.get("#cDate").type("2079-01-01");
    cy.get("#gender > :nth-child(1) > .ant-radio > .ant-radio-input").click();
    cy.get(
      "#maritalStatus > :nth-child(1) > .ant-radio > .ant-radio-input"
    ).click();
    cy.get("#fatherNep").type("जोन डो");
    cy.get("#fatherEng").type("John do");
    cy.get("#gfNep").type("जोन ड");
    cy.get("#gfName").type("John da");

    cy.get("#provinceIdPerma").click();
    cy.get(".ant-cascader-menu-item-content").contains("Bagmati").click();

    cy.get("#districtIdPerma").click();
    cy.get(".ant-cascader-menu-item-content").contains("Lalitpur").click();
    cy.get("#municipalityIdPerma").click();
    cy.get(".ant-cascader-menu-item-content")
      .contains("Lalitpur Metropolitian")
      .click();
    cy.get("#wardIdPerma").type(1);
    cy.get("#wardIdPerma").click();
    cy.get(".ant-cascader-menu-item-content").contains(1).click();
    cy.get("#toleEngPerma").type("John doe");
    cy.get("#toleNepPerma").type("जोन डो");
    cy.get(".ant-switch-inner").click();

    cy.get("#orgnameNep").type("जोन डो");

    cy.get("#orgnameEng").type("Test organization");
    cy.get("#orgEmail").type("test.organization@gmail.com");
    cy.get("#orgPhone").type("9992222999");
    cy.get("#Companyreg").type("123123");
    cy.get("#pan").type("123123");

    cy.get("#orgState").click();
    cy.get(".ant-select-dropdown")
      .find(".ant-cascader-menu-item-content")
      .contains("Lumbini")
      .click();
    cy.get("#orgDistrict").click();
    cy.get(".ant-cascader-menu-item-content").contains("Rupandehi").click();
    cy.get("#orgMunicipality").click();
    cy.get(" .ant-cascader-menu-item-content").contains("Devadaha").click();
    cy.get("#orgWard").type(1);
    cy.get("#orgWard").click();
    cy.get(".ant-cascader-menu-item-content").contains(1).click();
    cy.get("#orgToleEng").type("John doe");
    cy.get("#orgToleNep").type("जोन डो");

    cy.get(
      ".paddingLeft50 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-btn"
    ).click();
    // Assert that the form is successfully submitted and the user is redirected to a new page
    //   cy.wait();
    it("should clear the forms", () => {
      cy.get("#nameEng").should("contain", "");
    });
  });
});
