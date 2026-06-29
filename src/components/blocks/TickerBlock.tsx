export function TickerBlock({ items }: { items?: { text?: string }[] }) {
  if (!items?.length) return null
  const repeated = [...items, ...items]

  return (
    <div className="ticker">
      <div className="ticker-track">
        {repeated.map((item, index) => (
          <span key={index} className="ticker-item">{item.text}<span className="ticker-sep"></span></span>
        ))}
      </div>
    </div>
  )
}
