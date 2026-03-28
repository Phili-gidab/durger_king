import Layout from './components/Layout'
import HeroSection from './components/HeroSection'
import FeatureSection from './components/FeatureSection'
import DemoSection from './components/DemoSection'
import MenuHighlight from './components/MenuHighlight'
import Footer from './components/Footer'

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <FeatureSection />
      <DemoSection />
      <MenuHighlight />
      <Footer />
    </Layout>
  )
}
