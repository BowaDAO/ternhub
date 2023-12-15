"use client";
import { useState, useEffect } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import {
  SubmitButton,
  AuthCTA,
  Logo,
  SubmitFormLoader,
  InputField,
  SelectField,
} from "@/components";
import * as Yup from "yup";
import {
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { SocialAuths } from "@/containers";
import Image from "next/image";
import { images } from "@/constants";
import axios from "axios";
import { useMutation } from "react-query";
import { signIn } from "next-auth/react";
import { professions } from "@/constants/data";

const userData: UserSignupDataType = {
  email: "",
  password: "",
  profession: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email address is required!"),
  password: Yup.string().required("Please type in your password!"),
  profession: Yup.string().required("Please select your profession!"),
});

const SignUpPage = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const initializeProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    initializeProviders();
  }, []);

  const signupFormRequest = async (formData: UserSignupDataType) => {
    const res = await axios.post("api/user", formData);
    return res.data;
  };

  const { mutateAsync, isLoading, isError, error, isSuccess } =
    useMutation(signupFormRequest);

  const createUserAccount = async (
    values: UserSignupDataType,
    onSubmitProps: FormikHelpers<UserSignupDataType>
  ) => {
    await mutateAsync(values)
      .then(async (res) => {
        if (isSuccess) {
          await signIn("credentials", {
            ...values,
            callbackUrl: "/",
            redirect: true,
          });

          onSubmitProps.resetForm();
        }
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <div className="grid lg:grid-cols-2">
      <section className="flex flex-col md:px-[13.8%] px-5 py-4 gap-8 lg:gap-[50px]">
        <Logo />

        <div className="flex flex-col gap-8">
          <h1>Create an account</h1>

          <SocialAuths providers={providers} label="Sign up with" />

          <div className="flex items-center gap-[10px] text-textblack text-base">
            <hr className="w-full"></hr> or <hr className="w-full"></hr>
          </div>
        </div>

        <div>
          <Formik
            initialValues={userData}
            onSubmit={createUserAccount}
            validationSchema={validationSchema}
          >
            <Form className="flex flex-col gap-8 w-full">
              <InputField label="Email" name="email" id="email" type="text" />

              <InputField
                label="Password"
                name="password"
                id="password"
                type="password"
              />

              <SelectField
                label="Profession"
                name="profession"
                id="profession"
                data={professions}
              />

              <div className="w-full flex flex-col items-center gap-5">
                {/* {isError && <p>{error}</p>} */}

                <>
                  {isLoading ? (
                    <SubmitFormLoader />
                  ) : (
                    <SubmitButton label="Sign up" />
                  )}
                </>

                <AuthCTA
                  url="/auth/signin"
                  label="Already have an account?"
                  cta="Log in"
                />
              </div>
            </Form>
          </Formik>
        </div>
      </section>

      <section className="h-full w-full lg:inline hidden">
        <Image
          src={images.signupscreenimage}
          alt="signup page image"
          className="object-cover h-full w-full"
          placeholder="blur"
        />
      </section>
    </div>
  );
};

export default SignUpPage;
