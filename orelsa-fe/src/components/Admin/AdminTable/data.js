const columns = [
  { name: "Foto", uid: "name" },
  { name: "Ad", uid: "name1" },
  { name: "Haqqında", uid: "about" },
  { name: "Qiymət", uid: "price" },
  { name: "Endirim qiyməti", uid: "discount_price" },
  { name: "Endirim faizi", uid: "Endirim faizi" },
  { name: "Model", uid: "model" },
  { name: "Kategoriya", uid: "category" },
  { name: "Aktiv", uid: "active" },
  { name: "Əməliyyatlar", uid: "actions" },
];

const users = [
  {
    id: 1,
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    role: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    role: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];

export { columns, users };
