"use client";
import { FaqForm } from "@/components";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialValues: FaqFormType = {
  question: "",
};

const AddFaqPage = () => {
  const [answer, setAnswer] = useState("");

  const router = useRouter();

  const queryClient = useQueryClient();

  const addFaqRequest = async (faqData: FaqData) => {
    return await axios.post("/api/faq", faqData);
  };

  const { mutateAsync, isLoading, isError, error } = useMutation(
    addFaqRequest,

    {
      onSuccess: () => {
        queryClient.refetchQueries("getAllFaqs");

        router.push("/admin/faqs");
      },
    }
  );

  const submitFAQ = async (values: FaqFormType) => {
    const faqData = { ...values, answer };

    await mutateAsync(faqData);
  };

  return (
    <FaqForm
      title="Add FAQ"
      initialValues={initialValues}
      submitForm={submitFAQ}
      isLoading={isLoading}
      isError={isError}
      error={error}
      buttonLabel="Add Faq"
      textEditorValue={answer}
      textEditorOnchange={setAnswer}
    />
  );
};

export default AddFaqPage;
