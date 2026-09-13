import Icon from "../../assets/aboutus_title.svg";

const AboutusTitleIcon = ({
  width = 600,
  height = "auto",
  alt = "About Us Title",
}) => {
  return (
    <img
      src={Icon}
      width={width}
      height={height}
      alt={alt}
    />
  );
};

export default AboutusTitleIcon;
