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
        description,
        tagColor
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
    _updatedAt,
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
      description,
      tagColor
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
        description,
        tagColor
      }
    }
`;

export const photoGalleryListQuery = `
  *[_type == "photoGalleryItem"] | order(sortOrder asc) {
    _id,
    caption,
    sortOrder,
    categories[]->{
      _id,
      title,
      "slug": slug.current,
      description,
      tagColor
    },
    image{
      alt,
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

export const globalStatsQuery = `
  *[_type == "globalStats"][0]{
    _id,
    title,
    livesImpacted,
    projects,
    partners,
    volunteers,
    states,
    events,
    beneficiaries
  }
`;

export const homePageQuery = `
  *[_type == "homePage"][0]{
    _id,
    title,
    statistics{
      impactDistribution[]{
        name,
        value
      },
      impactTrend[]{
        year,
        impact
      }
    }
  }
`;

export const initiativeCardsQuery = `
  *[_type == "initiativeCard"] | order(sortOrder asc) {
    _id,
    id,
    title,
    theme,
    status,
    description,
    statOneValue,
    statOneLabel,
    statTwoValue,
    statTwoLabel,
    statThreeValue,
    statThreeLabel,
    sortOrder
  }
`;

export const projectsPageQuery = `
  *[_type == "projectsPage"][0]{
    _id,
    title,
    projectCategories[]{
      kind,
      title,
      count,
      sortOrder
    },
    featuredProject{
      title,
      description,
      tags,
      metrics[]{
        value,
        label
      },
      outcomes
    }
  }
`;

export const projectsStoriesSectionQuery = `
  *[_type == "projectsStoriesSection"][0]{
    _id,
    title,
    items[]{
      title,
      description,
      gradient
    }
  }
`;

export const getInvolvedCardsQuery = `
  *[_type == "getInvolvedCard"] | order(sortOrder asc) {
    _id,
    id,
    kind,
    title,
    description,
    buttonLabel,
    buttonHref,
    sortOrder
  }
`;

export const resourceGuidesQuery = `
  *[_type == "resourceGuide"] | order(sortOrder asc) {
    _id,
    title,
    format,
    description,
    theme,
    href,
    buttonLabel,
    sortOrder
  }
`;

export const resourcePublicationsQuery = `
  *[_type == "resourcePublication"] | order(sortOrder asc) {
    _id,
    type,
    theme,
    title,
    authors,
    year,
    href,
    buttonLabel,
    sortOrder
  }
`;

export const resourceVideosQuery = `
  *[_type == "resourceVideo"] | order(sortOrder asc) {
    _id,
    title,
    duration,
    type,
    href,
    thumbnail{
      alt,
      asset->{
        url,
        metadata{
          lqip,
          dimensions
        }
      }
    },
    sortOrder
  }
`;

export const resourceStandardsQuery = `
  *[_type == "resourceStandard"] | order(sortOrder asc) {
    _id,
    title,
    href,
    sortOrder
  }
`;
