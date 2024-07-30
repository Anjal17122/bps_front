import "./EsewaButton.scss";

const Esewa = () => {
  const onSubmit = (val: any) => {};

  return (
    <form
      action="https://uat.esewa.com.np/epay/main"
      method="POST"
      onSubmit={onSubmit}
    >
      <input value="100" name="tAmt" type="hidden" />
      <input value="100" name="amt" type="hidden" />
      <input value="0" name="txAmt" type="hidden" />
      <input value="0" name="psc" type="hidden" />
      <input value="0" name="pdc" type="hidden" />
      <input value="EPAYTEST" name="scd" type="hidden" />
      <input value="1640687541847ji2ru3BOx51" name="pid" type="hidden" />
      <input
        value="http://localhost:3000/page/esewa_payment_success?q=su"
        type="hidden"
        name="su"
      />
      <input
        value="http://localhost:3000/page/esewa_payment_failed?q=fu"
        type="hidden"
        name="fu"
      />
      <input className="EsewaButton" value="Pay Esewa" type="submit" />
    </form>
  );
};

export default Esewa;
