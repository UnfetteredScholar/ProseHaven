from api.v1.routers import health, login, register, user, forgot, story, chapter
from core.config import settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse


"""Defines the main api app for the ProseHaven backend"""

app = FastAPI(title="ProseHaven API")
origins = ["*"] #change later
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=health.router, prefix=settings.API_V1_STR, tags=['health'])
app.include_router(router=login.router, prefix=settings.API_V1_STR, tags=['login'])
app.include_router(router=register.router, prefix=settings.API_V1_STR, tags=['register'])
app.include_router(router=forgot.router, prefix=settings.API_V1_STR, tags=['password reset'])
app.include_router(router=user.router, prefix=settings.API_V1_STR, tags=['users'])
app.include_router(router=story.router, prefix=settings.API_V1_STR, tags=['stories'])
app.include_router(router=chapter.router, prefix=settings.API_V1_STR, tags=['story chapters'])


@app.get("/", include_in_schema=False)
async def index() -> RedirectResponse:
    return RedirectResponse(url="/docs")