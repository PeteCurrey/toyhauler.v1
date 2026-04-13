'use client'

import { useState } from 'react'
import { submitCommissionRequest } from '@/app/commission/actions'

export default function CommissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await submitCommissionRequest(formData)

    if (result.success) {
      setIsSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setError(result.error || 'Something went wrong. Please try again.')
    }
    setIsSubmitting(false)
  }

  if (isSuccess) {
    return (
      <div className="bg-[#111111] p-12 lg:p-24 border border-[#222222] text-center">
        <span className="font-mono text-[10px] tracking-[0.4em] text-[#E8500A] block mb-8 uppercase">
          // REQUEST SUBMITTED
        </span>
        <h2 className="font-syne font-extrabold text-5xl text-[#F0F0F0] mb-8 uppercase tracking-tighter">
          Thank you.
        </h2>
        <p className="text-[#6A6A6A] font-inter max-w-md mx-auto leading-relaxed mb-12">
          Your commission request has been recorded. Our team will review your requirements 
          and reach out shortly to discuss the build slot and exact specifications.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="font-mono text-[10px] tracking-[0.2em] text-[#E8500A] border-b border-[#E8500A] pb-1 hover:text-white hover:border-white transition-all"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Build Details */}
      <div className="space-y-12">
        <h3 className="font-mono text-[10px] tracking-[0.4em] text-[#6A6A6A] uppercase border-b border-[#111111] pb-4">
          01. BUILD DETAILS
        </h3>
        
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="trailer_type" className="font-mono text-[10px] tracking-[0.1em] text-[#F0F0F0] uppercase">Trailer Type</label>
            <select 
              id="trailer_type" 
              name="trailer_type" 
              required
              className="bg-transparent border-b border-[#222222] py-4 text-white focus:border-[#E8500A] outline-none font-inter appearance-none"
            >
              <option value="" className="bg-black">Select Type</option>
              <option value="Car Transporter" className="bg-black">Car Transporter</option>
              <option value="Enclosed Box" className="bg-black">Enclosed Box</option>
              <option value="Toy Hauler" className="bg-black">Toy Hauler</option>
              <option value="Multi-Vehicle Rig" className="bg-black">Multi-Vehicle Rig</option>
              <option value="Bespoke Build" className="bg-black">Bespoke Build</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="intended_use" className="font-mono text-[10px] tracking-[0.1em] text-[#F0F0F0] uppercase">Intended Use</label>
            <input 
              type="text" 
              id="intended_use" 
              name="intended_use" 
              required 
              placeholder="e.g. Race Support, Personal Car Towing"
              className="bg-transparent border-b border-[#222222] py-4 text-white focus:border-[#E8500A] outline-none font-inter placeholder:text-[#333]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="axle_preference" className="font-mono text-[10px] tracking-[0.1em] text-[#F0F0F0] uppercase">Axle Configuration</label>
            <select 
              id="axle_preference" 
              name="axle_preference" 
              required
              className="bg-transparent border-b border-[#222222] py-4 text-white focus:border-[#E8500A] outline-none font-inter appearance-none"
            >
              <option value="Double Axle" className="bg-black">Double Axle</option>
              <option value="Triple Axle" className="bg-black">Triple Axle</option>
              <option value="Undecided" className="bg-black">Undecided / Consult</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="dimensions_notes" className="font-mono text-[10px] tracking-[0.1em] text-[#F0F0F0] uppercase">Required Dimensions / Notes</label>
            <textarea 
              id="dimensions_notes" 
              name="dimensions_notes" 
              rows={4}
              placeholder="Max width, height or length requirements..."
              className="bg-transparent border border-[#222222] p-4 text-white focus:border-[#E8500A] outline-none font-inter placeholder:text-[#333] resize-none"
            />
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="space-y-12">
        <h3 className="font-mono text-[10px] tracking-[0.4em] text-[#6A6A6A] uppercase border-b border-[#111111] pb-4">
          02. CONTACT INFORMATION
        </h3>

        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="full_name" className="font-mono text-[10px] tracking-[0.1em] text-[#F0F0F0] uppercase">Full Name</label>
            <input 
              type="text" 
              id="full_name" 
              name="full_name" 
              required 
              className="bg-transparent border-b border-[#222222] py-4 text-white focus:border-[#E8500A] outline-none font-inter"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-mono text-[10px] tracking-[0.1em] text-[#F0F0F0] uppercase">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="bg-transparent border-b border-[#222222] py-4 text-white focus:border-[#E8500A] outline-none font-inter"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-mono text-[10px] tracking-[0.1em] text-[#F0F0F0] uppercase">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              required 
              className="bg-transparent border-b border-[#222222] py-4 text-white focus:border-[#E8500A] outline-none font-inter"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="company" className="font-mono text-[10px] tracking-[0.1em] text-[#F0F0F0] uppercase">Company (Optional)</label>
            <input 
              type="text" 
              id="company" 
              name="company" 
              className="bg-transparent border-b border-[#222222] py-4 text-white focus:border-[#E8500A] outline-none font-inter"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#E8500A] text-white font-mono text-xs tracking-[0.4em] py-6 hover:bg-white hover:text-black transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'SUBMITTING REQUEST...' : 'REQUEST BUILD SLOT →'}
          </button>
          
          {error && (
            <p className="text-red-500 font-mono text-[10px] tracking-widest text-center mt-4">
              {error}
            </p>
          )}
        </div>
      </div>
    </form>
  )
}
