import { forwardRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const ImageWrapper = styled(Box)({
  overflow: "hidden",
  position: "relative",
  display: "inline-block",
  width: "100%",
  height: "100%",
});

const Image = forwardRef(
  (
    { alt, src, ratio, sx, overlay = false, effect = "blur", ...other },
    ref
  ) => {
    return (
      <ImageWrapper
        ref={ref}
        component="span"
        sx={{
          ...sx,
          ...(ratio && { aspectRatio: ratio }),
        }}
        {...other}
      >
        {overlay && (
          <Box
            sx={{
              top: 0,
              left: 0,
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
          />
        )}
        <LazyLoadImage
          alt={alt}
          src={src}
          effect={effect}
          wrapperClassName="lazy-load-image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            verticalAlign: "bottom",
          }}
        />
      </ImageWrapper>
    );
  }
);

export default Image;
