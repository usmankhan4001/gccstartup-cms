import React from 'react';

interface HeroProps {
  headline: React.ReactNode;
  intro: string;
  country?: {
    name: string;
    flag: string;
  };
  meta?: {
    tax?: string;
    timeline?: string;
    from?: string;
  };
  ctaLabel?: string;
  ctaUrl?: string;
  waUrl?: string;
}

export default function Hero({
  headline,
  intro,
  country,
  meta,
  ctaLabel = 'Start my setup',
  ctaUrl,
  waUrl,
}: HeroProps) {
  return (
    <section className="subhero">
      {/* SVG Skyline Background */}
      <svg className="skyline" viewBox="0 0 1440 180" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <g className="sk-b">
          <rect x="10" y="70" width="74" height="110"/>
          <rect x="90" y="108" width="52" height="72"/>
          <rect x="150" y="44" width="60" height="136"/>
          <rect x="216" y="92" width="42" height="88"/>
          <rect x="264" y="60" width="82" height="120"/>
          <rect x="352" y="120" width="46" height="60"/>
          <rect x="404" y="30" width="64" height="150"/>
          <rect x="474" y="84" width="52" height="96"/>
          <rect x="532" y="52" width="92" height="128"/>
          <rect x="630" y="100" width="42" height="80"/>
          <rect x="724" y="86" width="56" height="94"/>
          <rect x="786" y="56" width="78" height="124"/>
          <rect x="870" y="112" width="46" height="68"/>
          <rect x="922" y="38" width="62" height="142"/>
          <rect x="990" y="72" width="86" height="108"/>
          <rect x="1082" y="98" width="42" height="82"/>
          <rect x="1130" y="48" width="72" height="132"/>
          <rect x="1208" y="90" width="50" height="90"/>
          <rect x="1264" y="62" width="82" height="118"/>
          <rect x="1352" y="106" width="56" height="74"/>
          <rect x="1414" y="50" width="26" height="130"/>
        </g>
        <g className="sk-accent">
          <rect x="678" y="20" width="42" height="160"/>
          <rect x="695" y="6" width="8" height="20"/>
        </g>
        <g className="sk-win">
          <rect x="166" y="60" width="8" height="8"/>
          <rect x="184" y="60" width="8" height="8"/>
          <rect x="166" y="80" width="8" height="8"/>
          <rect x="184" y="80" width="8" height="8"/>
          <rect x="420" y="48" width="8" height="8"/>
          <rect x="440" y="48" width="8" height="8"/>
          <rect x="938" y="56" width="8" height="8"/>
          <rect x="958" y="56" width="8" height="8"/>
          <rect x="1146" y="66" width="8" height="8"/>
          <rect x="1166" y="66" width="8" height="8"/>
        </g>
      </svg>
      
      {country?.flag && (
        <div className="subhero-watermark">{country.flag}</div>
      )}
      
      <div className="wrap">
        <div className="crumbs">
          <a href="/">Home</a> &nbsp;/&nbsp; <a href="/#jur">Jurisdictions</a>
          {country?.name && <> &nbsp;/&nbsp; {country.name}</>}
        </div>
        
        {country?.flag && (
          <span className="subhero-flag">{country.flag}</span>
        )}
        
        <h1>{headline}</h1>
        <p>{intro}</p>
        
        <div className="subhero-btns">
          {ctaUrl && (
            <a href={ctaUrl} className="btn btn-fill btn-arrow">
              {ctaLabel}
            </a>
          )}
          {waUrl && (
            <a href={waUrl} className="btn btn-stroke">
              WhatsApp us
            </a>
          )}
        </div>
        
        {meta && (
          <div className="subhero-meta">
            {meta.tax && (
              <div>
                <span className="smi-n">{meta.tax}</span>
                <span className="smi-l">Tax position</span>
              </div>
            )}
            {meta.timeline && (
              <div>
                <span className="smi-n">{meta.timeline}</span>
                <span className="smi-l">Timeline</span>
              </div>
            )}
            {meta.from && (
              <div>
                <span className="smi-n">{meta.from}</span>
                <span className="smi-l">Starting from</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
