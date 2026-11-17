import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { ServiceAbloy } from './pages/ServiceAbloy'
import { ServiceCnc } from './pages/ServiceCnc'
import { ServiceWelding } from './pages/ServiceWelding'
import { ServiceFinishing } from './pages/ServiceFinishing'
import { ServiceTeknos } from './pages/ServiceTeknos'
import { Products } from './pages/Products'
import { Gallery } from './pages/Gallery'
import { Company } from './pages/Company'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="palvelut" element={<Services />} />
        <Route path="palvelut/abloy-avainjyrsinkoneet" element={<ServiceAbloy />} />
        <Route path="palvelut/cnc-koneistus" element={<ServiceCnc />} />
        <Route path="palvelut/tig-hitsaus" element={<ServiceWelding />} />
        <Route path="palvelut/kiillotus-ja-lasermerkkaus" element={<ServiceFinishing />} />
        <Route path="palvelut/teknos-savytyskoneet" element={<ServiceTeknos />} />
        <Route path="tuotteet" element={<Products />} />
        <Route path="galleria" element={<Gallery />} />
        <Route path="yritys" element={<Company />} />
        <Route path="yhteystiedot" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
