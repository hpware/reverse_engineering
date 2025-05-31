import hashlib
import base64

def generate_hash(password_string):
    password_bytes = password_string.encode('utf-8')
    sha256_hasher = hashlib.sha256()
    sha256_hasher.update(password_bytes)
    binary_hash = sha256_hasher.digest()
    base64_encoded_hash_bytes = base64.b64encode(binary_hash)
    base64_encoded_hash_string = base64_encoded_hash_bytes.decode('utf-8')

    return base64_encoded_hash_string

known_password = ""
target_hash = ""

generated_hash = generate_hash(known_password)

print(f"Password to test: {known_password}")
print(f"Generated Hash:   {generated_hash}")
print(f"Target Hash:      {target_hash}")