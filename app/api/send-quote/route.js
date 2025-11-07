// app/api/send-quote/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper function to load translations
// We use a relative path to go up from /api/send-quote to /messages
async function getTranslations(locale) {
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    // Fallback to French if the locale file doesn't exist
    console.warn(`No translation file found for locale: ${locale}.Falling back to 'fr'.`);
    messages = (await import(`../../../messages/fr.json`)).default;
  }
  return messages.QuoteEmail; // Return only the email section
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, company, services, budget, timeline, message, totalPrice, locale } = data;

    // Get translations for the specified locale
    const t = await getTranslations(locale || 'fr');

    // Configuration du transporteur Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        // Only disable for development
        rejectUnauthorized: process.env.NODE_ENV === 'production' 
      }
    });

    // Email au client (TRANSLATED)
    const clientMailOptions = {
      from: `DevLab <${process.env.GMAIL_USER}>`,
      to: email,
      subject: t.client.subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .service-item { padding: 10px; margin: 5px 0; background: #fef3c7; border-left: 4px solid #f97316; }
            .total { background: #fef3c7; padding: 20px; margin: 20px 0; text-align: center; border-radius: 10px; }
            .total-amount { font-size: 32px; font-weight: bold; color: #f97316; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); color: white; text-decoration: none; border-radius: 8px; margin: 10px 0; }
          </style>
        </head>
        <body style="direction: ${locale === 'ar' ? 'rtl' : 'ltr'};">
          <div class="container">
            <div class="header">
              <h1>${t.client.header}</h1>
            </div>
            
            <div class="content">
              <p>${t.client.greeting} <strong>${name}</strong>,</p>
              
              <p>${t.client.thankYou}</p>
              
              <p>${t.client.contactYou}</p>
              
              <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">${t.client.summaryTitle}</h2>
              
              <h3>${t.client.servicesTitle}</h3>
              ${services.map(s => `
                <div class="service-item">
                  <strong>${s.name}</strong><br>
                  <span style="color: #6b7280;">${s.description}</span><br>
                  <strong style="color: #f97316;">${s.price.toLocaleString()} DZD</strong>
                </div>
              `).join('')}
              
              <div class="total">
                <p style="margin: 0; font-size: 18px; color: #6b7280;">${t.client.totalEstimate}</p>
                <div class="total-amount">${totalPrice.toLocaleString()} DZD</div>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">${t.client.totalDisclaimer}</p>
              </div>
              
              <h3>${t.client.projectInfoTitle}</h3>
              <ul>
                ${company ? `<li><strong>${t.client.company}:</strong> ${company}</li>` : ''}
                <li><strong>${t.client.budget}:</strong> ${budget || t.client.notSpecified}</li>
                <li><strong>${t.client.timeline}:</strong> ${timeline || t.client.notSpecified}</li>
                ${message ? `<li><strong>${t.client.message}:</strong> ${message}</li>` : ''}
              </ul>
              
              <h3>${t.client.nextStepsTitle}</h3>
              <ol>
                <li>${t.client.step1}</li>
                <li>${t.client.step2}</li>
                <li>${t.client.step3}</li>
                <li>${t.client.step4}</li>
              </ol>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://devlab.dz" class="button">${t.client.visitSite}</a>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>${t.client.footerTitle}</strong></p>
              <p>Email: contact@devlab.services | Tél: +213 698 784 457</p>
              <p style="font-size: 12px; margin-top: 20px;">
                ${t.client.footerNote}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Email à l'équipe DevLab (TRANSLATED)
    const adminMailOptions = {
      from: `DevLab <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
      subject: t.admin.subject.replace('{name}', name),
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
            .header { background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 20px; border: 1px solid #e5e7eb; }
            .info-box { background: #fef3c7; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #f97316; }
            .service-item { padding: 8px; margin: 5px 0; background: #f0fdf4; border-left: 3px solid #10b981; }
            .total { background: #fee2e2; padding: 15px; margin: 15px 0; text-align: center; border-radius: 8px; }
            .urgent { background: #fef2f2; border: 2px solid #dc2626; padding: 15px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body style="direction: ${locale === 'ar' ? 'rtl' : 'ltr'};">
          <div class="container">
            <div class="header">
              <h1>${t.admin.header}</h1>
              <p style="margin: 0;">${t.admin.subtitle}</p>
            </div>
            
            <div class="content">
              <div class="urgent">
                ${t.admin.actionRequired}
              </div>
              
              <h2 style="color: #f97316;">${t.admin.clientInfoTitle}</h2>
              <div class="info-box">
                <p><strong>${t.admin.name}:</strong> ${name}</p>
                ${company ? `<p><strong>${t.admin.company}:</strong> ${company}</p>` : ''}
                <p><strong>${t.admin.email}:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>${t.admin.phone}:</strong> <a href="tel:${phone}">${phone}</a></p>
              </div>
              
              <h2 style="color: #f97316;">${t.admin.servicesTitle}</h2>
              ${services.map(s => `
                <div class="service-item">
                  <strong>${s.name}</strong> - ${s.price.toLocaleString()} DZD<br>
                  <small style="color: #6b7280;">${s.description}</small>
                </div>
              `).join('')}
              
              <div class="total">
                <h3 style="margin: 0; color: #dc2626;">${t.admin.total.replace('{totalPrice}', totalPrice.toLocaleString())}</h3>
              </div>
              
              <h2 style="color: #f97316;">${t.admin.projectDetailsTitle}</h2>
              <div class="info-box">
                <p><strong>${t.admin.budget}:</strong> ${budget || t.admin.notSpecified}</p>
                <p><strong>${t.admin.timeline}:</strong> ${timeline || t.admin.notSpecified}</p>
                ${message ? `<p><strong>${t.admin.message}:</strong><br>${message}</p>` : ''}
              </div>
              
              <h2 style="color: #f97316;">${t.admin.actionsTitle}</h2>
              <ol>
                <li>${t.admin.action1}</li>
                <li>${t.admin.action2}</li>
                <li>${t.admin.action3}</li>
                <li>${t.admin.action4}</li>
                <li>${t.admin.action5}</li>
              </ol>
              
              <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0;">${t.admin.receivedOn.replace('{date}', new Date().toLocaleString(locale))}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Envoyer les deux emails
    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: t.client.successMessage 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    // Attempt to get 'fr' translations for the error message as a last resort
    const t = await getTranslations('fr'); 
    return NextResponse.json(
      { 
        success: false, 
        error: t.apiError, // 'Erreur lors de l\'envoi de la demande'
        details: error.message 
      },
      { status: 500 }
    );
  }
}