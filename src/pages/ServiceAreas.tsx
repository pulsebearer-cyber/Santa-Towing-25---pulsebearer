import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Phone, MessageCircle, MapPin, X, Navigation } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '../components/seo/SEO';
import { useContent } from '@/hooks/useContent';

export interface ServiceAreaItem {
  label: string;
  path: string;
  region: string;
}

export interface ZoneDefinition {
  id: string;
  name: string;
  subtitle: string;
  matchRegions: string[];
}

const ZONES: ZoneDefinition[] = [
  {
    id: 'greater-accra',
    name: 'Greater Accra',
    subtitle: 'Accra Metropolitan, Tema, Spintex, East Legon & Coastal Suburbs',
    matchRegions: ['Greater Accra Region']
  },
  {
    id: 'ashanti',
    name: 'Ashanti Region',
    subtitle: 'Kumasi Metropolitan & Intercity Ashanti Regional Corridors',
    matchRegions: ['Ashanti Region']
  },
  {
    id: 'western',
    name: 'Western Region',
    subtitle: 'Sekondi-Takoradi, Tarkwa, Axim, Elubo & Western North Routes',
    matchRegions: ['Western Region', 'Western North Region']
  },
  {
    id: 'eastern',
    name: 'Eastern Region',
    subtitle: 'Koforidua, Nsawam, Suhum, Nkawkaw, Aburi & Kwahu Corridors',
    matchRegions: ['Eastern Region']
  },
  {
    id: 'central',
    name: 'Central Region',
    subtitle: 'Cape Coast, Elmina, Winneba, Mankessim & Coastal Highway',
    matchRegions: ['Central Region']
  },
  {
    id: 'volta-oti',
    name: 'Volta & Oti Regions',
    subtitle: 'Ho, Hohoe, Aflao, Keta, Sogakope, Dambai & Volta Lake Corridors',
    matchRegions: ['Volta Region', 'Oti Region']
  },
  {
    id: 'bono-ahafo',
    name: 'Bono, Bono East & Ahafo',
    subtitle: 'Sunyani, Techiman, Kintampo, Goaso, Berekum & Middle Belt Corridors',
    matchRegions: ['Bono Region', 'Bono East Region', 'Ahafo Region']
  },
  {
    id: 'northern-ghana',
    name: 'Northern Ghana',
    subtitle: 'Tamale, Bolgatanga, Wa, Savannah, North East & Upper Regions',
    matchRegions: ['Northern Region', 'North East Region', 'Savannah Region', 'Upper East Region', 'Upper West Region']
  }
];

const ALL_AREAS: ServiceAreaItem[] = [
  { label: 'Accra to Sekondi', path: '/service-areas/accra-to-sekondi', region: 'Western Region' },
  { label: 'Sekondi to Accra', path: '/service-areas/sekondi-to-accra', region: 'Western Region' },
  { label: 'Accra to Takoradi', path: '/service-areas/accra-to-takoradi', region: 'Western Region' },
  { label: 'Takoradi to Accra', path: '/service-areas/takoradi-to-accra', region: 'Western Region' },
  { label: 'Accra to Tarkwa', path: '/service-areas/accra-to-tarkwa', region: 'Western Region' },
  { label: 'Tarkwa to Accra', path: '/service-areas/tarkwa-to-accra', region: 'Western Region' },
  { label: 'Accra to Bogoso', path: '/service-areas/accra-to-bogoso', region: 'Western Region' },
  { label: 'Bogoso to Accra', path: '/service-areas/bogoso-to-accra', region: 'Western Region' },
  { label: 'Accra to Prestea', path: '/service-areas/accra-to-prestea', region: 'Western Region' },
  { label: 'Prestea to Accra', path: '/service-areas/prestea-to-accra', region: 'Western Region' },
  { label: 'Accra to Agona Nkwanta', path: '/service-areas/accra-to-agona-nkwanta', region: 'Western Region' },
  { label: 'Agona Nkwanta to Accra', path: '/service-areas/agona-nkwanta-to-accra', region: 'Western Region' },
  { label: 'Accra to Elubo', path: '/service-areas/accra-to-elubo', region: 'Western Region' },
  { label: 'Elubo to Accra', path: '/service-areas/elubo-to-accra', region: 'Western Region' },
  { label: 'Accra to Axim', path: '/service-areas/accra-to-axim', region: 'Western Region' },
  { label: 'Axim to Accra', path: '/service-areas/axim-to-accra', region: 'Western Region' },
  { label: 'Accra to Half Assini', path: '/service-areas/accra-to-half-assini', region: 'Western Region' },
  { label: 'Half Assini to Accra', path: '/service-areas/half-assini-to-accra', region: 'Western Region' },
  { label: 'Accra to Shama', path: '/service-areas/accra-to-shama', region: 'Western Region' },
  { label: 'Shama to Accra', path: '/service-areas/shama-to-accra', region: 'Western Region' },
  { label: 'Accra to Mpohor', path: '/service-areas/accra-to-mpohor', region: 'Western Region' },
  { label: 'Mpohor to Accra', path: '/service-areas/mpohor-to-accra', region: 'Western Region' },
  { label: 'Accra to Wassa Akropong', path: '/service-areas/accra-to-wassa-akropong', region: 'Western Region' },
  { label: 'Wassa Akropong to Accra', path: '/service-areas/wassa-akropong-to-accra', region: 'Western Region' },
  { label: 'Accra to Daboase', path: '/service-areas/accra-to-daboase', region: 'Western Region' },
  { label: 'Daboase to Accra', path: '/service-areas/daboase-to-accra', region: 'Western Region' },
  { label: 'Accra to Enchi', path: '/service-areas/accra-to-enchi', region: 'Western North Region' },
  { label: 'Enchi to Accra', path: '/service-areas/enchi-to-accra', region: 'Western North Region' },
  { label: 'Accra to Bawdie', path: '/service-areas/accra-to-bawdie', region: 'Western Region' },
  { label: 'Bawdie to Accra', path: '/service-areas/bawdie-to-accra', region: 'Western Region' },
  { label: 'Accra to Samreboi', path: '/service-areas/accra-to-samreboi', region: 'Western Region' },
  { label: 'Samreboi to Accra', path: '/service-areas/samreboi-to-accra', region: 'Western Region' },
  { label: 'Accra to Sefwi Wiawso', path: '/service-areas/accra-to-sefwi-wiawso', region: 'Western North Region' },
  { label: 'Sefwi Wiawso to Accra', path: '/service-areas/sefwi-wiawso-to-accra', region: 'Western North Region' },
  { label: 'Accra to Bibiani', path: '/service-areas/accra-to-bibiani', region: 'Western North Region' },
  { label: 'Bibiani to Accra', path: '/service-areas/bibiani-to-accra', region: 'Western North Region' },
  { label: 'Accra to Juaboso', path: '/service-areas/accra-to-juaboso', region: 'Western North Region' },
  { label: 'Juaboso to Accra', path: '/service-areas/juaboso-to-accra', region: 'Western North Region' },
  { label: 'Accra to Bodi', path: '/service-areas/accra-to-bodi', region: 'Western North Region' },
  { label: 'Bodi to Accra', path: '/service-areas/bodi-to-accra', region: 'Western North Region' },
  { label: 'Accra to Asankragwa', path: '/service-areas/accra-to-asankragwa', region: 'Western Region' },
  { label: 'Asankragwa to Accra', path: '/service-areas/asankragwa-to-accra', region: 'Western Region' },
  { label: 'Accra to Dadieso', path: '/service-areas/accra-to-dadieso', region: 'Western North Region' },
  { label: 'Dadieso to Accra', path: '/service-areas/dadieso-to-accra', region: 'Western North Region' },
  { label: 'Accra to Sefwi Bekwai', path: '/service-areas/accra-to-sefwi-bekwai', region: 'Western North Region' },
  { label: 'Sefwi Bekwai to Accra', path: '/service-areas/sefwi-bekwai-to-accra', region: 'Western North Region' },
  { label: 'Accra to Akontombra', path: '/service-areas/accra-to-akontombra', region: 'Western North Region' },
  { label: 'Akontombra to Accra', path: '/service-areas/akontombra-to-accra', region: 'Western North Region' },
  { label: 'Accra to Cape Coast', path: '/service-areas/accra-to-cape-coast', region: 'Central Region' },
  { label: 'Cape Coast to Accra', path: '/service-areas/cape-coast-to-accra', region: 'Central Region' },
  { label: 'Accra to Elmina', path: '/service-areas/accra-to-elmina', region: 'Central Region' },
  { label: 'Elmina to Accra', path: '/service-areas/elmina-to-accra', region: 'Central Region' },
  { label: 'Accra to Mankessim', path: '/service-areas/accra-to-mankessim', region: 'Central Region' },
  { label: 'Mankessim to Accra', path: '/service-areas/mankessim-to-accra', region: 'Central Region' },
  { label: 'Accra to Winneba', path: '/service-areas/accra-to-winneba', region: 'Central Region' },
  { label: 'Winneba to Accra', path: '/service-areas/winneba-to-accra', region: 'Central Region' },
  { label: 'Accra to Apam', path: '/service-areas/accra-to-apam', region: 'Central Region' },
  { label: 'Apam to Accra', path: '/service-areas/apam-to-accra', region: 'Central Region' },
  { label: 'Accra', path: '/service-areas/accra', region: 'Greater Accra Region' },
  { label: 'Tema', path: '/service-areas/tema', region: 'Greater Accra Region' },
  { label: 'Ashaiman', path: '/service-areas/ashaiman', region: 'Greater Accra Region' },
  { label: 'Teshie', path: '/service-areas/teshie', region: 'Greater Accra Region' },
  { label: 'Nungua', path: '/service-areas/nungua', region: 'Greater Accra Region' },
  { label: 'Labadi', path: '/service-areas/labadi', region: 'Greater Accra Region' },
  { label: 'Osu', path: '/service-areas/osu', region: 'Greater Accra Region' },
  { label: 'Dansoman', path: '/service-areas/dansoman', region: 'Greater Accra Region' },
  { label: 'Kaneshie', path: '/service-areas/kaneshie', region: 'Greater Accra Region' },
  { label: 'Achimota', path: '/service-areas/achimota', region: 'Greater Accra Region' },
  { label: 'Madina', path: '/service-areas/madina', region: 'Greater Accra Region' },
  { label: 'Adenta', path: '/service-areas/adenta', region: 'Greater Accra Region' },
  { label: 'East Legon', path: '/service-areas/east-legon', region: 'Greater Accra Region' },
  { label: 'Spintex', path: '/service-areas/spintex', region: 'Greater Accra Region' },
  { label: 'La', path: '/service-areas/la', region: 'Greater Accra Region' },
  { label: 'Airport Residential', path: '/service-areas/airport-residential', region: 'Greater Accra Region' },
  { label: 'Dzorwulu', path: '/service-areas/dzorwulu', region: 'Greater Accra Region' },
  { label: 'Tesano', path: '/service-areas/tesano', region: 'Greater Accra Region' },
  { label: 'Abeka', path: '/service-areas/abeka', region: 'Greater Accra Region' },
  { label: 'Kwashieman', path: '/service-areas/kwashieman', region: 'Greater Accra Region' },
  { label: 'Weija-Gbawe', path: '/service-areas/weija-gbawe', region: 'Greater Accra Region' },
  { label: 'Kasoa', path: '/service-areas/kasoa', region: 'Greater Accra Region' },
  { label: 'Prampram', path: '/service-areas/prampram', region: 'Greater Accra Region' },
  { label: 'Kpone', path: '/service-areas/kpone', region: 'Greater Accra Region' },
  { label: 'Dawhenya', path: '/service-areas/dawhenya', region: 'Greater Accra Region' },
  { label: 'Amasaman', path: '/service-areas/amasaman', region: 'Greater Accra Region' },
  { label: 'Ayawaso', path: '/service-areas/ayawaso', region: 'Greater Accra Region' },
  { label: 'Burma Camp', path: '/service-areas/burma-camp', region: 'Greater Accra Region' },
  { label: 'Circle', path: '/service-areas/circle', region: 'Greater Accra Region' },
  { label: 'Dodowa', path: '/service-areas/dodowa', region: 'Greater Accra Region' },
  { label: 'Korle Klottey', path: '/service-areas/korle-klottey', region: 'Greater Accra Region' },
  { label: 'Lakeside', path: '/service-areas/lakeside', region: 'Greater Accra Region' },
  { label: 'Nima', path: '/service-areas/nima', region: 'Greater Accra Region' },
  { label: 'Ningo-Prampram', path: '/service-areas/ningo-prampram', region: 'Greater Accra Region' },
  { label: 'Pokuase', path: '/service-areas/pokuase', region: 'Greater Accra Region' },
  { label: 'Accra to Koforidua', path: '/service-areas/accra-to-koforidua', region: 'Eastern Region' },
  { label: 'Koforidua to Accra', path: '/service-areas/koforidua-to-accra', region: 'Eastern Region' },
  { label: 'Accra to Nkawkaw', path: '/service-areas/accra-to-nkawkaw', region: 'Eastern Region' },
  { label: 'Nkawkaw to Accra', path: '/service-areas/nkawkaw-to-accra', region: 'Eastern Region' },
  { label: 'Accra to Suhum', path: '/service-areas/accra-to-suhum', region: 'Eastern Region' },
  { label: 'Suhum to Accra', path: '/service-areas/suhum-to-accra', region: 'Eastern Region' },
  { label: 'Accra to Nsawam', path: '/service-areas/accra-to-nsawam', region: 'Eastern Region' },
  { label: 'Nsawam to Accra', path: '/service-areas/nsawam-to-accra', region: 'Eastern Region' },
  { label: 'Accra to Aburi', path: '/service-areas/accra-to-aburi', region: 'Eastern Region' },
  { label: 'Aburi to Accra', path: '/service-areas/aburi-to-accra', region: 'Eastern Region' },
  { label: 'Accra to Akropong', path: '/service-areas/accra-to-akropong', region: 'Eastern Region' },
  { label: 'Akropong to Accra', path: '/service-areas/akropong-to-accra', region: 'Eastern Region' },
  { label: 'Accra to Somanya', path: '/service-areas/accra-to-somanya', region: 'Eastern Region' },
  { label: 'Somanya to Accra', path: '/service-areas/somanya-to-accra', region: 'Eastern Region' },
  { label: 'Accra to Odumase-Krobo', path: '/service-areas/accra-to-odumase-krobo', region: 'Eastern Region' },
  { label: 'Odumase-Krobo to Accra', path: '/service-areas/odumase-krobo-to-accra', region: 'Eastern Region' },
  { label: 'Accra to Asamankese', path: '/service-areas/accra-to-asamankese', region: 'Eastern Region' },
  { label: 'Asamankese to Accra', path: '/service-areas/asamankese-to-accra', region: 'Eastern Region' },
  { label: 'Accra to Akyem Oda', path: '/service-areas/accra-to-akyem-oda', region: 'Eastern Region' },
  { label: 'Akyem Oda to Accra', path: '/service-areas/akyem-oda-to-accra', region: 'Eastern Region' },
  { label: 'Accra to Akwatia', path: '/service-areas/accra-to-akwatia', region: 'Eastern Region' },
  { label: 'Akwatia to Accra', path: '/service-areas/akwatia-to-accra', region: 'Eastern Region' },
  { label: 'Accra to Donkorkrom', path: '/service-areas/accra-to-donkorkrom', region: 'Eastern Region' },
  { label: 'Donkorkrom to Accra', path: '/service-areas/donkorkrom-to-accra', region: 'Eastern Region' },
  { label: 'Accra to Begoro', path: '/service-areas/accra-to-begoro', region: 'Eastern Region' },
  { label: 'Begoro to Accra', path: '/service-areas/begoro-to-accra', region: 'Eastern Region' },
  { label: 'Accra to Kumasi', path: '/service-areas/accra-to-kumasi', region: 'Ashanti Region' },
  { label: 'Kumasi to Accra', path: '/service-areas/kumasi-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Nandom', path: '/service-areas/accra-to-nandom', region: 'Upper West Region' },
  { label: 'Nandom to Accra', path: '/service-areas/nandom-to-accra', region: 'Upper West Region' },
  { label: 'Accra to Hamile', path: '/service-areas/accra-to-hamile', region: 'Upper West Region' },
  { label: 'Hamile to Accra', path: '/service-areas/hamile-to-accra', region: 'Upper West Region' },
  { label: 'Accra to Bole', path: '/service-areas/accra-to-bole', region: 'Savannah Region' },
  { label: 'Accra to Daboya', path: '/service-areas/accra-to-daboya', region: 'Savannah Region' },
  { label: 'Daboya to Accra', path: '/service-areas/daboya-to-accra', region: 'Savannah Region' },
  { label: 'Accra to Buipe', path: '/service-areas/accra-to-buipe', region: 'Savannah Region' },
  { label: 'Buipe to Accra', path: '/service-areas/buipe-to-accra', region: 'Savannah Region' },
  { label: 'Accra to Dambai', path: '/service-areas/accra-to-dambai', region: 'Oti Region' },
  { label: 'Dambai to Accra', path: '/service-areas/dambai-to-accra', region: 'Oti Region' },
  { label: 'Accra to Nkwanta', path: '/service-areas/accra-to-nkwanta', region: 'Oti Region' },
  { label: 'Nkwanta to Accra', path: '/service-areas/nkwanta-to-accra', region: 'Oti Region' },
  { label: 'Accra to Nkwanta South', path: '/service-areas/accra-to-nkwanta-south', region: 'Oti Region' },
  { label: 'Nkwanta South to Accra', path: '/service-areas/nkwanta-south-to-accra', region: 'Oti Region' },
  { label: 'Accra to Jasikan', path: '/service-areas/accra-to-jasikan', region: 'Oti Region' },
  { label: 'Jasikan to Accra', path: '/service-areas/jasikan-to-accra', region: 'Oti Region' },
  { label: 'Accra to Kadjebi', path: '/service-areas/accra-to-kadjebi', region: 'Oti Region' },
  { label: 'Kadjebi to Accra', path: '/service-areas/kadjebi-to-accra', region: 'Oti Region' },
  { label: 'Accra to Kete Krachi', path: '/service-areas/accra-to-kete-krachi', region: 'Oti Region' },
  { label: 'Kete Krachi to Accra', path: '/service-areas/kete-krachi-to-accra', region: 'Oti Region' },
  { label: 'Accra to Ejisu', path: '/service-areas/accra-to-ejisu', region: 'Ashanti Region' },
  { label: 'Ejisu to Accra', path: '/service-areas/ejisu-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Konongo', path: '/service-areas/accra-to-konongo', region: 'Ashanti Region' },
  { label: 'Konongo to Accra', path: '/service-areas/konongo-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Mampong', path: '/service-areas/accra-to-mampong', region: 'Ashanti Region' },
  { label: 'Mampong to Accra', path: '/service-areas/mampong-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Offinso', path: '/service-areas/accra-to-offinso', region: 'Ashanti Region' },
  { label: 'Offinso to Accra', path: '/service-areas/offinso-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Bekwai', path: '/service-areas/accra-to-bekwai', region: 'Ashanti Region' },
  { label: 'Bekwai to Accra', path: '/service-areas/bekwai-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Obuasi', path: '/service-areas/accra-to-obuasi', region: 'Ashanti Region' },
  { label: 'Obuasi to Accra', path: '/service-areas/obuasi-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Nkawie', path: '/service-areas/accra-to-nkawie', region: 'Ashanti Region' },
  { label: 'Nkawie to Accra', path: '/service-areas/nkawie-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Atonsu', path: '/service-areas/accra-to-atonsu', region: 'Ashanti Region' },
  { label: 'Atonsu to Accra', path: '/service-areas/atonsu-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Abuakwa', path: '/service-areas/accra-to-abuakwa', region: 'Ashanti Region' },
  { label: 'Abuakwa to Accra', path: '/service-areas/abuakwa-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Fomena', path: '/service-areas/accra-to-fomena', region: 'Ashanti Region' },
  { label: 'Fomena to Accra', path: '/service-areas/fomena-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Agona', path: '/service-areas/accra-to-agona', region: 'Ashanti Region' },
  { label: 'Agona to Accra', path: '/service-areas/agona-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Juaben', path: '/service-areas/accra-to-juaben', region: 'Ashanti Region' },
  { label: 'Juaben to Accra', path: '/service-areas/juaben-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Asante Akim', path: '/service-areas/accra-to-asante-akim', region: 'Ashanti Region' },
  { label: 'Asante Akim to Accra', path: '/service-areas/asante-akim-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Tepa', path: '/service-areas/accra-to-tepa', region: 'Ashanti Region' },
  { label: 'Tepa to Accra', path: '/service-areas/tepa-to-accra', region: 'Ashanti Region' },
  { label: 'Accra to Duayaw Nkwanta', path: '/service-areas/accra-to-duayaw-nkwanta', region: 'Ahafo Region' },
  { label: 'Duayaw Nkwanta to Accra', path: '/service-areas/duayaw-nkwanta-to-accra', region: 'Ahafo Region' },
  { label: 'Accra to Sunyani', path: '/service-areas/accra-to-sunyani', region: 'Bono Region' },
  { label: 'Sunyani to Accra', path: '/service-areas/sunyani-to-accra', region: 'Bono Region' },
  { label: 'Accra to Berekum', path: '/service-areas/accra-to-berekum', region: 'Bono Region' },
  { label: 'Berekum to Accra', path: '/service-areas/berekum-to-accra', region: 'Bono Region' },
  { label: 'Accra to Dormaa Ahenkro', path: '/service-areas/accra-to-dormaa-ahenkro', region: 'Bono Region' },
  { label: 'Dormaa Ahenkro to Accra', path: '/service-areas/dormaa-ahenkro-to-accra', region: 'Bono Region' },
  { label: 'Accra to Wenchi', path: '/service-areas/accra-to-wenchi', region: 'Bono Region' },
  { label: 'Wenchi to Accra', path: '/service-areas/wenchi-to-accra', region: 'Bono Region' },
  { label: 'Accra to Techiman', path: '/service-areas/accra-to-techiman', region: 'Bono East Region' },
  { label: 'Techiman to Accra', path: '/service-areas/techiman-to-accra', region: 'Bono East Region' },
  { label: 'Accra to Nkoranza', path: '/service-areas/accra-to-nkoranza', region: 'Bono East Region' },
  { label: 'Nkoranza to Accra', path: '/service-areas/nkoranza-to-accra', region: 'Bono East Region' },
  { label: 'Accra to Kintampo', path: '/service-areas/accra-to-kintampo', region: 'Bono East Region' },
  { label: 'Kintampo to Accra', path: '/service-areas/kintampo-to-accra', region: 'Bono East Region' },
  { label: 'Accra to Goaso', path: '/service-areas/accra-to-goaso', region: 'Ahafo Region' },
  { label: 'Goaso to Accra', path: '/service-areas/goaso-to-accra', region: 'Ahafo Region' },
  { label: 'Accra to Kenyasi', path: '/service-areas/accra-to-kenyasi', region: 'Ahafo Region' },
  { label: 'Kenyasi to Accra', path: '/service-areas/kenyasi-to-accra', region: 'Ahafo Region' },
  { label: 'Accra to Bechem', path: '/service-areas/accra-to-bechem', region: 'Ahafo Region' },
  { label: 'Bechem to Accra', path: '/service-areas/bechem-to-accra', region: 'Ahafo Region' },
  { label: 'Accra to Hwidiem', path: '/service-areas/accra-to-hwidiem', region: 'Ahafo Region' },
  { label: 'Hwidiem to Accra', path: '/service-areas/hwidiem-to-accra', region: 'Ahafo Region' },
  { label: 'Accra to Mim', path: '/service-areas/accra-to-mim', region: 'Ahafo Region' },
  { label: 'Mim to Accra', path: '/service-areas/mim-to-accra', region: 'Ahafo Region' },
  { label: 'Accra to Atebubu', path: '/service-areas/accra-to-atebubu', region: 'Bono East Region' },
  { label: 'Atebubu to Accra', path: '/service-areas/atebubu-to-accra', region: 'Bono East Region' },
  { label: 'Accra to Yeji', path: '/service-areas/accra-to-yeji', region: 'Bono East Region' },
  { label: 'Yeji to Accra', path: '/service-areas/yeji-to-accra', region: 'Bono East Region' },
  { label: 'Accra to Kwame Danso', path: '/service-areas/accra-to-kwame-danso', region: 'Bono East Region' },
  { label: 'Kwame Danso to Accra', path: '/service-areas/kwame-danso-to-accra', region: 'Bono East Region' },
  { label: 'Accra to Prang', path: '/service-areas/accra-to-prang', region: 'Bono East Region' },
  { label: 'Prang to Accra', path: '/service-areas/prang-to-accra', region: 'Bono East Region' },
  { label: 'Accra to Assin Fosu', path: '/service-areas/accra-to-assin-fosu', region: 'Central Region' },
  { label: 'Assin Fosu to Accra', path: '/service-areas/assin-fosu-to-accra', region: 'Central Region' },
  { label: 'Accra to Dunkwa-on-Offin', path: '/service-areas/accra-to-dunkwa-on-offin', region: 'Central Region' },
  { label: 'Dunkwa-on-Offin to Accra', path: '/service-areas/dunkwa-on-offin-to-accra', region: 'Central Region' },
  { label: 'Accra to Tamale', path: '/service-areas/accra-to-tamale', region: 'Northern Region' },
  { label: 'Tamale to Accra', path: '/service-areas/tamale-to-accra', region: 'Northern Region' },
  { label: 'Accra to Yendi', path: '/service-areas/accra-to-yendi', region: 'Northern Region' },
  { label: 'Yendi to Accra', path: '/service-areas/yendi-to-accra', region: 'Northern Region' },
  { label: 'Accra to Savelugu', path: '/service-areas/accra-to-savelugu', region: 'Northern Region' },
  { label: 'Savelugu to Accra', path: '/service-areas/savelugu-to-accra', region: 'Northern Region' },
  { label: 'Accra to Tolon', path: '/service-areas/accra-to-tolon', region: 'Northern Region' },
  { label: 'Tolon to Accra', path: '/service-areas/tolon-to-accra', region: 'Northern Region' },
  { label: 'Gushegu to Accra', path: '/service-areas/gushegu-to-accra', region: 'Northern Region' },
  { label: 'Accra to Karaga', path: '/service-areas/accra-to-karaga', region: 'Northern Region' },
  { label: 'Karaga to Accra', path: '/service-areas/karaga-to-accra', region: 'Northern Region' },
  { label: 'Accra to Damongo', path: '/service-areas/accra-to-damongo', region: 'Savannah Region' },
  { label: 'Damongo to Accra', path: '/service-areas/damongo-to-accra', region: 'Savannah Region' },
  { label: 'Accra to Salaga', path: '/service-areas/accra-to-salaga', region: 'Savannah Region' },
  { label: 'Salaga to Accra', path: '/service-areas/salaga-to-accra', region: 'Savannah Region' },
  { label: 'Accra to Nalerigu', path: '/service-areas/accra-to-nalerigu', region: 'North East Region' },
  { label: 'Nalerigu to Accra', path: '/service-areas/nalerigu-to-accra', region: 'North East Region' },
  { label: 'Accra to Gambaga', path: '/service-areas/accra-to-gambaga', region: 'North East Region' },
  { label: 'Gambaga to Accra', path: '/service-areas/gambaga-to-accra', region: 'North East Region' },
  { label: 'Accra to Walewale', path: '/service-areas/accra-to-walewale', region: 'North East Region' },
  { label: 'Walewale to Accra', path: '/service-areas/walewale-to-accra', region: 'North East Region' },
  { label: 'Accra to Bolgatanga', path: '/service-areas/accra-to-bolgatanga', region: 'Upper East Region' },
  { label: 'Bolgatanga to Accra', path: '/service-areas/bolgatanga-to-accra', region: 'Upper East Region' },
  { label: 'Accra to Navrongo', path: '/service-areas/accra-to-navrongo', region: 'Upper East Region' },
  { label: 'Navrongo to Accra', path: '/service-areas/navrongo-to-accra', region: 'Upper East Region' },
  { label: 'Accra to Bawku', path: '/service-areas/accra-to-bawku', region: 'Upper East Region' },
  { label: 'Bawku to Accra', path: '/service-areas/bawku-to-accra', region: 'Upper East Region' },
  { label: 'Accra to Paga', path: '/service-areas/accra-to-paga', region: 'Upper East Region' },
  { label: 'Paga to Accra', path: '/service-areas/paga-to-accra', region: 'Upper East Region' },
  { label: 'Accra to Zebilla', path: '/service-areas/accra-to-zebilla', region: 'Upper East Region' },
  { label: 'Zebilla to Accra', path: '/service-areas/zebilla-to-accra', region: 'Upper East Region' },
  { label: 'Accra to Sandema', path: '/service-areas/accra-to-sandema', region: 'Upper East Region' },
  { label: 'Sandema to Accra', path: '/service-areas/sandema-to-accra', region: 'Upper East Region' },
  { label: 'Accra to Fumbisi', path: '/service-areas/accra-to-fumbisi', region: 'Upper East Region' },
  { label: 'Fumbisi to Accra', path: '/service-areas/fumbisi-to-accra', region: 'Upper East Region' },
  { label: 'Accra to Wa', path: '/service-areas/accra-to-wa', region: 'Upper West Region' },
  { label: 'Wa to Accra', path: '/service-areas/wa-to-accra', region: 'Upper West Region' },
  { label: 'Accra to Tumu', path: '/service-areas/accra-to-tumu', region: 'Upper West Region' },
  { label: 'Tumu to Accra', path: '/service-areas/tumu-to-accra', region: 'Upper West Region' },
  { label: 'Accra to Lawra', path: '/service-areas/accra-to-lawra', region: 'Upper West Region' },
  { label: 'Lawra to Accra', path: '/service-areas/lawra-to-accra', region: 'Upper West Region' },
  { label: 'Accra to Jirapa', path: '/service-areas/accra-to-jirapa', region: 'Upper West Region' },
  { label: 'Jirapa to Accra', path: '/service-areas/jirapa-to-accra', region: 'Upper West Region' },
  { label: 'Accra to Ho', path: '/service-areas/accra-to-ho', region: 'Volta Region' },
  { label: 'Ho to Accra', path: '/service-areas/ho-to-accra', region: 'Volta Region' },
  { label: 'Accra to Hohoe', path: '/service-areas/accra-to-hohoe', region: 'Volta Region' },
  { label: 'Hohoe to Accra', path: '/service-areas/hohoe-to-accra', region: 'Volta Region' },
  { label: 'Accra to Aflao', path: '/service-areas/accra-to-aflao', region: 'Volta Region' },
  { label: 'Aflao to Accra', path: '/service-areas/aflao-to-accra', region: 'Volta Region' },
  { label: 'Accra to Keta', path: '/service-areas/accra-to-keta', region: 'Volta Region' },
  { label: 'Keta to Accra', path: '/service-areas/keta-to-accra', region: 'Volta Region' },
  { label: 'Accra to Sogakope', path: '/service-areas/accra-to-sogakope', region: 'Volta Region' },
  { label: 'Sogakope to Accra', path: '/service-areas/sogakope-to-accra', region: 'Volta Region' },
];

export default function ServiceAreas() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const seoTitle = useContent('seo.serviceAreas.title', 'Service Areas Directory | 24/7 Nationwide Towing | Santa Towing');
  const seoDesc = useContent('seo.serviceAreas.description', 'Explore 260+ rapid emergency towing and recovery routes across Greater Accra, Western Region, Ashanti Region, Northern Ghana, and all 16 regions.');
  const badge = useContent('serviceAreas.badge', 'Nationwide Coverage');
  const title = useContent('serviceAreas.title', 'Service Areas & Routes Directory');
  const description = useContent('serviceAreas.description', 'Browse our 24/7 emergency towing, accident recovery, and intercity haulage corridors grouped by geographic zone. Fast response dispatch across all 16 regions of Ghana.');
  const ctaBadge = useContent('serviceAreas.ctaBadge', 'Need Fast Towing Service?');
  const ctaHeading = useContent('serviceAreas.ctaHeading', '24/7 Rapid Emergency Dispatch Nationwide');
  const ctaDescription = useContent('serviceAreas.ctaDescription', 'Whether you need car breakdown recovery on the highway or long-haul car haulage between cities, our operators are on standby 24/7 across Ghana.');
  const phoneRaw = useContent('global.links.phone', '0244753849');
  const phoneFormatted = useContent('global.links.phoneFormatted', '024 475 3849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  // Client-side pure JS filter over the hardcoded list
  const filteredAreas = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return ALL_AREAS.filter(area => {
      // Zone filter matching
      if (selectedZone !== 'all') {
        const zoneDef = ZONES.find(z => z.id === selectedZone);
        if (zoneDef && !zoneDef.matchRegions.includes(area.region)) {
          return false;
        }
      }

      // Search query matching across label, region, and zone name
      if (!query) return true;

      const matchesLabel = area.label.toLowerCase().includes(query);
      const matchesRegion = area.region.toLowerCase().includes(query);
      
      const parentZone = ZONES.find(z => z.matchRegions.includes(area.region));
      const matchesZoneName = parentZone ? parentZone.name.toLowerCase().includes(query) : false;

      return matchesLabel || matchesRegion || matchesZoneName;
    });
  }, [searchQuery, selectedZone]);

  // Group filtered results by Zone
  const groupedZones = useMemo(() => {
    return ZONES.map(zone => {
      const areas = filteredAreas.filter(area => zone.matchRegions.includes(area.region));
      return {
        ...zone,
        areas
      };
    }).filter(group => group.areas.length > 0);
  }, [filteredAreas]);

  const totalResultsCount = filteredAreas.length;

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDesc}
        canonical="/service-areas"
      />
      
      <main className="pt-24 lg:pt-[104px] pb-16 md:pb-24 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Service Areas Directory' }]} />
          </div>

          {/* Header Section */}
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-dark/10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider rounded-full mb-3">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{badge}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark tracking-tight mb-4">
                  {title}
                </h1>
                <p className="text-dark/70 text-base sm:text-lg leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Hotline Quick Call Widget */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-dark/10 shadow-sm flex items-center justify-between sm:justify-start gap-4 shrink-0">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Phone className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-dark/60 uppercase tracking-wider">24/7 Emergency Dispatch</div>
                  <a href={phoneTel} className="text-xl sm:text-2xl font-black text-dark hover:text-accent transition-colors">
                    {phoneFormatted}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar & Instant Filter Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-dark/10 shadow-sm mb-10">
            <div className="max-w-4xl mx-auto">
              <label htmlFor="area-search" className="block text-sm font-bold text-dark mb-2">
                Instant Route &amp; Town Search
              </label>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-dark/40" />
                </div>
                <input
                  id="area-search"
                  type="text"
                  placeholder="Type a town or route name (e.g. Kumasi, Spintex, Takoradi, Tamale, Cape Coast)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 sm:pl-13 pr-11 sm:pr-12 py-3.5 sm:py-4 bg-slate-50 border border-dark/15 rounded-xl text-dark text-base sm:text-lg placeholder:text-dark/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-4 sm:pr-5 flex items-center text-dark/40 hover:text-dark transition-colors"
                    aria-label="Clear search query"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Zone Filter Chips */}
              <div className="mt-5 pt-5 border-t border-dark/5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-dark/60 uppercase tracking-wider">Filter by Zone / Region:</span>
                  {(searchQuery || selectedZone !== 'all') && (
                    <button
                      type="button"
                      onClick={() => { setSearchQuery(''); setSelectedZone('all'); }}
                      className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Reset all filters
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedZone('all')}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      selectedZone === 'all'
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-slate-100 text-dark/70 hover:bg-slate-200'
                    }`}
                  >
                    All Zones ({ALL_AREAS.length})
                  </button>
                  {ZONES.map((zone) => {
                    const zoneCount = ALL_AREAS.filter(a => zone.matchRegions.includes(a.region)).length;
                    const isSelected = selectedZone === zone.id;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setSelectedZone(isSelected ? 'all' : zone.id)}
                        className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                          isSelected
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-slate-100 text-dark/70 hover:bg-slate-200'
                        }`}
                      >
                        {zone.name} ({zoneCount})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Search Status Bar */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-dark/60 gap-1">
                <div>
                  {searchQuery ? (
                    <span>
                      Found <strong className="text-dark font-bold">{totalResultsCount}</strong> {totalResultsCount === 1 ? 'area' : 'areas'} matching &ldquo;<span className="text-primary font-bold">{searchQuery}</span>&rdquo;
                    </span>
                  ) : selectedZone !== 'all' ? (
                    <span>
                      Showing <strong className="text-dark font-bold">{totalResultsCount}</strong> areas in <strong className="text-primary font-bold">{ZONES.find(z => z.id === selectedZone)?.name}</strong>
                    </span>
                  ) : (
                    <span>
                      Showing all <strong className="text-dark font-bold">{ALL_AREAS.length}</strong> static routes across 8 geographic zones
                    </span>
                  )}
                </div>
                <div className="text-dark/40 italic">
                  Instant client-side filter &bull; Live updates as you type
                </div>
              </div>
            </div>
          </div>

          {/* Directory Content / Grouped Areas */}
          {groupedZones.length === 0 ? (
            /* Friendly "No Results Found" State */
            <div className="bg-white rounded-2xl p-8 sm:p-12 md:p-16 text-center border border-dark/10 shadow-sm max-w-3xl mx-auto my-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-dark mb-3">
                No Results Found for &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-dark/70 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                We couldn&rsquo;t find an exact listing matching your search, but <strong>we cover your location!</strong> Our 24/7 towing fleet operates nationwide across all 16 regions of Ghana, including unlisted towns and off-highway roads. Contact our dispatch team directly for immediate assistance.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <a 
                  href={phoneTel} 
                  className="flex items-center justify-center gap-2.5 bg-accent hover:bg-accent/90 text-white px-8 py-4 font-bold transition-all shadow-md shadow-accent/25 rounded-full w-full sm:w-auto text-base"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Dispatch: {phoneRaw}</span>
                </a>
                <a 
                  href={whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-white px-8 py-4 font-bold transition-all shadow-md rounded-full w-full sm:w-auto text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedZone('all'); }}
                className="text-primary hover:text-accent font-bold text-sm inline-flex items-center gap-1.5 transition-colors"
              >
                &larr; View All 261 Service Areas
              </button>
            </div>
          ) : (
            /* Directory Groupings */
            <div className="space-y-10 sm:space-y-12">
              {groupedZones.map((zone) => (
                <section 
                  key={zone.id} 
                  id={zone.id}
                  className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-dark/10 shadow-sm"
                >
                  {/* Category / Zone Heading */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-dark/10">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-dark tracking-tight">
                          {zone.name}
                        </h2>
                      </div>
                      <p className="text-dark/60 text-xs sm:text-sm mt-1 ml-10.5">
                        {zone.subtitle}
                      </p>
                    </div>

                    <div className="self-start sm:self-auto ml-10.5 sm:ml-0">
                      <span className="inline-block px-3 py-1 bg-slate-100 text-dark/70 font-bold text-xs uppercase tracking-wider rounded-full border border-dark/5">
                        {zone.areas.length} {zone.areas.length === 1 ? 'Route' : 'Routes'}
                      </span>
                    </div>
                  </div>

                  {/* Area Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                    {zone.areas.map((area) => (
                      <Link 
                        key={area.path}
                        to={area.path} 
                        className="bg-slate-50 hover:bg-primary/5 p-4 sm:p-4.5 rounded-xl border border-dark/10 hover:border-primary/40 transition-all duration-200 group flex items-center justify-between shadow-2xs hover:shadow-md hover:-translate-y-0.5"
                      >
                        <div className="min-w-0 pr-3">
                          <span className="block font-bold text-dark group-hover:text-primary transition-colors text-sm sm:text-base leading-snug">
                            {area.label}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-dark/50 mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                            <span className="truncate">{area.region}</span>
                          </span>
                        </div>
                        
                        <div className="w-8 h-8 rounded-full bg-white group-hover:bg-primary group-hover:text-white flex items-center justify-center border border-dark/10 group-hover:border-primary transition-all shrink-0">
                          <ArrowRight className="w-4 h-4 text-dark/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* Bottom Assistance Banner */}
          <div className="mt-12 md:mt-16 bg-dark text-white rounded-2xl p-6 sm:p-10 md:p-12 text-center relative overflow-hidden border border-white/10 shadow-xl">
            <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-block px-3.5 py-1 bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-full mb-3">
                {ctaBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                {ctaHeading}
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
                {ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href={phoneTel} 
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-4 font-bold transition-all shadow-lg shadow-accent/25 rounded-full w-full sm:w-auto text-base flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call {phoneRaw}</span>
                </a>
                <a 
                  href={whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 font-bold transition-all shadow-lg rounded-full w-full sm:w-auto text-base flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
