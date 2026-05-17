export const newsListQuery = `
  *[_type == "newsArticle" && defined(slug.current)]
    | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      featured,
      seoTitle,
      seoDescription,
      categories[]->{
        _id,
        title,
        "slug": slug.current,
        description
      },
      coverImage{
        alt,
        caption,
        asset->{
          url,
          metadata{
            lqip,
            dimensions
          }
        }
      }
    }
`;

export const newsArticleQuery = `
  *[_type == "newsArticle" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    featured,
    body,
    seoTitle,
    seoDescription,
    categories[]->{
      _id,
      title,
      "slug": slug.current,
      description
    },
    coverImage{
      alt,
      caption,
      asset->{
        url,
        metadata{
          lqip,
          dimensions
        }
      }
    }
  }
`;

export const eventListQuery = `
  *[_type == "event" && defined(startsAt) && startsAt >= now()]
    | order(startsAt asc) {
      _id,
      title,
      location,
      displayTime,
      startsAt,
      description,
      featured,
      registrationUrl,
      registrationLabel,
      categories[]->{
        _id,
        title,
        "slug": slug.current,
        description
      }
    }
`;
