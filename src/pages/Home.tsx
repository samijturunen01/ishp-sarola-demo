import { Hero } from '../components/home/Hero'
import { Statement } from '../components/home/Statement'
import { ServiceIndex } from '../components/home/ServiceIndex'
import { SparkToMirror } from '../components/home/SparkToMirror'
import { AbloyBand } from '../components/home/AbloyBand'
import { GalleryStrip } from '../components/home/GalleryStrip'
import { MachineSpotlight } from '../components/home/MachineSpotlight'
import { CompanyBand } from '../components/home/CompanyBand'
import { ContactCta } from '../components/ui/ContactCta'

export function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <ServiceIndex />
      <SparkToMirror />
      <AbloyBand />
      <GalleryStrip />
      <MachineSpotlight />
      <CompanyBand />
      <ContactCta />
    </>
  )
}
