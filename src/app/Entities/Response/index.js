class ResponseDTO {
  stackTrace;
  error = false;
  loading = false;
  success = false;
  data;

  static fromLoading = () => {
    let response = new ResponseDTO();
    response.loading = true;
    return response;
  };
  static fromSuccess = data => {
    let response = new ResponseDTO();
    response.success = true;
    response.data = data;
    return response;
  };

  static fromError = stackTrace => {
    let response = new ResponseDTO();
    response.error = true;
    response.stackTrace = stackTrace;
    return response;
  };
}

export default ResponseDTO;
