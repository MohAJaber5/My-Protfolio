# EmailJS Setup Guide

## Step 1: Configure EmailJS Dashboard

1. Go to [https://dashboard.emailjs.com/admin](https://dashboard.emailjs.com/admin)
2. Log in to your account

### Step 2: Set up Email Service

1. Go to **Email Services** tab
2. Click **Add New Service**
3. Choose **Gmail** (since you want emails sent to mhammdjbr555@gmail.com)
4. Follow the setup process and note your **Service ID**

### Step 3: Create Email Template

1. Go to **Email Templates** tab
2. Click **Create New Template**
3. Use this template content:

**Subject:** New Contact Form Submission from {{from_name}}

**Content:**
```
Hello,

You have received a new message from your portfolio contact form:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Note your **Template ID**

### Step 4: Get Your Public Key

1. Go to **Account** tab
2. Find your **Public Key** (User ID)

### Step 5: Configure Environment Variables

1. Create a `.env` file in your project root:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

2. Replace the placeholder values with your actual EmailJS credentials

### Step 6: Template Variables

Make sure your EmailJS template uses these variable names:
- `{{from_name}}` - User's name
- `{{from_email}}` - User's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content

### Step 7: Test the Form

1. Run your development server: `npm run dev`
2. Fill out the contact form
3. Check your email (mhammdjbr555@gmail.com) for the message

## Email Delivery

All form submissions will be sent directly to: **mhammdjbr555@gmail.com**

## Security Notes

- Never commit your `.env` file to version control
- The `.env.example` file shows the structure without real credentials
- Your credentials are loaded securely via environment variables