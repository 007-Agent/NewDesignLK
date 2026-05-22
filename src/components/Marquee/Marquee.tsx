import './Marquee.scss';

export function MarqueeBar() {
  const items = [
    'Мы в социальных сетях!',
    'Постоянные скидки и акции',
    'Проведи отпуск в наших санаториях',
    'Не забудь пройти диспансеризацию!',
  ];

  return (
    <div className="marquee-bar">
      <div className="marquee-content">
        {items.map((item, index) => (
          <span key={`first-${index}`} className="marquee-item">
            {item}
          </span>
        ))}
        {items.map((item, index) => (
          <span key={`second-${index}`} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}