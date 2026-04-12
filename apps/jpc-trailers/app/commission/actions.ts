'use server'

import { createServerClient } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitCommissionRequest(formData: FormData) {
  try {
    const trailer_type = formData.get('trailer_type') as string
    const intended_use = formData.get('intended_use') as string
    const dimensions_notes = formData.get('dimensions_notes') as string
    const axle_preference = formData.get('axle_preference') as string
    const finish_preference = formData.get('finish_preference') as string
    const budget_range = formData.get('budget_range') as string
    const full_name = formData.get('full_name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const company = formData.get('company') as string
    const referral_source = formData.get('referral_source') as string
    const contact_time = formData.get('contact_time') as string

    // 1. Insert into Supabase
    const supabase = createServerClient()
    const { error: dbError } = await supabase.from('commission_requests').insert([
      {
        trailer_type,
        intended_use,
        dimensions_notes,
        axle_preference,
        finish_preference,
        budget_range,
        full_name,
        email,
        phone,
        company,
        referral_source,
        contact_time,
      },
    ])

    if (dbError) {
      console.error('Supabase Error:', dbError)
      return { success: false, error: 'Database error' }
    }

    // 2. Send email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'noreply@jpctrailers.co.uk',
        to: email,
        bcc: process.env.RESEND_FROM_EMAIL || 'noreply@jpctrailers.co.uk', // Ensure JPC gets a copy
        subject: 'Your JPC Trailers Build Slot Request',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
            <p style="font-size: 11px; letter-spacing: 0.1em; color: #E8500A; text-transform: uppercase;">// BUILD REQUEST RECEIVED</p>
            <h1 style="font-size: 24px; text-transform: uppercase;">Thank you, ${full_name}.</h1>
            <p>Your commission request has been received.</p>
            <p>We review every specification carefully. A member of our team will contact you soon to discuss your requirements and consult on the exact build details before we release a formal quote and slot date.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="font-size: 12px; color: #666;"><strong>Requested Trailer:</strong> ${trailer_type}</p>
            <p style="font-size: 12px; color: #666;"><strong>Intended Use:</strong> ${intended_use}</p>
            <br/>
            <p style="font-size: 12px; color: #999;">© JPC Trailers</p>
          </div>
        `,
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Form submission failed:', error)
    return { success: false, error: 'Server error' }
  }
}
