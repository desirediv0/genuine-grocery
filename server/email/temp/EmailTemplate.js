import { getStoreConfig } from "../../utils/storeConfig.js";

export const getVerificationTemplate = (
    verificationLink,
    storeConfig = null
) => {
    const store = storeConfig || getStoreConfig();
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - ${store.storeName}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #111827;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;
        }
        .header {
            background: linear-gradient(135deg, #16A34A, #15803d);
            color: #ffffff;
            text-align: center;
            padding: 50px 40px;
        }
        .content {
            padding: 40px;
        }
        h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.025em;
        }
        h2 {
            color: #111827;
            font-size: 22px;
            margin-top: 0;
            font-weight: 700;
        }
        p {
            margin-bottom: 24px;
            font-size: 16px;
            color: #4b5563;
        }
        .button-container {
            text-align: center;
            margin: 35px 0;
        }
        .button {
            display: inline-block;
            padding: 16px 40px;
            background-color: #F97316;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 800;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            box-shadow: 0 4px 14px rgba(249, 115, 22, 0.3);
        }
        .features {
            background-color: #f0fdf4;
            padding: 30px;
            border-radius: 16px;
            margin-top: 30px;
        }
        .features h3 {
            margin-top: 0;
            color: #16A34A;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        .feature-item {
            margin-bottom: 12px;
            padding-left: 28px;
            position: relative;
            color: #374151;
            font-weight: 500;
            font-size: 14px;
        }
        .feature-item:before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #16A34A;
            font-weight: 900;
        }
        .footer {
            text-align: center;
            padding: 30px;
            font-size: 13px;
            color: #9ca3af;
            background-color: #ffffff;
            border-top: 1px solid #f3f4f6;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to ${store.storeName}</h1>
        </div>
        <div class="content">
            <h2>Verify Your Email</h2>
            <p>Hi there,</p>
            <p>Thank you for joining <strong>${store.storeName}</strong>. We're excited to bring fresh, farm-to-table nutritional products directly to your doorstep. Please verify your email to get started:</p>
            <div class="button-container">
                <a href="${verificationLink}" class="button">Verify My Email</a>
            </div>
            <p style="font-size: 13px; color: #9ca3af;">If the button doesn't work, copy this link: ${verificationLink}</p>
            
            <div class="features">
                <h3>The Genuine Experience:</h3>
                <div class="feature-item">Direct Farm-to-Home Delivery</div>
                <div class="feature-item">100% Pure & Organic Nutrition</div>
                <div class="feature-item">Flexible Subscription Plans</div>
                <div class="feature-item">Exclusive Member Offers</div>
            </div>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} ${store.storeName} | ${store.storeTagline}<br>
            Pure. Fresh. Local. <br><br>
            This is an automated message. Please do not reply.
        </div>
    </div>
</body>
</html>
`;
};

export const getEmailOtpTemplate = (
    otp,
    expiresInMinutes = 10,
    storeConfig = null
) => {
    const store = storeConfig || getStoreConfig();
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP - ${store.storeName}</title>
    <style>
        body { font-family: sans-serif; background: #f9fafb; margin:0; padding:0; color:#111827; }
        .container { max-width: 500px; margin: 40px auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; }
        .header { background: #16A34A; color: #fff; text-align: center; padding: 40px; }
        .content { padding: 40px; text-align: center; }
        h1 { margin: 0; font-size: 24px; font-weight: 800; }
        p { margin: 0 0 20px; font-size: 16px; color: #4b5563; }
        .otp { font-size: 40px; letter-spacing: 12px; font-weight: 900; color: #16A34A; background: #f0fdf4; padding: 20px; border-radius: 12px; display:inline-block; margin: 20px 0; }
        .footer { text-align:center; padding: 20px; font-size: 12px; color:#9ca3af; background:#ffffff; border-top: 1px solid #f3f4f6; }
    </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Verification Code</h1>
            </div>
            <div class="content">
                <p>Use the code below to verify your account at <strong>${store.storeName}</strong>:</p>
                <div class="otp">${otp}</div>
                <p style="font-size: 14px; color: #ef4444;">This code expires in ${expiresInMinutes} minutes.</p>
            </div>
            <div class="footer">
                © ${new Date().getFullYear()} ${store.storeName} | ${store.storeTagline}
            </div>
        </div>
    </body>
</html>
`;
};

export const getDeleteTemplate = (deletionLink, storeConfig = null) => {
    const store = storeConfig || getStoreConfig();
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Deletion - ${store.storeName}</title>
    <style>
        body { font-family: sans-serif; background: #f9fafb; margin:0; padding:0; color:#111827; }
        .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; }
        .header { background: #dc2626; color: #fff; text-align: center; padding: 40px; }
        .content { padding: 40px; }
        h1 { margin: 0; font-size: 24px; font-weight: 800; }
        .button { display: inline-block; padding: 16px 32px; background: #dc2626; color: #fff !important; text-decoration: none; border-radius: 12px; font-weight: 700; margin: 30px 0; }
        .footer { text-align:center; padding: 20px; font-size: 12px; color:#9ca3af; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Account Deletion Request</h1>
        </div>
        <div class="content">
            <p>Hi,</p>
            <p>We received a request to delete your <strong>${store.storeName}</strong> account. This action will permanently remove all your order history and subscription details.</p>
            <p>If you wish to proceed, click the button below:</p>
            <div style="text-align: center;">
                <a href="${deletionLink}" class="button">Confirm Deletion</a>
            </div>
            <p style="color: #ef4444; font-size: 14px;"><strong>Warning:</strong> This action cannot be undone.</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} ${store.storeName}
        </div>
    </div>
</body>
</html>
`;
};

export const getResetTemplate = (resetLink, storeConfig = null) => {
    const store = storeConfig || getStoreConfig();
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - ${store.storeName}</title>
    <style>
        body { font-family: sans-serif; background: #f9fafb; margin:0; padding:0; color:#111827; }
        .container { max-width: 500px; margin: 40px auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; }
        .header { background: #16A34A; color: #fff; text-align: center; padding: 40px; }
        .content { padding: 40px; text-align: center; }
        .button { display: inline-block; padding: 16px 32px; background: #F97316; color: #fff !important; text-decoration: none; border-radius: 12px; font-weight: 700; margin: 30px 0; }
        .footer { text-align:center; padding: 20px; font-size: 12px; color:#9ca3af; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Reset Your Password</h1>
        </div>
        <div class="content">
            <p>Forgot your password? No worries! Click the button below to set a new one for your <strong>${store.storeName}</strong> account:</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <p style="font-size: 13px; color: #9ca3af;">Link expires in 15 minutes.</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} ${store.storeName}
        </div>
    </div>
</body>
</html>
`;
};

export const getFeeReceiptTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Payment Receipt - Genuine Grocery</title>
    <style>
        body { font-family: sans-serif; color: #111827; background: #f9fafb; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 20px; overflow: hidden; border: 1px solid #e5e7eb; }
        .header { background: #16A34A; color: #fff; text-align: center; padding: 40px; }
        .content { padding: 40px; }
        .details { background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; }
        .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
        .footer { text-align: center; padding: 20px; color: #9ca3af; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Payment Receipt</h1>
        </div>
        <div class="content">
            <p>Hi ${data.userName},</p>
            <p>Thank you for your order! Your payment was successful.</p>
            <div class="details">
                <div class="row"><strong>Amount:</strong> <span>₹${data.amount}</span></div>
                <div class="row"><strong>Transaction ID:</strong> <span>${data.paymentId}</span></div>
                <div class="row"><strong>Date:</strong> <span>${new Date(data.date).toLocaleDateString()}</span></div>
            </div>
            <p>Your order is now being processed. We'll notify you once it's out for delivery!</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} Genuine Grocery | Pure. Fresh. Local.
        </div>
    </div>
</body>
</html>
`;

export const getFeeNotificationTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Order Update - Genuine Grocery</title>
    <style>
        body { font-family: sans-serif; color: #111827; background: #f9fafb; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 20px; overflow: hidden; border: 1px solid #e5e7eb; }
        .header { background: #F97316; color: #fff; text-align: center; padding: 40px; }
        .content { padding: 40px; }
        .footer { text-align: center; padding: 20px; color: #9ca3af; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Notification</h1>
        </div>
        <div class="content">
            <h2>${data.title}</h2>
            <p>${data.description || "You have a new update regarding your recent order at Genuine Grocery."}</p>
            <div style="background: #fff7ed; padding: 20px; border-radius: 12px; border: 1px solid #ffedd5;">
                <p><strong>Amount:</strong> ₹${data.amount}</p>
                <p><strong>Due Date:</strong> ${new Date(data.dueDate).toLocaleDateString()}</p>
            </div>
            <p style="margin-top: 20px;">Please check your dashboard for more details.</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} Genuine Grocery
        </div>
    </div>
</body>
</html>
`;

export const getPaymentSuccessTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Success - Genuine Grocery</title>
    <style>
        body { font-family: sans-serif; color: #111827; background: #f9fafb; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 20px; overflow: hidden; border: 1px solid #e5e7eb; }
        .header { background: #16A34A; color: #fff; text-align: center; padding: 40px; }
        .content { padding: 40px; }
        .footer { text-align: center; padding: 20px; color: #9ca3af; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Successful!</h1>
        </div>
        <div class="content">
            <p>Hi ${data.userName},</p>
            <p>Your payment for <strong>${data.feeTitle}</strong> has been processed successfully.</p>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; border: 1px solid #dcfce7;">
                <p><strong>Amount:</strong> ₹${data.amount}</p>
                <p><strong>Order ID:</strong> ${data.paymentId}</p>
                <p><strong>Date:</strong> ${new Date(data.date).toLocaleString()}</p>
            </div>
            <p style="margin-top: 20px;">Thank you for choosing Genuine Grocery!</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} Genuine Grocery | Fresh Farm Nutrition
        </div>
    </div>
</body>
</html>
`;

export const getPaymentFailureTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Payment Failed - Genuine Grocery</title>
    <style>
        body { font-family: sans-serif; color: #111827; background: #f9fafb; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 20px; overflow: hidden; border: 1px solid #e5e7eb; }
        .header { background: #dc2626; color: #fff; text-align: center; padding: 40px; }
        .content { padding: 40px; }
        .footer { text-align: center; padding: 20px; color: #9ca3af; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Payment Failed</h1>
        </div>
        <div class="content">
    "en-IN"
)}</p>
                <p><strong>Fee Type:</strong> ${data.feeTitle}</p>
                <p><strong>Error:</strong> ${data.error || "Transaction could not be completed"
    }</p>
            </div>

            <p>Possible reasons for payment failure:</p>
            <ul>
                <li>Insufficient funds in your account</li>
                <li>Bank server issues</li>
                <li>Network connectivity problems</li>
                <li>Transaction timeout</li>
            </ul>

            <p>Please try again or contact your bank if the issue persists.</p>
            
            <a href="${process.env.FRONTEND_URL
    }/dashboard/fees" class="retry-button">
                Retry Payment
            </a>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} Genuine Grocery | Premium Nutritional Products</p>
            <p>Need help? Contact our support team at connect.genuinenutrition@gmail.com</p>
        </div>
    </div>
</body>
</html>
`;

export const getFeeUpdateTemplate = ({
    name,
    feeTitle,
    oldAmount,
    newAmount,
    oldDate,
    newDate,
    reason,
}) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #EF4444; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .footer { text-align: center; padding: 20px; color: #666; }
        .amount { font-size: 18px; font-weight: bold; color: #EF4444; }
        .details { margin: 20px 0; padding: 15px; background: white; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Fee Update Notification</h2>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>This is to inform you that there has been an update to your order fee: <strong>${feeTitle}</strong></p>
            
            <div class="details">
                <h3>Update Details:</h3>
                <p><strong>Amount:</strong> ₹${oldAmount} → ₹${newAmount}</p>
                <p><strong>Due Date:</strong> ${oldDate} → ${newDate}</p>
                <p><strong>Reason:</strong> ${reason}</p>
            </div>

            <p>If you have any questions about this update, please contact our support team.</p>
        </div>
        <div class="footer">
            <p>Genuine Grocery | Premium Nutritional Products</p>
            <small>This is an automated message, please do not reply.</small>
        </div>
    </div>
</body>
</html>
`;

export const getCertificateGeneratedTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate Generated - Genuine Grocery</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #16A34A, #1D4ED8);
            color: #ffffff;
            text-align: center;
            padding: 40px;
        }
        .content {
            padding: 40px;
        }
        h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        h2 {
            color: #1a1a1a;
            font-size: 24px;
            margin-top: 0;
        }
        p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #333333;
        }
        .certificate-info {
            background-color: #f8f9fa;
            padding: 30px;
            border-radius: 8px;
            margin-top: 30px;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);
        }
        .certificate-id {
            font-family: monospace;
            background: #f0f0f0;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            padding: 15px 35px;
            background: linear-gradient(135deg, #16A34A, #1D4ED8);
            color: #ffffff;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 18px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
            margin: 20px 0;
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #666666;
            background-color: #f8f8f8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Congratulations!</h1>
        </div>
        <div class="content">
            <h2>Pure Quality Achievement</h2>
            <p>Dear ${data.userName},</p>
            <p>We are delighted to inform you that you have successfully completed your latest journey with us:</p>
            <h3 style="color: #1D4ED8;">${data.courseName}</h3>
            
            <div class="certificate-info">
                <p><strong>Your certificate of purity excellence has been generated!</strong></p>
                <p>Certificate ID: <span class="certificate-id">${data.certificateId
    }</span></p>
                <p>You can now access your quality certificate from your profile. This marks an important milestone in your experience with us.</p>
            </div>

            <center>
                <a href="${process.env.FRONTEND_URL
    }/user-profile" class="button">View Certificate</a>
            </center>

            <p>This certificate validates your dedication to quality nutrition and your commitment to purity. Continue on the path of health and excellence!</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} Genuine Grocery | Premium Nutritional Products<br>
            This is an automated message. Please do not reply to this email.
        </div>
    </div>
</body>
</html>
`;

export const getContactFormTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission - Genuine Grocery</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #16A34A, #1D4ED8);
            color: #ffffff;
            text-align: center;
            padding: 30px;
        }
        .content {
            padding: 30px;
        }
        h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        h2 {
            color: #1a1a1a;
            font-size: 22px;
            margin-top: 0;
        }
        .message-box {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .contact-details {
            margin-top: 30px;
            padding: 20px;
            background-color: #f0f0f0;
            border-radius: 8px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #666666;
            background-color: #f8f8f8;
        }
        .detail-row {
            margin-bottom: 10px;
        }
        .detail-label {
            font-weight: bold;
            display: inline-block;
            width: 100px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Inquiry</h1>
        </div>
        <div class="content">
            <h2>${data.subject || "Inquiry About Our Products"}</h2>
            
            <div class="message-box">
                <p>${data.message}</p>
            </div>
            
            <div class="contact-details">
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span>${data.name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span>${data.email}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone:</span>
                    <span>${data.phone}</span>
                </div>
            </div>
            
            <p>Please respond to this inquiry about our products at your earliest convenience.</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} Genuine Grocery | Premium Nutritional Products<br>
            This is an automated message from your website contact form.
        </div>
    </div>
</body>
</html>
`;

export const getOrderConfirmationTemplate = (data, storeConfig = null) => {
    const store = storeConfig || getStoreConfig();
    const hasDiscount = data.discount && parseFloat(data.discount) > 0;
    const hasCoupon = data.couponCode && data.couponCode.trim() !== "";

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - ${store.storeName}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #16A34A, #1D4ED8);
            color: #ffffff;
            text-align: center;
            padding: 30px;
        }
        .content {
            padding: 30px;
        }
        h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        h2 {
            color: #1a1a1a;
            font-size: 22px;
            margin-top: 0;
        }
        .order-details {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .order-summary {
            margin-top: 30px;
            padding: 20px;
            background-color: #f0f0f0;
            border-radius: 8px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #666666;
            background-color: #f8f8f8;
        }
        .detail-row {
            margin-bottom: 10px;
        }
        .detail-label {
            font-weight: bold;
            display: inline-block;
            width: 150px;
        }
        .order-items {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .order-items th {
            background-color: #16A34A;
            color: #fff;
            padding: 12px 10px;
            text-align: left;
            font-size: 13px;
        }
        .order-items td {
            padding: 12px 10px;
            border-bottom: 1px solid #e9ecef;
            font-size: 14px;
        }
        .product-name {
            font-weight: 600;
            color: #1a1a1a;
        }
        .product-variant {
            font-size: 12px;
            color: #666;
            margin-top: 4px;
        }
        .original-price {
            text-decoration: line-through;
            color: #999;
            font-size: 12px;
        }
        .sale-price {
            color: #16a34a;
            font-weight: 600;
        }
        .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e0e0e0;
        }
        .summary-row:last-child {
            border-bottom: none;
        }
        .summary-label {
            color: #666;
        }
        .summary-value {
            font-weight: 500;
        }
        .discount-row {
            color: #16a34a;
        }
        .discount-row .summary-value {
            color: #16a34a;
        }
        .total-row {
            font-size: 18px;
            font-weight: bold;
            padding-top: 12px;
            margin-top: 8px;
            border-top: 2px solid #333;
        }
        .total-row .summary-label {
            color: #1a1a1a;
        }
        .total-row .summary-value {
            color: #16A34A;
        }
        .coupon-badge {
            display: inline-block;
            background-color: #dcfce7;
            color: #16a34a;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-left: 8px;
        }
        .savings-box {
            background: linear-gradient(135deg, #dcfce7, #bbf7d0);
            border: 1px solid #86efac;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            text-align: center;
        }
        .savings-text {
            color: #16a34a;
            font-weight: 600;
            font-size: 16px;
        }
        .button-container {
            text-align: center;
            margin-top: 25px;
        }
        .button {
            display: inline-block;
            padding: 12px 25px;
            background-color: #16A34A;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛒 Order Confirmation</h1>
        </div>
        <div class="content">
            <h2>Thank You For Your Order!</h2>
            <p>Dear ${data.userName},</p>
            <p>We've received your order and are working on it. Here's a summary of your purchase:</p>
            
            <div class="order-details">
                <div class="detail-row">
                    <span class="detail-label">Order Number:</span>
                    <span><strong>${data.orderNumber}</strong></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Order Date:</span>
                    <span>${new Date(data.orderDate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Payment Method:</span>
                    <span>${data.paymentMethod}</span>
                </div>
                ${hasCoupon
            ? `<div class="detail-row">
                    <span class="detail-label">Coupon Applied:</span>
                    <span class="coupon-badge">🎉 ${data.couponCode}</span>
                </div>`
            : ""
        }
            </div>
            
            <table class="order-items">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th style="text-align: center;">Qty</th>
                        <th style="text-align: right;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.items
            .map(
                (item) => `
                    <tr>
                        <td>
                            <div class="product-name">${item.name}</div>
                            ${item.variant ? `<div class="product-variant">${item.variant}</div>` : ""}
                        </td>
                        <td style="text-align: center;">${item.quantity}</td>
                        <td style="text-align: right;">
                            ${item.originalPrice && parseFloat(item.originalPrice) > parseFloat(item.price)
                        ? `<div class="original-price">₹${parseFloat(item.originalPrice).toFixed(2)}</div>`
                        : ""
                    }
                            <div class="sale-price">₹${parseFloat(item.price).toFixed(2)}</div>
                        </td>
                    </tr>
                    `
            )
            .join("")}
                </tbody>
            </table>
            
            <div class="order-summary">
                <div class="summary-row">
                    <span class="summary-label">Subtotal</span>
                    <span class="summary-value">₹${parseFloat(data.subtotal).toFixed(2)}</span>
                </div>
                ${hasDiscount
            ? `<div class="summary-row discount-row">
                    <span class="summary-label">Discount ${hasCoupon ? `(${data.couponCode})` : ""}</span>
                    <span class="summary-value">-₹${parseFloat(data.discount).toFixed(2)}</span>
                </div>`
            : ""
        }
                <div class="summary-row">
                    <span class="summary-label">Shipping</span>
                    <span class="summary-value">${parseFloat(data.shipping) > 0 ? `₹${parseFloat(data.shipping).toFixed(2)}` : "FREE"}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Tax</span>
                    <span class="summary-value">₹${parseFloat(data.tax).toFixed(2)}</span>
                </div>
                ${parseFloat(data.codCharge) > 0
            ? `<div class="summary-row">
                    <span class="summary-label">COD Surcharge</span>
                    <span class="summary-value">₹${parseFloat(data.codCharge).toFixed(2)}</span>
                </div>`
            : ""
        }
                <div class="summary-row total-row">
                    <span class="summary-label">Total</span>
                    <span class="summary-value">₹${parseFloat(data.total).toFixed(2)}</span>
                </div>
            </div>
            
            ${hasDiscount
            ? `<div class="savings-box">
                <span class="savings-text">🎉 You saved ₹${parseFloat(data.discount).toFixed(2)} on this order!</span>
            </div>`
            : ""
        }
            
            <div class="order-summary">
                <h3 style="margin-top: 0; color: #1a1a1a;">📍 Shipping Address:</h3>
                <p style="margin-bottom: 0;">
                    <strong>${data.shippingAddress.name}</strong><br>
                    ${data.shippingAddress.street}<br>
                    ${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.postalCode}<br>
                    ${data.shippingAddress.country}
                    ${data.shippingAddress.phone ? `<br>📞 ${data.shippingAddress.phone}` : ""}
                </p>
            </div>
            
            <p>You can track your order status in your account dashboard:</p>
            <div class="button-container">
                <a href="${process.env.FRONTEND_URL}/account/orders" class="button">Track Your Order</a>
            </div>
            <p style="font-size: 12px; color: #999;">If you can't click the button, copy and paste this link in your browser: <br>${process.env.FRONTEND_URL}/account/orders</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} ${store.storeName} | ${store.storeTagline}<br>
            Questions? Contact our customer support at ${store.supportEmail || store.storeEmail}
        </div>
    </div>
</body>
</html>
`;
};

export const getPartnerResetTemplate = (resetLink, storeConfig = null) => {
    const store = storeConfig || getStoreConfig();
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Partner Password - ${store.storeName}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #16A34A, #1D4ED8);
            color: #ffffff;
            text-align: center;
            padding: 40px;
        }
        .content {
            padding: 40px;
        }
        h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        h2 {
            color: #1a1a1a;
            font-size: 24px;
            margin-top: 0;
        }
        p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #333333;
        }
        .button {
            display: inline-block;
            padding: 15px 35px;
            background: linear-gradient(135deg, #16A34A, #1D4ED8);
            color: #ffffff;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 18px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #666666;
            background-color: #f8f8f8;
        }
        .security-note {
            background-color: #fff3cd;
            border: 1px solid #ffeeba;
            color: #856404;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔑 Reset Partner Password</h1>
        </div>
        <div class="content">
            <h2>Password Reset Request</h2>
            <p>Dear Partner,</p>
            <p>We received a request to reset the password for your ${store.storeName
        } Partner account. Click the button below to create a new password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" class="button">Reset Partner Password</a>
            </div>
            
            <p>If you can't click the button, copy and paste this link in your browser: <br><strong>${resetLink}</strong></p>
            
            <div class="security-note">
                <strong>Security Note:</strong> This link will expire in 1 hour for security reasons. If you didn't request this password reset, please contact our support team immediately.
            </div>
            
            <p>If you didn't request this password reset, please ignore this email or contact our partner support team.</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} ${store.storeName} | ${store.storeTagline
        }<br>
            This is an automated message. Please do not reply to this email.
        </div>
    </div>
</body>
</html>
`;
};
