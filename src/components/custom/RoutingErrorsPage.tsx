import { useRouteError } from "react-router-dom";
import { ErrorResponse } from "@/interfaces/interface";

const ErrorDetail = ({ content }: { content?: string }) => {
  return content ? <i className="text-red-500">{content}</i> : null;
};

const RoutingErrorsPage = () => {
  const error = useRouteError() as ErrorResponse | null;

  if (!error) {
    return (
      <div className="h-screen flex flex-col justify-center items-center gap-10 text-red-500">
        <h1 className="text-4xl font-bold">Oops!</h1>
        <p>Sorry, an unexpected error has occurred. Please try again later.</p>
      </div>
    );
  }

  const { status, statusText, message, data } = error;

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10 text-red-500">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>

      <div>
        <ErrorDetail content={status?.toString()} />
        {" : "}
        <ErrorDetail content={statusText} />
      </div>

      <ErrorDetail content={message} />

      <ErrorDetail content={data} />
    </div>
  );
};

export default RoutingErrorsPage;
