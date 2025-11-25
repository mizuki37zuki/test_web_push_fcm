from fastapi import FastAPI, HTTPException, Form, Query
from typing import List
import os
import json
from dotenv import load_dotenv

import firebase_admin
from firebase_admin import credentials, messaging

# .envファイルを読み込む
load_dotenv()
service_account_json = os.getenv("FIREBASE_SERVICE_ACCOUNT")

if not service_account_json:
    raise ValueError("Environment variable FIREBASE_SERVICE_ACCOUNT is missing")

# json.loadsで文字列をjsonファイルとして読み込む
cred = credentials.Certificate(json.loads(service_account_json))
firebase_admin.initialize_app(cred)

FRONT_URL = os.getenv("FRONT_URL")

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/send_push/")
def send_push(
    token: str, 
    path: str, 
    target_id: str
):
    message = messaging.Message(
        notification=messaging.Notification(
            title="Pythonからのメッセージ",
            body="本文"
        ),
        data={
            "title": "Pythonからのメッセージ！！！",
            "body": "ここが本文です",
            "path": path,
            "targetId": target_id
        },
        webpush=messaging.WebpushConfig(
            fcm_options=messaging.WebpushFCMOptions(
                link=f"https://localhost:3000{path}?id={target_id}"
            )
        ),
        token=token,
    )

    # メッセージの送信
    response = messaging.send(message)
    return {
        "response": response
    }
