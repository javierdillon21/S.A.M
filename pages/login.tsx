/**
 * Login Page. Controls all the flow in order the user
 * gets the correct credentials to use the system.
 *
 * */

import { Auth } from "aws-amplify";
import Image from "next/image";
import { useRouter } from "next/router";
// import { QRCode } from 'react-qr-svg'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../components/input";
import SpinnerLoading from "../components/spinnerLoading";
import { LoginState } from "../src/utils/user";
import { CognitoUserCustom } from "../src/data";

interface SignInFormType {
  name: string;
  password: string;
}

interface NormalTOTPFormType {
  tOTPcode: string;
}

interface FirstTOTPFormType {
  firstTOTPCode: string;
}

interface CreatePasswordFormType {
  newPassword: string;
}

interface ErrorSignIn {
  code: string;
  message: string;
  name: string;
}

const logo = "/assets/logoVenimetrix.png";

function getUserFriendlyError(error: ErrorSignIn) {
  return error.code === "NotAuthorizedException"
    ? "Clave equivocada"
    : error.code === "UserNotFoundException"
    ? "Usuario no existente"
    : error.code === "InvalidPasswordException"
    ? "Mejore su clave"
    : "Hubo un problema.";
}

export default function Login() {
  // state that indicate the step the user has to take
  const [loginState, setLoginState] = useState<LoginState>("UNDEFINED");

  // state that will store the code (url TOTP) that'll show
  // the QR code.
  // const [qRCode, setQRCode] = useState<string>()

  const router = useRouter();
  const [user, setUser] = useState<CognitoUserCustom>();
  // const [codeTOTP, setCodeTOTP] = useState<string>()
  // const [qRContent, setQRContent] = useState<string>()

  const [loading, setLoading] = useState<boolean>(false);

  // user friendly error, taken from `error`
  const [userFriendlyError, setUserFriendlyError] = useState<string>();

  // error from AWS at signing in.
  const [error, setError] = useState<ErrorSignIn>();

  // initializing useForm forms
  const {
    register: signInRegister,
    handleSubmit: signInHandleSubmit,
    formState: { errors: signInErrors },
  } = useForm<SignInFormType>();
  // const {
  //   register: normalTOTPRegister,
  //   handleSubmit: normalTOTPHandleSubmit,
  //   formState: { errors: normalTOTPErrors },
  // } = useForm<NormalTOTPFormType>()
  const {
    register: createPasswordRegister,
    handleSubmit: createPasswordHandleSubmit,
    formState: { errors: createPasswordErrors },
  } = useForm<CreatePasswordFormType>();
  // const {
  //   register: firstTOTPCodeRegister,
  //   handleSubmit: firstTOTPCodeHandleSubmit,
  //   formState: { errors: firstTOTPCodeErrors },
  // } = useForm<FirstTOTPFormType>()

  // efect to read from `useState` the step needed to go
  useEffect(() => {
    if (user) {
      if (!user.challengeName) setLoginState("SUCCESS");
      else setLoginState(user.challengeName);
    } else {
      setLoginState("UNDEFINED");
    }
  }, [user]);

  // effect to set the user friendly error
  useEffect(() => {
    if (error) {
      setUserFriendlyError(getUserFriendlyError(error));
    }
  }, [error]);

  // start the MFA setup when the user state require it
  // useEffect(() => {
  //   if (loginState === 'MFA_SETUP') {
  //     setLoading(true)
  //     Auth.setupTOTP(user)
  //       .then((mfaCode) => {
  //         let qRCode = mFACodeToTOTPURL(mfaCode, 'Venimetrix')
  //         setQRCode(qRCode)
  //         setLoading(false)
  //       })
  //       .catch((err) => {
  //         setLoading(false)
  //         console.error('Error setting up MFA:', err)
  //       })
  //   }
  // }, [loginState])

  function onSubmitSignIn(signInInput: SignInFormType) {
    setLoading(true);
    Auth.signIn(signInInput.name, signInInput.password)
      .then((user) => {
        setUser(user);
        // TODO: by now, we bypass the TOTP step
        console.log("User signing in:", user);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
        console.error("Error signing in the user:", e);
      });
  }

  // function onSubmitNormalTOTP(normalTOTPInput: NormalTOTPFormType) {
  //   setLoading(true)
  //   Auth.confirmSignIn(user, normalTOTPInput.tOTPcode, 'SOFTWARE_TOKEN_MFA')
  //     .then((user) => {
  //       console.log('TOTP sent:', user)
  //       setLoginState('SUCCESS')
  //       setLoading(false)
  //     })
  //     .catch((e) => {
  //       setError(e)
  //       setLoading(false)
  //       console.error('Error sendig TOTP code:', e)
  //     })
  // }

  // function onSubmitFirstTOTPCode(firstTOTPCodeInput: FirstTOTPFormType) {
  //   setLoading(true)
  //   Auth.verifyTotpToken(user, firstTOTPCodeInput.firstTOTPCode)
  //     .then((user) => {
  //       console.log('First TOTP sent:', user)
  //       setLoginState('SUCCESS')
  //       setLoading(false)
  //     })
  //     .catch((e) => {
  //       setError(e)
  //       setLoading(false)
  //       console.error('Error sendig the first TOTP code:', e)
  //     })
  // }

  function onSubmitCreatePassword(createPasswordInput: CreatePasswordFormType) {
    setLoading(true);
    Auth.completeNewPassword(user, createPasswordInput.newPassword)
      .then((user) => {
        setUser(user);
        console.log("Password created:", user);
        setLoading(false);

        // TODO: improve this
        window.location.reload();
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.error("Error Creating new password:", err);
      });
  }

  const formSignIn = (
    <div className="mt-16 self-center justify-self-center">
      <div className="flex justify-center">
        <Image src={logo} alt="Venimetrix logo." width="150" height="150" />
      </div>
      <form
        onSubmit={signInHandleSubmit(onSubmitSignIn)}
        className="flex flex-col gap-4"
      >
        {userFriendlyError && (
          <span className="text-red-500 text text-center">
            {userFriendlyError}
          </span>
        )}
        <Input
          label="Usuario"
          register={signInRegister("name", { required: true })}
          errorCondition={signInErrors.name}
        />

        <Input
          label="Clave"
          type="password"
          register={signInRegister("password", { required: true })}
          errorCondition={signInErrors.name}
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );

  // const formNomalTOTPCode = (
  //   <>
  //     <Image src={logo} alt="Venimetrix logo." width="150" height="150" />
  //     <form
  //       onSubmit={normalTOTPHandleSubmit(onSubmitNormalTOTP)}
  //       className="flex flex-col gap-4"
  //     >
  //       <Input
  //         label="Código de Confirmación"
  //         register={normalTOTPRegister('tOTPcode')}
  //         errorCondition={normalTOTPErrors.tOTPcode}
  //       />

  //       <Button isLoading={loading} type="submit">
  //         Enviar Código
  //       </Button>
  //       <span className="text-sm text-blue-400">Releer código QR</span>
  //     </form>
  //   </>
  // )

  const formCreatePassword = (
    <div className="mt-16 self-center justify-self-center">
      <div className="flex justify-center">
        <Image src={logo} alt="Venimetrix logo." width="150" height="150" />
      </div>
      <div className="mt-4">Cree una clave para su cuenta</div>
      <form
        onSubmit={createPasswordHandleSubmit(onSubmitCreatePassword)}
        className="flex flex-col gap-4"
      >
        {userFriendlyError && (
          <span className="text-red-500 text text-center">
            {userFriendlyError}
          </span>
        )}
        <Input
          label="Nueva Clave"
          type="password"
          register={createPasswordRegister("newPassword", { required: true })}
          errorCondition={createPasswordErrors.newPassword}
        />

        <button type="submit">Crear Nueva Clave</button>
      </form>
    </div>
  );

  // const formSetupMFA = (
  //   <>
  //     <Image src={logo} alt="Venimetrix logo." width="150" height="150" />

  //     {/* indications */}
  //     <div className="flex flex-col mt-2 mb-4">
  //       <span>1) Escaneé este código con su app de preferencia.</span>
  //       <span>2) Luego, escriba abajo el código que indique su app.</span>
  //       <span className="text-sm text-gray-500">
  //         Sugerencia: Use Google Authenticator
  //       </span>
  //     </div>

  //     {qRCode && (
  //       <QRCode
  //         bgColor="#FFFFFF"
  //         fgColor="#000000"
  //         level="Q"
  //         style={{ width: 128 }}
  //         value={qRCode}
  //       />
  //     )}

  //     <form
  //       onSubmit={firstTOTPCodeHandleSubmit(onSubmitFirstTOTPCode)}
  //       className="flex flex-col gap-4 my-4"
  //     >
  //       {userFriendlyError && (
  //         <span className="text-red-500 text text-center">
  //           {userFriendlyError}
  //         </span>
  //       )}
  //       <Input
  //         label="Código de Verificación"
  //         type="text"
  //         register={firstTOTPCodeRegister('firstTOTPCode', { required: true })}
  //         errorCondition={firstTOTPCodeErrors.firstTOTPCode}
  //       />

  //       <Button isLoading={loading} type="submit">
  //         Enviar Código
  //       </Button>
  //     </form>
  //   </>
  // )

  if (loading) return <SpinnerLoading />;

  if (loginState === "SUCCESS") router.push("/");

  // common TOPCode
  // if (loginState === 'SOFTWARE_TOKEN_MFA') return formNomalTOTPCode

  // first sigin, need create new password
  if (loginState === "NEW_PASSWORD_REQUIRED") return formCreatePassword;

  // scanning the QR Code by first time
  // if (loginState === 'MFA_SETUP') return formSetupMFA

  // user need to signIn
  if (loginState === "UNDEFINED") return formSignIn;

  // if there is nothing to render
  // show the loading sign.
  return <SpinnerLoading />;
}
