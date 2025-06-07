/* eslint-disable no-restricted-globals */
class Encryption {
  #algorithm = 'AES-GCM'

  #keyLength = 256

  #ivLength = 12

  #keyPromise = null

  constructor() {
    this.#keyPromise = this.#deriveKeyFromDeviceId()
  }

  async #deriveKeyFromDeviceId() {
    const deviceIdData = [
      navigator.userAgent,
      navigator.hardwareConcurrency,
      navigator.deviceMemory,
      screen.width,
      screen.height,
    ].join('|')

    const encoder = new TextEncoder()
    const deviceIdBuffer = encoder.encode(deviceIdData)

    //  Используем PBKDF2 для получения стабильного ключа
    const salt = encoder.encode('static-salt-for-my-app')
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      deviceIdBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveKey'],
    )

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100_000,
        hash: 'SHA-256',
      },
      keyMaterial,
      {
        name: this.#algorithm,
        length: this.#keyLength,
      },
      true,
      ['encrypt', 'decrypt'],
    )
  }

  async #getKey() {
    return this.#keyPromise
  }

  async encrypt(data) {
    if (!data) throw new Error('No data provided')

    const key = await this.#getKey()
    const iv = crypto.getRandomValues(new Uint8Array(this.#ivLength))
    const encodedData = new TextEncoder().encode(JSON.stringify(data))

    const encryptedData = await crypto.subtle.encrypt(
      { name: this.#algorithm, iv },
      key,
      encodedData,
    )

    return {
      iv: Encryption.#arrayBufferToBase64(iv),
      data: Encryption.#arrayBufferToBase64(encryptedData),
    }
  }

  async decrypt(encrypted) {
    if (!encrypted?.iv || !encrypted?.data) throw new Error('Invalid data')

    const key = await this.#getKey()
    const iv = Encryption.#base64ToArrayBuffer(encrypted.iv)
    const data = Encryption.#base64ToArrayBuffer(encrypted.data)

    const decrypted = await crypto.subtle.decrypt(
      { name: this.#algorithm, iv },
      key,
      data,
    )

    return JSON.parse(new TextDecoder().decode(decrypted))
  }

  static #arrayBufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
  }

  static #base64ToArrayBuffer(base64) {
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return bytes
  }
}

export default Encryption
