import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    // On récupère discountRate (correctif du bug de réduction)
    const { nom, prenom, email, telephone, formations, codePromo, total, discount, discountRate } = body;

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password
      },
      // 👇 SOLUTION APPLIQUÉE (Pour l'erreur 'self-signed certificate')
      // Ceci est pour le développement local UNIQUEMENT.
      tls: {
        rejectUnauthorized: false
      }
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: 'eco.espe@gmail.com',
      subject: '🎓 Nouvelle inscription aux formations DevLab',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #f97316; }
            .section h3 { color: #f97316; margin-top: 0; }
            .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .info-row:last-child { border-bottom: none; }
            .label { font-weight: bold; color: #6b7280; }
            .value { color: #111827; }
            .formation-item { background: #fff7ed; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 3px solid #f97316; }
            .total { background: linear-gradient(135deg, #fef3c7 0%, #fecaca 100%); padding: 20px; border-radius: 8px; text-align: center; margin-top: 20px; }
            .total-amount { font-size: 32px; font-weight: bold; color: #f97316; }
            .discount-badge { background: #10b981; color: white; padding: 5px 15px; border-radius: 20px; display: inline-block; font-size: 14px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Nouvelle Inscription</h1>
              <p>Un candidat vient de s'inscrire aux formations DevLab</p>
            </div>
            
            <div class="content">
              <div class="section">
                <h3>📋 Informations du Candidat</h3>
                <div class="info-row">
                  <span class="label">Nom complet:</span>
                  <span class="value">${prenom} ${nom}</span>
                </div>
                <div class="info-row">
                  <span class="label">Email:</span>
                  <span class="value">${email}</span>
                </div>
                <div class="info-row">
                  <span class="label">Téléphone:</span>
                  <span class="value">${telephone}</span>
                </div>
              </div>

              <div class="section">
                <h3>🎯 Formations Sélectionnées</h3>
                ${formations.map(f => `
                  <div class="formation-item">
                    <strong>${f.titre}</strong><br>
                    <span style="color: #6b7280;">Durée: ${f.duree}</span><br>
                    <span style="color: #f97316; font-weight: bold;">${f.prix.toLocaleString()} DZD</span>
                  </div>
                `).join('')}
              </div>

              ${codePromo ? `
                <div class="section">
                  <h3>🏷️ Code Promo</h3>
                  <div class="info-row">
                    <span class="label">Code utilisé:</span>
                    <span class="value">${codePromo}</span>
                  </div>
                  ${discount ? `
                    <div class="info-row">
                      <span class="label">Réduction:</span>
                      <span class="value" style="color: #10b981; font-weight: bold;">${discountRate * 100}%</span>
                    </div>
                  ` : ''}
                </div>
              ` : ''}

              <div class="total">
                <h3 style="margin-top: 0; color: #6b7280;">Montant Total</h3>
                <div class="total-amount">${total.toLocaleString()} DZD</div>
                ${discount ? `<span class="discount-badge">✓ Réduction de ${discountRate * 100}% appliquée</span>` : ''}
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: '✅ Confirmation d\'inscription - DevLab',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
            .section h3 { color: #f97316; margin-top: 0; }
            .formation-item { background: #fff7ed; padding: 15px; margin: 10px 0; border-radius: 6px; }
            .total { background: linear-gradient(135deg, #fef3c7 0%, #fecaca 100%); padding: 20px; border-radius: 8px; text-align: center; margin-top: 20px; }
            .total-amount { font-size: 32px; font-weight: bold; color: #f97316; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Inscription Confirmée!</h1>
              <p>Merci pour votre confiance, ${prenom}!</p>
            </div>
            
            <div class="content">
              <div class="section">
                <h3>🎉 Votre inscription a bien été enregistrée</h3>
                <p>Nous avons bien reçu votre demande d'inscription aux formations DevLab. Notre équipe va traiter votre inscription et vous contactera très prochainement.</p>
              </div>

              <div class="section">
                <h3>📚 Récapitulatif de votre inscription</h3>
                ${formations.map(f => `
                  <div class="formation-item">
                    <strong>${f.titre}</strong><br>
                    <span style="color: #6b7280;">📅 Durée: ${f.duree}</span><br>
                    <span style="color: #f97316; font-weight: bold;">💰 ${f.prix.toLocaleString()} DZD</span>
                  </div>
                `).join('')}
              </div>

              <div class="total">
                <h3 style="margin-top: 0; color: #6b7280;">Montant Total à Payer</h3>
                <div class="total-amount">${total.toLocaleString()} DZD</div>
                ${discount ? `<p style="color: #10b981; font-weight: bold; margin-top: 10px;">✓ Réduction de ${discountRate * 100}% appliquée avec le code ${codePromo}</p>` : ''}
              </div>

              <div class="section">
                <h3>📞 Prochaines Étapes</h3>
                <ol>
                  <li>Notre équipe va vérifier votre inscription</li>
                  <li>Vous recevrez un appel ou un email dans les 24-48 heures</li>
                  <li>Nous vous communiquerons les détails de paiement et de démarrage</li>
                </ol>
              </div>

              <div class="section">
                <h3>📧 Besoin d'aide?</h3>
                <p>Si vous avez des questions, n'hésitez pas à nous contacter:</p>
                <p><strong>Email:</strong> eco.espe@gmail.com</p>
              </div>
            </div>

            <div class="footer">
              <p>© ${new Date().getFullYear()} DevLab - Tous droits réservés</p>
              <p>Vous recevez cet email car vous vous êtes inscrit à nos formations</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { success: true, message: 'Emails envoyés avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'envoi des emails', error: error.message },
      { status: 500 }
    );
  }
}