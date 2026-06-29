import React from 'react';
import { SkylineIcon } from '../Icons';

export const SubheroBlock = (props: any) => (
  <section className="subhero">
    <SkylineIcon />
    {props.watermark && <div className="subhero-watermark">{props.watermark}</div>}
    <div className="wrap">
      {props.breadcrumbs && (
        <div className="crumbs">
          {props.breadcrumbs.map((b: any, i: number) => (
            <React.Fragment key={i}><a href={b.url}>{b.label}</a>{i < props.breadcrumbs.length - 1 && ' / '}</React.Fragment>
          ))}
        </div>
      )}
      {props.flag && <span className="subhero-flag">{props.flag}</span>}
      {props.title && <h1>{props.title}</h1>}
      {props.description && <p>{props.description}</p>}
      
      <div className="subhero-btns">
        {props.buttons?.map((btn: any, i: number) => (
          <a key={i} href={btn.url} className={`btn btn-${btn.style === 'outline' ? 'stroke' : 'fill btn-arrow'}`}>{btn.label}</a>
        ))}
      </div>
      {props.metaPoints?.length > 0 && (
        <div className="subhero-meta">
          {props.metaPoints.map((m: any, i: number) => (
            <div key={i}><span className="smi-n">{m.value}</span><span className="smi-l">{m.label}</span></div>
          ))}
        </div>
      )}
    </div>
  </section>
);
