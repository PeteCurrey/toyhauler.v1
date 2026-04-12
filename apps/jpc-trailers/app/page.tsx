import HeroSection from '@/components/home/HeroSection'
import BrandStatement from '@/components/home/BrandStatement'
import ProductCategories from '@/components/home/ProductCategories'
import ProcessStrip from '@/components/home/ProcessStrip'
import ATCPartnershipStrip from '@/components/home/ATCPartnershipStrip'
import CommissionCTA from '@/components/home/CommissionCTA'

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandStatement />
      <ProductCategories />
      <ProcessStrip />
      <ATCPartnershipStrip />
      <CommissionCTA />
    </>
  )
}
