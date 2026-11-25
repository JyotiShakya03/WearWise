from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from PIL import Image
from pathlib import Path
import io
import torch
import sys

sys.path.insert(
    0,
    "/kaggle/working/fashn-vton-1.5/src"
)

from fashn_vton import TryOnPipeline

pipeline = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global pipeline

    project_root = Path(__file__).resolve().parents[2]
    model_path = project_root / "weights"

    sys.path.insert(
        0,
        "/content/fashn-vton-1.5/src"
    )

    pipeline = TryOnPipeline(
        weights_dir=str(model_path),
        device="cuda" if torch.cuda.is_available() else "cpu"
    )

    yield

    pipeline = None

app = FastAPI(title="WearWise AI Service")


@app.get("/")
def home():
    return {
        "success": True,
        "message": "WearWise AI Service is running!"
    }


@app.get("/health")
def health_check():
    return {
        "success": True,
        "status": "healthy"
    }
