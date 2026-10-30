import React, { useEffect, useState } from 'react';
import { Compass, ExternalLink, MapPin, Navigation, CloudSun, Wind, Droplets } from 'lucide-react';
import { Language, VILLAGE_CONFIG } from '../data/villageConfig';
import { buildGoogleMapsUrls } from '../utils/villageLogic';

interface MapAndWeatherSectionProps {
  lang: Language;
}

interface LiveWeatherState {
  loading: boolean;
  error: boolean;
  temperatureC?: number;
  humidity?: number;
  windSpeedKmh?: number;
  weatherCode?: number;
  updatedAt?: string;
}

function describeWeatherCode(code: number | undefined, lang: Language): string {
  if (code === undefined) return lang === 'hi' ? 'साफ़ मौसम' : 'Clear Sky';
  if (code === 0) return lang === 'hi' ? 'साफ़ आसमान (Clear Sky)' : 'Clear Sky';
  if (code >= 1 && code <= 3) return lang === 'hi' ? 'आंशिक बादल (Partly Cloudy)' : 'Partly Cloudy';
  if (code >= 45 && code <= 48) return lang === 'hi' ? 'हल्का कोहरा/धुंध (Mist/Fog)' : 'Mist / Fog';
  if (code >= 51 && code <= 67) return lang === 'hi' ? 'हल्की बारिश (Light Rain)' : 'Light Rain';
  if (code >= 80 && code <= 99) return lang === 'hi' ? 'वर्षा/गरज (Rain Showers)' : 'Rain Showers';
  return lang === 'hi' ? 'सामान्य मौसम (Pleasant)' : 'Pleasant Weather';
}

export const MapAndWeatherSection: React.FC<MapAndWeatherSectionProps> = ({ lang }) => {
  const {
    lat,
    lng,
    zoom,
    plusCode,
    placeQuery,
    addressLineHi,
    addressLineEn,
    verificationNoteHi,
    verificationNoteEn,
  } = VILLAGE_CONFIG.location;

  const { embedUrl, directionsUrl, openMapsUrl } = buildGoogleMapsUrls(lat, lng, zoom, placeQuery);

  const [weather, setWeather] = useState<LiveWeatherState>({
    loading: true,
    error: false,
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchLiveWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Asia%2FKolkata`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error('Weather API response not ok');
        const data = await res.json();
        if (isMounted && data?.current) {
          setWeather({
            loading: false,
            error: false,
            temperatureC: Math.round(data.current.temperature_2m),
            humidity: Math.round(data.current.relative_humidity_2m),
            windSpeedKmh: Math.round(data.current.wind_speed_10m),
            weatherCode: data.current.weather_code,
            updatedAt: new Date().toLocaleTimeString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          });
        }
      } catch {
        if (isMounted) {
          setWeather({ loading: false, error: true });
        }
      }
    }

    fetchLiveWeather();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [lat, lng, lang]);

  return (
    <section
      id="map-section"
      aria-labelledby="map-heading"
      className="py-16 lg:py-24 border-b border-white/10 dark-grey-alt"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#A8C628] mb-2">
              {lang === 'hi' ? 'भौगोलिक स्थिति और नेविगेशन' : 'VERIFIED LOCATION & NAVIGATION'}
            </p>
            <h2
              id="map-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-semibold text-white tracking-tight"
            >
              Find Shivganj on Map · {lang === 'hi' ? 'मानचित्र पर शिवगंज' : 'Location Guide'}
            </h2>
            <p className="mt-2 text-base text-zinc-300">
              {placeQuery} · Shivganj, Bhetua Block, Amethi District, Uttar Pradesh
            </p>
          </div>

          {/* Primary Map Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-semibold text-zinc-950 bg-[#A8C628] rounded-full hover:bg-[#f0d9a3] transition-colors whitespace-nowrap shrink-0"
            >
              <Navigation className="w-4 h-4" aria-hidden="true" />
              <span>{lang === 'hi' ? 'दिशा-निर्देश प्राप्त करें (Get Directions)' : 'Get Directions'}</span>
            </a>
            <a
              href={openMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-semibold text-zinc-100 glass-pill-btn rounded-full whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span>{lang === 'hi' ? 'Google Maps में खोलें' : 'Open in Google Maps'}</span>
            </a>
          </div>
        </div>

        {/* 2-Column Split: Interactive Google Map (Left 7 cols) + Location Metadata & Live Weather (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Map Frame */}
          <div className="lg:col-span-7 glass-panel rounded-2xl overflow-hidden flex flex-col min-h-[380px]">
            <div className="px-4 py-3 bg-black/40 border-b border-white/10 flex items-center justify-between gap-4 text-xs text-zinc-300">
              <span className="font-medium text-white truncate">
                {placeQuery} · Shivganj, Bhetua
              </span>
              <span className="font-tabular text-[#A8C628] font-semibold shrink-0">
                {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
              </span>
            </div>
            <div className="relative flex-1 w-full min-h-[340px]">
              <iframe
                title="Google Map showing 6VF2+VH Ankit, Purab Dwara, Shivganj, Bhetua Block, Amethi District, Uttar Pradesh 227412"
                src={embedUrl}
                className="w-full h-full min-h-[340px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right Column: Verified Coordinates Details + Live Open-Meteo Weather */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Location Fact Sheet */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A8C628] mb-3">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{lang === 'hi' ? 'सत्यापित डाक एवं भौगोलिक विवरण' : 'Verified Address & Coordinates'}</span>
              </div>

              <dl className="divide-y divide-white/10 text-sm">
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-zinc-400">{lang === 'hi' ? 'Google Map स्थान:' : 'Map Location:'}</dt>
                  <dd className="text-right font-semibold text-[#A8C628]">
                    {placeQuery}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-zinc-400">{lang === 'hi' ? 'प्लस कोड (Plus Code):' : 'Plus Code:'}</dt>
                  <dd className="text-right font-tabular font-semibold text-white">
                    {plusCode} · Purab Dwara (227412)
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-zinc-400">{lang === 'hi' ? 'पूरा पता:' : 'Full Address:'}</dt>
                  <dd className="text-right font-medium text-zinc-200">
                    {lang === 'hi' ? addressLineHi : addressLineEn}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-zinc-400">{lang === 'hi' ? 'ग्राम पंचायत व ब्लॉक:' : 'Panchayat & Block:'}</dt>
                  <dd className="text-right font-medium text-zinc-200">
                    {lang === 'hi' ? 'घाटमपुर · भेटुआ ब्लॉक, अमेठी' : 'Ghatampur · Bhetua Block, Amethi'}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-zinc-400">{lang === 'hi' ? 'अक्षांश / देशांतर:' : 'Coordinates:'}</dt>
                  <dd className="text-right font-tabular font-semibold text-[#A8C628]">
                    {lat}° N, {lng}° E (106m ASL)
                  </dd>
                </div>
              </dl>

              <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                <Compass className="w-3.5 h-3.5 inline mr-1 text-[#A8C628]" aria-hidden="true" />
                {lang === 'hi' ? verificationNoteHi : verificationNoteEn}
              </p>
            </div>

            {/* Live Weather Card */}
            <div className="glass-panel-strong rounded-2xl p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#A8C628] font-semibold">
                  <CloudSun className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    {lang === 'hi' ? 'शिवगंज लाइव मौसम (Open-Meteo API)' : 'Shivganj Live Weather (Open-Meteo API)'}
                  </span>
                </div>
                {weather.updatedAt && (
                  <span className="text-xs font-tabular text-zinc-400">{weather.updatedAt}</span>
                )}
              </div>

              {weather.loading ? (
                <p className="text-sm text-zinc-300">
                  {lang === 'hi' ? 'लाइव मौसम डेटा प्राप्त किया जा रहा है...' : 'Fetching live village weather...'}
                </p>
              ) : weather.error ? (
                <div className="text-xs text-zinc-300 space-y-1">
                  <p className="font-medium">
                    {lang === 'hi'
                      ? 'लाइव मौसम सेवा इस समय ऑफ़लाइन है (जलवायु: उपोष्णकटिबंधीय अवध क्षेत्र)।'
                      : 'Live weather feed currently unreachable (Climate: Subtropical Awadh Plains).'}
                  </p>
                  <p className="text-zinc-400">
                    {lang === 'hi'
                      ? 'प्रमुख ऋतुएँ: ग्रीष्म (अप्रैल–जून), मानसून (जुलाई–सितंबर), शीत (नवंबर–फ़रवरी)।'
                      : 'Seasons: Summer (Apr–Jun), Monsoon (Jul–Sep), Winter (Nov–Feb).'}
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-3xl font-tabular font-bold text-white">
                      {weather.temperatureC}°C
                    </div>
                    <div className="text-xs text-zinc-300 mt-0.5">
                      {describeWeatherCode(weather.weatherCode, lang)}
                    </div>
                  </div>
                  <div className="flex items-center gap-5 text-xs text-zinc-300">
                    <div className="flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-[#A8C628]" aria-hidden="true" />
                      <div>
                        <div className="text-zinc-400">{lang === 'hi' ? 'आर्द्रता' : 'Humidity'}</div>
                        <div className="font-tabular font-semibold text-white">{weather.humidity}%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wind className="w-4 h-4 text-[#A8C628]" aria-hidden="true" />
                      <div>
                        <div className="text-zinc-400">{lang === 'hi' ? 'हवा की गति' : 'Wind'}</div>
                        <div className="font-tabular font-semibold text-white">{weather.windSpeedKmh} km/h</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
