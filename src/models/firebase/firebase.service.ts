import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'

import config from '@config'

const SOUND = {
  DEFAULT: 'golf.mp3',
  IOS: 'golf.caf'
}
const TITLE = 'golf'
const TIME_TO_LIVE = 60 * 60 * 24 * 25 * 100

@Injectable()
export class FirebaseService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(config.firebase)
    })
  }

  get messaging() {
    return admin.messaging()
  }

  get auth() {
    return admin.auth()
  }

  async verifyPhoneNumber(phone_number: string, firebase_token: string) {
    try {
      const verify = await this.auth.verifyIdToken(firebase_token)
      return verify && verify.phone_number === phone_number
    } catch (err) {
      console.log(err)
      return false
    }
  }

  async sendNotification(
    to: string,
    message: string,
    title: string = TITLE,
    action?: {
      type: string
      entity_id: string
    },
    image?: string
  ) {
    const topic = '/topics/' + to

    const payload: admin.messaging.Message = {
      notification: {
        title,
        body: message
      },
      apns: {
        headers: {
          'apns-priority': '10',
          'apns-expiration': TIME_TO_LIVE.toString()
        },
        payload: {
          aps: {
            alert: {
              title,
              body: message
            },
            sound: SOUND.IOS
          }
        }
      },
      android: {
        ttl: TIME_TO_LIVE,
        notification: {
          title,
          body: message,
          sound: SOUND.DEFAULT
        },
        priority: 'high'
      },
      topic
    }

    if (image) {
      //IOS
      payload.apns.payload.aps.mutableContent = true
      payload.apns.fcmOptions.imageUrl = image

      //Android
      payload.android.notification.imageUrl = image

      //Web
      payload.webpush.headers.image = image
    }

    if (action) {
      //IOS
      payload.apns.payload.aps.category = 'action'
      payload.apns.payload.entity_id = action.entity_id

      //Android
      payload.android.notification.clickAction = 'action'
      payload.android.data.entity_id = action.entity_id

      //Web
      payload.webpush.fcmOptions.link = 'links'
    }

    try {
      this.messaging.send(payload)
    } catch (err) {
      console.log(err)
    }
  }
}
