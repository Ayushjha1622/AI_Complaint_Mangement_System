from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


class APIException(Exception):
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message


async def api_exception_handler(request: Request, exc: APIException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.message,
            "data": None,
        },
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    msg = errors[0].get("msg", "Validation error") if errors else "Validation error"
    if msg.startswith("Value error, "):
        msg = msg[len("Value error, "):]
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "message": msg,
            "data": None,
        },
    )

