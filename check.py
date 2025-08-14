from werkzeug.security import generate_password_hash, check_password_hash

# Step 1: Hash the password (Store this in the database)
hashed_password = generate_password_hash("1234")
print("Hashed Password:", hashed_password)

# Step 2: Check if the input password is correct
input_password = "1234"
print(hashed_password, input_password)
is_correct = check_password_hash("scrypt:32768:8:1$kxafeOzh2VNwXBlF$9063b86e3d86c8f4c594d221a287398fa29ad61564305dc7650cc27dcb114fde5d347eee49c7e21e3c011bb685e8fa0b647237f55a9f5ebeee42fe17e2d242c3", input_password)

print("Password Match:", is_correct)  # Output: True