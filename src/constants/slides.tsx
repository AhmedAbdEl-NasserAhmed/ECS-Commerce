export function slides(t) {
  return [
    {
      id: 1,
      title: t("Spring Sale Collections"),
      description: t("Sale! Up to 50% off!"),
      img: "/hero-bg-male-jeans.jpg",
      url: "/",
      bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
      href: (locale, category, subCategory) => {
        let url = "/";
        if (category) {
          url += `${locale}/user/productsList/${category?._id}`;
        }
        if (subCategory) {
          url += `?&subCategory=${subCategory._id}`;
        }
        return url;
      },
    },
  ];
}
