import { Anchor } from "antd";
import layer1 from "./bg.webp";
import layer2 from "./layer2.webp";
import layer3 from "./layer3.png";
import secondSection from "./second-section.webp";
import thirdSection from "./third-section.webp";
import { Avatar } from "antd";
import { TwitterSquareFilled, InstagramFilled } from "@ant-design/icons";

import "./Home.css";
let Home = () => {
  const { Link } = Anchor;
  return (
    <div>
      <Anchor affix={false} className="home-anchor">
        <Link
          href="#teamsection-container"
          title="Team"
          className="home-navigation-link-font"
        />
        <Link
          href="#roadmapsection-container"
          title="Roadmap"
          className="home-navigation-link-font"
        />
        <Link
          href="#API"
          title="API"
          className="home-navigation-link-font"
        ></Link>
      </Anchor>
      {imageSection()}
      {whatSection()}
      {sectionDivider()}
      {ourTeamSection()}
      {sectionDivider()}
      {roadmapSection()}
      {sectionDivider()}
      {caraouselSection()}
      {footerSection()}
    </div>
  );
};

let imageSection = () => {
  return (
    <div className="container">
      <img alt="Avatar" className="image" src={layer1} />

      <img alt="Avatar" className="overlay overlay-tint" src={layer2} />

      <img alt="Avatar" className="overlay overlay-tint" src={layer3} />

      <div alt="Avatar" className="overlay project-title-container">
        <div className="project-main-title animate-project-name"> Akari</div>
      </div>
      {/* <div className="overlay">My Name is John</div> */}
    </div>
  );
};

let whatSection = () => {
  return (
    <div className="whatsection-container">
      <div className="whatsection-details">yo</div>
      <img alt="Avatar" src={secondSection} className="whatsection-image" />
    </div>
  );
};

let getTeamCards = () => {
  let teamInfo = [...Array(4).keys()];
  let teamCards = teamInfo.map((value, index) => {
    return (
      <div className="team-card">
        <div className="team-card-top">
          <Avatar src={secondSection} className="team-card-avatar"></Avatar>
          <div className="team-card-name">Name</div>
          <div className="team-card-position">Team Lead/Developer</div>
          <div className="team-card-divider"></div>
        </div>
        <div className="team-card-bottom">
          Octillion is a Founder of Akari, keeping the continued development on
          track for success and our community thriving.
        </div>
      </div>
    );
  });
  return teamCards;
};

let ourTeamSection = () => {
  return (
    <div className="teamsection-container" id="teamsection-container">
      <div className="team-header-text">Our Team</div>

      <div className="team-cards-container">{getTeamCards()}</div>
    </div>
  );
};

let getRoadmapCards = () => {
  let roadMapInfo = [...Array(4).keys()];
  let roadMapCards = roadMapInfo.map((value, index) => {
    return (
      <div className="roadmap-card">
        <div className="roadmap-card-left">
          <div className="roadmap-card-circle"></div>
          <div className="roadmap-card-line"></div>
        </div>
        <div className="roadmap-card-middle">
          <div className="roadmap-card-step-title">A Seed</div>
          <div className="roadmap-card-divider"></div>
          <div className="roadmap-card-step-details">
            Our focus first and foremost is the community. Using social media,
            we hope to grow the Akari brand and community into something
            everyone can find a place in. We are taking the fundamentals of web3
            and decentralization into account here. The community is and always
            will be our foundation. We are planting our seeds in the right
            places to make this project spectacular. Prominent members and early
            supporters in the community will earn a whitelist as a reward for
            their dedication. We will also be offering whitelist through games
            and objectives held regularly in the discord.
          </div>
        </div>
        <div className="roadmap-card-right">{index}</div>
      </div>
    );
  });
  return roadMapCards;
};

let roadmapSection = () => {
  return (
    <div className="roadmapsection-container" id="roadmapsection-container">
      <div className="roadmap-left-section">
        <div className="roadmap-header-text">Roadmap</div>
        {getRoadmapCards()}
      </div>

      <div className="roadmap-right-section">
        <img className="roadmap-right-section-img" src={secondSection}></img>
      </div>
    </div>
  );
};

let getCarousel = () => {
  let carouselImages = [...Array(10).keys()];

  let images = carouselImages.map((value, index) => {
    return <img className="carousel-image" src={thirdSection}></img>;
  });
  let carousel = <div className="carousel">{images}</div>;
  return carousel;
};
let caraouselSection = () => {
  return <div className="carousel-section-container">{getCarousel()}</div>;
};

let footerSection = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <div className="footer-left-logos-container">
          <div className="footer-akari-logo">Akari</div>
          <div className="footer-hydra-logo">Hydra Launchpad</div>
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-right-logos-container">
          <div className="footer-discord-logo">
            <TwitterSquareFilled></TwitterSquareFilled>
          </div>
          <div className="footer-twitter-logo">
            <InstagramFilled></InstagramFilled>
          </div>
        </div>
      </div>
    </div>
  );
};

let sectionDivider = () => {
  return <div className="section-divider"></div>;
};

export default Home;
