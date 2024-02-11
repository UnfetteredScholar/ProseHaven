from core.authentication.email_verification import send_email_verification


email = "atotoffah@gmail.com"

send_email_verification(email, "TestToken")

print("Success")
