import { useEffect, useState } from "react";
import { CustomError, FaqForm, TailSpinLoader } from "@/components";
import { useGetFaqById } from "@/utilities/data-fetching/getFaqById";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setModalVisible } from "@/redux-toolkit/slices/modal";

type Props = {
  faqId: string;
};

const UpdateFaq = (props: Props) => {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  let prevFaqFetchingErrorResponse: any;

  const {
    isLoading: prevFaqFetchingLoading,
    faq,
    isError: prevFaqFetchingIsError,
    error: prevFaqFetchingError,
  } = useGetFaqById(props.faqId);

  const [faqAnswer, setFaqAnswer] = useState("");

  useEffect(() => {
    setFaqAnswer(faq?.answer as string);
  }, [faq?._id, faq?.answer]);

  const updateFaqRequest = async (faqData: FaqData) => {
    const res = await axios.patch(`/api/faq/${props.faqId}`, faqData);
    return res.data;
  };

  const {
    isLoading: updateFaqLoading,
    mutateAsync,
    isError: isFaqUpdateError,
    error: faqUpdateError,
  } = useMutation<MessageResponse, AxiosError<ErrorResponse>, FaqData>(
    "udateFaq",

    updateFaqRequest,

    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllFaqs");

        dispatch(setModalVisible(false));
      },
    }
  );

  const initiateUpdateFaqData = async (values: FaqFormType) => {
    const newFaqData = { ...values, answer: faqAnswer };

    await mutateAsync(newFaqData);
  };

  return (
    <div className="relative">
      {prevFaqFetchingLoading && (
        <span className="absolute h-full w-full top-0 left-0 flex items-center justify-center">
          <TailSpinLoader />
        </span>
      )}

      {prevFaqFetchingIsError && (
        <CustomError
          message={prevFaqFetchingError?.response?.data?.message}
          loading={prevFaqFetchingLoading}
        />
      )}

      <FaqForm
        title="Edit Faq"
        initialValues={{
          question: faq?.question !== undefined ? faq?.question : "",
        }}
        submitForm={initiateUpdateFaqData}
        isLoading={updateFaqLoading}
        error={faqUpdateError}
        buttonLabel="Update Faq"
        textEditorOnchange={setFaqAnswer}
        textEditorValue={faqAnswer !== undefined ? faqAnswer : ""}
        isError={isFaqUpdateError}
      />
    </div>
  );
};

export default UpdateFaq;
