# EmailJS Setup Guide for EuroGranite Contact Form

This guide explains how to set up EmailJS for the EuroGranite contact form to enable email functionality.

## 📧 EmailJS Configuration

### Step 1: Create EmailJS Account
1. Go to [EmailJS Dashboard](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow setup instructions for your provider
5. Note the **Service ID** (e.g., `service_eurogranite`)

### Step 3: Create Email Templates

#### Main Contact Form Template
1. Go to "Email Templates" in EmailJS dashboard
2. Create new template with ID: `template_contact_form`
3. Use this template content:

```html
Subject: {{subject}}
From: {{from_name}} <{{from_email}}>
To: sales@euro-granite.com

New inquiry from EuroGranite website ({{language_code}})

Customer Details:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}

Message:
{{message}}

---
This email was sent from the EuroGranite contact form.
Reply directly to this email to contact the customer.
```

#### Auto-Reply Template
1. Create another template with ID: `template_auto_reply`
2. Use this template content:

```html
Subject: {{subject}}
From: EuroGranite <sales@euro-granite.com>
To: {{to_name}} <{{to_email}}>

{{message}}
```

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (starts with letters/numbers)
3. Copy this key

### Step 5: Update Configuration
1. Open `src/services/emailService.js`
2. Replace the configuration variables:

```javascript
const EMAILJS_SERVICE_ID = 'your_service_id_here'
const EMAILJS_TEMPLATE_ID = 'template_contact_form'
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'
```

## 🔧 Template Variables

### Main Template Variables
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{phone}}` - Customer's phone (optional)
- `{{message}}` - Customer's message
- `{{language_code}}` - Language code (UA, EN, DE, PL)
- `{{subject}}` - Auto-generated subject line

### Auto-Reply Template Variables
- `{{to_name}}` - Customer's name
- `{{to_email}}` - Customer's email
- `{{subject}}` - Language-specific subject
- `{{message}}` - Pre-formatted auto-reply message

## 📝 Language-Specific Features

The system automatically:
1. Sends emails with language-specific subjects
2. Sends auto-replies in the customer's chosen language
3. Includes language code in company notification emails

### Email Languages Supported:
- **English (EN)**: "New inquiry from EuroGranite website (EN)"
- **Ukrainian (UA)**: "Нове звернення з сайту EuroGranite (UA)"
- **German (DE)**: "Neue Anfrage von der EuroGranite-Website (DE)"
- **Polish (PL)**: "Nowe zapytanie ze strony EuroGranite (PL)"

## 🧪 Testing

### Test Email Configuration
1. Use the test function in browser console:
```javascript
import { testEmailConfiguration } from './services/emailService'
testEmailConfiguration()
```

### Manual Testing
1. Fill out the contact form on `/contact` page
2. Check that email arrives at `sales@euro-granite.com`
3. Verify auto-reply is sent to customer
4. Test different languages (UA, EN, DE, PL)

## 🔒 Security Notes

- Public Key is safe to expose in client-side code
- Service ID and Template IDs are also safe to expose
- Never expose your Private Key in client-side code
- EmailJS handles server-side email sending securely

## 📋 Troubleshooting

### Common Issues:
1. **Emails not sending**: Check Service ID and Template ID
2. **Wrong template**: Ensure template variables match exactly
3. **Auto-reply not working**: Verify `template_auto_reply` exists
4. **Language issues**: Check language codes are correct (ua, en, de, pl)

### Debug Mode:
Enable debug logging in `emailService.js` by checking browser console for:
- "Email sent successfully" - Main email worked
- "Auto-reply sent successfully" - Auto-reply worked
- Error messages for troubleshooting

## 📧 Email Flow

1. **Customer fills form** → Form validation
2. **Form submits** → EmailJS sends to `sales@euro-granite.com`
3. **Auto-reply sent** → Customer receives confirmation
4. **Success message** → Customer sees thank you page

## 💼 Production Ready

- ✅ 4-language support (UA/EN/DE/PL)
- ✅ Client-side validation
- ✅ Auto-reply functionality
- ✅ Error handling
- ✅ Accessible form design
- ✅ Mobile responsive
- ✅ Professional email templates

This setup provides a complete, professional contact form solution for the EuroGranite website.