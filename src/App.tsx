/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import FloatingButtons from './components/layout/FloatingButtons';
import EditModeBanner from './components/layout/EditModeBanner';
import AdminLayout from './admin/layout/AdminLayout';
import AdminDashboardHome from './admin/pages/AdminDashboardHome';
import AdminProtectedRoute from './admin/components/AdminProtectedRoute';
import AdminLogin from './admin/pages/AdminLogin';
import AdminColors from './admin/pages/AdminColors';
import AdminLogo from './admin/pages/AdminLogo';
import AdminLinks from './admin/pages/AdminLinks';
import AdminPagesText from './admin/pages/AdminPagesText';
import AdminImages from './admin/pages/AdminImages';
import AdminInventory from './admin/pages/AdminInventory';
import AdminProfile from './admin/pages/AdminProfile';

import Home from './pages/Home';
import Services from './pages/Services';
import Haulage from './pages/Haulage';
import Towing from './pages/Towing';
import Rental from './pages/Rental';
import Sales from './pages/Sales';
import CarDetails from './pages/CarDetails';
import RentalDetails from './pages/RentalDetails';
import Repairs from './pages/Repairs';
import BodyWorks from './pages/BodyWorks';
import Parts from './pages/Parts';
import PartDetails from './pages/PartDetails';
import Fleet from './pages/Fleet';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Search from './pages/Search';
import Faqs from './pages/Faqs';
import Gallery from './pages/Gallery';
import Careers from './pages/Careers';
import NotFound from './pages/NotFound';
import Sitemap from './pages/Sitemap';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import TowingServiceTerms from './pages/TowingServiceTerms';
import CancellationRefundPolicy from './pages/CancellationRefundPolicy';

import PricingPaymentPolicy from './pages/PricingPaymentPolicy';
import Disclaimer from './pages/Disclaimer';
import CookiePolicy from './pages/CookiePolicy';
import ServiceAreaPolicy from './pages/ServiceAreaPolicy';
import EmergencyServicePolicy from './pages/EmergencyServicePolicy';
import ComplaintsPolicy from './pages/ComplaintsPolicy';
import CarDamageLiabilityPolicy from './pages/CarDamageLiabilityPolicy';
import AccessibilityStatement from './pages/AccessibilityStatement';

import ServiceAreas from './pages/ServiceAreas';

import AccraToSekondi from './pages/service-areas/AccraToSekondi';
import SekondiToAccra from './pages/service-areas/SekondiToAccra';
import AccraToTakoradi from './pages/service-areas/AccraToTakoradi';
import TakoradiToAccra from './pages/service-areas/TakoradiToAccra';
import AccraToTarkwa from './pages/service-areas/AccraToTarkwa';
import TarkwaToAccra from './pages/service-areas/TarkwaToAccra';
import AccraToBogoso from './pages/service-areas/AccraToBogoso';
import BogosoToAccra from './pages/service-areas/BogosoToAccra';
import AccraToPrestea from './pages/service-areas/AccraToPrestea';
import PresteaToAccra from './pages/service-areas/PresteaToAccra';
import AccraToAgonaNkwanta from './pages/service-areas/AccraToAgonaNkwanta';
import AgonaNkwantaToAccra from './pages/service-areas/AgonaNkwantaToAccra';
import AccraToElubo from './pages/service-areas/AccraToElubo';
import EluboToAccra from './pages/service-areas/EluboToAccra';
import AccraToAxim from './pages/service-areas/AccraToAxim';
import AximToAccra from './pages/service-areas/AximToAccra';
import AccraToHalfAssini from './pages/service-areas/AccraToHalfAssini';
import HalfAssiniToAccra from './pages/service-areas/HalfAssiniToAccra';
import AccraToShama from './pages/service-areas/AccraToShama';
import ShamaToAccra from './pages/service-areas/ShamaToAccra';
import AccraToMpohor from './pages/service-areas/AccraToMpohor';
import MpohorToAccra from './pages/service-areas/MpohorToAccra';
import AccraToWassaAkropong from './pages/service-areas/AccraToWassaAkropong';
import WassaAkropongToAccra from './pages/service-areas/WassaAkropongToAccra';
import AccraToDaboase from './pages/service-areas/AccraToDaboase';
import DaboaseToAccra from './pages/service-areas/DaboaseToAccra';
import AccraToEnchi from './pages/service-areas/AccraToEnchi';
import EnchiToAccra from './pages/service-areas/EnchiToAccra';
import AccraToBawdie from './pages/service-areas/AccraToBawdie';
import BawdieToAccra from './pages/service-areas/BawdieToAccra';
import AccraToSamreboi from './pages/service-areas/AccraToSamreboi';
import SamreboiToAccra from './pages/service-areas/SamreboiToAccra';
import AccraToSefwiWiawso from './pages/service-areas/AccraToSefwiWiawso';
import SefwiWiawsoToAccra from './pages/service-areas/SefwiWiawsoToAccra';
import AccraToBibiani from './pages/service-areas/AccraToBibiani';
import BibianiToAccra from './pages/service-areas/BibianiToAccra';
import AccraToJuaboso from './pages/service-areas/AccraToJuaboso';
import JuabosoToAccra from './pages/service-areas/JuabosoToAccra';
import AccraToBodi from './pages/service-areas/AccraToBodi';
import BodiToAccra from './pages/service-areas/BodiToAccra';
import AccraToAsankragwa from './pages/service-areas/AccraToAsankragwa';
import AsankragwaToAccra from './pages/service-areas/AsankragwaToAccra';
import AccraToDadieso from './pages/service-areas/AccraToDadieso';
import DadiesoToAccra from './pages/service-areas/DadiesoToAccra';
import AccraToSefwiBekwai from './pages/service-areas/AccraToSefwiBekwai';
import SefwiBekwaiToAccra from './pages/service-areas/SefwiBekwaiToAccra';
import AccraToAkontombra from './pages/service-areas/AccraToAkontombra';
import AkontombraToAccra from './pages/service-areas/AkontombraToAccra';
import AccraToCapeCoast from './pages/service-areas/AccraToCapeCoast';
import CapeCoastToAccra from './pages/service-areas/CapeCoastToAccra';
import AccraToElmina from './pages/service-areas/AccraToElmina';
import ElminaToAccra from './pages/service-areas/ElminaToAccra';
import AccraToMankessim from './pages/service-areas/AccraToMankessim';
import MankessimToAccra from './pages/service-areas/MankessimToAccra';
import AccraToWinneba from './pages/service-areas/AccraToWinneba';
import WinnebaToAccra from './pages/service-areas/WinnebaToAccra';
import AccraToApam from './pages/service-areas/AccraToApam';
import ApamToAccra from './pages/service-areas/ApamToAccra';
import Accra from './pages/service-areas/Accra';
import Tema from './pages/service-areas/Tema';
import Ashaiman from './pages/service-areas/Ashaiman';
import Teshie from './pages/service-areas/Teshie';
import Nungua from './pages/service-areas/Nungua';
import Labadi from './pages/service-areas/Labadi';
import Osu from './pages/service-areas/Osu';
import Dansoman from './pages/service-areas/Dansoman';
import Kaneshie from './pages/service-areas/Kaneshie';
import Achimota from './pages/service-areas/Achimota';
import Madina from './pages/service-areas/Madina';
import Adenta from './pages/service-areas/Adenta';
import EastLegon from './pages/service-areas/EastLegon';
import Spintex from './pages/service-areas/Spintex';
import La from './pages/service-areas/La';
import AirportResidential from './pages/service-areas/AirportResidential';
import Dzorwulu from './pages/service-areas/Dzorwulu';
import Tesano from './pages/service-areas/Tesano';
import Abeka from './pages/service-areas/Abeka';
import Kwashieman from './pages/service-areas/Kwashieman';
import WeijaGbawe from './pages/service-areas/WeijaGbawe';
import Kasoa from './pages/service-areas/Kasoa';
import Prampram from './pages/service-areas/Prampram';
import Kpone from './pages/service-areas/Kpone';
import Dawhenya from './pages/service-areas/Dawhenya';
import Amasaman from './pages/service-areas/Amasaman';
import Ayawaso from './pages/service-areas/Ayawaso';
import BurmaCamp from './pages/service-areas/BurmaCamp';
import Circle from './pages/service-areas/Circle';
import Dodowa from './pages/service-areas/Dodowa';
import KorleKlottey from './pages/service-areas/KorleKlottey';
import Lakeside from './pages/service-areas/Lakeside';
import Nima from './pages/service-areas/Nima';
import NingoPrampram from './pages/service-areas/NingoPrampram';
import Pokuase from './pages/service-areas/Pokuase';
import AccraToKoforidua from './pages/service-areas/AccraToKoforidua';
import KoforiduaToAccra from './pages/service-areas/KoforiduaToAccra';
import AccraToNkawkaw from './pages/service-areas/AccraToNkawkaw';
import NkawkawToAccra from './pages/service-areas/NkawkawToAccra';
import AccraToSuhum from './pages/service-areas/AccraToSuhum';
import SuhumToAccra from './pages/service-areas/SuhumToAccra';
import AccraToNsawam from './pages/service-areas/AccraToNsawam';
import NsawamToAccra from './pages/service-areas/NsawamToAccra';
import AccraToAburi from './pages/service-areas/AccraToAburi';
import AburiToAccra from './pages/service-areas/AburiToAccra';
import AccraToAkropong from './pages/service-areas/AccraToAkropong';
import AkropongToAccra from './pages/service-areas/AkropongToAccra';
import AccraToSomanya from './pages/service-areas/AccraToSomanya';
import SomanyaToAccra from './pages/service-areas/SomanyaToAccra';
import AccraToOdumaseKrobo from './pages/service-areas/AccraToOdumaseKrobo';
import OdumaseKroboToAccra from './pages/service-areas/OdumaseKroboToAccra';
import AccraToAsamankese from './pages/service-areas/AccraToAsamankese';
import AsamankeseToAccra from './pages/service-areas/AsamankeseToAccra';
import AccraToAkyemOda from './pages/service-areas/AccraToAkyemOda';
import AkyemOdaToAccra from './pages/service-areas/AkyemOdaToAccra';
import AccraToAkwatia from './pages/service-areas/AccraToAkwatia';
import AkwatiaToAccra from './pages/service-areas/AkwatiaToAccra';
import AccraToDonkorkrom from './pages/service-areas/AccraToDonkorkrom';
import DonkorkromToAccra from './pages/service-areas/DonkorkromToAccra';
import AccraToBegoro from './pages/service-areas/AccraToBegoro';
import BegoroToAccra from './pages/service-areas/BegoroToAccra';
import AccraToKumasi from './pages/service-areas/AccraToKumasi';
import KumasiToAccra from './pages/service-areas/KumasiToAccra';
import AccraToNandom from './pages/service-areas/AccraToNandom';
import NandomToAccra from './pages/service-areas/NandomToAccra';
import AccraToHamile from './pages/service-areas/AccraToHamile';
import HamileToAccra from './pages/service-areas/HamileToAccra';
import AccraToBole from './pages/service-areas/AccraToBole';import AccraToDaboya from './pages/service-areas/AccraToDaboya';
import DaboyaToAccra from './pages/service-areas/DaboyaToAccra';
import AccraToBuipe from './pages/service-areas/AccraToBuipe';
import BuipeToAccra from './pages/service-areas/BuipeToAccra';
import AccraToDambai from './pages/service-areas/AccraToDambai';
import DambaiToAccra from './pages/service-areas/DambaiToAccra';
import AccraToNkwanta from './pages/service-areas/AccraToNkwanta';
import NkwantaToAccra from './pages/service-areas/NkwantaToAccra';
import AccraToNkwantaSouth from './pages/service-areas/AccraToNkwantaSouth';
import NkwantaSouthToAccra from './pages/service-areas/NkwantaSouthToAccra';
import AccraToJasikan from './pages/service-areas/AccraToJasikan';
import JasikanToAccra from './pages/service-areas/JasikanToAccra';
import AccraToKadjebi from './pages/service-areas/AccraToKadjebi';
import KadjebiToAccra from './pages/service-areas/KadjebiToAccra';
import AccraToKeteKrachi from './pages/service-areas/AccraToKeteKrachi';
import KeteKrachiToAccra from './pages/service-areas/KeteKrachiToAccra';
import AccraToEjisu from './pages/service-areas/AccraToEjisu';
import EjisuToAccra from './pages/service-areas/EjisuToAccra';
import AccraToKonongo from './pages/service-areas/AccraToKonongo';
import KonongoToAccra from './pages/service-areas/KonongoToAccra';
import AccraToMampong from './pages/service-areas/AccraToMampong';
import MampongToAccra from './pages/service-areas/MampongToAccra';
import AccraToOffinso from './pages/service-areas/AccraToOffinso';
import OffinsoToAccra from './pages/service-areas/OffinsoToAccra';
import AccraToBekwai from './pages/service-areas/AccraToBekwai';
import BekwaiToAccra from './pages/service-areas/BekwaiToAccra';
import AccraToObuasi from './pages/service-areas/AccraToObuasi';
import ObuasiToAccra from './pages/service-areas/ObuasiToAccra';
import AccraToNkawie from './pages/service-areas/AccraToNkawie';
import NkawieToAccra from './pages/service-areas/NkawieToAccra';
import AccraToAtonsu from './pages/service-areas/AccraToAtonsu';
import AtonsuToAccra from './pages/service-areas/AtonsuToAccra';
import AccraToAbuakwa from './pages/service-areas/AccraToAbuakwa';
import AbuakwaToAccra from './pages/service-areas/AbuakwaToAccra';
import AccraToFomena from './pages/service-areas/AccraToFomena';
import FomenaToAccra from './pages/service-areas/FomenaToAccra';
import AccraToAgona from './pages/service-areas/AccraToAgona';
import AgonaToAccra from './pages/service-areas/AgonaToAccra';
import AccraToJuaben from './pages/service-areas/AccraToJuaben';
import JuabenToAccra from './pages/service-areas/JuabenToAccra';
import AccraToAsanteAkim from './pages/service-areas/AccraToAsanteAkim';
import AsanteAkimToAccra from './pages/service-areas/AsanteAkimToAccra';
import AccraToTepa from './pages/service-areas/AccraToTepa';
import TepaToAccra from './pages/service-areas/TepaToAccra';
import AccraToDuayawNkwanta from './pages/service-areas/AccraToDuayawNkwanta';
import DuayawNkwantaToAccra from './pages/service-areas/DuayawNkwantaToAccra';
import AccraToSunyani from './pages/service-areas/AccraToSunyani';
import SunyaniToAccra from './pages/service-areas/SunyaniToAccra';
import AccraToBerekum from './pages/service-areas/AccraToBerekum';
import BerekumToAccra from './pages/service-areas/BerekumToAccra';
import AccraToDormaaAhenkro from './pages/service-areas/AccraToDormaaAhenkro';
import DormaaAhenkroToAccra from './pages/service-areas/DormaaAhenkroToAccra';
import AccraToWenchi from './pages/service-areas/AccraToWenchi';
import WenchiToAccra from './pages/service-areas/WenchiToAccra';
import AccraToTechiman from './pages/service-areas/AccraToTechiman';
import TechimanToAccra from './pages/service-areas/TechimanToAccra';
import AccraToNkoranza from './pages/service-areas/AccraToNkoranza';
import NkoranzaToAccra from './pages/service-areas/NkoranzaToAccra';
import AccraToKintampo from './pages/service-areas/AccraToKintampo';
import KintampoToAccra from './pages/service-areas/KintampoToAccra';
import AccraToGoaso from './pages/service-areas/AccraToGoaso';
import GoasoToAccra from './pages/service-areas/GoasoToAccra';
import AccraToKenyasi from './pages/service-areas/AccraToKenyasi';
import KenyasiToAccra from './pages/service-areas/KenyasiToAccra';
import AccraToBechem from './pages/service-areas/AccraToBechem';
import BechemToAccra from './pages/service-areas/BechemToAccra';
import AccraToHwidiem from './pages/service-areas/AccraToHwidiem';
import HwidiemToAccra from './pages/service-areas/HwidiemToAccra';
import AccraToMim from './pages/service-areas/AccraToMim';
import MimToAccra from './pages/service-areas/MimToAccra';
import AccraToAtebubu from './pages/service-areas/AccraToAtebubu';
import AtebubuToAccra from './pages/service-areas/AtebubuToAccra';
import AccraToYeji from './pages/service-areas/AccraToYeji';
import YejiToAccra from './pages/service-areas/YejiToAccra';
import AccraToKwameDanso from './pages/service-areas/AccraToKwameDanso';
import KwameDansoToAccra from './pages/service-areas/KwameDansoToAccra';
import AccraToPrang from './pages/service-areas/AccraToPrang';
import PrangToAccra from './pages/service-areas/PrangToAccra';
import AccraToAssinFosu from './pages/service-areas/AccraToAssinFosu';
import AssinFosuToAccra from './pages/service-areas/AssinFosuToAccra';
import AccraToDunkwaOnOffin from './pages/service-areas/AccraToDunkwaOnOffin';
import DunkwaOnOffinToAccra from './pages/service-areas/DunkwaOnOffinToAccra';
import AccraToTamale from './pages/service-areas/AccraToTamale';
import TamaleToAccra from './pages/service-areas/TamaleToAccra';
import AccraToYendi from './pages/service-areas/AccraToYendi';
import YendiToAccra from './pages/service-areas/YendiToAccra';
import AccraToSavelugu from './pages/service-areas/AccraToSavelugu';
import SaveluguToAccra from './pages/service-areas/SaveluguToAccra';
import AccraToTolon from './pages/service-areas/AccraToTolon';
import TolonToAccra from './pages/service-areas/TolonToAccra';
import GusheguToAccra from './pages/service-areas/GusheguToAccra';
import AccraToKaraga from './pages/service-areas/AccraToKaraga';
import KaragaToAccra from './pages/service-areas/KaragaToAccra';
import AccraToDamongo from './pages/service-areas/AccraToDamongo';
import DamongoToAccra from './pages/service-areas/DamongoToAccra';
import AccraToSalaga from './pages/service-areas/AccraToSalaga';
import SalagaToAccra from './pages/service-areas/SalagaToAccra';
import AccraToNalerigu from './pages/service-areas/AccraToNalerigu';
import NaleriguToAccra from './pages/service-areas/NaleriguToAccra';
import AccraToGambaga from './pages/service-areas/AccraToGambaga';
import GambagaToAccra from './pages/service-areas/GambagaToAccra';
import AccraToWalewale from './pages/service-areas/AccraToWalewale';
import WalewaleToAccra from './pages/service-areas/WalewaleToAccra';
import AccraToBolgatanga from './pages/service-areas/AccraToBolgatanga';
import BolgatangaToAccra from './pages/service-areas/BolgatangaToAccra';
import AccraToNavrongo from './pages/service-areas/AccraToNavrongo';
import NavrongoToAccra from './pages/service-areas/NavrongoToAccra';
import AccraToBawku from './pages/service-areas/AccraToBawku';
import BawkuToAccra from './pages/service-areas/BawkuToAccra';
import AccraToPaga from './pages/service-areas/AccraToPaga';
import PagaToAccra from './pages/service-areas/PagaToAccra';
import AccraToZebilla from './pages/service-areas/AccraToZebilla';
import ZebillaToAccra from './pages/service-areas/ZebillaToAccra';
import AccraToSandema from './pages/service-areas/AccraToSandema';
import SandemaToAccra from './pages/service-areas/SandemaToAccra';
import AccraToFumbisi from './pages/service-areas/AccraToFumbisi';
import FumbisiToAccra from './pages/service-areas/FumbisiToAccra';
import AccraToWa from './pages/service-areas/AccraToWa';
import WaToAccra from './pages/service-areas/WaToAccra';
import AccraToTumu from './pages/service-areas/AccraToTumu';
import TumuToAccra from './pages/service-areas/TumuToAccra';
import AccraToLawra from './pages/service-areas/AccraToLawra';
import LawraToAccra from './pages/service-areas/LawraToAccra';
import AccraToJirapa from './pages/service-areas/AccraToJirapa';
import JirapaToAccra from './pages/service-areas/JirapaToAccra';

import AccraToHo from './pages/service-areas/AccraToHo';
import HoToAccra from './pages/service-areas/HoToAccra';
import AccraToHohoe from './pages/service-areas/AccraToHohoe';
import HohoeToAccra from './pages/service-areas/HohoeToAccra';
import AccraToAflao from './pages/service-areas/AccraToAflao';
import AflaoToAccra from './pages/service-areas/AflaoToAccra';
import AccraToKeta from './pages/service-areas/AccraToKeta';
import KetaToAccra from './pages/service-areas/KetaToAccra';
import AccraToSogakope from './pages/service-areas/AccraToSogakope';
import SogakopeToAccra from './pages/service-areas/SogakopeToAccra';

import ServiceAreaDetails from './pages/ServiceAreaDetails';
import ServiceAreaTowingService from './pages/ServiceAreaTowingService';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className={isAdmin ? 'min-h-screen bg-slate-50' : 'min-h-screen bg-white text-dark font-sans flex flex-col'}>
      {!isAdmin && <EditModeBanner />}
      {!isAdmin && <TopBar />}
      {!isAdmin && <NavBar />}
      
      <div className={isAdmin ? '' : 'flex-1'}>
        <Routes>
          {/* Admin Login Gate */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Console Routes */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardHome />} />
            <Route
              path="colors"
              element={
                <AdminProtectedRoute requiredRole="admin">
                  <AdminColors />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="logo"
              element={
                <AdminProtectedRoute requiredRole="admin">
                  <AdminLogo />
                </AdminProtectedRoute>
              }
            />
            <Route path="links" element={<AdminLinks />} />
            <Route path="pages-text" element={<AdminPagesText />} />
            <Route path="images" element={<AdminImages />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/haulage" element={<Haulage />} />
            <Route path="/towing" element={<Towing />} />
            <Route path="/service-areas" element={<ServiceAreas />} />
            
            <Route path="/service-areas/accra-to-sekondi" element={<AccraToSekondi />} />
            <Route path="/service-areas/sekondi-to-accra" element={<SekondiToAccra />} />
            <Route path="/service-areas/accra-to-takoradi" element={<AccraToTakoradi />} />
            <Route path="/service-areas/takoradi-to-accra" element={<TakoradiToAccra />} />
            <Route path="/service-areas/accra-to-tarkwa" element={<AccraToTarkwa />} />
            <Route path="/service-areas/tarkwa-to-accra" element={<TarkwaToAccra />} />
            <Route path="/service-areas/accra-to-bogoso" element={<AccraToBogoso />} />
            <Route path="/service-areas/bogoso-to-accra" element={<BogosoToAccra />} />
            <Route path="/service-areas/accra-to-prestea" element={<AccraToPrestea />} />
            <Route path="/service-areas/prestea-to-accra" element={<PresteaToAccra />} />
            <Route path="/service-areas/accra-to-agona-nkwanta" element={<AccraToAgonaNkwanta />} />
            <Route path="/service-areas/agona-nkwanta-to-accra" element={<AgonaNkwantaToAccra />} />
            <Route path="/service-areas/accra-to-elubo" element={<AccraToElubo />} />
            <Route path="/service-areas/elubo-to-accra" element={<EluboToAccra />} />
            <Route path="/service-areas/accra-to-axim" element={<AccraToAxim />} />
            <Route path="/service-areas/axim-to-accra" element={<AximToAccra />} />
            <Route path="/service-areas/accra-to-half-assini" element={<AccraToHalfAssini />} />
            <Route path="/service-areas/half-assini-to-accra" element={<HalfAssiniToAccra />} />
            <Route path="/service-areas/accra-to-shama" element={<AccraToShama />} />
            <Route path="/service-areas/shama-to-accra" element={<ShamaToAccra />} />
            <Route path="/service-areas/accra-to-mpohor" element={<AccraToMpohor />} />
            <Route path="/service-areas/mpohor-to-accra" element={<MpohorToAccra />} />
            <Route path="/service-areas/accra-to-wassa-akropong" element={<AccraToWassaAkropong />} />
            <Route path="/service-areas/wassa-akropong-to-accra" element={<WassaAkropongToAccra />} />
            <Route path="/service-areas/accra-to-daboase" element={<AccraToDaboase />} />
            <Route path="/service-areas/daboase-to-accra" element={<DaboaseToAccra />} />
            <Route path="/service-areas/accra-to-enchi" element={<AccraToEnchi />} />
            <Route path="/service-areas/enchi-to-accra" element={<EnchiToAccra />} />
            <Route path="/service-areas/accra-to-bawdie" element={<AccraToBawdie />} />
            <Route path="/service-areas/bawdie-to-accra" element={<BawdieToAccra />} />
            <Route path="/service-areas/accra-to-samreboi" element={<AccraToSamreboi />} />
            <Route path="/service-areas/samreboi-to-accra" element={<SamreboiToAccra />} />
            <Route path="/service-areas/accra-to-sefwi-wiawso" element={<AccraToSefwiWiawso />} />
            <Route path="/service-areas/sefwi-wiawso-to-accra" element={<SefwiWiawsoToAccra />} />
            <Route path="/service-areas/accra-to-bibiani" element={<AccraToBibiani />} />
            <Route path="/service-areas/bibiani-to-accra" element={<BibianiToAccra />} />
            <Route path="/service-areas/accra-to-juaboso" element={<AccraToJuaboso />} />
            <Route path="/service-areas/juaboso-to-accra" element={<JuabosoToAccra />} />
            <Route path="/service-areas/accra-to-bodi" element={<AccraToBodi />} />
            <Route path="/service-areas/bodi-to-accra" element={<BodiToAccra />} />
            <Route path="/service-areas/accra-to-asankragwa" element={<AccraToAsankragwa />} />
            <Route path="/service-areas/asankragwa-to-accra" element={<AsankragwaToAccra />} />
            <Route path="/service-areas/accra-to-dadieso" element={<AccraToDadieso />} />
            <Route path="/service-areas/dadieso-to-accra" element={<DadiesoToAccra />} />
            <Route path="/service-areas/accra-to-sefwi-bekwai" element={<AccraToSefwiBekwai />} />
            <Route path="/service-areas/sefwi-bekwai-to-accra" element={<SefwiBekwaiToAccra />} />
            <Route path="/service-areas/accra-to-akontombra" element={<AccraToAkontombra />} />
            <Route path="/service-areas/akontombra-to-accra" element={<AkontombraToAccra />} />
            <Route path="/service-areas/accra-to-cape-coast" element={<AccraToCapeCoast />} />
            <Route path="/service-areas/cape-coast-to-accra" element={<CapeCoastToAccra />} />
            <Route path="/service-areas/accra-to-elmina" element={<AccraToElmina />} />
            <Route path="/service-areas/elmina-to-accra" element={<ElminaToAccra />} />
            <Route path="/service-areas/accra-to-mankessim" element={<AccraToMankessim />} />
            <Route path="/service-areas/mankessim-to-accra" element={<MankessimToAccra />} />
            <Route path="/service-areas/accra-to-winneba" element={<AccraToWinneba />} />
            <Route path="/service-areas/winneba-to-accra" element={<WinnebaToAccra />} />
            <Route path="/service-areas/accra-to-apam" element={<AccraToApam />} />
            <Route path="/service-areas/apam-to-accra" element={<ApamToAccra />} />
            <Route path="/service-areas/accra" element={<Accra />} />
            <Route path="/service-areas/tema" element={<Tema />} />
            <Route path="/service-areas/ashaiman" element={<Ashaiman />} />
            <Route path="/service-areas/teshie" element={<Teshie />} />
            <Route path="/service-areas/nungua" element={<Nungua />} />
            <Route path="/service-areas/labadi" element={<Labadi />} />
            <Route path="/service-areas/osu" element={<Osu />} />
            <Route path="/service-areas/dansoman" element={<Dansoman />} />
            <Route path="/service-areas/kaneshie" element={<Kaneshie />} />
            <Route path="/service-areas/achimota" element={<Achimota />} />
            <Route path="/service-areas/madina" element={<Madina />} />
            <Route path="/service-areas/adenta" element={<Adenta />} />
            <Route path="/service-areas/east-legon" element={<EastLegon />} />
            <Route path="/service-areas/spintex" element={<Spintex />} />
            <Route path="/service-areas/la" element={<La />} />
            <Route path="/service-areas/airport-residential" element={<AirportResidential />} />
            <Route path="/service-areas/dzorwulu" element={<Dzorwulu />} />
            <Route path="/service-areas/tesano" element={<Tesano />} />
            <Route path="/service-areas/abeka" element={<Abeka />} />
            <Route path="/service-areas/kwashieman" element={<Kwashieman />} />
            <Route path="/service-areas/weija-gbawe" element={<WeijaGbawe />} />
            <Route path="/service-areas/kasoa" element={<Kasoa />} />
            <Route path="/service-areas/prampram" element={<Prampram />} />
            <Route path="/service-areas/kpone" element={<Kpone />} />
            <Route path="/service-areas/dawhenya" element={<Dawhenya />} />
            <Route path="/service-areas/amasaman" element={<Amasaman />} />
            <Route path="/service-areas/ayawaso" element={<Ayawaso />} />
            <Route path="/service-areas/burma-camp" element={<BurmaCamp />} />
            <Route path="/service-areas/circle" element={<Circle />} />
            <Route path="/service-areas/dodowa" element={<Dodowa />} />
            <Route path="/service-areas/korle-klottey" element={<KorleKlottey />} />
            <Route path="/service-areas/lakeside" element={<Lakeside />} />
            <Route path="/service-areas/nima" element={<Nima />} />
            <Route path="/service-areas/ningo-prampram" element={<NingoPrampram />} />
            <Route path="/service-areas/pokuase" element={<Pokuase />} />
            <Route path="/service-areas/accra-to-koforidua" element={<AccraToKoforidua />} />
            <Route path="/service-areas/koforidua-to-accra" element={<KoforiduaToAccra />} />
            <Route path="/service-areas/accra-to-nkawkaw" element={<AccraToNkawkaw />} />
            <Route path="/service-areas/nkawkaw-to-accra" element={<NkawkawToAccra />} />
            <Route path="/service-areas/accra-to-suhum" element={<AccraToSuhum />} />
            <Route path="/service-areas/suhum-to-accra" element={<SuhumToAccra />} />
            <Route path="/service-areas/accra-to-nsawam" element={<AccraToNsawam />} />
            <Route path="/service-areas/nsawam-to-accra" element={<NsawamToAccra />} />
            <Route path="/service-areas/accra-to-aburi" element={<AccraToAburi />} />
            <Route path="/service-areas/aburi-to-accra" element={<AburiToAccra />} />
            <Route path="/service-areas/accra-to-akropong" element={<AccraToAkropong />} />
            <Route path="/service-areas/akropong-to-accra" element={<AkropongToAccra />} />
            <Route path="/service-areas/accra-to-somanya" element={<AccraToSomanya />} />
            <Route path="/service-areas/somanya-to-accra" element={<SomanyaToAccra />} />
            <Route path="/service-areas/accra-to-odumase-krobo" element={<AccraToOdumaseKrobo />} />
            <Route path="/service-areas/odumase-krobo-to-accra" element={<OdumaseKroboToAccra />} />
            <Route path="/service-areas/accra-to-asamankese" element={<AccraToAsamankese />} />
            <Route path="/service-areas/asamankese-to-accra" element={<AsamankeseToAccra />} />
            <Route path="/service-areas/accra-to-akyem-oda" element={<AccraToAkyemOda />} />
            <Route path="/service-areas/akyem-oda-to-accra" element={<AkyemOdaToAccra />} />
            <Route path="/service-areas/accra-to-akwatia" element={<AccraToAkwatia />} />
            <Route path="/service-areas/akwatia-to-accra" element={<AkwatiaToAccra />} />
            <Route path="/service-areas/accra-to-donkorkrom" element={<AccraToDonkorkrom />} />
            <Route path="/service-areas/donkorkrom-to-accra" element={<DonkorkromToAccra />} />
            <Route path="/service-areas/accra-to-begoro" element={<AccraToBegoro />} />
            <Route path="/service-areas/begoro-to-accra" element={<BegoroToAccra />} />
            <Route path="/service-areas/accra-to-kumasi" element={<AccraToKumasi />} />
            <Route path="/service-areas/kumasi-to-accra" element={<KumasiToAccra />} />
            <Route path="/service-areas/accra-to-nandom" element={<AccraToNandom />} />
        <Route path="/service-areas/nandom-to-accra" element={<NandomToAccra />} />
        <Route path="/service-areas/accra-to-hamile" element={<AccraToHamile />} />
        <Route path="/service-areas/hamile-to-accra" element={<HamileToAccra />} />
        <Route path="/service-areas/accra-to-bole" element={<AccraToBole />} />
        <Route path="/service-areas/accra-to-daboya" element={<AccraToDaboya />} />
        <Route path="/service-areas/daboya-to-accra" element={<DaboyaToAccra />} />
        <Route path="/service-areas/accra-to-buipe" element={<AccraToBuipe />} />
        <Route path="/service-areas/buipe-to-accra" element={<BuipeToAccra />} />
        <Route path="/service-areas/accra-to-dambai" element={<AccraToDambai />} />
        <Route path="/service-areas/dambai-to-accra" element={<DambaiToAccra />} />
        <Route path="/service-areas/accra-to-nkwanta" element={<AccraToNkwanta />} />
        <Route path="/service-areas/nkwanta-to-accra" element={<NkwantaToAccra />} />
        <Route path="/service-areas/accra-to-nkwanta-south" element={<AccraToNkwantaSouth />} />
        <Route path="/service-areas/nkwanta-south-to-accra" element={<NkwantaSouthToAccra />} />
        <Route path="/service-areas/accra-to-jasikan" element={<AccraToJasikan />} />
        <Route path="/service-areas/jasikan-to-accra" element={<JasikanToAccra />} />
        <Route path="/service-areas/accra-to-kadjebi" element={<AccraToKadjebi />} />
        <Route path="/service-areas/kadjebi-to-accra" element={<KadjebiToAccra />} />
        <Route path="/service-areas/accra-to-kete-krachi" element={<AccraToKeteKrachi />} />
        <Route path="/service-areas/kete-krachi-to-accra" element={<KeteKrachiToAccra />} />
        <Route path="/service-areas/accra-to-ejisu" element={<AccraToEjisu />} />
            <Route path="/service-areas/ejisu-to-accra" element={<EjisuToAccra />} />
            <Route path="/service-areas/accra-to-konongo" element={<AccraToKonongo />} />
            <Route path="/service-areas/konongo-to-accra" element={<KonongoToAccra />} />
            <Route path="/service-areas/accra-to-mampong" element={<AccraToMampong />} />
            <Route path="/service-areas/mampong-to-accra" element={<MampongToAccra />} />
            <Route path="/service-areas/accra-to-offinso" element={<AccraToOffinso />} />
            <Route path="/service-areas/offinso-to-accra" element={<OffinsoToAccra />} />
            <Route path="/service-areas/accra-to-bekwai" element={<AccraToBekwai />} />
            <Route path="/service-areas/bekwai-to-accra" element={<BekwaiToAccra />} />
            <Route path="/service-areas/accra-to-obuasi" element={<AccraToObuasi />} />
            <Route path="/service-areas/obuasi-to-accra" element={<ObuasiToAccra />} />
            <Route path="/service-areas/accra-to-nkawie" element={<AccraToNkawie />} />
            <Route path="/service-areas/nkawie-to-accra" element={<NkawieToAccra />} />
            <Route path="/service-areas/accra-to-atonsu" element={<AccraToAtonsu />} />
            <Route path="/service-areas/atonsu-to-accra" element={<AtonsuToAccra />} />
            <Route path="/service-areas/accra-to-abuakwa" element={<AccraToAbuakwa />} />
            <Route path="/service-areas/abuakwa-to-accra" element={<AbuakwaToAccra />} />
            <Route path="/service-areas/accra-to-fomena" element={<AccraToFomena />} />
            <Route path="/service-areas/fomena-to-accra" element={<FomenaToAccra />} />
            <Route path="/service-areas/accra-to-agona" element={<AccraToAgona />} />
            <Route path="/service-areas/agona-to-accra" element={<AgonaToAccra />} />
            <Route path="/service-areas/accra-to-juaben" element={<AccraToJuaben />} />
            <Route path="/service-areas/juaben-to-accra" element={<JuabenToAccra />} />
            <Route path="/service-areas/accra-to-asante-akim" element={<AccraToAsanteAkim />} />
            <Route path="/service-areas/asante-akim-to-accra" element={<AsanteAkimToAccra />} />
            <Route path="/service-areas/accra-to-tepa" element={<AccraToTepa />} />
            <Route path="/service-areas/tepa-to-accra" element={<TepaToAccra />} />
            <Route path="/service-areas/accra-to-duayaw-nkwanta" element={<AccraToDuayawNkwanta />} />
            <Route path="/service-areas/duayaw-nkwanta-to-accra" element={<DuayawNkwantaToAccra />} />
            <Route path="/service-areas/accra-to-sunyani" element={<AccraToSunyani />} />
            <Route path="/service-areas/sunyani-to-accra" element={<SunyaniToAccra />} />
            <Route path="/service-areas/accra-to-berekum" element={<AccraToBerekum />} />
            <Route path="/service-areas/berekum-to-accra" element={<BerekumToAccra />} />
            <Route path="/service-areas/accra-to-dormaa-ahenkro" element={<AccraToDormaaAhenkro />} />
            <Route path="/service-areas/dormaa-ahenkro-to-accra" element={<DormaaAhenkroToAccra />} />
            <Route path="/service-areas/accra-to-wenchi" element={<AccraToWenchi />} />
            <Route path="/service-areas/wenchi-to-accra" element={<WenchiToAccra />} />
            <Route path="/service-areas/accra-to-techiman" element={<AccraToTechiman />} />
            <Route path="/service-areas/techiman-to-accra" element={<TechimanToAccra />} />
            <Route path="/service-areas/accra-to-nkoranza" element={<AccraToNkoranza />} />
            <Route path="/service-areas/nkoranza-to-accra" element={<NkoranzaToAccra />} />
            <Route path="/service-areas/accra-to-kintampo" element={<AccraToKintampo />} />
            <Route path="/service-areas/kintampo-to-accra" element={<KintampoToAccra />} />
            <Route path="/service-areas/accra-to-goaso" element={<AccraToGoaso />} />
            <Route path="/service-areas/goaso-to-accra" element={<GoasoToAccra />} />
            <Route path="/service-areas/accra-to-kenyasi" element={<AccraToKenyasi />} />
            <Route path="/service-areas/kenyasi-to-accra" element={<KenyasiToAccra />} />
            <Route path="/service-areas/accra-to-bechem" element={<AccraToBechem />} />
            <Route path="/service-areas/bechem-to-accra" element={<BechemToAccra />} />
            <Route path="/service-areas/accra-to-hwidiem" element={<AccraToHwidiem />} />
            <Route path="/service-areas/hwidiem-to-accra" element={<HwidiemToAccra />} />
            <Route path="/service-areas/accra-to-mim" element={<AccraToMim />} />
            <Route path="/service-areas/mim-to-accra" element={<MimToAccra />} />
            <Route path="/service-areas/accra-to-atebubu" element={<AccraToAtebubu />} />
            <Route path="/service-areas/atebubu-to-accra" element={<AtebubuToAccra />} />
            <Route path="/service-areas/accra-to-yeji" element={<AccraToYeji />} />
            <Route path="/service-areas/yeji-to-accra" element={<YejiToAccra />} />
            <Route path="/service-areas/accra-to-kwame-danso" element={<AccraToKwameDanso />} />
            <Route path="/service-areas/kwame-danso-to-accra" element={<KwameDansoToAccra />} />
            <Route path="/service-areas/accra-to-prang" element={<AccraToPrang />} />
            <Route path="/service-areas/prang-to-accra" element={<PrangToAccra />} />
            <Route path="/service-areas/accra-to-assin-fosu" element={<AccraToAssinFosu />} />
            <Route path="/service-areas/assin-fosu-to-accra" element={<AssinFosuToAccra />} />
            <Route path="/service-areas/accra-to-dunkwa-on-offin" element={<AccraToDunkwaOnOffin />} />
            <Route path="/service-areas/dunkwa-on-offin-to-accra" element={<DunkwaOnOffinToAccra />} />
            <Route path="/service-areas/accra-to-tamale" element={<AccraToTamale />} />
            <Route path="/service-areas/tamale-to-accra" element={<TamaleToAccra />} />
            <Route path="/service-areas/accra-to-yendi" element={<AccraToYendi />} />
            <Route path="/service-areas/yendi-to-accra" element={<YendiToAccra />} />
            <Route path="/service-areas/accra-to-savelugu" element={<AccraToSavelugu />} />
            <Route path="/service-areas/savelugu-to-accra" element={<SaveluguToAccra />} />
            <Route path="/service-areas/accra-to-tolon" element={<AccraToTolon />} />
            <Route path="/service-areas/tolon-to-accra" element={<TolonToAccra />} />
            <Route path="/service-areas/gushegu-to-accra" element={<GusheguToAccra />} />
            <Route path="/service-areas/accra-to-karaga" element={<AccraToKaraga />} />
            <Route path="/service-areas/karaga-to-accra" element={<KaragaToAccra />} />
            <Route path="/service-areas/accra-to-damongo" element={<AccraToDamongo />} />
            <Route path="/service-areas/damongo-to-accra" element={<DamongoToAccra />} />
            <Route path="/service-areas/accra-to-salaga" element={<AccraToSalaga />} />
            <Route path="/service-areas/salaga-to-accra" element={<SalagaToAccra />} />
            <Route path="/service-areas/accra-to-nalerigu" element={<AccraToNalerigu />} />
            <Route path="/service-areas/nalerigu-to-accra" element={<NaleriguToAccra />} />
            <Route path="/service-areas/accra-to-gambaga" element={<AccraToGambaga />} />
            <Route path="/service-areas/gambaga-to-accra" element={<GambagaToAccra />} />
            <Route path="/service-areas/accra-to-walewale" element={<AccraToWalewale />} />
            <Route path="/service-areas/walewale-to-accra" element={<WalewaleToAccra />} />
            <Route path="/service-areas/accra-to-bolgatanga" element={<AccraToBolgatanga />} />
            <Route path="/service-areas/bolgatanga-to-accra" element={<BolgatangaToAccra />} />
            <Route path="/service-areas/accra-to-navrongo" element={<AccraToNavrongo />} />
            <Route path="/service-areas/navrongo-to-accra" element={<NavrongoToAccra />} />
            <Route path="/service-areas/accra-to-bawku" element={<AccraToBawku />} />
            <Route path="/service-areas/bawku-to-accra" element={<BawkuToAccra />} />
            <Route path="/service-areas/accra-to-paga" element={<AccraToPaga />} />
            <Route path="/service-areas/paga-to-accra" element={<PagaToAccra />} />
            <Route path="/service-areas/accra-to-zebilla" element={<AccraToZebilla />} />
            <Route path="/service-areas/zebilla-to-accra" element={<ZebillaToAccra />} />
            <Route path="/service-areas/accra-to-sandema" element={<AccraToSandema />} />
            <Route path="/service-areas/sandema-to-accra" element={<SandemaToAccra />} />
            <Route path="/service-areas/accra-to-fumbisi" element={<AccraToFumbisi />} />
            <Route path="/service-areas/fumbisi-to-accra" element={<FumbisiToAccra />} />
            <Route path="/service-areas/accra-to-wa" element={<AccraToWa />} />
            <Route path="/service-areas/wa-to-accra" element={<WaToAccra />} />
            <Route path="/service-areas/accra-to-tumu" element={<AccraToTumu />} />
            <Route path="/service-areas/tumu-to-accra" element={<TumuToAccra />} />
            <Route path="/service-areas/accra-to-lawra" element={<AccraToLawra />} />
            <Route path="/service-areas/lawra-to-accra" element={<LawraToAccra />} />
            <Route path="/service-areas/accra-to-jirapa" element={<AccraToJirapa />} />
            <Route path="/service-areas/jirapa-to-accra" element={<JirapaToAccra />} />

            
            <Route path="/service-areas/accra-to-ho" element={<AccraToHo />} />
            <Route path="/service-areas/ho-to-accra" element={<HoToAccra />} />
            <Route path="/service-areas/accra-to-hohoe" element={<AccraToHohoe />} />
            <Route path="/service-areas/hohoe-to-accra" element={<HohoeToAccra />} />
            <Route path="/service-areas/accra-to-aflao" element={<AccraToAflao />} />
            <Route path="/service-areas/aflao-to-accra" element={<AflaoToAccra />} />
            <Route path="/service-areas/accra-to-keta" element={<AccraToKeta />} />
            <Route path="/service-areas/keta-to-accra" element={<KetaToAccra />} />
            <Route path="/service-areas/accra-to-sogakope" element={<AccraToSogakope />} />
            <Route path="/service-areas/sogakope-to-accra" element={<SogakopeToAccra />} />
            <Route path="/service-areas/:areaSlug" element={<ServiceAreaDetails />} />
            <Route path="/service-areas/:areaSlug/:serviceSlug" element={<ServiceAreaTowingService />} />
            <Route path="/rental" element={<Rental />} />
            <Route path="/rental/:id" element={<RentalDetails />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/sales/:id" element={<CarDetails />} />
            <Route path="/repairs" element={<Repairs />} />
            <Route path="/body-works" element={<BodyWorks />} />
            <Route path="/parts" element={<Parts />} />
            <Route path="/parts/:id" element={<PartDetails />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/towing-service-terms" element={<TowingServiceTerms />} />
            <Route path="/cancellation-refund-policy" element={<CancellationRefundPolicy />} />
            <Route path="/pricing-payment-policy" element={<PricingPaymentPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/service-area-policy" element={<ServiceAreaPolicy />} />
            <Route path="/emergency-service-policy" element={<EmergencyServicePolicy />} />
            <Route path="/complaints-policy" element={<ComplaintsPolicy />} />
            <Route path="/car-damage-liability-policy" element={<CarDamageLiabilityPolicy />} />
            <Route path="/vehicle-damage-liability-policy" element={<Navigate to="/car-damage-liability-policy" replace />} />
            <Route path="/vehicles" element={<Navigate to="/sales" replace />} />
            <Route path="/cars" element={<Navigate to="/sales" replace />} />
            <Route path="/car-sales" element={<Navigate to="/sales" replace />} />
            <Route path="/vehicle-sales" element={<Navigate to="/sales" replace />} />
            <Route path="/vehicles/:id" element={<Navigate to="/sales" replace />} />
            <Route path="/cars/:id" element={<Navigate to="/sales" replace />} />
            <Route path="/vehicle-details/:id" element={<Navigate to="/sales" replace />} />
            <Route path="/car-details/:id" element={<Navigate to="/sales" replace />} />
            <Route path="/car-rentals" element={<Navigate to="/rental" replace />} />
            <Route path="/vehicle-rentals" element={<Navigate to="/rental" replace />} />
            <Route path="/car-rental" element={<Navigate to="/rental" replace />} />
            <Route path="/vehicle-rental" element={<Navigate to="/rental" replace />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {!isAdmin && <Footer />}
        {!isAdmin && <FloatingButtons />}
      </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
