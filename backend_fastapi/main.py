from fastapi import FastAPI, HTTPException, Form, Query
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
def send_push():
    registration_token = "f05Mjz9Q733uxPKhPw6spC:APA91bG8U0JzQ-e8i5xiZ99MEQCDDIhBcn0gsEAr40-xh97XiZuK9cIZWzlpfaVECh6L5M24isaFOCMadUHIBJB3CCN3GwelatGEpkqKJN8zenLA2QBTVds"

    message = messaging.Message(
        notification=messaging.Notification(
            title="Pythonからのメッセージ",
            body="これはテストです。",
        ),
        # webpush=messaging.WebpushConfig(
        #     fcm_options=messaging.WebpushFCMOptions(
        #         link=FRONT_URL  # HTTPSじゃないとだめみたい
        #     )
        # ),
        token=registration_token,
    )

    # message = messaging.Message(
    #     data={
    #         "title": "Pythonからのメッセージ",
    #         "body": "これはテストです。",
    #         "url": "aaa",
    #         "target_id": "23"
    #     },
    #     token=registration_token,
    # )

    # メッセージの送信
    response = messaging.send(message)
    return {
        "response": response
    }
