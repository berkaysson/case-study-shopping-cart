import { useSpring } from "react-spring";

/**
 * useScrollAnimation
 * This hook is intended to be used to animate the fade in and translation
 * of an element as it comes into view when the user scrolls.
 *
 * @returns {object} An object with the animated styles.
 */
export const useScrollAnimation = () => {
  const styles = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 200, friction: 15 },
  });

  return styles;
};
