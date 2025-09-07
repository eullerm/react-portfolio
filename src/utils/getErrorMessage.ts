interface GoogleError {
  code?: number | string;
  message?: string;
  status?: string;
  details?: any[];
}

interface ErrorWrapper {
  error: GoogleError;
}

export function getErrorMessage({ error }: ErrorWrapper): string {
  if (!error) return "unkown";

  switch (error.code) {
    case 401:
    case "401":
      return "noAuth";
    case 404:
    case "404":
      return "notFound";
    case 429:
    case "429":
      return "tooManyRequests";
  }

  return "unkown";
}
