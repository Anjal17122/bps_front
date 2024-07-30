import NepalGov from "../../Assets/Images/nepal_gov.webp";

export const LogoContainer = ({ text }: any) => {
  return (
    <div className="NavLogo">
      <img src={NepalGov} width="auto" height="35px" alt="" />
      <h1>{text}</h1>
    </div>
  );
};
