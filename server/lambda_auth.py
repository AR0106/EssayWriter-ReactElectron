import json
import pymysql
from Crypto.Hash import SHA256
from Crypto.Cipher import AES
from Crypto import Random

con = pymysql.connect(host='contrabanned-base.chaugaj0echq.us-east-2.rds.amazonaws.com', user='admin', passwd='ReforceLabs2022', db='Users_Prod', port=3306)
cur = con.cursor()
cur.execute("SELECT VERSION()")
version = cur.fetchone()
print("Database version: {} ".format(version[0]))

def lambda_handler(event, context):
    # TODO implement

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

def genSalt(salter):
    salt = str(salter[1:2]) + str(salter[-4:])
    return salt

def decryptAes(cipherText, keyPart):
    key = SHA256.new(genSalt(keyPart).encode()).hexdigest()[:AES.block_size].encode()
    iv = cipherText[:AES.block_size]
    cipher = AES.new(key, AES.MODE_CFB, iv)
    plaintext = cipher.decrypt(cipherText[AES.block_size:])
    return plaintext.decode()

def encryptAes(plainText, keyPart):
    key = SHA256.new(genSalt(keyPart).encode()).hexdigest()[:AES.block_size].encode()
    iv = Random.new().read(AES.block_size)
    cipher = AES.new(key, AES.MODE_CFB, iv)
    ciphertext = iv + cipher.encrypt(plainText.encode())
    return ciphertext

def addPerson(email, password, licenseKey):
    # cur.execute("INSERT INTO user (email, password, license_key) VALUES (%s, %s, %s)", (email, SHA256.new(password.encode()).hexdigest(), licenseKey))
    # con.commit()

    # implement AES encryption
    ciphertext =  encryptAes(password, email)
    print(ciphertext)

    #implement AES decryption
    print(decryptAes(ciphertext, email))

def getPerson(email):
    cur.execute("SELECT * FROM user WHERE email = %s", (email))
    return cur.fetchone()

addPerson("jTest_RF@reforcelabs.com", "test123", "di39dmkea0dm39d73njkd903ndb")