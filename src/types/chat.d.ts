type ChatDB = {
  _id: string;
  members: string[];
  messages: [
    {
      id: string;
      name: string;
      text: string;
    }
  ];
};
