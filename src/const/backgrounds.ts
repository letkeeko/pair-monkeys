import background1 from "assets/background-images/option1.jpg";
import background2 from "assets/background-images/option2.jpg";
import background3 from "assets/background-images/option3.jpg";
import background4 from "assets/background-images/option4.jpg";
import background5 from "assets/background-images/option5.jpg";
import background6 from "assets/background-images/option6.jpg";
import background7 from "assets/background-images/option7.jpg";
import background8 from "assets/background-images/option8.jpg";
import background9 from "assets/background-images/option9.jpg";
import background10 from "assets/background-images/option10.jpg";
import background11 from "assets/background-images/option11.jpg";
import background12 from "assets/background-images/option12.jpg";
import shuffleArray from "utils/shuffle-array";

const BACKGROUNDS = [
  { id: 1, url: background1 },
  { id: 2, url: background2 },
  { id: 3, url: background3 },
  { id: 4, url: background4 },
  { id: 5, url: background5 },
  { id: 6, url: background6 },
  { id: 7, url: background7 },
  { id: 8, url: background8 },
  { id: 9, url: background9 },
  { id: 10, url: background10 },
  { id: 11, url: background11 },
  { id: 12, url: background12 },
];

export default shuffleArray(BACKGROUNDS);
