import { useSpring } from "react-spring";

export const useScrollAnimation = () => {
  const styles = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 200, friction: 15 },
  });

  return styles;
};
