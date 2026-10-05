import { technologyBrands } from "@/data/technologyBrands";
import "@/styles/brand-logos.css";

export default function BrandLogoGrid() {
  return (
    <ul className="brand-logo-grid" aria-label="Technology brands">
      {technologyBrands.map((brand) => (
        <li key={brand.name}>
          <a className="brand-logo-card" href={brand.website} target="_blank" rel="noopener noreferrer" aria-label={`${brand.name} official website (opens in a new tab)`}>
            <div className={`brand-logo-visual brand-logo-visual--${brand.surface}`}>
              <img src={brand.logo} alt={`${brand.name} logo`} width={180} height={76} loading="lazy" decoding="async" />
            </div>
            <span className="brand-logo-caption" aria-hidden="true">{brand.name}<span>↗</span></span>
          </a>
        </li>
      ))}
    </ul>
  );
}
