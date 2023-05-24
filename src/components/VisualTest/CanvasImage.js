import { useEffect, useRef } from "react";

export default function CanvasImage({
  sourceImage,
  differences,
  imgProps,
  setImgProps,
}) {
  const myCanvas = useRef();

  let context = null;

  useEffect(() => {
    context = myCanvas.current.getContext("2d");
    const image = new Image();
    image.src = sourceImage;
    image.onload = () => {
      context.drawImage(image, 0, 0);
      var props = { width: image.width, height: image.height };
      setImgProps(props);
      differences.forEach((obj) => {
        const r1Style = { borderColor: "rgb(255 0 0 / 52%)", borderWidth: 3 };
        drawRect(obj, r1Style, context);
      });
    };
    myCanvas.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    context = myCanvas.current.getContext("2d");
    const image = new Image();
    image.src = sourceImage;
    image.onload = () => {
      context.drawImage(image, 0, 0);
      var props = { width: image.width, height: image.height };
      setImgProps(props);
      differences.forEach((obj) => {
        const r1Style = { borderColor: "rgb(255 0 0 / 52%)", borderWidth: 3 };
        drawRect(obj, r1Style, context);
      });
    };
  }, []);

  const drawRect = (info, style = {}, context) => {
    const { x, y, width, height, Label } = info;
    const { borderColor, borderWidth } = style;

    context.beginPath();
    context.lineWidth = borderWidth;
    context.strokeStyle = borderColor;
    context.rect(x, y, width, height);
    context.font = "bold 30px serif";

    context.fillStyle = "#000000";
    context.fillText(Label, x + width / 2, y);
    context.stroke();
  };

  return (
    <canvas ref={myCanvas} width={imgProps.width} height={imgProps.height} />
  );
}
