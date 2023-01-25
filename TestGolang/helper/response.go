package helper

type Response struct {
	StatusCode int         `json:"statusCode"`
	Message    string      `json:"message"`
	Data       interface{} `json:"data,omitempty"`
}

type EmptyObj struct{}

func BuildResponse(statusCode int, message string, data interface{}) Response {
	response := Response{
		StatusCode: statusCode,
		Message:    message,
		Data:       data,
	}

	return response
}

func StatusMessageResponse(statusCode int, message string) Response {
	response := Response{
		StatusCode: statusCode,
		Message:    message,
	}

	return response
}
