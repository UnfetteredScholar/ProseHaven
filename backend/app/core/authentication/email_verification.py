import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from os import getenv
from dotenv import load_dotenv

load_dotenv()
# def send_email_verification(email: str, token: str) -> None:
#     url = f"{getenv('VERIFY_EMAIL_URL')}?token={token}"
#     sender_email = "atotoffah@gmail.com"#"your_email@example.com"
#     receiver_email = email
#     subject = "Virtual Screening Analyst Email Verification"
#     message = (
#         f"Hello,\n\nClick on this to verify your email: {url}\n\nBest regards,\nThe"
#         " Reset Password Team"
#     )

#     msg = MIMEText(message)
#     msg["Subject"] = subject
#     msg["From"] = sender_email
#     msg["To"] = receiver_email

#     smtp_server = "localhost"
#     smtp_port = 1025
#     # smtp_username = "your_smtp_username"
#     # smtp_password = "your_smtp_password"

#     with smtplib.SMTP(smtp_server, smtp_port) as server:
#         # server.starttls()
#         # server.login(smtp_username, smtp_password)
#         server.sendmail(sender_email, [receiver_email], msg.as_string())


def send_email_verification(receiver_email, token):

    url = f"{getenv('VERIFY_EMAIL_URL')}?token={token}"
    sender_email = getenv("EMAIL_ACCOUNT")
    sender_password = getenv("EMAIL_PASSWORD")
    subject = "ProseHaven Email Verification"
    message = (
        f"Hello,\n\nClick on this to verify your email: {url}\n\nBest regards,\nThe"
        "ProseHaven Team"
    )
    # Set up the MIME
    email_msg = MIMEMultipart()
    email_msg["From"] = sender_email
    email_msg["To"] = receiver_email
    email_msg["Subject"] = subject

    # Attach the message to the email
    email_msg.attach(MIMEText(message, "plain"))

    # Create SMTP session
    session = smtplib.SMTP(getenv("SMTP_HOST"), int(getenv("SMTP_PORT")))
    session.starttls()  # enable security
    session.login(sender_email, sender_password)  # login with mail_id and password

    # Send the email
    text = email_msg.as_string()
    session.sendmail(sender_email, receiver_email, text)
    session.quit()


def send_reset_email(receiver_email, token):

    url = f"{getenv('RESET_PASSWORD_URL')}?token={token}"
    sender_email = getenv("EMAIL_ACCOUNT")
    sender_password = getenv("EMAIL_PASSWORD")
    subject = "ProseHaven password reset"
    message = (
        f"Hello,\n\nClick on this to reset your password: {url}\n\nBest regards,\nThe"
        "ProseHaven Team"
    )
    # Set up the MIME
    email_msg = MIMEMultipart()
    email_msg["From"] = sender_email
    email_msg["To"] = receiver_email
    email_msg["Subject"] = subject

    # Attach the message to the email
    email_msg.attach(MIMEText(message, "plain"))

    # Create SMTP session
    session = smtplib.SMTP(getenv("SMTP_HOST"), int(getenv("SMTP_PORT")))
    session.starttls()  # enable security
    session.login(sender_email, sender_password)  # login with mail_id and password

    # Send the email
    text = email_msg.as_string()
    session.sendmail(sender_email, receiver_email, text)
    session.quit()
