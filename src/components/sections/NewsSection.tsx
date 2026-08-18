import { site } from "../../content/site";

export function NewsSection() {
  const { news } = site;

  return (
    <section className="section section--surface news" id="news" aria-labelledby="news-title">
      <div className="container">
        <div className="news__head">
          <h2 className="section__title section__title--xs" id="news-title">
            {news.title}
          </h2>
          <a className="news__all" href={news.allLink.href}>
            {news.allLink.label}
          </a>
        </div>

        <ul className="news__grid">
          {news.items.map((item) => (
            <li
              className={item.placeholder ? "news-item news-item--placeholder" : "news-item"}
              key={item.title}
            >
              <time className="news-item__year" dateTime={item.year}>
                {item.year}
              </time>
              <h3 className="news-item__title">{item.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
