export type ImageInfoProps = {
  [key: string]: {
    image: string;
    name?: string;
  }[];
};

const gamingAccessoriesImages = [
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643859/product_card_images/Headsets_uoiipg.jpg",
    name: "Headsets",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643859/product_card_images/Keyboards_p0guhd.jpg",
    name: "Keyboards",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643859/product_card_images/Computer_mice_gmfiye.jpg",
    name: "Computer mice",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643859/product_card_images/Chairs_lkltd2.jpg",
    name: "Chairs",
  },
];

const fashion = [
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643858/product_card_images/Jeans_under_50_rrednf.jpg",
    name: "Jeans under $50",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643857/product_card_images/Tops_under_25_ujxse5.jpg",
    name: "Tops under $25",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/c_crop,w_121,h_114/v1718376823/product_card_images/dresses_under_30_cztd5n.jpg",
    name: "Dresses under $30",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643857/product_card_images/Shoes_under_50_ie9zo3.jpg",
    name: "Shoes under $50",
  },
];

const refreshYourSpace = [
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643858/product_card_images/Dining_sgujkf.jpg",
    name: "Dining",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643858/product_card_images/Home_nehimv.jpg",
    name: "Home",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/c_crop,w_121,h_114/v1718377548/product_card_images/Kitchen_r2dzki.jpg",
    name: "Kitchen",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/c_crop,w_121,h_114/v1716643858/product_card_images/Health_and_Beauty_zmvpzc.jpg",
    name: "Health and Beauty",
  },
];

const dealsPCs = [
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643858/product_card_images/PC_deals_pr1dht.jpg",
  },
];

const giftsForDad = [
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643835/product_card_images/Tech_wh8ggs.jpg",
    name: "Tech",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643836/product_card_images/Adventure_gear_k6643e.jpg",
    name: "Adventure gear",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643836/product_card_images/Unique_finds_qphhee.jpg",
    name: "Unique finds",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643836/product_card_images/Health_wellness_yhudka.jpg",
    name: "Health & wellness",
  },
];

const decorItems = [
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643857/product_card_images/Wreaths_garlands_gbtiof.jpg",
    name: "Wreaths and garlands",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643850/product_card_images/Outdoor_decor_nkjpw4.jpg",
    name: "Outdoor decor",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643847/product_card_images/Pillows_throws_gwmezb.jpg",
    name: "Pillows and throws",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643846/product_card_images/Wall_art_mirrors_u0xncc.jpg",
    name: "Wall art and mirrors",
  },
];

const laptops = [
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643836/product_card_images/Laptops_jdkbzf.jpg",
  },
];

const beautyProducts = [
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643835/product_card_images/Makeup_cz7sji.jpg",
    name: "Makeup",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643835/product_card_images/Brushes_ozsygv.jpg",
    name: "Brushes",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/c_crop,w_121,h_114/v1716643835/product_card_images/Sponges_t8yplx.jpg",
    name: "Sponges",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643835/product_card_images/Mirrors_iyflka.jpg",
    name: "Mirrors",
  },
];

const sportsProducts = [
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643847/product_card_images/Sports_10_pot33d.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643846/product_card_images/Sports_11_fpcntl.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643846/product_card_images/Sports_9_xoevoq.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643846/product_card_images/Sports_5_mufdju.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643846/product_card_images/Sports_8_m9vzwo.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643846/product_card_images/Sports_7_irt3xg.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643845/product_card_images/Sports_2_xfh8sd.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716893074/product_card_images/Goggles_gqbr4f.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716893074/product_card_images/Balls_fhmkz8.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716893074/product_card_images/Bicycle_rol27m.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716893074/product_card_images/Tennis_Kit_hkle63.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716893073/product_card_images/Bag_k9nnvm.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716893074/product_card_images/Swimming_Goggles_qjeev0.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716893074/product_card_images/Tennis_Balls_yrdda6.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716893074/product_card_images/Waterbottle_scjd79.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643846/product_card_images/Sports_1_ytxayi.jpg",
  },
];

const movies = [
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643845/product_card_images/Movies_13_p3nzje.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643844/product_card_images/Movies_12_gakbcu.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643837/product_card_images/Movies_10_cczt9f.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643837/product_card_images/Movies_9_q7kihd.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643837/product_card_images/Movies_8_zqtga8.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643837/product_card_images/Movies_7_ik6pgc.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643836/product_card_images/Movies_6_oqnzrh.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643845/product_card_images/Movies_13_p3nzje.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643836/product_card_images/Movies_5_rhsbvy.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643836/product_card_images/Movies_4_qji1yz.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643836/product_card_images/Movies_3_qeoawh.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643845/product_card_images/Movies_13_p3nzje.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643844/product_card_images/Movies_12_gakbcu.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643837/product_card_images/Movies_10_cczt9f.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643837/product_card_images/Movies_9_q7kihd.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643837/product_card_images/Movies_8_zqtga8.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/dvnfulvef/image/upload/v1716643844/product_card_images/Movies_12_gakbcu.jpg",
  },
];

export const images: ImageInfoProps = {
  gamingAccessoriesImages,
  giftsForDad,
  dealsPCs,
  refreshYourSpace,
  fashion,
  decorItems,
  laptops,
  beautyProducts,
  sportsProducts,
  movies,
};
