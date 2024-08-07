export function requestCheckupTimelineStages(userTranslation) {
  return [
    {
      id: 1,
      name: userTranslation("CREATED")
    },
    {
      id: 2,
      name: userTranslation("SHIPPED")
    },
    {
      id: 3,
      name: userTranslation("DELIVERING")
    },
    {
      id: 4,
      name: userTranslation("DELIVERED")
    }
  ];
}
