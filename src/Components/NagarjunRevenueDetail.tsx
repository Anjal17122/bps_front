const NagarjunRevenueDetail: React.FC<{ total: number }> = ({ total }) => {
  const calculations = [
    {
      total: 1500,
      tax: 10,
    },
    {
      total: 2500,
      tax: 15,
    },
    {
      total: 3500,
      tax: 20,
    },
    {
      total: 5000,
      tax: 23,
    },
  ];

  // const calculationDetails = calculations.map(({ total: prevTotal, tax }) => {
  //   const amount =
  //     total >= prevTotal
  //       ? (total - prevTotal > 0 ? total - prevTotal : 0) * tax
  //       : 0;
  //   return (
  //     <li key={`${prevTotal}-${tax}`}>
  //       {total >= prevTotal && `${prevTotal} - ${total}`} {tax}% ({amount})
  //     </li>
  //   );
  // });

  // const calculationDetails = () => {
  //   if (total <= 1500) {
  //   }
  // };

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "white",
        marginTop: -100,
      }}
    >
      <p>
        <b>Calculation Details:</b>
      </p>
      <ul></ul>
      <p>
        Total Revenue:{" "}
        <b>
          {calculations.reduce(
            (sum, { total: prevTotal, tax }) =>
              sum + (total >= prevTotal ? (total - prevTotal) * tax : 0),
            0
          )}
        </b>
      </p>
    </div>
  );
};

export default NagarjunRevenueDetail;
