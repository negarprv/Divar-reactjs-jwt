import { useState } from "react";
import CheckOtpFrom from "components/templates/CheckOtpFrom";
import SendOtpForm from "components/templates/SendOTPForm";

const AuthPage = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");

  return (
    <div>
      {step === 1 && (
        <SendOtpForm
          setCode={setCode}
          setStep={setStep}
          mobile={mobile}
          setMobile={setMobile}
        />
      )}
      {step === 2 && (
        <CheckOtpFrom
          setStep={setStep}
          mobile={mobile}
          code={code}
          setCode={setCode}
        />
      )}
    </div>
  );
};

export default AuthPage;
