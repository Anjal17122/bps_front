import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import React, { useState } from "react";

const LargeRadio = () => {
  const [radio, setRadio] = useState(1);

  function onChange(e: RadioChangeEvent) {
    setRadio(e.target.value);
  }
  return (
    <Radio.Group className="largeRadio" onChange={onChange} value={radio}>
      <Radio className="All" value={1}>
        All
      </Radio>
      <Radio className="Unverified" value={2}>
        Unverified
      </Radio>
      <Radio className="Active" value={3}>
        Active
      </Radio>
      <Radio className="Disable" value={4}>
        Disable
      </Radio>
      <Radio className="Blacklisted" value={5}>
        Blacklisted
      </Radio>
    </Radio.Group>
  );
};

export default LargeRadio;
