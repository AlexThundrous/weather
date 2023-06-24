import React, { useEffect, useRef } from 'react';
import './uvmeter.css';

const UVMeter = ({ percentage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const radius = canvas.height / 2 - 10; // Adjust the radius to make the semicircle thinner
    const center = { x: canvas.width / 2, y: canvas.height / 1.5 };

    const drawArc = (startAngle, endAngle, color, lineWidth) => {
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, startAngle, endAngle);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.stroke();
    };

    const drawSemicircle = () => {
      const startAngle = Math.PI;
      const endAngle = Math.PI + (percentage / 15) * ((Math.PI * 13) / 15); // Calculate the angle for the progress based on percentage
      drawArc(startAngle, endAngle, '#ffd700', 20); // Draw progress semicircle arc with thicker line width

      const fullStartAngle = endAngle; // Start from the end of the progress arc
      const fullEndAngle = Math.PI * 2; // Full semicircle
      drawArc(fullStartAngle, fullEndAngle, '#e6e6e6', 10); // Draw non-progress semicircle arc with thinner line width
    };

    const drawText = () => {
      if (percentage !== 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        drawSemicircle(); // Draw semicircle progress

        ctx.font = '36px Arial'; // Increase font size
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const textY = center.y / 1.2; // Adjust the vertical position of the text
        ctx.fillText(`${percentage}`, center.x, textY);
      }
    };

    // Inside the useEffect hook
    drawSemicircle(); // Draw semicircle progress
    drawText(); // Draw text above the progress bar
  }, [percentage]);

  return <canvas ref={canvasRef} className="semi-circle-progress" width={240} height={120} />; // Increase canvas size
};

export default UVMeter;
