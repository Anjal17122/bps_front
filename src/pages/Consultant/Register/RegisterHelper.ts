import * as getA from "../../../Services/AddressService";

import { FormInstance } from "antd";
import { saveOrgConsultantNonPerma } from "../../../Components/Consultant/OrganizationConsultant/service/OrganizationConsultant";
import { saveOrgFinal, savePersonFinal } from "../../../Services/UserService";
import { imgFolders } from "../../../Services/Api";
import { MessageInstance } from "antd/es/message/interface";
import { copyImageFinal } from "../../Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";

export function onRegSubmit(
  imgNames: {
    person: string;
    citizenship: string;
    orgReg: string;
    orgPAN: string;
    orgTax: string;
    necImg: string;
    orgLogo: string;
  },
  userOrg: number,
  messageApi: MessageInstance,
  form: FormInstance<any>,
  same: boolean
) {
  return async (val: any) => {
    const body = {
      nameEng: val.nameEng,
      nameNep: val.nameNep,
      email: val.email,
      primaryPhone: val.phone,
      secondaryPhone: val.phone,
      citizenshipNo: val.cNo,
      citizenIssueDist: val.cIDistrict,
      citizenIssueDate: val.cDate,
      fatherNameNep: val.fatherNep,
      fatherNameEng: val.fatherEng,
      grandfatherNameEng: val.gfName,
      grandfatherNameNep: val.gfNep,
      gender: val.gender,
      maritalStatus: val.maritalStatus,
      panNo: val.panNo,
      nec: val.NEC,
      necFileName: imgNames.necImg,
      personRoleId: 1,
      user: {
        username: val.Username,
        password: val.password,
      },
      addresses: [
        {
          provinceId: val.provinceIdPerma[0],
          districtId: val.districtIdPerma[0],
          municipalityId: val.municipalityIdPerma[0],
          wardId: val.wardIdPerma[0],
          type: 0,
          toleNep: val.toleNepPerma,
          toleEng: val.toleEngPerma,
        },
        {
          provinceId: same ? val.provinceIdPerma[0] : val.provinceIdTemp[0],
          districtId: same ? val.districtIdPerma[0] : val.districtIdTemp[0],
          municipalityId: same
            ? val.municipalityIdPerma[0]
            : val.municipalityIdTemp[0],
          wardId: same ? val.wardIdPerma[0] : val.wardIdTemp[0],
          type: 1,
          toleNep: same ? val.toleNepPerma : val.toleNepTemp,
          toleEng: same ? val.toleEngPerma : val.toleEngTemp,
        },
      ],
      citizenshipFileName: imgNames.citizenship,
      photoFileName: imgNames.person,
    };
    if (userOrg) {
      const newBody = {
        orgLogo: imgNames.orgLogo,
        name: val.orgnameEng,
        nameNep: val.orgnameNep,
        phone: val.orgPhone,
        email: val.orgEmail,
        regNumber: val.Companyreg,
        panNumber: val.pan,
        regFileName: imgNames.orgReg,
        panFileName: imgNames.orgPAN,
        taxClearFileName: imgNames.orgTax,

        address: [
          {
            provinceId: val.orgState[0],
            wardId: val.orgWard[0],
            municipalityId: val.orgMunicipality[0],
            districtId: val.orgDistrict[0],
            type: 1,
            toleNep: val.orgToleNep,
            toleEng: val.orgToleEng,
          },
        ],
        person: [body],
      };

      copyImageFinal(
        [
          { dir: imgFolders.person, fileName: imgNames.person },
          {
            dir: imgFolders.citizenship,
            fileName: imgNames.citizenship,
          },
          {
            dir: imgFolders.necCert,
            fileName: imgNames.necImg,
          },
          {
            dir: imgFolders.orgLogo,
            fileName: imgNames.orgLogo,
          },
          {
            dir: imgFolders.companyPAN,
            fileName: imgNames.orgPAN,
          },
          {
            dir: imgFolders.companyReg,
            fileName: imgNames.orgReg,
          },
          {
            dir: imgFolders.companyTaxCl,
            fileName: imgNames.orgTax,
          },
        ],
        messageApi
      ).then(() => {
        saveOrgFinal(newBody, messageApi).then(() => form.resetFields());
      });
    } else {
      copyImageFinal(
        [
          { dir: "person", fileName: imgNames.person },
          {
            dir: "citizenship",
            fileName: imgNames.citizenship,
          },
          {
            dir: "nec",
            fileName: imgNames.necImg,
          },
        ],
        messageApi
      ).then(() => {
        savePersonFinal(body, messageApi).then((res)=> {
          if(val.orgId!==undefined && val.orgId!=""){
          const orgBody = {consultantId:res.data, organizationId:val.orgId} 
          saveOrgConsultantNonPerma(orgBody,messageApi).then(()=>{
           messageApi.success("Successfully Sent Request To Organization")
          })
        }
           form.resetFields()
      });      });
    }
  };
}

export type SingleValueType = (string | number)[];

export function getDist(
  setS: React.Dispatch<
    React.SetStateAction<{
      state: string;
      district: string;
      muni: string;
      ward: string;
    }>
  >,
  selected: { state: string; district: string; muni: string; ward: string }
) {
  return (
    val: SingleValueType,
    set: React.Dispatch<React.SetStateAction<getA.CommonType[]>>
  ) => {
    const value = val ? val.toString() : "";
    getA.getDistricts({ id: value }).then((dis) => {
      setS({ ...selected, state: value });
      set(dis.data);
    });
  };
}

export function getMun(
  selected: { state: string; district: string; muni: string; ward: string },
  setS: React.Dispatch<
    React.SetStateAction<{
      state: string;
      district: string;
      muni: string;
      ward: string;
    }>
  >
) {
  return (
    val: SingleValueType,
    set: React.Dispatch<React.SetStateAction<getA.CommonType[]>>
  ) => {
    const value = val ? val.toString() : "";
    getA
      .getMunis({ provinceid: selected.state, districtid: value })
      .then((dis) => {
        setS({ ...selected, district: value });
        set(dis.data);
      });
  };
}

export function uploadImgRule(imgName: string) {
  return () => ({
    validator() {
      if (imgName.length) {
        return Promise.resolve();
      }
      return Promise.reject("Please upload your file");
    },
  });
}
