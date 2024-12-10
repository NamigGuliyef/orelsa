const menu = (): { id: string; link: string; name: string }[] => {
  return [
    {
      id: "1",
      name: "Ana səhifə",
      link: "/",
    },
    {
      id: "2",
      name: "Mağaza",
      link: "/shop",
    },
    {
      id: "3",
      name: "Əlaqə",
      link: "/contact",
    },
  ];
};
export default menu;
