import { useState } from 'react';
import { assets, assetUrl } from '../config/assets';

export function HeaderProfile() {
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [monogramFailed, setMonogramFailed] = useState(false);

  return (
    <header className="profile entrance">
      <div className="avatar-frame">
        {avatarFailed ? <span className="avatar-fallback" aria-label="Taty Soares">TS</span> :
          <img className="avatar" src={assetUrl(assets.profile.avatar)} width="156" height="156"
            alt="Taty Soares, nail designer" fetchPriority="high" onError={() => setAvatarFailed(true)} />}
      </div>
      <div className={`brand ${logoFailed ? 'brand-fallback' : ''}`}>
        {!logoFailed ? <img src={assetUrl(assets.brand.gold)} width="154" height="115"
          alt="Taty Soares Nail Designer" onError={() => setLogoFailed(true)} /> : <>
          {!monogramFailed && <img src={assetUrl(assets.brand.monogram)} alt="" onError={() => setMonogramFailed(true)} />}
          <span>Taty Soares</span><small>NAIL DESIGNER</small>
        </>}
      </div>
      <h1>Nail Designer em<br />Rio das Pedras</h1>
      <p className="profile-tagline">Beleza e cuidado em cada detalhe.</p>
    </header>
  );
}
