import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req: Request) {
  try {
    const { userData, config } = await req.json();
    const supabase = createServerClient();

    // 1. Generate Config Reference
    const config_ref = `JPC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // 2. Save Configuration
    const { error: configError } = await supabase
      .from('saved_configs')
      .insert({
        config_ref,
        base_model: config.baseModel,
        config_data: config,
        source_domain: 'jpctrailers.co.uk'
      });

    if (configError) throw configError;

    // 3. Save Commission Lead
    const { error: leadError } = await supabase
      .from('commissions')
      .insert({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        message: userData.message,
        config_ref,
        source_site: 'jpc'
      });

    if (leadError) throw leadError;

    // 4. Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'JPC Trailers <builds@jpctrailers.co.uk>',
        to: userData.email,
        bcc: ['pete@jpctrailers.co.uk'], // Admin notification
        subject: `Technical Spec Received: #${config_ref}`,
        html: `
          <div style="font-family: sans-serif; background: #080808; color: #F0F0F0; padding: 40px; max-width: 600px;">
            <p style="color: #E8500A; font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 2px;">// ENGINEERING SPECIFICATION RECEIVED</p>
            <h1 style="font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; border-bottom: 1px solid #1E1E1E; padding-bottom: 20px; margin-bottom: 20px;">THANK YOU, ${userData.name.toUpperCase()}.</h1>
            
            <p style="font-size: 14px; line-height: 1.6; color: #888;">
              Your technical specification for the <strong>${config.baseModel}</strong> build has been received and assigned to our engineering team for review.
            </p>

            <div style="background: #0D0D0D; border: 1px solid #1E1E1E; padding: 30px; margin: 30px 0;">
              <p style="color: #E8500A; font-family: monospace; font-size: 10px; margin-bottom: 15px;">REF: #${config_ref}</p>
              
              <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                <tr><td style="color: #444; padding: 8px 0;">MODEL:</td><td style="text-align: right;">${config.baseModel}</td></tr>
                <tr><td style="color: #444; padding: 8px 0;">AXLES:</td><td style="text-align: right;">${config.axleConfig.toUpperCase()}</td></tr>
                <tr><td style="color: #444; padding: 8px 0;">FINISH:</td><td style="text-align: right;">${config.exteriorFinish.toUpperCase()}</td></tr>
                <tr><td style="color: #444; padding: 8px 0;">EST. TOTAL:</td><td style="text-align: right; color: #E8500A; font-weight: bold;">£${config.estimatedPrice.toLocaleString()}</td></tr>
              </table>
            </div>

            <p style="font-size: 12px; line-height: 1.6; color: #666;">
              A senior build consultant will contact you at <strong>${userData.phone}</strong> to discuss build slot availability and technical compatibility.
            </p>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #1E1E1E; font-size: 10px; color: #444; font-family: monospace; text-align: center;">
              JPC TRAILERS // CHESTERFIELD, UK
            </div>
          </div>
        `
      });
    }

    return NextResponse.json({ success: true, ref: config_ref });
  } catch (error: any) {
    console.error('Commission API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
