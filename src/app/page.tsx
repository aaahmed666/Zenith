import Header from './component/Header/Header'
import HeroSection from './component/HeroSection/HeroSection'
import ContactForm from './component/ContactForm/ContactForm'
import ServicesSection from './component/ServicesSection/ServicesSection'
import MissionStatement from './component/MissionStatement/MissionStatement'
import VisionSection from './component/VisionSection/VisionSection'
import { Container } from '@mui/material'
import ContactFormText from './component/ContactFormText/ContactFormText'

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <ServicesSection />
      <VisionSection btn={true} />
      <MissionStatement />

      <Container sx={{ my: 5, textAlign: "center" }}>
        <ContactFormText />
        <ContactForm />
      </Container>
    </>
  )
}
